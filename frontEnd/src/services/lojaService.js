export async function cadastrarLoja(lojaData) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        const response = await fetch('http://localhost:3000/lojas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Adiciona o token aqui
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
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        // Fazendo a requisição para a rota que retorna todas as lojas
        const response = await fetch('http://localhost:3000/lojas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Adiciona o token aqui
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
            return { success: false, message }; // Retorna a mensagem de erro se não for bem-sucedido
        }
    } catch (error) {
        console.error('Erro ao buscar as lojas:', error);
        return { success: false, message: error.message || 'Erro ao tentar buscar as lojas. Tente novamente.' };
    }
}
