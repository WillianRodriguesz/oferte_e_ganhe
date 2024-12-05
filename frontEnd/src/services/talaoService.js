export async function enviarTalao(talaoData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/talao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Adiciona o token aqui
            },
            body: JSON.stringify(talaoData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            let message = 'Erro ao enviar o talão.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao enviar o talão:', error);
        return { success: false, message: error.message || 'Erro ao tentar enviar o talão. Tente novamente.' };
    }
}

export async function buscarTaloes() {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/talao', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, 
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; // Retorna os dados dos talões
        } else {
            let message = 'Erro ao buscar os talões.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao buscar os talões:', error);
        return { success: false, message: error.message || 'Erro ao tentar buscar os talões. Tente novamente.' };
    }
}

export async function excluirTalao(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/talao/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: 'Talão excluído com sucesso.' };
        } else {
            let message = 'Erro ao excluir o talão.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao excluir o talão com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar excluir o talão. Tente novamente.' };
    }
}

export async function buscarTalaoPorId(id) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/talao/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; // Retorna os dados do talão
        } else {
            let message = 'Erro ao buscar o talão.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao buscar o talão com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar buscar o talão. Tente novamente.' };
    }
}

export async function atualizarTalao(id, talaoData) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/talao/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(talaoData),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            let message = 'Erro ao atualizar o talão.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao atualizar o talão:', error);
        return { success: false, message: error.message || 'Erro ao tentar atualizar o talão. Tente novamente.' };
    }
}

export async function atualizarStatusTalao(id, status) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/talao/status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ status }), // Apenas o status será enviado
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; // Retorna o talão atualizado
        } else {
            let message = 'Erro ao atualizar o status do talão.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao atualizar o status do talão com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar atualizar o status do talão. Tente novamente.' };
    }
}

export async function obterTalaoPorNumeroRemessa(numeroRemessa) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/talao/numeroRemessa/${numeroRemessa}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; // Retorna os dados do talão
        } else {
            let message = 'Erro ao buscar o talão pelo número da remessa.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao buscar o talão pelo número da remessa ${numeroRemessa}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar buscar o talão. Tente novamente.' };
    }
}

export async function editarRecebimentoTalao(id, dataRecebimento, status) {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch(`http://localhost:3000/talao/editarRecebimento/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                data_recebimento: dataRecebimento,
                status: status,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; 
        } else {
            let message = 'Erro ao editar o recebimento do talão.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message };
        }
    } catch (error) {
        console.error(`Erro ao editar o recebimento do talão com ID ${id}:`, error);
        return { success: false, message: error.message || 'Erro ao tentar editar o recebimento do talão. Tente novamente.' };
    }
}



