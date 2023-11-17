'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (admin, options) => {
        if (admin.role === undefined || admin.role === null) {
          admin.role = 1; 
        }
      }
    },
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};