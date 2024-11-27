const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Estoque = require('./stockModel');
const Logradouro = require('./addressModel');

const Loja = sequelize.define('Loja', {
  cod_unidade: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
  },
  id_estoque: {
    type: DataTypes.INTEGER,
    references: {
      model: Estoque,
      key: 'id',
    },
  },
  logradouro: {
    type: DataTypes.INTEGER,
    references: {
      model: Logradouro,
      key: 'id',
    },
  },
  matriz: DataTypes.BOOLEAN,
}, {
  tableName: 'loja',
  timestamps: false,
});

// Associações
Loja.belongsTo(Estoque, { foreignKey: 'id_estoque' });
Loja.belongsTo(Logradouro, { foreignKey: 'logradouro' });

module.exports = Loja;
