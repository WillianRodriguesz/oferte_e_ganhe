const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Perfil = require('./profileModel');
const Modulos = require('./moduleModel');

const PerfilModulos = sequelize.define('PerfilModulos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  perfil_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Perfil,
      key: 'id',
    },
  },
  modulo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Modulos,
      key: 'id',
    },
  },
}, {
  tableName: 'perfilmodulos',
  timestamps: false,
});

// Associações
PerfilModulos.belongsTo(Perfil, { foreignKey: 'perfil_id' });
PerfilModulos.belongsTo(Modulos, { foreignKey: 'modulo_id' });

module.exports = PerfilModulos;
