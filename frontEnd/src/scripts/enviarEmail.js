function setupFormHandler() {
    const form = document.querySelector('.form');

    // Verifica se o formulário existe
    if (!form) {
        console.error('Formulário não encontrado no DOM');
        return;
    }

    // Evento de envio do formulário
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        if (!emailInput) {
            console.error('Campo de e-mail não encontrado');
            return;
        }

        const email = emailInput.value.trim();

        if (!email) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo obrigatório',
                text: 'Por favor, digite seu e-mail para continuar.',
            });
            return;
        }

        try {
            const response = await fetch('/login/enviar-link-redefinicao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'E-mail enviado!',
                    text: 'Verifique sua caixa de entrada.',
                });
                emailInput.value = ''; // Limpa o campo de e-mail
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: result.erro || 'Não foi possível enviar o e-mail.',
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
setupFormHandler();
