import { buscarTaloes, atualizarTalao, buscarTalaoPorId, atualizarStatusTalao } from '../services/talaoService.js';

async function carregarStatusEnvio() {
    const resultado = await buscarTaloes(); 
    if (resultado.success) {
        let statusEnvio = resultado.data; 
        statusEnvio = statusEnvio.sort((a, b) => {
            const statusOrder = {
                'Aguardando': 1,
                'Enviado': 2,
                'Recebido': 3
            };
            return statusOrder[a.status] - statusOrder[b.status];
        });

        const tabelaCorpo = document.querySelector('#status-table-body'); 

        // Limpa a tabela antes de adicionar os dados
        tabelaCorpo.innerHTML = '';
        console.log(statusEnvio);
        
        // Itera sobre os status de envio e cria uma linha para cada um
        statusEnvio.forEach(envio => {
            const linha = document.createElement('tr');

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
    const resultado = await buscarTalaoPorId(id); 
    if (resultado.success) {
        const envio = resultado.data;
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

// Função para exportar os dados para CSV
document.getElementById('btn-download-csv').addEventListener('click', function () {
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

document.getElementById('btn-enviar').addEventListener('click', async function () {
    const selectedCheckboxes = document.querySelectorAll('.form-check-input:checked:not(:disabled)');
    const ids = [];

    selectedCheckboxes.forEach(checkbox => {
        ids.push(checkbox.getAttribute('data-id'));
    });

    if (ids.length > 0) {
        let sucessoTotal = true;

        for (const id of ids) {
            const resultado = await atualizarStatusTalao(id, 'Enviado'); 
            if (!resultado.success) {
                sucessoTotal = false;
                console.error(`Erro ao atualizar status para o talão com ID ${id}:`, resultado.message);
            }
        }

        if (sucessoTotal) {
            alert('Remessa de talão enviada com sucesso!');
            carregarStatusEnvio(); 
        } else {
            alert('Houve erros ao atualizar alguns talões. Verifique o console para mais detalhes.');
        }
    } else {
        alert('Selecione ao menos um envio com status "Aguardando".');
    }
});



// Carregar os status de envio quando a página for carregada
carregarStatusEnvio();
