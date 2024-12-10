function setupRedefinirSenhaHandler() {
    const form = document.querySelector('.form');

    // Verifica se o formulário foi encontrado
    if (!form) {
        console.error('Formulário não encontrado no DOM');
        return;
    }

    // Seleciona os campos de senha no formulário
    const senhaInput = form.querySelector('input[type="password"]:first-of-type');
    const confirmarSenhaInput = form.querySelector('input[type="password"]:last-of-type');

    // Verifica se os campos existem
    if (!senhaInput || !confirmarSenhaInput) {
        console.error('Campos de senha não encontrados');
        return;
    }

    // Evento de envio do formulário
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Obtem os valores das senhas
        const senha = senhaInput.value.trim();
        const confirmarSenha = confirmarSenhaInput.value.trim();

        // Captura o token da URL
        const token = new URLSearchParams(window.location.search).get('token');

        // Verifica se o token foi encontrado na URL
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Token inválido',
                text: 'O token de redefinição não foi encontrado.',
            });
            return;
        }

        // Verifica se as senhas digitadas são iguais
        if (senha !== confirmarSenha) {
            Swal.fire({
                icon: 'warning',
                title: 'Senhas não correspondem',
                text: 'As senhas digitadas não coincidem.',
            });
            return;
        }

        try {
            // Envia a requisição para o backend
            const response = await fetch('/login/redefinir-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, novaSenha: senha }),
            });

            // Converte a resposta para JSON
            const result = await response.json();

            // Verifica se a resposta foi bem-sucedida
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

// Chama a função diretamente
setupRedefinirSenhaHandler();
