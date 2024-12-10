import { buscarLojas, buscarLojaPorId, excluirLoja, atualizarLoja } from '../services/lojaService.js';
import { atualizarLogradouro, excluirLogradouro } from '../services/enderecoService.js';
import { atualizarEstoque, excluirEstoque } from '../services/estoqueService.js';

// Função para carregar as lojas e preencher a tabela HTML
async function carregarLojas(filtro = '') {
    const resultado = await buscarLojas(); // Chama o serviço para buscar as lojas
    if (resultado.success) {
        const lojas = resultado.data; // Dados das lojas recebidas da API
        const tabelaCorpo = document.querySelector('#tabela-lojas'); // Referência para o corpo da tabela

        // Limpa a tabela antes de adicionar os dados
        tabelaCorpo.innerHTML = '';

        // Filtra as lojas conforme o filtro (por nome da unidade)
        const lojasFiltradas = lojas.filter(loja => {
            return String(loja.cod_unidade).includes(filtro) || 
                   (loja.Address && loja.Address.cidade && loja.Address.cidade.toLowerCase().includes(filtro.toLowerCase()));
        });

        // Itera sobre as lojas filtradas e cria uma linha para cada uma
        lojasFiltradas.forEach(loja => {
            const cidade = loja.Address?.cidade || 'Não informado'; // Verifica se há cidade disponível
            const enderecoCompleto = loja.Address
                ? `${loja.Address.endereco || 'Sem endereço'} - ${loja.Address.numero || 'S/N'}`
                : 'Endereço não disponível'; 

            const linha = document.createElement('tr'); 

            // Adiciona as células da linha com os dados da loja
            linha.innerHTML = `
                <td>${loja.cod_unidade}</td>
                <td>${cidade}</td>
                <td>${enderecoCompleto}</td>
                <td class="text-end">
                    <button class="btn btn-warning btn-sm mx-1 editar-btn" data-id="${loja.cod_unidade}" title="Editar Loja">
                        <i class="bi bi-pencil-fill"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm mx-1 excluir-btn" data-id="${loja.cod_unidade}" title="Excluir Loja">
                        <i class="bi bi-trash-fill"></i> Excluir
                    </button>
                </td>
            `;

            // Adiciona a linha na tabela
            tabelaCorpo.appendChild(linha);
        });

        // Adiciona o evento de exclusão após a renderização
        document.querySelectorAll('.excluir-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const codUnidade = event.target.closest('button').getAttribute('data-id');
                excluirLojaComConfirmacao(codUnidade); // Passa o cod_unidade para a função
            });
        });

        // Adiciona o evento de edição após a renderização
        document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const codUnidade = event.target.closest('button').getAttribute('data-id');
                abrirModalEditarLoja(codUnidade); // Chama a função para abrir o modal com os dados da loja
            });
        });

    } else {
        alert(resultado.message); // Exibe a mensagem de erro se a busca falhar
    }
}

// Função de busca ao digitar no campo de filtro
document.getElementById('filtro-unidade').addEventListener('input', (event) => {
    const filtro = event.target.value; // Obtém o valor do campo de pesquisa
    carregarLojas(filtro); // Recarrega as lojas aplicando o filtro
});

let loja = null;

async function abrirModalEditarLoja(codUnidade) {
    const resultado = await buscarLojaPorId(codUnidade); // Busca os dados da loja pelo cod_unidade
    if (resultado.success) {
        loja = resultado.data;
        // Verificar se os elementos do modal existem antes de tentar preenchê-los
        const unidadeInput = document.getElementById('editar-unidade');
        const enderecoInput = document.getElementById('editar-endereco');
        const cidadeInput = document.getElementById('editar-cidade');
        const estoqueMinInput = document.getElementById('editar-estoque-minimo');
        const estoqueMaxInput = document.getElementById('editar-estoque-maximo');
        const bairroInput = document.getElementById('editar-bairro');
        const estadoInput = document.getElementById('editar-estado');
        const cepInput = document.getElementById('editar-cep');
        const numeroInput = document.getElementById('editar-numero');

        if (unidadeInput && enderecoInput && cidadeInput) {
            // Preenche os campos do modal com os dados da loja
            unidadeInput.value = loja.cod_unidade;
            enderecoInput.value = loja.Address.endereco || '';
            cidadeInput.value = loja.Address.cidade || '';
            estoqueMinInput.value = loja.Estoque.qtd_minima || '';
            estoqueMaxInput.value = loja.Estoque.qtd_maxima || '';
            bairroInput.value = loja.Address.bairro || '';
            estadoInput.value = loja.Address.estado || '';
            cepInput.value = loja.Address.cep || '';
            numeroInput.value = loja.Address.numero || '';

            // Usando Vanilla JS para abrir o modal (sem jQuery)
            const modalElement = document.getElementById('modalEditarLoja');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        } else {
            console.error('Elementos do modal não encontrados');
            alert('Erro ao carregar o modal de edição');
        }
    } else {
        alert('Erro ao carregar dados da loja.');
    }
}

