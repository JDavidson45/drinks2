const Sequelize = require('sequelize')
const db = require('../db')

const Guest = db.define('guest', {
  sessionId: {
    type: Sequelize.STRING
  }
})

module.exports = Guest
