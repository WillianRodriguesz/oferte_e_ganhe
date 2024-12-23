export async function listarPerfis() {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/perfis', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao buscar os perfis.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao buscar os perfis:', error);
        return { success: false, message: error.message || 'Erro ao tentar buscar os perfis. Tente novamente.' };
    }
}

export async function buscarPerfilPorId(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/perfis/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao buscar o perfil.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao buscar o perfil com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar buscar o perfil. Tente novamente.' };
    }
}

export async function cadastrarPerfil(perfilData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/perfis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(perfilData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao cadastrar o perfil.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao cadastrar o perfil:', error);
        return { success: false, message: error.message || 'Erro ao tentar cadastrar o perfil. Tente novamente.' };
    }
}

export async function atualizarPerfil(id, perfilData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/perfis/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(perfilData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao atualizar o perfil.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao atualizar o perfil com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar atualizar o perfil. Tente novamente.' };
    }
}

export async function excluirPerfil(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/perfis/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: 'Perfil excluído com sucesso.' };
        } else {
            let message = 'Erro ao excluir o perfil.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao excluir o perfil com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar excluir o perfil. Tente novamente.' };
    }
}

export async function editarFuncaoPerfil(id, dadosPerfil) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/perfis/editar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(dadosPerfil),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao editar a função do perfil.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao editar a função do perfil com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar editar a função do perfil. Tente novamente.' };
    }
}

