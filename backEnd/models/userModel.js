// models/usuario.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const Perfil = require('./profileModel'); 
const Loja = require('./storeModel'); 

const Usuario = sequelize.define('Usuario', {
    matricula: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    nome: {
        type: DataTypes.STRING(55),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(55),
        allowNull: false,
        unique: true,
    },
    senha: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    perfil: {
        type: DataTypes.INTEGER,
        references: {
            model: Perfil, 
            key: 'id',
        },
    },
    id_loja: {
        type: DataTypes.INTEGER,
        references: {
            model: Loja, 
            key: 'cod_unidade',
        },
    }
}, {
    tableName: 'usuarios',
    timestamps: false, 
});

// Relacionamentos
Usuario.belongsTo(Perfil, { foreignKey: 'perfil' });
Usuario.belongsTo(Loja, { foreignKey: 'id_loja' });

module.exports = Usuario;
