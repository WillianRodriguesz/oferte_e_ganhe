import { listarUsuarios, excluirUsuario } from '../services/usuarioService.js';

// Função para carregar os usuários e preencher a tabela HTML
async function carregarUsuarios() {
    try {
        const resultado = await listarUsuarios();
        if (resultado.success) {
            const usuarios = resultado.data;
            const tabelaCorpo = document.querySelector('#usuarios-table tbody'); // Corrigido o seletor

            console.log(usuarios);

            tabelaCorpo.innerHTML = ''; // Limpa o conteúdo da tabela antes de adicionar novos dados

            // Itera sobre os usuários e cria uma linha para cada um
            usuarios.forEach(usuario => {
                const linha = document.createElement('tr');

                // Verifica o status e exibe o texto correspondente
                const statusUsuario = usuario.status ? 'Cadastrado' : 'Aguardando';

                // Adiciona as células da linha com os dados do usuário
                linha.innerHTML = `
                    <td>${usuario.nome}</td>
                    <td class="text-center">${usuario.email}</td>
                    <td class="text-center">${usuario.id_loja}</td>
                    <td>${statusUsuario}</td>
                    <td class="text-end">
                        <a href="editar_usuario.html?id=${usuario.matricula}" class="btn btn-warning btn-sm mx-1" title="Editar Usuário">
                            <i class="bi bi-pencil-fill"></i> Editar
                        </a>
                        <button class="btn btn-danger btn-sm mx-1 excluir-usuario" data-id="${usuario.matricula}" title="Excluir Usuário">
                            <i class="bi bi-trash-fill"></i> Excluir
                        </button>
                    </td>
                `;

                // Adiciona a linha na tabela
                tabelaCorpo.appendChild(linha);
            });

            // Adiciona evento aos botões de exclusão
            const botoesExcluir = document.querySelectorAll('.excluir-usuario');
            botoesExcluir.forEach(botao => {
                botao.addEventListener('click', async (e) => {
                    const id = e.target.closest('button').getAttribute('data-id');
                    const confirmacao = confirm('Tem certeza de que deseja excluir este usuário?');
                    if (confirmacao) {
                        await excluirUsuarioHandler(id);
                    }
                });
            });
        } else {
            alert(`Erro: ${resultado.message}`);
        }
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
        alert('Ocorreu um erro ao tentar carregar os usuários.');
    }
}

// Função para excluir um usuário
async function excluirUsuarioHandler(id) {
    try {
        const resultado = await excluirUsuario(id);
        if (resultado.success) {
            alert(resultado.message);
            carregarUsuarios(); // Recarrega a tabela após a exclusão
        } else {
            alert(`Erro: ${resultado.message}`);
        }
    } catch (error) {
        console.error('Erro ao excluir o usuário:', error);
        alert('Ocorreu um erro ao tentar excluir o usuário.');
    }
}

carregarUsuarios(); // Chama a função para carregar os usuários na tabela
