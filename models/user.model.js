const {DataTypes} = require('sequelize');
const db = require('../database');

const User = db.define('users', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING(5)
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
})

module.exports = User;
