const express = require('express');
const connectDB = require('./src/config/database.js');
const cors = require('cors');
const path = require('path');
const db = require('./src/models/index.js');
const webRoutes = require('./src/routes/web.js');

// Sử dụng biến môi trường từ file .env
require('dotenv').config();

const app = express();

// Kết nối cơ sở dữ liệu
connectDB();

// Cấu hình middleware cho CORS 
app.use(cors({
    origin: 'http://localhost:5173', // Địa chỉ của frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Cho phép gửi cookie
}));

// Cấu hình middleware để xử lý JSON và form data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Sử dụng định tuyến từ file web.js
app.use('/', webRoutes);

// Thiết lập server
const PORT = process.env.PORT || 5000;
const HOSTNAME = process.env.HOSTNAME || 'localhost';

app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on hostname ${HOSTNAME}:${PORT}`);
});
