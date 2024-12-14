'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
     
  
      return queryInterface.bulkInsert('allcodes', [{
        key: 'R2',
        type: 'Role',
        valueEn: 'patient',
        valueVi: 'Bệnh nhân', 
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    },
  
    down: async (queryInterface, Sequelize) => {
      // Xóa dữ liệu đã thêm trong up
      await queryInterface.bulkDelete('allcodes', { key: 'R2' }, {});
    }
  };
  