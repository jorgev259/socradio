
const Sequelize = require('sequelize')
const { DataTypes } = require('sequelize')

const cls = require('cls-hooked')
const namespace = cls.createNamespace('trans-namespace')

Sequelize.useCLS(namespace)

const sequelizeConfig = require('./sequelize.json')
const sequelize = new Sequelize(sequelizeConfig)

sequelize.define('album', {
  title: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  type: DataTypes.STRING
})

sequelize.define('song', {
  path: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  title: DataTypes.STRING,
  artist: DataTypes.STRING,
  composer: DataTypes.STRING,
  track: DataTypes.INTEGER,
  disk: DataTypes.INTEGER
})

sequelize.models.song.belongsTo(sequelize.models.album)

module.exports = sequelize
