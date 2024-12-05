// Importa os serviços (substitua pelo caminho correto)
import { enviarTalao } from '../services/talaoService.js';
import { buscarLojas } from '../services/lojaService.js';

async function carregarLojas() {
    console.log('entrou no carregar lojas');
    try {
        const response = await buscarLojas(); 
        
        if (response.success && Array.isArray(response.data)) {
            const lojas = response.data; // Extraindo o array de lojas
            const destinatarioSelect = document.getElementById('loja-destinatario');
            const remetenteSelect = document.getElementById('loja-remetente');

            // Limpa os selects antes de adicionar as opções
            destinatarioSelect.innerHTML = '<option value="">Selecione o cod. da loja</option>';
            remetenteSelect.innerHTML = '<option value="">Selecione o cod. da loja</option>';

            // Adiciona apenas o cod_unidade como opções no select
            lojas.forEach(loja => {
                const option = new Option(loja.cod_unidade, loja.cod_unidade); 
                destinatarioSelect.add(option.cloneNode(true)); // Adiciona ao destinatário
                remetenteSelect.add(option); // Adiciona ao remetente
            });
        } else {
            throw new Error('Dados inválidos ou ausentes na resposta');
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

    // Coleta os dados do formulário
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

carregarLojas();
