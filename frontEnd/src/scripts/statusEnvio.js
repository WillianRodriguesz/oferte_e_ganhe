import { buscarTaloes, atualizarTalao, buscarTalaoPorId } from '../services/talaoService.js';

// Função para carregar os status de envio e preencher a tabela HTML
async function carregarStatusEnvio() {
    const resultado = await buscarTaloes(); // Chama o serviço para buscar os status de envio
    if (resultado.success) {
        const statusEnvio = resultado.data; // Dados dos status de envio recebidos da API
        const tabelaCorpo = document.querySelector('#status-table-body'); // Referência para o corpo da tabela

        // Limpa a tabela antes de adicionar os dados
        tabelaCorpo.innerHTML = '';
        console.log(statusEnvio);
        
        // Itera sobre os status de envio e cria uma linha para cada um
        statusEnvio.forEach(envio => {
            const linha = document.createElement('tr');

            // Adiciona as células da linha com os dados de status de envio
            linha.innerHTML = `
                <td class="text-center">
                    <span class="badge ${envio.status === 'Aguardando' ? 'bg-secondary' : 
                                        envio.status === 'Enviado' ? 'bg-warning' : 
                                        envio.status === 'Recebido' ? 'bg-success' : ''}">
                        ${envio.status}
                    </span>
                </td>
                <td class="text-center">${envio.destinatario}</td>
                <td class="text-center">${envio.data_envio}</td>
                <td class="text-center">
                    <button class="btn btn-link" id="btn-detalhes-${envio.id}">
                        <img src="/styles/img/iconDetalhes.svg" alt="Detalhes" style="width: 24px; height: 24px;">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" class="form-check-input" 
                        style="border: 1px solid #000000;" 
                        data-id="${envio.id}" 
                        ${envio.status !== 'Aguardando' ? 'disabled' : ''}>
                </td>
            `;

            // Adiciona a linha na tabela
            tabelaCorpo.appendChild(linha);

            // Adiciona o evento de exibição de detalhes após a renderização
            const btnDetalhes = document.querySelector(`#btn-detalhes-${envio.id}`);
            btnDetalhes.addEventListener('click', () => {
                exibirDetalhesEnvio(envio.id); // Chama a função para exibir detalhes do envio
            });
        });
    } else {
        alert(resultado.message); // Exibe a mensagem de erro se a busca falhar
    }
}

// Função para exibir os detalhes do envio
async function exibirDetalhesEnvio(id) {
    const resultado = await buscarTalaoPorId(id); // Chama o serviço para buscar os detalhes do envio
    if (resultado.success) {
        const envio = resultado.data;
        // Exibe os detalhes do envio (essa parte pode abrir um modal, por exemplo)
        alert(`Detalhes do envio: ${JSON.stringify(envio)}`);
    } else {
        alert('Erro ao carregar detalhes do envio.');
    }
}

// Função para filtrar as unidades
document.getElementById('filtro-unidade').addEventListener('input', function () {
    const filtro = this.value.toLowerCase();
    const linhas = document.querySelectorAll('#status-table-body tr');
    linhas.forEach(linha => {
        const unidade = linha.querySelector('td:nth-child(2)').textContent.toLowerCase();
        linha.style.display = unidade.includes(filtro) ? '' : 'none';
    });
});

// Função para enviar os dados selecionados
document.getElementById('btn-enviar').addEventListener('click', async function () {
    const selectedCheckboxes = document.querySelectorAll('.form-check-input:checked');
    const ids = [];
    selectedCheckboxes.forEach(checkbox => {
        ids.push(checkbox.getAttribute('data-id')); // Coleta os IDs dos envios selecionados
    });

    if (ids.length > 0) {
        const resultado = await atualizarTalao(ids); // Atualiza os status de envio
        if (resultado.success) {
            alert('Status de envio atualizado com sucesso!');
            carregarStatusEnvio(); // Recarrega a tabela após atualização
        } else {
            alert('Erro ao atualizar os status de envio.');
        }
    } else {
        alert('Selecione ao menos um envio para atualizar.');
    }
});

// Função para exportar os dados para CSV
document.getElementById('btn-download-csv').addEventListener('click', function () {
    // Função para gerar e baixar o CSV com os dados da tabela
    const tabela = document.querySelector('.table-status-envio');
    const rows = tabela.querySelectorAll('tr');
    const csvData = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const rowData = [];
        cells.forEach(cell => rowData.push(cell.textContent.trim()));
        csvData.push(rowData.join(','));
    });

    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'status_envio.csv');
    link.click();
});

// Carregar os status de envio quando a página for carregada
carregarStatusEnvio();
