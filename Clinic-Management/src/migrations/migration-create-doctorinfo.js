'use strict';

const { sequelize } = require("../models");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctorinfos', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId:{
                allowNull:false,
                type: Sequelize.INTEGER
            },
            info:{
                allowNull:false,
                type: Sequelize.TEXT
            },
            degree:{
                type: Sequelize.STRING
            },
            experience:{
                type: Sequelize.INTEGER
            },
            appointmentFee:{
                allowNull:false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }    
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctorinfos');
    }
};