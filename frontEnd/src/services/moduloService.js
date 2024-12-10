export async function obterTodosPerfisModulos() {
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch('http://localhost:3000/perfilmodulos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar perfis de módulos.');
        }

        return data; // Retorna todos os perfis de módulos
    } catch (error) {
        console.error('Erro ao buscar perfis de módulos:', error.message);
        throw new Error(error.message);
    }
}

export async function obterPerfilModuloPorId(id) {
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch(`http://localhost:3000/perfilmodulos/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar o perfil do módulo.');
        }

        return data; // Retorna os dados do perfil do módulo
    } catch (error) {
        console.error('Erro ao buscar o perfil do módulo:', error.message);
        throw new Error(error.message);
    }
}

export async function criarAssociacaoPerfilModulo(perfilModuloData) {
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch('http://localhost:3000/perfilmodulos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(perfilModuloData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao criar associação de perfil ao módulo.');
        }

        return data; // Retorna o resultado da criação
    } catch (error) {
        console.error('Erro ao criar associação de perfil ao módulo:', error.message);
        throw new Error(error.message);
    }
}

export async function excluirAssociacaoPerfilModulo(id) {
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch(`http://localhost:3000/perfilmodulos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erro ao excluir associação de perfil ao módulo.');
        }

        return { success: true }; // Indica que a exclusão foi bem-sucedida
    } catch (error) {
        console.error('Erro ao excluir associação de perfil ao módulo:', error.message);
        throw new Error(error.message);
    }
}

// Busca todos os módulos associados a um perfil específico pelo ID
export async function obterModulosPorPerfilId(id) {
    const token = localStorage.getItem('auth_token');
    
    try {
        const response = await fetch(`http://localhost:3000/perfilmodulos/associados/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar os módulos associados ao perfil.');
        }

        return data.modulosIds; // Retorna os IDs dos módulos associados
    } catch (error) {
        console.error('Erro ao buscar os módulos associados:', error.message);
        throw new Error(error.message);
    }
}

