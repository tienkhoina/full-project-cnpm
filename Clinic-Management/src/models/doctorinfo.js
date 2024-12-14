'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctorinfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Doctorinfo.init({
       doctorId: DataTypes.INTEGER,
       info: DataTypes.TEXT,
       degree: DataTypes.STRING,
       experience: DataTypes.INTEGER,
       appointmentFee: DataTypes.INTEGER,
       createdAt: DataTypes.DATE,
       updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Doctorinfo',
        tableName: 'doctorinfos'
    });
    return Doctorinfo;
};