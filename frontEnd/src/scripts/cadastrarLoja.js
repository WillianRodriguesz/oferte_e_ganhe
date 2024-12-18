// Importa os serviços para cadastrar estoque, logradouro e loja
import { cadastrarEstoque } from '../services/estoqueService.js';
import { cadastrarLogradouro } from '../services/enderecoService.js';
import { cadastrarLoja } from '../services/lojaService.js';

const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', handleCadastroLoja);

async function handleCadastroLoja(e) {
    e.preventDefault();

    const estoqueData = {
        qtd_atual: 0, 
        qtd_minima: parseInt(document.getElementById('estoque-minimo').value),
        qtd_maxima: parseInt(document.getElementById('estoque-maximo').value),
    };

    const logradouroData = {
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
    };

    try {
        
        // Cadastra o estoque e endereço
        const estoqueId = await cadastrarEstoque(estoqueData);
        const enderecoId = await cadastrarLogradouro(logradouroData);

        const lojaData = {
            cod_unidade: document.getElementById('codigo-unidade').value,
            id_estoque: estoqueId,
            logradouro: enderecoId,
            matriz: false, 
        };

        // Cadastra a loja
        const result = await cadastrarLoja(lojaData);

        if (result.success) {
            Swal.fire({
                title: 'Sucesso!',
                text: 'Loja cadastrada com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                clearFormFields(); // Limpa os campos após o sucesso
            });
        } else {
            Swal.fire({
                title: 'Erro!',
                text: result.message || 'Erro ao tentar cadastrar a loja.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

    } catch (error) {
        console.error('Erro no processo de cadastro:', error);
        Swal.fire({
            title: 'Erro!',
            text: error.message || 'Erro ao tentar cadastrar loja, estoque ou logradouro.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}


function clearFormFields() {
    // Lista de IDs dos campos do formulário que precisam ser limpos
    const formFields = [
        'estoque-minimo', 'estoque-maximo', 'bairro', 'cidade', 'estado', 
        'cep', 'endereco', 'numero', 'codigo-unidade'
    ];

    // Limpa o valor de cada campo
    formFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.value = '';  // Limpa o campo de texto
        }
    });
}


