import { buscarTaloes, excluirTalao, buscarTalaoPorId, atualizarStatusTalao, atualizarTalao } from '../services/talaoService.js';

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
        statusEnvio.forEach(envio => {
            const linha = document.createElement('tr');

            linha.innerHTML = `
                <td class="text-center">
                    <span class="badge ${
                        envio.status === 'Aguardando' && envio.data_envio === null
                            ? 'bg-danger' : envio.status === 'Aguardando'
                            ? 'bg-secondary': envio.status === 'Enviado'
                            ? 'bg-warning' : envio.status === 'Recebido'
                            ? 'bg-success': ''
                    }">
                        ${
                            envio.status === 'Aguardando' && envio.data_envio === null
                                ? 'Solicitado'
                                : envio.status
                        }
                    </span>
                </td>
                <td class="text-center">${envio.destinatario}</td>
                <td class="text-center">${envio.data_envio ? envio.data_envio : '-'}</td>
                <td class="text-center">
                    <button class="btn btn-link" id="btn-detalhes-${envio.id}">
                        <img src="/styles/img/iconDetalhes.svg" alt="Detalhes" style="width: 24px; height: 24px;">
                    </button>
                </td>
                <td class="text-center">
                    <input type="checkbox" class="form-check-input" 
                        style="border: 1px solid #000000;" 
                        data-id="${envio.id}" 
                        ${
                            envio.status !== 'Aguardando' || envio.numero_remessa === null
                                ? 'disabled'
                                : ''
                        }>
                </td>
            `;

            tabelaCorpo.appendChild(linha);

            // Adiciona o evento de clique para exibir os detalhes após a renderização
            const btnDetalhes = document.querySelector(`#btn-detalhes-${envio.id}`);
            btnDetalhes.addEventListener('click', () => {
                exibirDetalhesEnvio(envio.id); 
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
        const modalConteudo = document.getElementById('modal-detalhes-conteudo');
        const editavel = envio.status === 'Aguardando';

        modalConteudo.innerHTML = `
            <form id="form-detalhes-envio">
                <div class="mb-3">
                    <label for="numero-remessa" class="form-label"><strong>Número da Remessa:</strong></label>
                    <input type="text" class="form-control" id="numero-remessa" value="${envio.numero_remessa !== null ? envio.numero_remessa : ''}" ${!editavel ? 'disabled' : ''}>
                </div>
                <div class="mb-3">
                    <label for="qtd-talao" class="form-label"><strong>Quantidade de Talões:</strong></label>
                    <input type="number" class="form-control" id="qtd-talao" value="${envio.qtd_talao}" ${!editavel ? 'disabled' : ''}>
                </div>
                <div class="mb-3">
                    <label for="destinatario" class="form-label"><strong>Destinatário:</strong></label>
                    <input type="text" class="form-control" id="destinatario" value="${envio.destinatario}" ${!editavel ? 'disabled' : 'disabled'}>
                </div>
                <div class="mb-3">
                    <label for="remetente" class="form-label"><strong>Remetente:</strong></label>
                    <input type="text" class="form-control" id="remetente" value="${envio.remetente}" ${!editavel ? 'disabled' : 'disabled'}>
                </div>
                <div class="mb-3">
                    <label for="data-envio" class="form-label"><strong>Data de Envio:</strong></label>
                    <input type="date" class="form-control" id="data-envio" value="${envio.data_envio}" ${!editavel ? 'disabled' : ''}>
                </div>
                <div class="mb-3">
                    <label for="data-prevista" class="form-label"><strong>Data Prevista:</strong></label>
                    <input type="date" class="form-control" id="data-prevista" value="${envio.data_prevista}" ${!editavel ? 'disabled' : ''}>
                </div>
            </form>
        `;

        // Exibe o modal
        const modal = new bootstrap.Modal(document.getElementById('modalDetalhes'));
        modal.show();

        // Adiciona o botão salvar ao rodapé somente se o status for "Aguardando"
        const modalFooter = document.querySelector('.modal-footer');
        modalFooter.innerHTML = editavel 
            ? `<button type="button" class="btn btn-primary" id="btn-salvar-detalhes">Salvar</button>` 
            : '';

        // Evento para salvar as alterações
        if (editavel) {
            document.getElementById('btn-salvar-detalhes').addEventListener('click', async () => {
                const dataTalao = {
                    numero_remessa: document.getElementById('numero-remessa').value,
                    qtd_talao: document.getElementById('qtd-talao').value,
                    destinatario: document.getElementById('destinatario').value,
                    remetente: document.getElementById('remetente').value,
                    data_envio: document.getElementById('data-envio').value,
                    data_prevista: document.getElementById('data-prevista').value,
                    status: "Aguardando",
                };
                console.log('Dados talao')
                console.log(dataTalao)

                const resultadoAtualizacao = await atualizarTalao(id, dataTalao);
                if (resultadoAtualizacao.success) {
                    // Usando SweetAlert2 para sucesso
                    await Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: 'Talão atualizado com sucesso!',
                    });
                    modal.hide();
                    carregarStatusEnvio(); // Atualiza a tabela
                } else {
                    // Usando SweetAlert2 para erro
                    await Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: `Erro ao atualizar talão: ${resultadoAtualizacao.message}`,
                    });
                }
            });
        }
    } else {
        // Usando SweetAlert2 para erro ao carregar os detalhes
        await Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao carregar detalhes do envio.',
        });
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
            // Usando SweetAlert2 para sucesso
            await Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Remessa de talão enviada com sucesso!',
            });
            carregarStatusEnvio(); 
        } else {
            // Usando SweetAlert2 para erro
            await Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Houve erros ao atualizar alguns talões. Verifique o console para mais detalhes.',
            });
        }
    } else {
        // Usando SweetAlert2 para aviso caso nenhum envio seja selecionado
        await Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Selecione ao menos um envio com status "Aguardando".',
        });
    }
});


// Função para excluir talões
document.getElementById('btn-excluir').addEventListener('click', async function () {
    const selectedCheckboxes = document.querySelectorAll('.form-check-input:checked:not(:disabled)');
    const ids = [];

    selectedCheckboxes.forEach(checkbox => {
        ids.push(checkbox.getAttribute('data-id'));
    });

    if (ids.length > 0) {
        let sucessoTotal = true;

        for (const id of ids) {
            const resultado = await excluirTalao(id); // Chama o método de exclusão do seu talaoService
            if (!resultado.success) {
                sucessoTotal = false;
                console.error(`Erro ao excluir talão com ID ${id}:`, resultado.message);
            }
        }

        if (sucessoTotal) {
            // Usando SweetAlert2 para sucesso
            await Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Talões excluídos com sucesso!',
            });
            carregarStatusEnvio(); // Recarrega a tabela após a exclusão
        } else {
            // Usando SweetAlert2 para erro
            await Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Houve erros ao excluir alguns talões. Verifique o console para mais detalhes.',
            });
        }
    } else {
        // Usando SweetAlert2 para alerta de erro caso não selecione talões
        await Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Selecione ao menos um talão para exclusão.',
        });
    }
});


// Carregar os status de envio quando a página for carregada
carregarStatusEnvio();
