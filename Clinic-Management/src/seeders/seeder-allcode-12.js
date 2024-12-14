'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
    
  
      return queryInterface.bulkInsert('allcodes', [{
        key: 'T5',
        type: 'Time',
        valueEn: '13:00 - 14:00',
        valueVi: '13:00 - 14:00', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Xóa dữ liệu đã thêm trong up
      await queryInterface.bulkDelete('allcodes', { key: 'T5' }, {});
    }
  };
  