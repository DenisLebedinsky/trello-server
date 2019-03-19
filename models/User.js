const Sequelize = require('sequelize')

const sequelize = require('./../connectionDB/index')

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  slat: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})

module.exports = User
