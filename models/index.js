'use strict';

var fs        = require('fs'); //load file system module
var path      = require('path'); //load path module
var Sequelize = require('sequelize'); //load sequelize module
var basename  = path.basename(__filename); //basename() to get last directory for path filename
const db      = {};
var CONFIG    = require('../config/config'); //load config.js 

/** setting up connection use sequelize */
const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: CONFIG.db_dialect,
    port: CONFIG.db_port,
    operatorsAliases: false
})

/** read file in directory models */
fs.readdirSync(__dirname)
  .filter((file) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) == '.js')
  })
  .forEach((file) => {
      var model = sequelize['import'](path.join(__dirname, file)); //import sequelize config to each file in models folder
      db[model.name] = model
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  module.exports = db