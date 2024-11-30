export async function cadastrarLogradouro(logradouroData) {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch('http://localhost:3000/endereco', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho
        },
        body: JSON.stringify(logradouroData),
    });

    const data = await response.json();

    if (response.ok) {
        return data.enderecoId;  
    } else {
        throw new Error(data.mensagem || 'Erro ao cadastrar o endereco.');
    }
}
