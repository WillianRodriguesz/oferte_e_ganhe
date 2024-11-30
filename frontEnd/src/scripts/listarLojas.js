console.log('entrou no script');
// Função para buscar todas as lojas
async function buscarLojas() {
    try {
        const token = localStorage.getItem('auth_token');

        if (!token) {
            throw new Error('Token não encontrado. Faça login novamente.');
        }

        // Fazendo a requisição para a rota que retorna todas as lojas
        const response = await fetch('http://localhost:3000/lojas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Adiciona o token aqui
            },
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data }; // Retorna os dados das lojas
        } else {
            let message = 'Erro ao buscar as lojas.';
            if (data && data.message) {
                message = data.message;
            }
            return { success: false, message }; // Retorna a mensagem de erro se não for bem-sucedido
        }
    } catch (error) {
        console.error('Erro ao buscar as lojas:', error);
        return { success: false, message: error.message || 'Erro ao tentar buscar as lojas. Tente novamente.' };
    }
}

// Função para carregar as lojas e preencher a tabela HTML
async function carregarLojas() {
    const resultado = await buscarLojas(); // Chama o serviço para buscar as lojas

    if (resultado.success) {
        const lojas = resultado.data; // Dados das lojas recebidas da API
        const tabelaCorpo = document.querySelector('table tbody'); // Referência para o corpo da tabela

        // Limpa a tabela antes de adicionar os dados
        tabelaCorpo.innerHTML = '';

        // Itera sobre as lojas e cria uma linha para cada uma
        lojas.forEach(loja => {
            const linha = document.createElement('tr'); // Cria uma nova linha para a tabela

            // Adiciona as células da linha com os dados da loja
            linha.innerHTML = `
                <td>${loja.cod_unidade}</td>
                <td>${loja.logradouro}</td>
                <td>${loja.matriz ? 'Sim' : 'Não'}</td>
                <td class="text-end">
                    <a href="editar_loja.html" class="btn btn-warning btn-sm mx-1" title="Editar Loja">
                        <i class="bi bi-pencil-fill"></i> Editar
                    </a>
                    <a href="excluir_loja.html" class="btn btn-danger btn-sm mx-1" title="Excluir Loja" onclick="return confirm('Tem certeza de que deseja excluir esta loja?');">
                        <i class="bi bi-trash-fill"></i> Excluir
                    </a>
                </td>
            `;
            
            // Adiciona a linha na tabela
            tabelaCorpo.appendChild(linha);
        });
    } else {
        alert(resultado.message); // Exibe a mensagem de erro se a busca falhar
    }
}

carregarLojas();
