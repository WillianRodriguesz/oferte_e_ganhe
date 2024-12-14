const {
    inserirRegistroEnvio,
    obterTodosRegistros,
    obterRegistroPorId,
    atualizarRegistro,
    excluirRegistro
} = require('../services/sendingServices');

// cadastrar um novo registro
const criarRegistroEnvio = async (req, res) => {
    const { data_envio, data_prevista, talao, observacao } = req.body;
    try {
        const novoRegistro = await inserirRegistroEnvio(data_envio, data_prevista, talao, observacao);
        res.status(201).json({ message: 'Registro cadastrado com sucesso!', registro: novoRegistro });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao cadastrar registro', error: erro.message });
    }
};

// obter todos os registros
const listarRegistrosEnvio = async (req, res) => {
    try {
        const registros = await obterTodosRegistros();
        res.status(200).json(registros);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter registros', error: erro.message });
    }
};

// obter um registro por ID
const obterRegistroEnvio = async (req, res) => {
    const { id } = req.params;
    try {
        const registro = await obterRegistroPorId(id);
        if (!registro) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.status(200).json(registro);
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao obter registro', error: erro.message });
    }
};

// atualizar um registro pelo ID
const atualizarRegistroEnvio = async (req, res) => {
    const { id } = req.params;
    const { data_envio, data_prevista, talao, observacao } = req.body;
    try {
        const registroAtualizado = await atualizarRegistro(id, data_envio, data_prevista, talao, observacao);
        if (!registroAtualizado) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.status(200).json({ message: 'Registro atualizado com sucesso!', registro: registroAtualizado });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao atualizar registro', error: erro.message });
    }
};

// excluir um registro pelo ID
const excluirRegistroEnvio = async (req, res) => {
    const { id } = req.params;
    try {
        const registroDeletado = await excluirRegistro(id);
        if (!registroDeletado) {
            return res.status(404).json({ message: 'Registro não encontrado' });
        }
        res.status(200).json({ message: 'Registro excluído com sucesso!' });
    } catch (erro) {
        res.status(500).json({ message: 'Erro ao excluir registro', error: erro.message });
    }
};

module.exports = {
    criarRegistroEnvio,
    listarRegistrosEnvio,
    obterRegistroEnvio,
    atualizarRegistroEnvio,
    excluirRegistroEnvio,
};
