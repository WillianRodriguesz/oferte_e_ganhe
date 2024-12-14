export async function listarUsuarios() {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/usuarios', {
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
            let message = 'Erro ao buscar os usuários.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
        return { success: false, message: error.message || 'Erro ao tentar buscar os usuários. Tente novamente.' };
    }
}

export async function buscarUsuarioPorId(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
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
            let message = 'Erro ao buscar o usuário.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao buscar o usuário com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar buscar o usuário. Tente novamente.' };
    }
}

export async function cadastrarUsuario(usuarioData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(usuarioData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao cadastrar o usuário.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        return { success: false, message: error.message || 'Erro ao tentar cadastrar o usuário. Tente novamente.' };
    }
}

export async function cadastrarUsuarioLogin(usuarioData) {
    try {
        const response = await fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuarioData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao cadastrar o usuário.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao cadastrar o usuário:', error);
        return { success: false, message: error.message || 'Erro ao tentar cadastrar o usuário. Tente novamente.' };
    }
}


export async function atualizarUsuario(id, usuarioData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(usuarioData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao atualizar o usuário.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao atualizar o usuário com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar atualizar o usuário. Tente novamente.' };
    }
}

export async function excluirUsuario(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: 'Usuário excluído com sucesso.' };
        } else {
            let message = 'Erro ao excluir o usuário.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao excluir o usuário com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar excluir o usuário. Tente novamente.' };
    }
}
