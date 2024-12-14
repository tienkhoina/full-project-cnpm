'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
    
  
      return queryInterface.bulkInsert('allcodes', [{
        key: 'R0',
        type: 'Role',
        valueEn: 'admin',
        valueVi: 'Quản trị viên', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Xóa dữ liệu đã thêm trong up
      await queryInterface.bulkDelete('allcodes', { key: 'R0' }, {});
    }
  };
  