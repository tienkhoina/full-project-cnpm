'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
     
  
      return queryInterface.bulkInsert('allcodes', [{
        key: 'S1',
        type: 'Status',
        valueEn: 'New',
        valueVi: 'Mới', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Xóa dữ liệu đã thêm trong up
      await queryInterface.bulkDelete('allcodes', { key: 'S1' }, {});
    }
  };
  