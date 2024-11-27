const { Sequelize } = require('sequelize');

// Configuração do Sequelize
const sequelize = new Sequelize('oferte_ganhe', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432, 
    logging: true, // Define se as consultas SQL devem ser exibidas no console
});

// Testa a conexão ao banco de dados
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso ao banco de dados!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
})();

module.exports = sequelize;
