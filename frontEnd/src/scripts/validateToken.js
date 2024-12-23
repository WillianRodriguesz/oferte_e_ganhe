// Função para validar o token do localStorage
async function validarToken() {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            alert('Sessão inválida. Faça login novamente.');
            window.location.href = '/login'; 
            return;
        }

        const response = await fetch('http://localhost:3000/validaToken', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, 
            },
        });

        if (!response.ok) {
            const erro = await response.json();
            console.error('Erro na validação:', erro);
            alert('Sessão inválida. Faça login novamente.');
           // window.location.href = '/login'; // Redireciona para login
            window.location.href = '/login'
            return;
        }

        console.log('Autenticação válida. Página carregada.');
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        alert('Erro ao validar sua sessão. Faça login novamente.');
        window.location.href = '/login'; 
    }
}

validarToken();
