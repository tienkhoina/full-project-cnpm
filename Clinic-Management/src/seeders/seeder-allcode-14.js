'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
    
  
      return queryInterface.bulkInsert('allcodes', [{
        key: 'T7',
        type: 'Time',
        valueEn: '15:00 - 16:00',
        valueVi: '15:00 - 16:00', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Xóa dữ liệu đã thêm trong up
      await queryInterface.bulkDelete('allcodes', { key: 'T7' }, {});
    }
  };
  