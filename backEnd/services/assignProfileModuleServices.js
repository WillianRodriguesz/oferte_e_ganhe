const PerfilModulos = require('../models/assignProfileModuleModel');
const Perfil = require('../models/profileModel');
const Modulos = require('../models/moduleModel');

// Função para associar um perfil a um módulo
async function associarPerfilModulo(perfil_id, modulo_id) {
    try {
        const associacao = await PerfilModulos.create({ perfil_id, modulo_id });
        return associacao;
    } catch (erro) {
        console.error('Erro ao associar perfil ao módulo:', erro);
        throw erro;
    }
}

// Função para obter todas as associações de perfis a módulos
async function buscaTodosPerfisModulos() {
    try {
        const associacoes = await PerfilModulos.findAll({
            include: [
                { model: Perfil, attributes: ['funcao'] }, 
                { model: Modulos, attributes: ['nome'] } 
            ]
        });
        return associacoes;
    } catch (erro) {
        console.error('Erro ao obter associações de perfis a módulos:', erro);
        throw erro;
    }
}

// Função para obter uma associação de perfil a módulo por ID
async function buscaPerfilModuloId(id) {
    try {
        const associacao = await PerfilModulos.findOne({
            where: { id },
            include: [
                { model: Perfil, attributes: ['funcao'] },
                { model: Modulos, attributes: ['nome'] }
            ]
        });
        return associacao;
    } catch (erro) {
        console.error('Erro ao obter associação de perfil a módulo por ID:', erro);
        throw erro;
    }
}

// Função para excluir uma associação de perfil a módulo
async function excluirPerfilModulo(id) {
    try {
        const associacao = await PerfilModulos.findOne({
            where: { id }
        });

        if (!associacao) return null;

        await associacao.destroy();
        return associacao;
    } catch (erro) {
        console.error('Erro ao excluir associação de perfil a módulo:', erro);
        throw erro;
    }
}

module.exports = {
    associarPerfilModulo,
    buscaTodosPerfisModulos,
    buscaPerfilModuloId,
    excluirPerfilModulo
};
