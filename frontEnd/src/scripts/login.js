
import { enviarLogin } from '../services/loginService.js';
// Pega os elementos do formulário
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

// Função para lidar com o clique no botão de login
async function validacaoLogin(e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)
    const email = emailInput.value;
    const senha = senhaInput.value;

    if (email && senha) {
        // Chama a função de enviar o login para a API
        const result = await enviarLogin(email, senha);

        if (result.success) {
            console.log('Login bem-sucedido:', result.data);
            window.location.href = '../../pages/login/home.html';
        } else {
            console.error('Erro no login:', result.message);
            alert(result.message || 'E-mail ou senha incorretos.');
        }
    } else {
        alert('Preencha todos os campos.');
    }
}

// Adiciona o evento de clique no botão de login
btnLogin.addEventListener('click', validacaoLogin);