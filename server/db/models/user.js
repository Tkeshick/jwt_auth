'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Token }) {
      User.hasOne(Token, { foreignKey: 'userId' });
    }
  };
  User.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    isActivated: {
      defaultValue: false,
      type: DataTypes.BOOLEAN
    },
    activationLink: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};


