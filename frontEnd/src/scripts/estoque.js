import { buscarLojaPorId } from '../services/lojaService.js';
import { buscarEstoquePorId, atualizarQtdEstoque } from '../services/estoqueService.js';
import { enviarTalao, buscarTalaoPorDestinatario } from '../services/talaoService.js';

async function mostraEstoque() {
    try {
        const usuario = JSON.parse(sessionStorage.getItem('user_data'));
        if (!usuario || !usuario.id_loja) {
            throw new Error('Usuário não autenticado ou id_loja ausente.');
        }

        const loja = await buscarLojaPorId(usuario.id_loja);
        const estoque = await buscarEstoquePorId(loja.data.id_estoque);
        preencherTabelaTaloes(usuario.id_loja);

        const estoqueAtualElement = document.querySelector('.card-text.text-success');
        if (estoqueAtualElement) {
            estoqueAtualElement.textContent = `${estoque.qtd_atual} unidades`;
            atualizaInterfaceEstoque(estoque.qtd_atual, estoque.qtd_minima);
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do estoque:', error.message);
        const erroContainer = document.createElement('div');
        erroContainer.className = 'alert alert-danger';
        erroContainer.textContent = 'Erro ao carregar os dados do estoque. Tente novamente.';
        document.querySelector('.container').prepend(erroContainer);
    }
}

async function retirarTalao() {
    const btnRetirarTalao = document.getElementById('btn-retirar-talao');

    if (btnRetirarTalao) {
        btnRetirarTalao.addEventListener('click', async () => {
            console.log('Botão "Retirar Talão" clicado!');
            
            // Usando SweetAlert2 para a confirmação
            const confirmacao = await Swal.fire({
                title: 'Tem certeza?',
                text: 'Deseja realmente retirar um talão?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            });

            if (!confirmacao.isConfirmed) {
                return; // Cancela a ação se o usuário clicar em "Não"
            }

            try {
                const usuario = JSON.parse(sessionStorage.getItem('user_data'));
                if (!usuario || !usuario.id_loja) {
                    throw new Error('Usuário não autenticado ou id_loja ausente.');
                }

                const loja = await buscarLojaPorId(usuario.id_loja);
                const estoque = await buscarEstoquePorId(loja.data.id_estoque);
                const qtdAtualizada = estoque.qtd_atual - 1;

                await atualizarQtdEstoque(estoque.id, qtdAtualizada);
                console.log('Estoque atualizado com sucesso!');

                // Atualiza a interface com a nova quantidade
                atualizaInterfaceEstoque(qtdAtualizada, estoque.qtd_minima);
                mostraEstoque();

                // Exibe um alerta de sucesso usando SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Talão retirado com sucesso!',
                });
            } catch (error) {
                console.error('Erro ao atualizar o estoque:', error.message);

                // Exibe um alerta de erro usando SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao atualizar o estoque. Tente novamente.',
                });
            }
        });
    }
}

function atualizaInterfaceEstoque(qtdAtual, qtdMinima) {
    const paragrafoEstoque = document.getElementById('textoEstoque');
    const tituloEstoque = document.getElementById('estoqueAtual');
    const imagemEstoque = document.getElementById('imgEstoqueAtual');

    if (!tituloEstoque || !imagemEstoque || !paragrafoEstoque) {
        console.error('Elemento com ID "estoqueAtual", "imgEstoqueAtual" ou "textoEstoque" não encontrado.');
        return;
    }

    if (qtdAtual < qtdMinima) {
        // Alterar o texto do título para "Estoque baixo" e aplicar a cor vermelha
        tituloEstoque.textContent = 'Estoque baixo';
        tituloEstoque.style.setProperty('color', 'red', 'important');
        paragrafoEstoque.style.setProperty('color', 'red', 'important');
        
        // Centralizar o título e parágrafo se o estoque for baixo
        tituloEstoque.style.textAlign = 'center';
        paragrafoEstoque.style.textAlign = 'center';
        
        // Alterar o ícone para o alerta de estoque baixo
        imagemEstoque.src = '/styles/img/iconAlert.svg';
        imagemEstoque.style.setProperty('max-width', '55px', 'important');
        imagemEstoque.alt = 'Alerta de Estoque Baixo';
        
        // Centralizar a imagem
        imagemEstoque.style.display = 'block';
        imagemEstoque.style.margin = '0 auto'; // Centraliza a imagem
    } else {
        // Restaurar o texto e a imagem originais
        tituloEstoque.textContent = 'Estoque Atual da Loja';
        tituloEstoque.style.setProperty('color', 'black', 'important');
        paragrafoEstoque.style.setProperty('color', 'green', 'important');
        
        // Restaurar centralização para os casos normais
        tituloEstoque.style.textAlign = 'center';
        paragrafoEstoque.style.textAlign = 'center';
        
        imagemEstoque.src = '/styles/img/iconEstoqueAtual.svg';
        imagemEstoque.style.setProperty('max-width', '100px', 'important');
        imagemEstoque.alt = 'Imagem 2';
        
        // Centralizar a imagem
        imagemEstoque.style.display = 'block';
        imagemEstoque.style.margin = '0 auto'; // Centraliza a imagem
    }
}

