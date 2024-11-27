const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Talao = require('./talaoModel');

const LogRecebimento = sequelize.define('LogRecebimento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  data_recebimento: DataTypes.DATE,
  talao: {
    type: DataTypes.INTEGER,
    references: {
      model: Talao,
      key: 'id',
    },
  },
  observacao: DataTypes.STRING,
}, {
  tableName: 'logrecebimento',
  timestamps: false,
});

// Associações
LogRecebimento.belongsTo(Talao, { foreignKey: 'talao' });

module.exports = LogRecebimento;
