const { 
    associarPerfilModulo, 
    buscaTodosPerfisModulos, 
    buscaPerfilModuloId, 
    excluirTodasAssociacoesPorPerfil 
} = require('../services/assignProfileModuleServices');

// Obter todas as associações de perfis a módulos
const obterTodosPerfisModulos = async (req, res) => {
    try {
        const perfisModulos = await buscaTodosPerfisModulos();
        res.status(200).json(perfisModulos);
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao obter associações de perfis a módulos', erro: erro.message });
    }
};

// Obter uma associação específica de perfil a módulo por ID
const obterPerfilModuloPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const perfilModulo = await buscaPerfilModuloId(id);
        if (perfilModulo) {
            res.status(200).json(perfilModulo);
        } else {
            res.status(404).json({ mensagem: 'Associação de perfil a módulo não encontrada' });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao obter associação de perfil a módulo', erro: erro.message });
    }
};

// Criar uma nova associação de perfil a módulo
const criarAssociacaoPerfilModulo = async (req, res) => {
    const { perfil_id, modulo_id } = req.body;
    try {
        const novaAssociacao = await associarPerfilModulo(perfil_id, modulo_id);
        res.status(201).json({ mensagem: 'Associação de perfil ao módulo criada com sucesso', perfilModulo: novaAssociacao });
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao associar perfil ao módulo', erro: erro.message });
    }
};

// Excluir uma associação de perfil a módulo
const excluirAssociacaoPerfilModulo = async (req, res) => {
    const { id } = req.params;
    try {
        const perfilModuloExcluido = await excluirTodasAssociacoesPorPerfil(id);
        if (perfilModuloExcluido) {
            res.status(200).json({ mensagem: 'Associação de perfil ao módulo excluída com sucesso', perfilModulo: perfilModuloExcluido });
        } else {
            res.status(404).json({ mensagem: 'Associação de perfil a módulo não encontrada' });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: 'Erro ao excluir associação de perfil ao módulo', erro: erro.message });
    }
};

module.exports = {
    obterTodosPerfisModulos,
    obterPerfilModuloPorId,
    criarAssociacaoPerfilModulo,
    excluirAssociacaoPerfilModulo
};
