import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Đặt base cho cả ứng dụng chính và admin, nếu không có yêu cầu đặc biệt khác
  build: {
    outDir: 'dist',  // Đặt thư mục output cho ứng dụng
    rollupOptions: {
      input: {
        main: './src/main.jsx',   // Entry point của ứng dụng chính
        admin: './src/admin/src/main.jsx',  // Entry point của ứng dụng admin
      },
      output: {
        // Đảm bảo ứng dụng chính và admin được build vào các thư mục riêng biệt
        // Bạn có thể thay đổi cấu hình dưới đây nếu muốn tổ chức tài nguyên khác nhau
        dir: 'dist',  // Đặt thư mục output chung cho cả 2 ứng dụng
        manualChunks: {
          // Tách các chunk của ứng dụng chính và admin
          main: ['./src/main.jsx'],
          admin: ['./src/admin/src/main.jsx'],
        },
      },
    },
  },
});
