import { listarUsuarios } from '../services/usuarioService.js';

// Função para carregar os usuários e preencher a tabela HTML
async function carregarUsuarios() {
    try {
        const resultado = await listarUsuarios(); 
        if (resultado.success) {
            const usuarios = resultado.data; 
            const tabelaCorpo = document.querySelector('#usuarios-table tbody');  // Corrigido o seletor

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
                    <td>${usuario.email}</td>
                    <td text-center>${usuario.id_loja}</td>
                    <td text-center>${statusUsuario}</td>  <!-- Exibe 'Cadastrado' ou 'Aguardando' -->
                    <td class="text-end">
                        <a href="editar_usuario.html?id=${usuario.matricula}" class="btn btn-warning btn-sm mx-1" title="Editar Usuário">
                            <i class="bi bi-pencil-fill"></i> Editar
                        </a>
                        <a href="excluir_usuario.html?id=${usuario.matricula}" class="btn btn-danger btn-sm mx-1" title="Excluir Usuário" onclick="return confirm('Tem certeza de que deseja excluir este usuário?');">
                            <i class="bi bi-trash-fill"></i> Excluir
                        </a>
                    </td>
                `;

                // Adiciona a linha na tabela
                tabelaCorpo.appendChild(linha);
            });
        } else {
            alert(`Erro: ${resultado.message}`);
        }
    } catch (error) {
        console.error('Erro ao carregar os usuários:', error);
        alert('Ocorreu um erro ao tentar carregar os usuários.');
    }
}

carregarUsuarios(); // Chama a função para carregar os usuários na tabela
