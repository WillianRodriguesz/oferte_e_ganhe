import { buscarLojas, buscarLojaPorId, excluirLoja, atualizarLoja } from '../services/lojaService.js';
import { atualizarLogradouro, excluirLogradouro } from '../services/enderecoService.js';
import { atualizarEstoque, excluirEstoque } from '../services/estoqueService.js';

async function carregarLojas(filtro = '') {
    const resultado = await buscarLojas(); 
    if (resultado.success) {
        const lojas = resultado.data; 
        const tabelaCorpo = document.querySelector('#tabela-lojas'); 

        // Limpa a tabela antes de adicionar os dados
        tabelaCorpo.innerHTML = '';

        const lojasFiltradas = lojas.filter(loja => {
            return String(loja.cod_unidade).includes(filtro) || 
                   (loja.Address && loja.Address.cidade && loja.Address.cidade.toLowerCase().includes(filtro.toLowerCase()));
        });

        lojasFiltradas.forEach(loja => {
            const cidade = loja.Address?.cidade || 'Não informado'; 
            const enderecoCompleto = loja.Address
                ? `${loja.Address.endereco || 'Sem endereço'} - ${loja.Address.numero || 'S/N'}`
                : 'Endereço não disponível'; 

            const linha = document.createElement('tr'); 

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

            tabelaCorpo.appendChild(linha);
        });

        document.querySelectorAll('.excluir-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const codUnidade = event.target.closest('button').getAttribute('data-id');
                excluirLojaComConfirmacao(codUnidade); 
            });
        });

        document.querySelectorAll('.editar-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const codUnidade = event.target.closest('button').getAttribute('data-id');
                abrirModalEditarLoja(codUnidade); 
            });
        });

    } else {
        alert(resultado.message); 
    }
}

document.getElementById('filtro-unidade').addEventListener('input', (event) => {
    const filtro = event.target.value; 
    carregarLojas(filtro); 
});

let loja = null;

async function abrirModalEditarLoja(codUnidade) {
    const resultado = await buscarLojaPorId(codUnidade); 
    if (resultado.success) {
        loja = resultado.data;
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
            unidadeInput.value = loja.cod_unidade;
            enderecoInput.value = loja.Address.endereco || '';
            cidadeInput.value = loja.Address.cidade || '';
            estoqueMinInput.value = loja.Estoque.qtd_minima || '';
            estoqueMaxInput.value = loja.Estoque.qtd_maxima || '';
            bairroInput.value = loja.Address.bairro || '';
            estadoInput.value = loja.Address.estado || '';
            cepInput.value = loja.Address.cep || '';
            numeroInput.value = loja.Address.numero || '';

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

async function salvarAlteracoesLoja(event) {
    event.preventDefault(); 

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
        Swal.fire({
            title: 'Aguarde...',
            text: 'Atualizando a loja...',
            icon: 'info',
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        const estoqueId = await atualizarEstoque(loja.id_estoque, estoqueData); 
        const enderecoId = await atualizarLogradouro(loja.logradouro, logradouroData); 
        
        const lojaData = {
            cod_unidade: codUnidade,
            id_estoque: estoqueId,
            logradouro: enderecoId,
            matriz: false, 
        };

        const result = await atualizarLoja(loja.cod_unidade, lojaData);

        if (result.success) {
            Swal.fire({
                title: 'Sucesso!',
                text: 'Loja atualizada com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                const modalElement = document.getElementById('modalEditarLoja');
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide(); 
                carregarLojas(); 
            });
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao atualizar loja: ' + result.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

    } catch (error) {
        console.error('Erro no processo de atualização:', error);
        Swal.fire({
            title: 'Erro!',
            text: error.message || 'Erro ao tentar atualizar loja, estoque ou logradouro.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function excluirLojaComConfirmacao(codUnidade) {
    const confirmDelete = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Deseja excluir esta loja, seu endereço e estoque?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if (confirmDelete.isConfirmed) {
        try {
            // Remover a variável global 'loja' e buscar os dados da loja diretamente
            const resultado = await buscarLojaPorId(codUnidade);
            
            if (!resultado.success) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao buscar os dados da loja.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;
            }

            const loja = resultado.data; 
            const idEstoque = loja.id_estoque; 
            const logradouro = loja.logradouro; 
            
            const resultLoja = await excluirLoja(codUnidade);
            if (!resultLoja.success) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao excluir a loja.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return;  
            }

            const resultEstoque = await excluirEstoque(idEstoque);
            if (!resultEstoque.success) {
                Swal.fire({
                    title: 'Erro!',
                    text: 'Erro ao excluir o estoque.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return; 
            }

            const resultEndereco = await excluirLogradouro(logradouro);
            if (!resultEndereco.success) {
                console.log(resultEndereco.message);
            }

            // Recarregar a lista de lojas após exclusão
            carregarLojas(); 
            Swal.fire({
                title: 'Sucesso!',
                text: 'Loja excluída com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

        } catch (error) {
            console.error('Erro ao excluir loja, endereço ou estoque:', error);
            Swal.fire({
                title: 'Erro!',
                text: 'Erro ao excluir loja, endereço ou estoque.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }
}



document.getElementById('form-editar-loja').addEventListener('submit', salvarAlteracoesLoja);
carregarLojas(); 
