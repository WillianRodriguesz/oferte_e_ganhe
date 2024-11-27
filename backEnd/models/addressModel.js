const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Certifique-se de que `sequelize` está configurado corretamente

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    cep: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    numero: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
}, {
    tableName: 'logradouro',
    timestamps: false,
});

module.exports = Address;
