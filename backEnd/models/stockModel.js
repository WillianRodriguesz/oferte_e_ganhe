const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Configuração do banco

const Estoque = sequelize.define('Estoque', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  qtd_atual: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  qtd_minima: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  qtd_maxima: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(55),
    allowNull: true,
  },
}, {
  tableName: 'estoque',
  timestamps: false,
});

module.exports = Estoque;
