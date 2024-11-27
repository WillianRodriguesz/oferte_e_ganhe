const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Talao = require('./talaoModel');

const LogEnvio = sequelize.define('LogEnvio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  data_envio: DataTypes.DATE,
  data_prevista: DataTypes.DATE,
  talao: {
    type: DataTypes.INTEGER,
    references: {
      model: Talao,
      key: 'id',
    },
  },
  observacao: DataTypes.STRING,
}, {
  tableName: 'logenvio',
  timestamps: false,
});

// Associações
LogEnvio.belongsTo(Talao, { foreignKey: 'talao' });

module.exports = LogEnvio;
