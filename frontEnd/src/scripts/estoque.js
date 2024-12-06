import { buscarLojaPorId } from '../services/lojaService.js';
import { buscarEstoquePorId, atualizarQtdEstoque } from '../services/estoqueService.js';
import { enviarTalao } from '../services/talaoService.js';

async function mostraEstoque() {
    try {
        const usuario = JSON.parse(sessionStorage.getItem('user_data'));
        if (!usuario || !usuario.id_loja) {
            throw new Error('Usuário não autenticado ou id_loja ausente.');
        }

        const loja = await buscarLojaPorId(usuario.id_loja);
        const estoque = await buscarEstoquePorId(loja.data.id_estoque);

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
    console.log('entrou no retirarTalao');
    const btnRetirarTalao = document.getElementById('btn-retirar-talao');

    if (btnRetirarTalao) {
        btnRetirarTalao.addEventListener('click', async () => {
            console.log('Botão "Retirar Talão" clicado!');

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
            remetente: 1, // trocar para buscar no banco pela matriz
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


// Inicializar as funções principais
mostraEstoque();
retirarTalao();
