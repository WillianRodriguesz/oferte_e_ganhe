// Função para validar o token no cookie
async function validarToken() {
    try {
        // Faz a requisição para validar o token
        const response = await fetch('http://localhost:3000/validaToken', {
            method: 'GET',
            credentials: 'include', // Inclui cookies na requisição
        });

        if (!response.ok) {
            const erro = await response.json();
            console.error('Erro na validação:', erro);
            alert('Sessão inválida. Faça login novamente.');
            window.location.href = '../../pages/login/login.html'; // Redireciona para login
            return;
        }

        console.log('Autenticação válida. Página carregada.');
    } catch (error) {
        console.error('Erro ao validar o token:', error);
        alert('Erro ao validar sua sessão. Faça login novamente.');
        window.location.href = '../../pages/login/login.html'; // Redireciona para login
    }
}

validarToken();
