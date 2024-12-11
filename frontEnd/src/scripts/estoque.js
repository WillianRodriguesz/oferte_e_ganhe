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
            const confirmacao = confirm('Tem certeza de que deseja retirar um talão?');
            if (!confirmacao) {
                return; // Cancela a ação se o usuário clicar em "Cancelar"
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
                
                atualizaInterfaceEstoque(qtdAtualizada, estoque.qtd_minima);
                mostraEstoque();  
            } catch (error) {
                console.error('Erro ao atualizar o estoque:', error.message);

                // Mostrar mensagem de erro no HTML
                const erroContainer = document.createElement('div');
                erroContainer.className = 'alert alert-danger';
                erroContainer.textContent = 'Erro ao atualizar o estoque. Tente novamente.';
                document.querySelector('.container').prepend(erroContainer);
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
        const confirmacao = confirm('Tem certeza de que deseja solicitar um talão?');
        if (!confirmacao) {
            return; 
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
            remetente: 1001, // id da matriz (troca para buscar pelo banco)
            qtd_talao: estoque.qtd_maxima - estoque.qtd_atual,
            status: 'Aguardando'
        };

        console.log("Data da solicitacao", solicitacaoData);

        const result = await enviarTalao(solicitacaoData);

        if (result.success) {
            alert('Talão solicitado com sucesso!');
        } else {
            alert(result.message || 'Erro ao solicitar o talão.');
        }
    } catch (error) {
        console.error('Erro ao processar solicitação de talões:', error);
        alert(error.message || 'Erro ao enviar o talão.');
    }
});

async function preencherTabelaTaloes(id) {
    try {
        // Chama a função que busca os talões por destinatário
        const taloes = await buscarTalaoPorDestinatario(id); // Agora usando sua função de serviço
        console.log('Dados trazido do meu banco dos taloes: ', taloes);
        console.log('length:', taloes.data.length);
        
        if (taloes && taloes.data.length > 0) {
            // Obtém o corpo da tabela onde os talões serão exibidos
            const tabelaCorpo = document.querySelector('#status-table-body');
            tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de adicionar as novas linhas

            // Preenche a tabela com os talões
            taloes.data.forEach(talao => {
                const linha = document.createElement('tr');
                
                // Preenche as células da linha com os dados dos talões
                linha.innerHTML = `
                    <td class="text-center">${talao.numero_remessa}</td>
                    <td class="text-center">${talao.qtd_talao}</td>
                    <td class="text-center">${talao.data_envio || 'Aguardando'} </td>
                    <td class="text-center">${talao.data_recebimento || '-'}</td>
                `;
                
                // Adiciona a linha à tabela
                tabelaCorpo.appendChild(linha);
            });
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


// Inicializar as funções principais
mostraEstoque();
retirarTalao();
