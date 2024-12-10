// Importa os serviços necessários
import { solicitarAcesso } from '../services/loginService.js';
import { buscarLojas } from '../services/lojaService.js';

// Função para carregar as lojas
async function carregarLojas() {
    try {
        const response = await buscarLojas(); 
        const lojas = response.data; 
        const lojaSelect = document.getElementById('codigoLoja');
        
        // Limpa o combo de lojas
        lojaSelect.innerHTML = '<option value="">Selecione a loja</option>';
        lojas.forEach(loja => {
            const option = new Option(loja.cod_unidade, loja.id); 
            lojaSelect.add(option);
        });
    } catch (error) {
        console.error('Erro ao carregar as lojas:', error);
    }
}

// Função para obter os dados do formulário de solicitação de acesso
function obterDadosFormulario() {
    const matricula = document.getElementById('matricula').value;
    const codigoLoja = document.getElementById('codigoLoja').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return null;
    }

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!matricula || !codigoLoja || !email || !senha) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return null;
    }

    // Monta o objeto de dados da solicitação de acesso
    const solicitacaoData = {
        matricula,
        codigoLoja,
        email,
        senha
    };

    console.log(solicitacaoData);
    return solicitacaoData;
}

async function registrarSolicitacao(solicitacaoData) {
    try {
        const result = await solicitarAcesso(solicitacaoData); 

        if (result.success) {
            alert('Solicitação de acesso enviada com sucesso! Aguarde a aprovação.');
            limparCamposFormulario(); 
        } else {
            alert('Erro ao solicitar acesso: ' + (result.message || 'Erro desconhecido'));
        }
    } catch (error) {
        console.error('Erro ao solicitar acesso:', error);
        alert('Erro ao tentar solicitar acesso.');
    }
}

function limparCamposFormulario() {
    const campos = ['matricula', 'codigoLoja', 'email', 'senha', 'confirmarSenha'];
    
    campos.forEach(id => {
        document.getElementById(id).value = '';
    });
}

// Função que será chamada quando o formulário for enviado
async function handleSolicitacaoAcesso(event) {
    event.preventDefault(); // Evita o envio do formulário padrão
    const solicitacaoData = obterDadosFormulario();

    if (solicitacaoData) {
        await registrarSolicitacao(solicitacaoData); 
    }
}

carregarLojas(); 
const formulario = document.querySelector('#formSolicitacaoAcesso');
formulario.addEventListener('submit', handleSolicitacaoAcesso); 
