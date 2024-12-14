'use strict';



module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('specialties', [{
        name: 'General physician',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      await queryInterface.bulkInsert('specialties', [{
        name: 'Gynecologist',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      await queryInterface.bulkInsert('specialties', [{
        name: 'Dermatologist',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      await queryInterface.bulkInsert('specialties', [{
        name: 'Pediatricians',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      await queryInterface.bulkInsert('specialties', [{
        name: 'Neurologist',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
      await queryInterface.bulkInsert('specialties', [{
        name: 'Gastroenterologist',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('specialties',{name: 'Gastroenterologist'}, {});
  }
};
