export async function enviarLogin(email, senha) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
            credentials: 'include', 
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('auth_token', data.token);
            sessionStorage.setItem('user_data', JSON.stringify(data.usuario));
            return { success: true, data };
        } else {
            let message = 'E-mail ou senha incorretos.';

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

export async function logout() {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
        });

        if (response.ok) {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie = 'auth_token=; max-age=0';  
        } else {
            console.error('Erro ao tentar fazer logout');
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
}
