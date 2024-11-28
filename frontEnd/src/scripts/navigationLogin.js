// Redireciona para a página de solicitação de acesso
const btnSolicitarAcesso = document.getElementById('btnSolicitarAcesso');
if (btnSolicitarAcesso) {
    btnSolicitarAcesso.addEventListener('click', () => {
        window.location.href = '../../pages/login/access-request.html'; 
    });
}

// Redireciona de volta para a página de login
const btnVoltar = document.getElementById('btnVoltar');
if (btnVoltar) {
    btnVoltar.addEventListener('click', () => {
        window.location.href = '../../pages/login/login.html'; 
    });
}

const linkEsqueciSenha = document.querySelector('a[href="#esqueci-senha"]');
if (linkEsqueciSenha) {
    linkEsqueciSenha.addEventListener('click', (e) => {
        e.preventDefault(); 
        window.location.href = 'http://localhost:5500/frontEnd/src/pages/login/password-reset-request.html';
    });
}
