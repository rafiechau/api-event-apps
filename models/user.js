'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, { foreignKey: 'userId', as: 'profile' });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        if (user.role === undefined || user.role === null) {
          user.role = 2; 
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};