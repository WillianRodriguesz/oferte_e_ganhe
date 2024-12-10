// Importa os serviços necessários
import { cadastrarUsuario } from '../services/usuarioService.js';


function obterDadosFormulario() {
    const matricula = document.getElementById('matricula').value;
    const id_loja = document.getElementById('codigoLoja').value;
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
        nome,
        email,
        senha,
        status: false,
        id_loja, 
    };

    console.log(solicitacaoData);
    return solicitacaoData;
}

async function registrarSolicitacao(solicitacaoData) {
    try {
        const result = await cadastrarUsuario(solicitacaoData); 

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

const formulario = document.querySelector('#formSolicitacaoAcesso');
formulario.addEventListener('submit', handleSolicitacaoAcesso); 
