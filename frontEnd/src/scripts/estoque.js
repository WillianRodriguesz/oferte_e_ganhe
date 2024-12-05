import { buscarLojaPorId } from '../services/lojaService.js';
import { buscarEstoquePorId, atualizarQtdEstoque } from '../services/estoqueService.js';

async function mostraEstoque() {    
    try {
        const usuario = JSON.parse(sessionStorage.getItem('user_data'));
        if (!usuario || !usuario.id_loja) {
            throw new Error('Usuário não autenticado ou id_loja ausente.');
        }
        
        const loja = await buscarLojaPorId(usuario.id_loja);
        const estoque = await buscarEstoquePorId(loja.data.id_estoque);

        // Passo 4: Atualizar o HTML com os dados do estoque
        const estoqueAtualElement = document.querySelector('.card-text.text-success');
        if (estoqueAtualElement) {
            estoqueAtualElement.textContent = `${estoque.qtd_atual} unidades`;
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
    console.log('entrou no retirarTalao')
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
                
                // Atualizar o estoque na interface
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

mostraEstoque();  
retirarTalao();

