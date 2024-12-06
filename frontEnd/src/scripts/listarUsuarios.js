import { listarUsuarios, excluirUsuario, buscarUsuarioPorId, atualizarUsuario } from '../services/usuarioService.js';

// Função para carregar os usuários e preencher a tabela HTML
async function carregarUsuarios() {
    try {
        const resultado = await listarUsuarios();
        if (resultado.success) {
            const usuarios = resultado.data;
            const tabelaCorpo = document.querySelector('#usuarios-table tbody'); // Seleciona o corpo da tabela

            console.log(usuarios);

            tabelaCorpo.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

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
                        <button class="btn btn-warning btn-sm mx-1 editar-usuario" data-id="${usuario.matricula}" title="Editar Usuário">
                            <i class="bi bi-pencil-fill"></i> Editar
                        </button>
                        <button class="btn btn-danger btn-sm mx-1 excluir-usuario" data-id="${usuario.matricula}" title="Excluir Usuário">
                            <i class="bi bi-trash-fill"></i> Excluir
                        </button>
                    </td>
                `;

                // Adiciona a linha na tabela
                tabelaCorpo.appendChild(linha);
            });

            // Adiciona eventos aos botões de exclusão
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

            // Adiciona eventos aos botões de edição
            const botoesEditar = document.querySelectorAll('.editar-usuario');
            botoesEditar.forEach(botao => {
                botao.addEventListener('click', async (e) => {
                    const id = e.target.closest('button').getAttribute('data-id');
                    await abrirModalEdicao(id);
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

// Função para abrir o modal de edição e preencher os dados do usuário
async function abrirModalEdicao(id) {
    try {
        const resultado = await buscarUsuarioPorId(id);
        if (resultado.success) {
            const usuario = resultado.data;

            // Preenche os campos do modal com os dados do usuário
            document.getElementById('editar-nome').value = usuario.nome;
            document.getElementById('editar-email').value = usuario.email;
            document.getElementById('editar-unidade').value = usuario.id_loja;
            document.getElementById('editar-status').value = usuario.status ? '1' : '0';

            // Define o atributo data-id no formulário para identificação posterior
            document.getElementById('form-editar-usuario').setAttribute('data-id', id);

            // Abre o modal
            const modal = new bootstrap.Modal(document.getElementById('modalEditarUsuario'));
            modal.show();
        } else {
            alert(`Erro ao carregar os dados do usuário: ${resultado.message}`);
        }
    } catch (error) {
        console.error('Erro ao carregar os dados do usuário:', error);
        alert('Ocorreu um erro ao tentar carregar os dados do usuário.');
    }
}

// Função para salvar as alterações do usuário
async function salvarEdicaoUsuario(event) {
    event.preventDefault();

    const id = event.target.getAttribute('data-id');
    const nome = document.getElementById('editar-nome').value;
    const email = document.getElementById('editar-email').value;
    const idLoja = document.getElementById('editar-unidade').value;
    const status = document.getElementById('editar-status').value === '1';

    try {
        const resultado = await atualizarUsuario(id, { nome, email, id_loja: idLoja, status });
        if (resultado.success) {
            alert('Usuário atualizado com sucesso!');
            carregarUsuarios();

            // Fecha o modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarUsuario'));
            modal.hide();
        } else {
            alert(`Erro ao atualizar o usuário: ${resultado.message}`);
        }
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        alert('Ocorreu um erro ao tentar atualizar o usuário.');
    }
}

// Adiciona o evento ao formulário de edição
document.getElementById('form-editar-usuario').addEventListener('submit', salvarEdicaoUsuario);

// Inicializa o carregamento dos usuários
carregarUsuarios();
