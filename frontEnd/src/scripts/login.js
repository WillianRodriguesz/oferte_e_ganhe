// Pega os elementos do formulário
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

// Função para enviar os dados de login para a API
async function enviarLogin(email, senha) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
            credentials: 'include',  // Se precisar enviar cookies
        });

        const data = await response.json();

        if (response.ok) {
            // Sucesso no login - Redirecionar ou mostrar mensagem de sucesso
            console.log('Login bem-sucedido:', data);
            // Aqui você pode redirecionar para outra página ou armazenar dados do usuário
        } else {
            // Falha no login
            console.error('Erro no login:', data);
            alert('E-mail ou senha incorretos.');
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao tentar fazer login. Tente novamente.');
    }
}

// Adiciona o evento de clique no botão de login
btnLogin.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)
    const email = emailInput.value;
    const senha = senhaInput.value;

    if (email && senha) {
        // Chama a função de enviar o login para a API
        enviarLogin(email, senha);
    } else {
        alert('Preencha todos os campos.');
    }
});