import { buscarTaloes, obterTalaoPorNumeroRemessa, editarRecebimentoTalao, buscarTalaoPorDestinatario } from '../services/talaoService.js';
import { buscarLojaPorId } from '../services/lojaService.js';
import { buscarEstoquePorId, atualizarQtdEstoque } from '../services/estoqueService.js';

async function carregarStatusRecebimento() {
    
    
    const usuario = JSON.parse(sessionStorage.getItem('user_data'));
        if (!usuario || !usuario.id_loja) {
            throw new Error('Usuário não autenticado ou id_loja ausente.');
        }

    const resultado = await buscarTalaoPorDestinatario(usuario.id_loja);

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
        tabelaCorpo.innerHTML = '';
       
        statusRecebimento.forEach(talao => {
            const linha = document.createElement('tr');
            if(talao.data_recebimento == null){
                talao.data_recebimento = '-'
            }
            if(talao.numero_remessa == null){
                talao.numero_remessa = 'Solicitado'
            }
            if(talao.data_envio == null){
                talao.data_envio = '-'
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

// Função para aplicar o filtro de pesquisa automático
document.getElementById('filtro-remessa').addEventListener('input', function () {
    const filtroRemessa = document.getElementById('filtro-remessa').value.toLowerCase();
    const linhas = document.querySelectorAll('#status-table-body tr');
    
    linhas.forEach(linha => {
        const remessa = linha.querySelector('td:nth-child(1)').textContent.toLowerCase();
        linha.style.display = remessa.includes(filtroRemessa) ? '' : 'none';
    });
});

// Função para aplicar o filtro de pesquisa
document.getElementById('btn-pesquisar').addEventListener('click', function () {
    const filtroDataEnvio = document.getElementById('filtro-data-envio').value;
    const filtroDataRecebida = document.getElementById('filtro-data-recebida').value;

    const linhas = document.querySelectorAll('#status-table-body tr');
    linhas.forEach(linha => {
        const dataEnvio = linha.querySelector('td:nth-child(3)').textContent;
        const dataRecebida = linha.querySelector('td:nth-child(4)').textContent;

        const exibeLinha = (filtroDataEnvio === '' || dataEnvio.includes(filtroDataEnvio)) &&
                           (filtroDataRecebida === '' || dataRecebida.includes(filtroDataRecebida));

        linha.style.display = exibeLinha ? '' : 'none';
    });
});

document.getElementById('btn-receber').addEventListener('click', async function () {
    const dataRecebimento = document.getElementById('data-recebimento').value;
    const numeroRemessa = document.getElementById('numero-remessa').value;

    if (!dataRecebimento || !numeroRemessa) {
        await Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Por favor, preencha todos os campos.'
        });
        return;
    }

    try {
        const talao = await obterTalaoPorNumeroRemessa(numeroRemessa);
        if (!talao) {
            await Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Talão não encontrado!'
            });
            return;
        }
    
        const resultado = await editarRecebimentoTalao(talao.data.id, dataRecebimento, 'Recebido');
        console.log(resultado);
        
        if (resultado) {
            const usuario = JSON.parse(sessionStorage.getItem('user_data'));
            if (!usuario || !usuario.id_loja) {
                throw new Error('Usuário não autenticado ou id_loja ausente.');
            }

            const loja = await buscarLojaPorId(usuario.id_loja);
            if (!loja || !loja.data.id_estoque) {
                throw new Error('Loja ou estoque não encontrado.');
            }

            const estoque = await buscarEstoquePorId(loja.data.id_estoque);
            if (!estoque) {
                throw new Error('Estoque não encontrado.');
            }

            const qtdAtualizada = estoque.qtd_atual + talao.data.qtd_talao;
            await atualizarQtdEstoque(estoque.id, qtdAtualizada);

            if (resultado.message) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: resultado.message
                });
                carregarStatusRecebimento();
            } else {
                await Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: resultado.data.message
                });
                carregarStatusRecebimento();
            }
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao registrar o recebimento do talão.'
            });
        }

    } catch (erro) {
        await Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao tentar atualizar o talão.'
        });
        console.error(erro);
    }
});



// Carregar os status de recebimento quando a página for carregada
carregarStatusRecebimento();
