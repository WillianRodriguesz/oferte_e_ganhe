export async function cadastrarLoja(lojaData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/lojas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(lojaData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            let message = 'Erro ao cadastrar a loja.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao cadastrar a loja:', error);
        return { success: false, message: error.message || 'Erro ao tentar cadastrar a loja. Tente novamente.' };
    }
}

export async function buscarLojas() {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/lojas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; // Retorna os dados das lojas
        } else {
            let message = 'Erro ao buscar as lojas.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message }; 
        }
    } catch (error) {
        console.error('Erro ao buscar as lojas:', error);
        return { success: false, message: error.message || 'Erro ao tentar buscar as lojas. Tente novamente.' };
    }
}

export async function excluirLoja(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/lojas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: 'Loja excluída com sucesso.' };
        } else {
            let message = 'Erro ao excluir a loja.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao excluir a loja com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar excluir a loja. Tente novamente.' };
    }
}

export async function buscarLojaPorId(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/lojas/${id}`, {
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
            let message = 'Erro ao buscar a loja.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message }; 
        }
    } catch (error) {
        console.error(`Erro ao buscar a loja com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar buscar a loja. Tente novamente.' };
    }
}

export async function atualizarLoja(id, lojaData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/lojas/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(lojaData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            let message = 'Erro ao atualizar a loja.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao atualizar a loja:', error);
        return { success: false, message: error.message || 'Erro ao tentar atualizar a loja. Tente novamente.' };
    }
}

