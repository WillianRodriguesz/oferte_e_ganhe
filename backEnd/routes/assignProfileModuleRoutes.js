const express = require('express');
const router = express.Router();
const {associarPerfilModulo, buscaTodosPerfisModulos, buscaPerfilModuloId, excluirPerfilModulo} = require('../services/assignProfileModuleServices');

// Rota para obter todas as associações de perfis a módulos
router.get('/perfilmodulos', async (req, res) => {
    try {
        const perfisModulos = await buscaTodosPerfisModulos();
        res.status(200).json(perfisModulos);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter associações de perfis a módulos', error: erro.message });
    }
});

// Rota para obter uma associação de perfil a módulo específica por ID
router.get('/perfilmodulos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const perfilModulo = await buscaPerfilModuloId(id);
        if (perfilModulo) {
            res.status(200).json(perfilModulo);
        } else {
            res.status(404).json({ message: 'Associação de perfil a módulo não encontrada' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter associação de perfil a módulo', error: erro.message });
    }
});

// Rota para associar um perfil a um módulo
router.post('/perfilmodulos', async (req, res) => {
    const {perfil_id, modulo_id } = req.body;
    try {
        const novaAssociacao = await associarPerfilModulo(perfil_id, modulo_id);
        res.status(201).json({ message: 'Associação de perfil ao módulo criada com sucesso', perfilModulo: novaAssociacao });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao associar perfil ao módulo', error: erro.message });
    }
});

// Rota para excluir uma associação de perfil a módulo
router.delete('/perfilmodulos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const perfilModuloExcluido = await excluirPerfilModulo(id);
        if (perfilModuloExcluido) {
            res.status(200).json({ message: 'Associação de perfil ao módulo excluída com sucesso', perfilModulo: perfilModuloExcluido });
        } else {
            res.status(404).json({ message: 'Associação de perfil a módulo não encontrada' });
        }
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir associação de perfil ao módulo', error: erro.message });
    }
});

module.exports = router;
