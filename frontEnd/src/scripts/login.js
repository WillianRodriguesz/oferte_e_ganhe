
import { enviarLogin } from '../services/loginService.js';
// Pega os elementos do formulário
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

// Função para lidar com o clique no botão de login
async function validacaoLogin(e) {
    e.preventDefault(); 
    const email = emailInput.value;
    const senha = senhaInput.value;

    if (email && senha) {
        // Chama a função de enviar o login para a API
        const result = await enviarLogin(email, senha);

        if (result.success) {
            const token = localStorage.getItem('auth_token');
            console.log('Token recuperado no redirecionamento:', token);
            
            console.log('Login bem-sucedido:', result.data);
            window.location.assign ('/frontEnd/src/pages/index.html');
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