// Função para salvar as alterações da loja
async function salvarAlteracoesLoja(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    const codUnidade = document.getElementById('editar-unidade').value;
    const endereco = document.getElementById('editar-endereco').value;
    const cidade = document.getElementById('editar-cidade').value;
    const estoqueMinimo = parseInt(document.getElementById('editar-estoque-minimo').value);
    const estoqueMaximo = parseInt(document.getElementById('editar-estoque-maximo').value);
    const bairro = document.getElementById('editar-bairro').value;
    const estado = document.getElementById('editar-estado').value;
    const cep = document.getElementById('editar-cep').value;
    const numero = document.getElementById('editar-numero').value;

    const estoqueData = {
        qtd_atual: 0, 
        qtd_minima: estoqueMinimo,
        qtd_maxima: estoqueMaximo,
    };

    const logradouroData = {
        bairro,
        cidade,
        estado,
        cep,
        endereco,
        numero,
    };
    
    try {
      
        const estoqueId = await atualizarEstoque(loja.id_estoque, estoqueData); 
        const enderecoId = await atualizarLogradouro(loja.logradouro, logradouroData); 
        
        const lojaData = {
            cod_unidade: codUnidade,
            id_estoque: estoqueId,
            logradouro: enderecoId,
            matriz: false, 
        };

        const result = await atualizarLoja(loja.cod_unidade,lojaData);

        if (result.success) {
            alert('Loja atualizada com sucesso!');
            const modalElement = document.getElementById('modalEditarLoja');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide(); // Fecha o modal
            carregarLojas(); // Recarrega a lista de lojas
        } else {
            alert('Erro ao atualizar loja: ' + result.message);
        }

    } catch (error) {
        console.error('Erro no processo de atualização:', error);
        alert(error.message || 'Erro ao tentar atualizar loja, estoque ou logradouro.');
    }
}

async function excluirLojaComConfirmacao(codUnidade) {
    if (confirm('Tem certeza que deseja excluir esta loja, seu endereço e estoque?')) {
        try {
            // Remover a variável global 'loja' e buscar os dados da loja diretamente
            const resultado = await buscarLojaPorId(codUnidade);
            
            if (!resultado.success) {
                alert('Erro ao buscar os dados da loja.');
                return;
            }

            const loja = resultado.data; // Dados da loja recém recuperados
            const idEstoque = loja.id_estoque; 
            const logradouro = loja.logradouro; 
            
            // Excluir a loja
            const resultLoja = await excluirLoja(codUnidade);
            if (!resultLoja.success) {
                alert('Erro ao excluir a loja.');
                return;  
            }

            // Excluir o estoque
            const resultEstoque = await excluirEstoque(idEstoque);
            if (!resultEstoque.success) {
                alert('Erro ao excluir o estoque.');
                return; 
            }

            // Excluir o endereço
            const resultEndereco = await excluirLogradouro(logradouro);
            if (!resultEndereco.success) {
                console.log(resultEndereco.message);
                
            }

            // Recarregar a lista de lojas após exclusão
            carregarLojas(); 
            alert('Loja excluída com sucesso!');
            
        } catch (error) {
            console.error('Erro ao excluir loja, endereço ou estoque:', error);
            alert('Erro ao excluir loja, endereço ou estoque.');
        }
    }
}


document.getElementById('form-editar-loja').addEventListener('submit', salvarAlteracoesLoja);
carregarLojas(); 
