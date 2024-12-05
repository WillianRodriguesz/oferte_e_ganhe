import { buscarLojaPorId } from '../services/lojaService.js';
import { buscarEstoquePorId } from '../services/estoqueService.js';

async function iniciarEstoque() {
    console.log('ENTROU NO SCRIPT');
    
    try {
        // Passo 1: Recuperar o id_loja da sessionStorage
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

        // Mostrar mensagem de erro no HTML
        const erroContainer = document.createElement('div');
        erroContainer.className = 'alert alert-danger';
        erroContainer.textContent = 'Erro ao carregar os dados do estoque. Tente novamente.';
        document.querySelector('.container').prepend(erroContainer);
    }
}

// Chamar a função para iniciar o processo, por exemplo, quando a página carregar ou após algum evento específico.
iniciarEstoque();  // Chama a função diretamente
