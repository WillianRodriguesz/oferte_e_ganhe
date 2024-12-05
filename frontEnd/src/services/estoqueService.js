export async function cadastrarEstoque(estoqueData) {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch('http://localhost:3000/estoques', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho
        },
        body: JSON.stringify(estoqueData),
    });

    const data = await response.json();

    if (response.ok) {
        return data.estoqueId;  
    } else {
        throw new Error(data.message || 'Erro ao cadastrar o estoque.');
    }
}

export async function atualizarEstoque(id, estoqueData) {
    const token = localStorage.getItem('auth_token'); // Recupera o token de autenticação

    try {
        const response = await fetch(`http://localhost:3000/estoques/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Adiciona o token de autenticação no cabeçalho
            },
            body: JSON.stringify(estoqueData),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao atualizar estoque.');
        }

        return result.id; // Retorna o ID atualizado do estoque
    } catch (error) {
        throw new Error('Erro ao atualizar estoque: ' + error.message);
    }
}

export async function excluirEstoque(idEstoque) {
    const token = localStorage.getItem('auth_token'); // Recupera o token de autenticação
    
    try {
        // Realiza a requisição DELETE para excluir o estoque com o ID fornecido
        const response = await fetch(`http://localhost:3000/estoques/${idEstoque}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,  // Envia o token de autenticação no cabeçalho
            },
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            return { success: true };  // Retorna um objeto indicando sucesso na exclusão
        } else {
            const data = await response.json();
            throw new Error(data.message || 'Erro ao excluir estoque.'); // Lança erro se a resposta não for ok
        }
    } catch (error) {
        // Trata qualquer erro ocorrido durante a exclusão
        return { success: false, message: error.message };
    }
}

export async function buscarEstoquePorId(idEstoque) {
    const token = localStorage.getItem('auth_token'); // Recupera o token de autenticação

    try {
        const response = await fetch(`http://localhost:3000/estoques/${idEstoque}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Envia o token no cabeçalho
            },
        });

        // Analisa a resposta do servidor
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar o estoque.');
        }

        return data; // Retorna os dados do estoque
    } catch (error) {
        // Lida com erros na requisição
        console.error('Erro ao buscar o estoque:', error.message);
        throw new Error('Erro ao buscar o estoque: ' + error.message);
    }
}
