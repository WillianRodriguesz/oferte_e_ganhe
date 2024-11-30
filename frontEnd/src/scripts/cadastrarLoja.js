// Função para lidar com o clique no botão de registro
async function handleCadastroLoja(e) {
    e.preventDefault();

    const estoqueData = {
        qtd_atual: parseInt(document.getElementById('estoque-atual').value),
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
        const estoqueId = await cadastrarEstoque(estoqueData);
        const enderecoId = await cadastrarLogradouro(logradouroData);

        const lojaData = {
            cod_unidade: document.getElementById('codigo-unidade').value,
            id_estoque: estoqueId,
            logradouro: enderecoId,
            matriz: false,
        };

        const result = await cadastrarLoja(lojaData);

        if (result.success) {
            alert('Loja cadastrada com sucesso!');
            window.location.assign('/pages/lojas.html');
        } else {
            alert(result.message || 'Erro ao tentar cadastrar a loja.');
        }

    } catch (error) {
        console.error('Erro no processo de cadastro:', error);
        alert(error.message || 'Erro ao tentar cadastrar loja, estoque ou logradouro.');
    }
}

// Adiciona o evento ao botão de registrar
btnRegistrar.addEventListener('click', handleCadastroLoja);
