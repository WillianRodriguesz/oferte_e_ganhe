const path = require('path');
const { 
    gerarRelatorioUsuario,
    gerarRelatorioEstoque,
    gerarRelatorioPerfis,
    gerarRelatorioRecebimento,
    gerarRelatorioTalao
} = require('../services/reportingService');

const DIRETORIO_CSV = path.join(__dirname, '../../reports'); 

// exportar e enviar o CSV de usuários
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
        console.error('Erro ao exportar CSV de usuários:', error);
        return res.status(500).json({ message: 'Erro ao exportar CSV de usuários', error: error.message });
    }
};

// exportar e enviar o CSV de estoque
const exportarRelatorioEstoque = async (req, res) => {
    try {
        const csvFilePath = await gerarRelatorioEstoque();

        res.download(csvFilePath, 'estoque.csv', (erro) => {
            if (erro) {
                console.error('Erro ao enviar o arquivo para download:', erro);
                return res.status(500).json({ message: 'Erro ao baixar o arquivo', error: erro.message });
            }
        });
    } catch (error) {
        console.error('Erro ao exportar CSV de estoque:', error);
        return res.status(500).json({ message: 'Erro ao exportar CSV de estoque', error: error.message });
    }
};

// enviar o CSV de perfis
const exportarRelatorioPerfis = async (req, res) => {
    try {
        const csvFilePath = await gerarRelatorioPerfis();

        res.download(csvFilePath, 'perfil.csv', (erro) => {
            if (erro) {
                console.error('Erro ao enviar o arquivo para download:', erro);
                return res.status(500).json({ message: 'Erro ao baixar o arquivo', error: erro.message });
            }
        });
    } catch (error) {
        console.error('Erro ao exportar CSV de perfis:', error);
        return res.status(500).json({ message: 'Erro ao exportar CSV de perfis', error: error.message });
    }
};

//exportar e enviar o CSV de recebimentos
const exportarRelatorioRecebimento = async (req, res) => {
    try {
        const csvFilePath = await gerarRelatorioRecebimento();

        res.download(csvFilePath, 'recebimento.csv', (erro) => {
            if (erro) {
                console.error('Erro ao enviar o arquivo para download:', erro);
                return res.status(500).json({ message: 'Erro ao baixar o arquivo', error: erro.message });
            }
        });
    } catch (error) {
        console.error('Erro ao exportar CSV de recebimentos:', error);
        return res.status(500).json({ message: 'Erro ao exportar CSV de recebimentos', error: error.message });
    }
};

//exportar e enviar o CSV de talões
const exportarRelatorioTalao = async (req, res) => {
    try {
        const csvFilePath = await gerarRelatorioTalao();

        res.download(csvFilePath, 'talao.csv', (erro) => {
            if (erro) {
                console.error('Erro ao enviar o arquivo para download:', erro);
                return res.status(500).json({ message: 'Erro ao baixar o arquivo', error: erro.message });
            }
        });
    } catch (error) {
        console.error('Erro ao exportar CSV de talões:', error);
        return res.status(500).json({ message: 'Erro ao exportar CSV de talões', error: error.message });
    }
};

module.exports = {
    exportarRelatorioUsuarios,
    exportarRelatorioEstoque,
    exportarRelatorioPerfis,
    exportarRelatorioRecebimento,
    exportarRelatorioTalao
};
