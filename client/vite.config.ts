import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react'; // Example if using React, adjust as needed for Phaser/Three.js

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()], // Add plugins as necessary, e.g., for Phaser, Three.js specific handling
  server: {
    port: 3001, // Or any port you prefer for client development
  },
  build: {
    // Optimizations for WebGL, resource loading, etc. will go here
    // For example, configuring assetsInclude or rollupOptions
    // As per project_rules.md: "WebGL优化/资源加载"
  },
  // resolve: {
  //   alias: {
  //     '@': '/src', // Example alias
  //   },
  // },
  // Further WebGL/asset optimization may involve specific Vite plugins or rollup configurations
});
