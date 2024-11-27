const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Loja = require('./storeModel');

const Talao = sequelize.define('Talao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  numero_remessa: DataTypes.INTEGER,
  qtd_talao: DataTypes.INTEGER,
  destinatario: {
    type: DataTypes.INTEGER,
    references: {
      model: Loja,
      key: 'cod_unidade',
    },
  },
  remetente: {
    type: DataTypes.INTEGER,
    references: {
      model: Loja,
      key: 'cod_unidade',
    },
  },
  status: DataTypes.STRING(55),
}, {
  tableName: 'talao',
  timestamps: false,
});

// Associações
Talao.belongsTo(Loja, { as: 'Destinatario', foreignKey: 'destinatario' });
Talao.belongsTo(Loja, { as: 'Remetente', foreignKey: 'remetente' });

module.exports = Talao;
