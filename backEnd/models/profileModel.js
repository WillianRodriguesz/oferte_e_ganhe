const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Perfil = sequelize.define('Perfil', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  funcao: DataTypes.STRING(55),
}, {
  tableName: 'perfil',
  timestamps: false,
});

module.exports = Perfil;
