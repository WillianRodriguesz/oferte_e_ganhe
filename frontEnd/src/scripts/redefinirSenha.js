function setupRedefinirSenhaHandler() {
    const form = document.querySelector('.form');

    // Verifica se o formulário foi encontrado
    if (!form) {
        console.error('Formulário não encontrado no DOM');
        return;
    }

    const senhaInput = form.querySelector('input[type="password"]:first-of-type');
    const confirmarSenhaInput = form.querySelector('input[type="password"]:last-of-type');

    if (!senhaInput || !confirmarSenhaInput) {
        console.error('Campos de senha não encontrados');
        return;
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const senha = senhaInput.value.trim();
        const confirmarSenha = confirmarSenhaInput.value.trim();

        const token = new URLSearchParams(window.location.search).get('token');

        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Token inválido',
                text: 'O token de redefinição não foi encontrado.',
            });
            return;
        }

        if (senha !== confirmarSenha) {
            Swal.fire({
                icon: 'warning',
                title: 'Senhas não correspondem',
                text: 'As senhas digitadas não coincidem.',
            });
            return;
        }

        try {
            const response = await fetch('/login/redefinir-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, novaSenha: senha }),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Senha redefinida com sucesso!',
                    text: result.mensagem,
                }).then(() => {
                    setTimeout(() => {
                        window.location.assign ('/login');
                    }, 1000);
                });
                senhaInput.value = '';  
                confirmarSenhaInput.value = '';  
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: result.erro || 'Não foi possível redefinir a senha.',
                });
            }
        } catch (error) {
            console.error('Erro ao enviar a requisição:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro interno',
                text: 'Ocorreu um erro interno, tente novamente mais tarde.',
            });
        }
    });
}

setupRedefinirSenhaHandler();
