const express = require('express');
const path = require('path');
// const cors = require('cors'); // Uncomment if CORS is needed as per project_rules.md config

// Placeholder for database connection setup
// const connectDB = require('./config/db'); // Example if you have a db connection module
// connectDB();

const app = express();

// Init Middleware
// app.use(cors()); // Enable CORS if needed - "跨域设置" from project_rules.md
app.use(express.json({ extended: false })); // Body parser for JSON

// Define a simple root route
app.get('/', (req, res) => res.send('API Running'));

// Define Routes (placeholders, to be linked to src/routes/)
// Example: app.use('/api/qte/levels', require('./src/routes/qteLevels'));
// Example: app.use('/api/qte/records', require('./src/routes/qteRecords'));
// As per project_rules.md: "API路由（QTE关卡数据/用户记录）" in src/routes/

// Placeholder for environment configuration (e.g., port from config/)
// As per project_rules.md: "环境配置（数据库连接/跨域设置）" in config/
const PORT = process.env.PORT || 5000; // Default port

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Basic error handling (optional, can be expanded)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    code: 500,
    message: 'Something broke!',
    data: null
  });
});

module.exports = app; // For potential testing with Supertest as mentioned in project_rules.md
