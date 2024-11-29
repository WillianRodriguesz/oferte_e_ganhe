// Função para validar o token do localStorage
async function validarToken() {
    try {
        // Recupera o token do localStorage
        const token = localStorage.getItem('auth_token');

        if (!token) {
            alert('Sessão inválida. Faça login novamente.');
            window.location.href = '/frontEnd/src/pages/login/login.html'; // Redireciona para login
            return;
        }

        // Faz a requisição para validar o token, passando-o no cabeçalho Authorization
        const response = await fetch('http://localhost:3000/validaToken', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Envia o token no cabeçalho
            },
        });

        if (!response.ok) {
            const erro = await response.json();
            console.error('Erro na validação:', erro);
            alert('Sessão inválida. Faça login novamente.');
            window.location.href = '/frontEnd/src/pages/login/login.html'; // Redireciona para login
            return;
        }

        console.log('Autenticação válida. Página carregada.');
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        alert('Erro ao validar sua sessão. Faça login novamente.');
        window.location.href = '/frontEnd/src/pages/login/login.html'; // Redireciona para login
    }
}

validarToken();