document.getElementById('solicitarTalao').addEventListener('click', async function () {
    try {
        const confirmacao = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Deseja realmente solicitar uma remessa de Talão?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        });

        if (!confirmacao.isConfirmed) {
            return; // Cancela a ação 
        }

        const usuario = JSON.parse(sessionStorage.getItem('user_data'));

        if (!usuario || !usuario.id_loja) {
            throw new Error('Usuário não autenticado ou id_loja ausente.');
        }

        const loja = await buscarLojaPorId(usuario.id_loja);
        const estoque = await buscarEstoquePorId(loja.data.id_estoque);

        if (!estoque || !estoque.qtd_maxima) {
            throw new Error('Estoque não encontrado ou quantidade máxima inválida.');
        }

        const solicitacaoData = {
            destinatario: usuario.id_loja,
            remetente: 1001, // id da matriz (trocar para buscar pelo banco)
            qtd_talao: estoque.qtd_maxima - estoque.qtd_atual,
            status: 'Aguardando'
        };

        console.log("Data da solicitacao", solicitacaoData);
        const result = await enviarTalao(solicitacaoData);

        if (result.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: 'Talão solicitado com sucesso!',
            });
            preencherTabelaTaloes(usuario.id_loja)
        } else {
            await Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: result.message || 'Erro ao solicitar o talão.',
            });
        }
    } catch (error) {
        console.error('Erro ao processar solicitação de talões:', error);

        await Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: error.message || 'Erro ao enviar o talão.',
        });
    }
});


async function preencherTabelaTaloes(id) {
    try {
        // Chama a função que busca os talões por destinatário
        const taloes = await buscarTalaoPorDestinatario(id); 
        console.log('Dados trazido do meu banco dos taloes: ', taloes);
        console.log('length:', taloes.data.length);
        
        if (taloes && taloes.data.length > 0) {
            const tabelaCorpo = document.querySelector('#status-table-body');
            tabelaCorpo.innerHTML = ''; 

            // Preenche a tabela com os talões
            taloes.data.forEach(talao => {
                const linha = document.createElement('tr');
                
                // Preenche as células da linha com os dados dos talões
                linha.innerHTML = `
                    <td class="text-center">${talao.numero_remessa || '-'}</td>
                    <td class="text-center">${talao.qtd_talao}</td>
                    <td class="text-center">${talao.data_envio || 'Aguardando'} </td>
                    <td class="text-center">${talao.data_recebimento || '-'}</td>
                `;
                
                // Adiciona a linha à tabela
                tabelaCorpo.appendChild(linha);
            });

            // Chama a função para adicionar a pesquisa dinâmica
            adicionarFiltroTabela();
        } else {
            // Caso não existam talões para o destinatário
            const tabelaCorpo = document.querySelector('#status-table-body');
            tabelaCorpo.innerHTML = '<tr><td colspan="4" class="text-center">Nenhum talão encontrado para este destinatário.</td></tr>';
        }
    } catch (error) {
        console.error('Erro ao buscar os talões:', error);
        alert('Erro ao buscar os talões. Tente novamente mais tarde.');
    }
}

function adicionarFiltroTabela() {
    const filtroInput = document.getElementById('filtro-remessa');
    const tabelaCorpo = document.querySelector('#status-table-body');

    filtroInput.addEventListener('input', function() {
        const filtroTexto = filtroInput.value.toLowerCase(); // Texto digitado no campo de pesquisa
        const linhasTabela = tabelaCorpo.querySelectorAll('tr');

        linhasTabela.forEach(linha => {
            const colunas = linha.getElementsByTagName('td');
            const numeroRemessa = colunas[0].textContent.toLowerCase(); // Coluna com o número da remessa

            // Verifica se o número da remessa contém o texto do filtro
            if (numeroRemessa.includes(filtroTexto)) {
                linha.style.display = ''; // Exibe a linha
            } else {
                linha.style.display = 'none'; // Oculta a linha
            }
        });
    });
}


mostraEstoque();
retirarTalao();
