import { buscarTaloes, obterTalaoPorNumeroRemessa, editarRecebimentoTalao } from '../services/talaoService.js';

async function carregarStatusRecebimento() {
    const resultado = await buscarTaloes(); 
    if (resultado.success) {
        let statusRecebimento = resultado.data; 
        statusRecebimento = statusRecebimento.sort((a, b) => {
            const statusOrder = {
                'Enviado': 1,
                'Aguardando': 2,
                'Recebido': 3
            };
            return statusOrder[a.status] - statusOrder[b.status];
        });

        const tabelaCorpo = document.querySelector('#status-table-body'); 

        // Limpa a tabela antes de adicionar os dados
        tabelaCorpo.innerHTML = '';
       
        // Itera sobre os status de recebimento e cria uma linha para cada um
        statusRecebimento.forEach(talao => {
            const linha = document.createElement('tr');
            if(talao.data_recebimento == null){
                talao.data_recebimento = '-'
            }
            linha.innerHTML = `
                <td class="text-center">${talao.numero_remessa}</td>
                <td class="text-center">${talao.qtd_talao}</td>
                <td class="text-center">${talao.data_envio}</td>
                <td class="text-center">${talao.data_recebimento}</td>
                <td class="text-center">
                    <span class="badge ${talao.status === 'Recebido' ? 'bg-success' : 
                                        talao.status === 'Enviado' ? 'bg-warning' : 
                                        talao.status === 'Aguardando' ? 'bg-secondary' : ''}">
                        ${talao.status}
                    </span>
                </td>
            `;

            tabelaCorpo.appendChild(linha);
        });
    } else {
        alert(resultado.message); 
    }
}

// Função para aplicar o filtro de pesquisa
document.getElementById('btn-pesquisar').addEventListener('click', function () {
    const filtroRemessa = document.getElementById('filtro-remessa').value.toLowerCase();
    const filtroDataEnvio = document.getElementById('filtro-data-envio').value;
    const filtroDataRecebida = document.getElementById('filtro-data-recebida').value;

    const linhas = document.querySelectorAll('#status-table-body tr');
    linhas.forEach(linha => {
        const remessa = linha.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const dataEnvio = linha.querySelector('td:nth-child(3)').textContent;
        const dataRecebida = linha.querySelector('td:nth-child(4)').textContent;

        const exibeLinha = remessa.includes(filtroRemessa) &&
                           (filtroDataEnvio === '' || dataEnvio.includes(filtroDataEnvio)) &&
                           (filtroDataRecebida === '' || dataRecebida.includes(filtroDataRecebida));

        linha.style.display = exibeLinha ? '' : 'none';
    });
});

document.getElementById('btn-receber').addEventListener('click', async function () {
    const dataRecebimento = document.getElementById('data-recebimento').value;
    const numeroRemessa = document.getElementById('numero-remessa').value;

    if (!dataRecebimento || !numeroRemessa) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        const talao = await obterTalaoPorNumeroRemessa(numeroRemessa);
        if (!talao) {
            alert('Talão não encontrado!');
            return;
        }
        
        const resultado = await editarRecebimentoTalao(talao.data.id, dataRecebimento, 'Recebido');
        console.log(resultado);
        
        if (resultado) {
            if(resultado.message){
                alert(resultado.message);
                carregarStatusRecebimento();
            }else{
                alert(resultado.data.message);
                carregarStatusRecebimento();
            }  
        } else {
            alert('Erro ao registrar o recebimento do talão.');
        }

    } catch (erro) {
        alert('Erro ao tentar atualizar o talão.');
        console.error(erro);
    }
});

// Carregar os status de recebimento quando a página for carregada
carregarStatusRecebimento();
