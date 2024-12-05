export async function cadastrarLogradouro(logradouroData) {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch('http://localhost:3000/endereco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho
        },
        body: JSON.stringify(logradouroData),
    });

    const data = await response.json();

    if (response.ok) {
        return data.enderecoId;  
    } else {
        throw new Error(data.mensagem || 'Erro ao cadastrar o endereco.');
    }
}


export async function atualizarLogradouro(id, logradouroData) {
    const token = localStorage.getItem('auth_token'); 

    if (!token) {
        throw new Error('Token de autenticação não encontrado.');
    }

    try {
        const response = await fetch(`http://localhost:3000/endereco/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(logradouroData),
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao atualizar logradouro.');
        }

        return result.id; 
    } catch (error) {
        throw new Error('Erro ao atualizar logradouro: ' + error.message);
    }
}

export async function listarLogradouroPorId(id) {
    const token = localStorage.getItem('auth_token');

    try {
        const response = await fetch(`http://localhost:3000/endereco/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao buscar o logradouro.');
        }

        return result; // Retorna o logradouro encontrado
    } catch (error) {
        throw new Error('Erro ao buscar o logradouro: ' + error.message);
    }
}

export async function excluirLogradouro(id) {
    const token = localStorage.getItem('auth_token');

    try {
        const response = await fetch(`http://localhost:3000/endereco/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao excluir o logradouro.');
        }

        return result.message || 'Logradouro excluído com sucesso.';
    } catch (error) {
        throw new Error('Erro ao excluir o logradouro: ' + error.message);
    }
}
