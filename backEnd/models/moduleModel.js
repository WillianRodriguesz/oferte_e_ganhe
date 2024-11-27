const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Modulos = sequelize.define('Modulos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  nome: DataTypes.STRING(100),
}, {
  tableName: 'modulos',
  timestamps: false,
});

module.exports = Modulos;
