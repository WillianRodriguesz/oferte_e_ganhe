export async function enviarLogin(email, senha) {
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
            // Sucesso no login
            return { success: true, data };
        } else {
            // Se o retorno da API for um objeto, extraímos a mensagem do erro
            let message = 'E-mail ou senha incorretos.';

            // Verifica se o erro contém uma mensagem personalizada da API
            if (data && data.message) {
                message = data.message;
            }

            return { success: false, message };
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return { success: false, message: 'Erro ao tentar fazer login. Tente novamente.' };
    }
}
