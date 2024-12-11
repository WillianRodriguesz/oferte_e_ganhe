import { enviarTalao } from '../services/talaoService.js';
import { buscarLojas } from '../services/lojaService.js';

async function carregarLojas(filtro = '') {
    try {
        const resultado = await buscarLojas(); 
        if (resultado.success) {
            const lojas = resultado.data; 
            const tabelaCorpo = document.querySelector('#status-table-body'); 
            
            tabelaCorpo.innerHTML = '';
            const lojasFiltradas = lojas.filter(loja => {
                return String(loja.cod_unidade).includes(filtro) || 
                       (loja.unidade && loja.unidade.toLowerCase().includes(filtro.toLowerCase()));
            });

            const selectRemetente = document.querySelector('#loja-remetente');
            const selectDestinatario = document.querySelector('#loja-destinatario');

            selectRemetente.innerHTML = '<option value="">Selecione o cod. da Loja</option>';
            selectDestinatario.innerHTML = '<option value="">Selecione o cod. da Loja</option>';

            lojasFiltradas.forEach(loja => {
                const option = document.createElement('option');
                option.value = loja.cod_unidade;

                if (loja.cod_unidade == 1001) {
                    option.textContent = 'Loja Matriz';
                } else {
                    option.textContent = `Loja ${loja.cod_unidade}`;
                }

                selectRemetente.appendChild(option);
            });

            lojasFiltradas.forEach(loja => {
                const option = document.createElement('option');
                option.value = loja.cod_unidade;

                if (loja.cod_unidade == 1001) {
                    option.textContent = 'Loja Matriz';
                } else {
                    option.textContent = `Loja ${loja.cod_unidade}`;
                }

                selectDestinatario.appendChild(option);
            });

            const statusToNumber = (status) => {
                switch (status.toLowerCase()) {
                    case 'baixo': return 1;
                    case 'medio': return 2;
                    case 'cheio': return 3;
                    default: return 0; 
                }
            };
            lojasFiltradas.sort((a, b) => statusToNumber(a.Estoque.status) - statusToNumber(b.Estoque.status));

            const definirClasseStatus = (status) => {
                switch (status.toLowerCase()) {
                    case 'baixo': return 'bg-danger';  
                    case 'medio': return 'bg-warning'; 
                    case 'cheio': return 'bg-success'; 
                    default: return 'bg-secondary'; 
                }
            };

            lojasFiltradas.forEach(loja => {
                const linha = document.createElement('tr'); 

                console.log('dados da loja aqui', loja);
                
                const classeStatus = definirClasseStatus(loja.Estoque.status);

                linha.innerHTML = `
                    <td class="text-center">${loja.cod_unidade}</td>
                    <td class="text-center">${loja.Address.cidade || 'Sem nome'}</td>
                    <td class="text-center">${loja.Estoque.qtd_minima || '0'}</td>
                    <td class="text-center">${loja.Estoque.qtd_atual || '0'}</td>
                    <td class="text-center">
                        <span class="badge ${classeStatus}">
                            ${loja.Estoque.status || 'Desconhecido'}
                        </span>
                    </td>
                `;
                tabelaCorpo.appendChild(linha);
            });

        } else {
            alert(resultado.message); 
        }
    } catch (error) {
        console.error('Erro ao carregar lojas:', error);
        alert('Erro ao carregar lojas. Tente novamente mais tarde.');
    }
}

const btnRegistrarTalao = document.querySelector('form');
btnRegistrarTalao.addEventListener('submit', handleEnvioTalao);

async function handleEnvioTalao(e) {
    e.preventDefault();

    const talaoData = {
        destinatario: document.getElementById('loja-destinatario').value,
        remetente: document.getElementById('loja-remetente').value,
        qtd_talao: parseInt(document.getElementById('qtd-taloes').value),
        numero_remessa: document.getElementById('num-remessa').value,
        data_envio: document.getElementById('data-envio').value,
        data_prevista: document.getElementById('previsao-entrega').value,
        status: "Aguardando",
    };

    try {
        const result = await enviarTalao(talaoData);

        if (result.success) {
            alert('Talão enviado com sucesso!');
            clearFormFields();
        } else {
            alert(result.message || 'Erro ao enviar o talão.');
        }
    } catch (error) {
        console.error('Erro ao processar envio de talões:', error);
        alert(error.message || 'Erro ao enviar o talão.');
    }
}

// Limpar os campos do formulário após o envio bem-sucedido
function clearFormFields() {
    const formFields = [
        'loja-destinatario', 'loja-remetente', 'qtd-taloes',
        'num-remessa', 'data-envio', 'previsao-entrega',
        'data-recebimento', 'observacao'
    ];

    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = ''; 
        }
    });
}

const filtroUnidadeInput = document.getElementById('filtro-unidade');
filtroUnidadeInput.addEventListener('input', function() {
    const filtro = filtroUnidadeInput.value;
    carregarLojas(filtro); 
});

carregarLojas();