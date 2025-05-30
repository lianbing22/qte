**
一、项目结构规范
project-root/
├── client/          # 前端项目（QTE游戏界面）
│   ├── src/
│   │   ├── assets/          # 静态资源（图标/音效/模型）
│   │   │   ├── qte-icons/   # QTE操作图标（PNG/SVG/GLTF）
│   │   │   ├── animations/  # Lottie动画文件（反馈效果）
│   │   ├── scenes/          # Phaser.js场景文件（QTE关卡逻辑）
│   │   ├── components/      # 通用组件（进度条/反馈弹窗）
│   │   ├── utils/           # 工具函数（QTE交互逻辑/设备适配）
│   ├── vite.config.ts       # Vite配置文件（WebGL优化/资源加载）
│   └── tsconfig.json        # TypeScript配置（QTE状态接口定义）
├── server/          # 后端服务（数据统计/API接口）
│   ├── src/
│   │   ├── routes/          # API路由（QTE关卡数据/用户记录）
│   │   ├── models/          # 数据模型（QTEConfig/PlayerRecord）
│   │   ├── services/        # 业务逻辑（QTE分数计算/成就系统）
│   ├── app.js             # Express服务入口
│   └── config/            # 环境配置（数据库连接/跨域设置）
├── design/          # 设计资源（Figma原型/Blender模型）
│   ├── qte-ui-kit/      # QTE界面组件库（标注图/切图）
│   └── 3d-models/       # 3D图标资源（FBX/GLTF格式）
├── docs/            # 文档目录（本规范文档/API文档）
├── .gitignore       # Git忽略规则（node_modules/编译文件）
└── package.json     # 依赖清单（前后端依赖版本控制）

二、编码规范
（一）通用规则
命名规范
QTE 相关模块统一前缀QTE_（如QTE_Button.tsx、QTE_ProgressBar.js）
状态枚举使用大写驼峰：enum QTEState { NORMAL, ACTIVE, FAILED }
场景文件按功能命名：ElevatorRepairScene.ts（电梯抢修 QTE 场景）
TypeScript 要求
QTE 交互参数必须定义接口：
interface QTEAction {
  type: 'CLICK' | 'DRAG' | 'SWIPE';  // 操作类型
  timeout: number;                  // 倒计时时间（ms）
  successCallback: () => void;      // 成功回调
}

