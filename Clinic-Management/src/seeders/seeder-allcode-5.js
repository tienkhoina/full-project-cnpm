'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
    
  
      return queryInterface.bulkInsert('allcodes', [{
        key: 'S2',
        type: 'Status',
        valueEn: 'Confirmed',
        valueVi: 'Đã xác nhận', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Xóa dữ liệu đã thêm trong up
      await queryInterface.bulkDelete('allcodes', { key: 'S2' }, {});
    }
  };
  