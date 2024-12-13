const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize(
    process.env.DB_NAME,         
    process.env.DB_USER,         
    process.env.DB_PASSWORD,     
    {
        host: process.env.DB_HOST,       
        dialect: process.env.DB_DIALECT, 
        port: process.env.DB_PORT,       
        logging: true,                   
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

module.exports = sequelize;
