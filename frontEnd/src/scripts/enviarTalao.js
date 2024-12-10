import { enviarTalao } from '../services/talaoService.js';
import { buscarLojas } from '../services/lojaService.js';

async function carregarLojas(filtro = '') {
    try {
        const resultado = await buscarLojas(); // Chama o serviço para buscar as lojas
        if (resultado.success) {
            const lojas = resultado.data; // Dados das lojas recebidas da API
            const tabelaCorpo = document.querySelector('#status-table-body'); // Referência para o corpo da tabela

            // Limpa a tabela antes de adicionar os dados
            tabelaCorpo.innerHTML = '';

            // Filtra as lojas conforme o filtro (por cod_unidade ou nome da unidade)
            const lojasFiltradas = lojas.filter(loja => {
                return String(loja.cod_unidade).includes(filtro) || 
                       (loja.unidade && loja.unidade.toLowerCase().includes(filtro.toLowerCase()));
            });

            // Itera sobre as lojas filtradas e cria uma linha para cada uma
            lojasFiltradas.forEach(loja => {
                const linha = document.createElement('tr'); 

                console.log('dados da loja aqui', loja);
                
                linha.innerHTML = `
                    <td class="text-center">${loja.cod_unidade}</td>
                    <td class="text-center">${loja.Address.cidade || 'Sem nome'}</td>
                    <td class="text-center">${loja.Estoque.qtd_minima || '0'}</td>
                    <td class="text-center">${loja.Estoque.qtd_atual || '0'}</td>
                    <td class="text-center">${loja.Estoque.status || 'Desconhecido'}</td>
                `;
                tabelaCorpo.appendChild(linha);
            });

        } else {
            alert(resultado.message); // Exibe a mensagem de erro se a busca falhar
        }
    } catch (error) {
        console.error('Erro ao carregar lojas:', error);
        alert('Erro ao carregar lojas. Tente novamente mais tarde.');
    }
}

// Chama a função de carregar lojas quando a página for carregada
carregarLojas();

// Função para enviar talão
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
