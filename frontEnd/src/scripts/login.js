import { enviarLogin } from '../services/loginService.js';

// Pega os elementos do formulário
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const btnLogin = document.getElementById('btnLogin');

// Variáveis para controle de tentativas e bloqueio
let tentativasErradas = 0;
let bloqueado = false;

// Função para exibir o alerta de bloqueio
function exibirAlertaBloqueio() {
    Swal.fire({
        icon: 'info',
        title: 'Aguarde...',
        text: `Você tentou logar ${tentativasErradas} vezes. Tente novamente em 4 segundos.`,
        timer: 4000,  
        timerProgressBar: true,  
        showConfirmButton: false, 
        didClose: () => {
            btnLogin.disabled = false;
            tentativasErradas = 0; 
            bloqueado = false;  
        }
    });
}

async function validacaoLogin(e) {
    e.preventDefault();
    
    if (bloqueado) {
        return;
    }

    const email = emailInput.value;
    const senha = senhaInput.value;

    if (email && senha) {
        const result = await enviarLogin(email, senha);

        if (result.success) {
            window.location.assign('/home');
        } else {
            console.error('Erro no login:', result.message);
            Swal.fire({
                icon: 'error',
                title: 'Erro no Login',
                text: result.message || 'E-mail ou senha incorretos.',
                timer: 1000,  
                timerProgressBar: true,  
                didClose: () => {
                    console.log('Alerta de erro fechado.');
                }
            });

            tentativasErradas++;

            if (tentativasErradas >= 3) {
                btnLogin.disabled = true;
                bloqueado = true;
                exibirAlertaBloqueio();  
            }
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Campos Incompletos',
            text: 'Preencha todos os campos.',
            timer: 1000,  
            timerProgressBar: true,  
            didClose: () => {
                console.log('Alerta de campos incompletos fechado.');
            }
        });
    }
}

btnLogin.addEventListener('click', validacaoLogin);
