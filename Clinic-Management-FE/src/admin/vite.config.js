import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/admin/',  // Cấu hình base path cho ứng dụng admin
  build: {
    outDir: '../../dist/admin', // Đảm bảo output build vào thư mục chính dưới /dist/admin
  },
});
