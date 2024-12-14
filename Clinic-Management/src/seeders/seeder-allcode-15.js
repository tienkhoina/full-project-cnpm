'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
    
  
      return queryInterface.bulkInsert('allcodes', [{
        key: 'T8',
        type: 'Time',
        valueEn: '16:00 - 17:00',
        valueVi: '16:00 - 17:00', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Xóa dữ liệu đã thêm trong up
      await queryInterface.bulkDelete('allcodes', { key: 'T8' }, {});
    }
  };
  