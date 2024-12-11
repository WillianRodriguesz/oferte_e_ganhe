
const path = require('path');
const {gerarRelatorioUsuario } = require('../services/reportingService');

// Caminho relativo para o diretório onde o CSV será gerado
const DIRETORIO_CSV = path.join(__dirname, '../../reports'); 

// Função do controlador para exportar e enviar o CSV
const exportarRelatorioUsuarios = async (req, res) => {
    try {
        const csvFilePath = await gerarRelatorioUsuario();

        res.download(csvFilePath, 'usuarios.csv', (erro) => {
            if (erro) {
                console.error('Erro ao enviar o arquivo para download:', erro);
                return res.status(500).json({ message: 'Erro ao baixar o arquivo', error: erro.message });
            }
        });
    } catch (error) {
        console.error('Erro ao exportar CSV:', error);
        return res.status(500).json({ message: 'Erro ao exportar CSV', error: error.message });
    }
};

module.exports = {
    exportarRelatorioUsuarios
};
