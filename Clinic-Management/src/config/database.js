const Sequelize = require('sequelize');

// Cấu hình kết nối tới MySQL sử dụng cổng 3306
const sequelize = new Sequelize('Clinic_Management_Database', 'root','Letienkhoi1710', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3309, // Chỉ định cổng 3306
    logging: false
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;

