const { Pool } = require('pg');

// Configuração do pool de conexão
const pool = new Pool({
    user: 'postgres',            // Nome de usuário do PostgreSQL
    host: 'localhost',            // Host do banco de dados
    database: 'oferte_ganhe',        // Nome do banco de dados
    password: 'postgres',             // Senha do banco de dados
    port: 5432,                   // Porta padrão do PostgreSQL
});

// Testa a conexão ao banco de dados
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }
    console.log('Conexão estabelecida com sucesso ao banco de dados!');
    release();  // Libera o cliente após o teste de conexão
});

module.exports = pool;