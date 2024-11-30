import { buscarLojas } from '../services/lojaService.js';

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
            const cidade = loja.Address?.cidade || 'Não informado'; // Verifica se há cidade disponível
            const enderecoCompleto = loja.Address
                ? `${loja.Address.endereco || 'Sem endereço'} - ${loja.Address.numero || 'S/N'}`
                : 'Endereço não disponível'; // Concatena endereço com número, tratando ausências

            const linha = document.createElement('tr'); // Cria uma nova linha para a tabela

            // Adiciona as células da linha com os dados da loja
            linha.innerHTML = `
                <td>${loja.cod_unidade}</td>
                <td>${cidade}</td>
                <td>${enderecoCompleto}</td>
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
