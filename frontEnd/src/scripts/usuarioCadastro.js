// Importa os serviços necessários
import { cadastrarUsuario } from '../services/usuarioService.js';
import { buscarLojas } from '../services/lojaService.js';
import { listarPerfis } from '../services/perfilService.js';

// Função para carregar as lojas
async function carregarLojas() {
    try {
        const response = await buscarLojas();  // Chama o serviço para listar as lojas
        const lojas = response.data;  // Acessa a chave 'data' que contém o array de lojas
        const lojaSelect = document.getElementById('loja-colaborador');
        
        // Limpa o combo de lojas
        lojaSelect.innerHTML = '<option value="">Selecione a loja</option>';

        // Preenche o combo de lojas
        lojas.forEach(loja => {
            const option = new Option(loja.cod_unidade, loja.id);  // Agora adicionamos o ID da loja como valor
            lojaSelect.add(option);
        });
    } catch (error) {
        console.error('Erro ao carregar as lojas:', error);
    }
}

// Função para carregar os perfis
async function carregarPerfis() {
    try {
        const response = await listarPerfis();  // Chama o serviço para listar os perfis
        const perfis = response.data;  // Acessa a chave 'data' que contém o array de perfis
        const nivelAcessoSelect = document.getElementById('nivel-acesso');
        
        // Limpa o combo de perfis
        nivelAcessoSelect.innerHTML = '<option value="">Selecione o nível de acesso</option>';
        
        // Preenche o combo de perfis
        perfis.forEach(perfil => {
            const option = new Option(perfil.funcao, perfil.id);  // Agora adicionamos o ID do perfil como valor
            nivelAcessoSelect.add(option);
        });
    } catch (error) {
        console.error('Erro ao carregar os perfis:', error);
    }
}

// Função para obter os dados do formulário de cadastro
function obterDadosFormulario() {
    const nivelAcesso = document.getElementById('nivel-acesso').value;
    const lojaColaborador = document.getElementById('loja-colaborador').value;
    const matricula = document.getElementById('matricula').value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const confirmarEmail = document.getElementById('confirmar-email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    console.log('loja do colab', lojaColaborador);
    
    // Verifica se os e-mails e senhas coincidem
    if (email !== confirmarEmail) {
        // Usando SweetAlert2 para alerta de erro de e-mails não coincidentes
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Os e-mails não coincidem.'
        });
        return null;
    }

    if (senha !== confirmarSenha) {
        // Usando SweetAlert2 para alerta de erro de senhas não coincidentes
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'As senhas não coincidem.'
        });
        return null;
    }

    // Verifica se todos os campos obrigatórios foram preenchidos
    if (!nivelAcesso || !lojaColaborador || !matricula || !nome || !email || !senha) {
        // Usando SweetAlert2 para alerta de campos obrigatórios não preenchidos
        Swal.fire({
            icon: 'warning',
            title: 'Atenção',
            text: 'Por favor, preencha todos os campos.'
        });
        return null;
    }

    // Monta o objeto de dados do usuário com os campos necessários
    const usuarioData = {
        matricula,
        nome,
        email,
        senha,
        status: true,  
        perfil: nivelAcesso,  
        id_loja: lojaColaborador  
    };

    console.log(usuarioData);
    
    return usuarioData;
}


// Função para registrar o usuário
async function registrarUsuario(usuarioData) {
    try {
        const result = await cadastrarUsuario(usuarioData);  // Chama o serviço para cadastrar o usuário

        if (result.success) {
            // Usando SweetAlert2 para sucesso
            Swal.fire({
                icon: 'success',
                title: 'Sucesso',
                text: 'Usuário cadastrado com sucesso!'
            });
            limparCamposFormulario();  // Limpa os campos do formulário
        } else {
            // Usando SweetAlert2 para erro no cadastro
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro ao cadastrar o usuário: ' + (result.message || 'Erro desconhecido')
            });
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        // Usando SweetAlert2 para erro de sistema
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao tentar cadastrar o usuário.'
        });
    }
}


// Função para limpar os campos do formulário
function limparCamposFormulario() {
    const campos = [
        'nivel-acesso', 'loja-colaborador', 'matricula', 'nome', 
        'email', 'confirmar-email', 'senha', 'confirmar-senha'
    ];
    
    campos.forEach(id => {
        document.getElementById(id).value = '';
    });
}

// Função que será chamada quando o formulário for enviado
async function handleCadastroUsuario(event) {
    event.preventDefault();  // Evita o envio do formulário padrão
    const usuarioData = obterDadosFormulario();

    if (usuarioData) {
        await registrarUsuario(usuarioData);  // Registra o usuário
    }
}


carregarLojas();  // Carrega as lojas
carregarPerfis();  // Carrega os perfis

const formulario = document.querySelector('form');
formulario.addEventListener('submit', handleCadastroUsuario);  // Registra o evento de submit