禁止使用any类型，严格校验操作响应参数类型
（二）前端开发
Phaser.js 场景
QTE 组件生命周期遵循preload() -> create() -> update()流程
操作图标注册事件统一使用setInteractive()+on('pointerdown', ...)
性能优化：非活跃 QTE 元素调用setVisible(false)+setInteractive(false)
Three.js 渲染
3D 进度条模型使用BufferGeometry优化顶点数据
材质统一通过AssetLoader预加载，避免运行时阻塞
（三）后端接口
RESTful 规范
QTE 关卡数据接口：GET /api/qte/levels/:difficulty（difficulty=easy/medium/hard）
操作记录提交：POST /api/qte/records，请求体包含userId, qteId, score, responseTime
错误处理：统一返回格式{ code: 200/400/500, message: string, data?: any }
数据库建模
MongoDB 文档必须包含createdAt和updatedAt时间戳
MySQL 表使用蛇形命名（qte_level_configs），外键添加ON DELETE CASCADE约束
三、分支管理策略
分支类型
用途说明
合并规则
示例命名
main
生产环境分支（仅通过 CI/CD 部署）
仅允许从dev分支合并，需通过测试
-
dev
开发主分支（集成所有稳定功能）
每日从feature分支合并，定期拉取上游
-
feature/*
功能开发分支（单个 QTE 模块）
基于dev创建，合并前需通过 Code Review
feature/qte-button-anim
hotfix/*
紧急修复分支（生产环境 BUG）
直接合并至main+dev，附带 Jira 单号
hotfix/QTE-101-tooltip

提交规范（Conventional Commits）
<commit-type>(<jira-issue-id>): <description>

<commit-type> 取值：
feat: 新增QTE功能（如feat(QTE-102): 添加滑动手势图标）
fix: 修复QTE逻辑（如fix(QTE-103): 修正倒计时进度条计算错误）
refactor: 重构QTE代码（如refactor(QTE-104): 优化操作反馈动画性能）
docs: 更新文档（如docs: 完善QTE场景设计规范）

四、环境配置与依赖管理
（一）开发环境
前端启动
cd client
npm run dev  # Vite启动，自动加载QTE场景配置

后端启动
cd server
npm run start  # 本地运行Express服务，连接MySQL/MongoDB开发库
npm run debug  # 开启断点调试（需配置VSCode launch.json）

（二）依赖管理
版本锁定
核心游戏引擎（Phaser.js/Three.js）使用精确版本号（如phaser@4.22.1）
工具类库（GSAP/Lottie-web）允许补丁更新（^3.12.2）
安全检查
每周运行npm audit fix --force扫描依赖漏洞
禁止引入未经验证的第三方 QTE 交互库
五、测试与部署规范
（一）测试流程
单元测试
npm run test:unit  # 运行前端单元测试
npm run test:api   # 运行后端接口测试（使用Supertest）

QTE 交互逻辑使用 Jest 测试（如qte-interaction.test.ts）
覆盖率要求：核心 QTE 模块代码覆盖率≥90%
集成测试
多浏览器测试：通过 BrowserStack 验证 Chrome/Firefox/Safari 兼容性
移动端适配：使用 BrowserStack Mobile 测试 iOS 15+/Android 12 + 触控响应
（二）部署流程
前端构建
cd client
npm run build  # 生成生产包（自动压缩WebGL资源/优化Lottie动画）

后端部署
使用 PM2 管理进程：
pm2 start app.js --name "qte-server" --max-memory-restart 2G
pm2 save && pm2 startup  # 配置开机自启动

Nginx 配置（示例）：
server {
    listen 80;
    server_name qte-game.com;
    location / {
        root /var/www/qte-client/;  # 前端静态资源目录
        try_files $uri $uri/ /index.html;
    }
    location /api/ {
        proxy_pass http://localhost:3000;  # 反向代理至Node.js服务
    }
}

六、协作与文档规范
（一）设计协同
Figma 使用
QTE 界面设计需标注交互热区坐标（如 “点击图标热区：X=100-200, Y=300-400”）
版本迭代：每次修改 QTE 图标需创建 Figma 分支（如qte-icons-v2.0）
模型交付
Blender 导出 3D 图标需包含：
GLTF 格式模型（含 PBR 材质）
尺寸标注（如 “齿轮进度条直径：120px”）
Three.js 加载示例代码
（二）文档维护
必写文档
《QTE 界面交互说明》：包含操作流程图、状态机转换表
《QTE 性能优化报告》：记录 WebGL 渲染帧率、内存占用峰值
《QTE 错误码对照表》：如4001=操作超时, 4002=无效按键组合
更新机制
代码修改涉及 QTE 逻辑变更时，必须同步更新对应文档
文档版本与代码版本对齐（如v1.0.0对应QTE模块初版）
七、安全与合规
数据安全
用户 QTE 操作记录加密存储（MySQL 字段使用 AES 加密）
敏感接口（如成绩提交）必须通过 JWT 认证（有效期 15 分钟）
法规合规
物业管理培训场景 QTE 需关联《物业管理条例》条款，确保操作流程合法
隐私保护：遵循 GDPR，用户数据删除接口DELETE /api/users/:id/qte-records
八、版本控制说明
语义化版本（SemVer）
vMAJOR.MINOR.PATCH
MAJOR：QTE核心机制变更（如从按键操作改为手势操作）
MINOR：新增QTE场景类型（如增加消防巡查QTE）
PATCH：修复QTE显示BUG（如倒计时数字错位）

发布流程开发完成→自测通过→提交 MR→Code Review→集成测试→生产环境部署（每次发布需更新CHANGELOG.md，记录 QTE 相关变更）
