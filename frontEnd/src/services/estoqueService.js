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
    try {
        const response = await fetch(`/api/estoque/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
