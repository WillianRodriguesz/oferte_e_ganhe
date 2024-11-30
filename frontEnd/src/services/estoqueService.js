export async function cadastrarEstoque(estoqueData) {
    const token = localStorage.getItem('auth_token');
    
    const response = await fetch('http://localhost:3000/estoques', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Envia o token no cabeçalho
        },
        body: JSON.stringify(estoqueData),
    });

    const data = await response.json();

    if (response.ok) {
        return data.estoqueId;  
    } else {
        throw new Error(data.message || 'Erro ao cadastrar o estoque.');
    }
}
