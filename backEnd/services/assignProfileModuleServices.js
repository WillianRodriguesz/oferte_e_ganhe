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

// Função para excluir todas as associações de perfil a módulos com base no perfil_id
async function excluirTodasAssociacoesPorPerfil(perfilId) {
    try {
        // Busca todas as associações relacionadas ao perfil
        const associacoes = await PerfilModulos.findAll({
            where: { perfil_id: perfilId }
        });

        if (associacoes.length === 0) {
            console.log(`Nenhuma associação encontrada para o perfil com ID ${perfilId}.`);
            return null;
        }

        // Excluir todas as associações encontradas
        for (const associacao of associacoes) {
            await associacao.destroy();
        }

        console.log(`Todas as associações do perfil com ID ${perfilId} foram excluídas com sucesso.`);
        return associacoes;
    } catch (erro) {
        console.error('Erro ao excluir associações de perfil a módulos:', erro);
        throw erro;
    }
}

async function buscaModulosPorPerfilId(perfilId) {
    try {
        const associacoes = await PerfilModulos.findAll({
            where: { perfil_id: perfilId },
            attributes: ['modulo_id'] 
        });

        const modulosIds = associacoes.map(associacao => associacao.modulo_id);

        return modulosIds;
    } catch (erro) {
        console.error('Erro ao buscar módulos associados ao perfil:', erro);
        throw erro;
    }
}

module.exports = {
    associarPerfilModulo,
    buscaTodosPerfisModulos,
    buscaPerfilModuloId,
    excluirTodasAssociacoesPorPerfil,
    buscaModulosPorPerfilId
};
