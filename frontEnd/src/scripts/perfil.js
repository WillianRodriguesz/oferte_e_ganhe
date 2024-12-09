import { listarPerfis, cadastrarPerfil, excluirPerfil } from '../services/perfilService.js';
import { criarAssociacaoPerfilModulo, excluirAssociacaoPerfilModulo, obterModulosPorPerfilId } from '../services/moduloService.js';

async function carregarPerfis() {
    const resposta = await listarPerfis();

    if (resposta.success) {
        const tabela = document.querySelector("tbody");
        tabela.innerHTML = "";
        resposta.data.forEach(perfil => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${perfil.funcao}</td>
                <td class="text-end">
                    <button class="btn btn-warning btn-sm mx-1 abrir-modal-edicao" data-id="${perfil.id}" title="Editar Perfil">
                        <i class="bi bi-pencil-fill"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm mx-1 excluir-perfil" data-id="${perfil.id}" title="Excluir Perfil">
                        <i class="bi bi-trash-fill"></i> Excluir
                    </button>
                </td>
            `;
            tabela.appendChild(row);
        });

        // Adicionar eventos para exclusão
        const botoesExcluir = document.querySelectorAll('.excluir-perfil');
        botoesExcluir.forEach(botao => {
            botao.addEventListener('click', async (event) => {
                const idPerfil = event.target.closest('.excluir-perfil').getAttribute('data-id');
                const confirmacao = confirm("Tem certeza que deseja excluir este perfil?");
                if (!confirmacao) return;

                try {
                    const respAssociacoes = await excluirAssociacaoPerfilModulo(idPerfil);
                    if (respAssociacoes.success) {
                        const respPerfil = await excluirPerfil(idPerfil);
                        if (respPerfil.success) {
                            alert("Perfil excluído com sucesso.");
                            carregarPerfis();
                        } else {
                            alert("Erro ao excluir o perfil.");
                        }
                    } else {
                        alert("Erro ao excluir associações do perfil.");
                    }
                } catch (error) {
                    console.error(error);
                    alert("Erro ao processar a exclusão do perfil.");
                }
            });
        });

        // Adicionar evento para abrir modal de edição
        const botoesAbrirModalEdicao = document.querySelectorAll('.abrir-modal-edicao');
        botoesAbrirModalEdicao.forEach(botao => {
            botao.addEventListener('click', async (event) => {
                const idPerfil = botao.getAttribute('data-id');
                await abrirModalEditar(idPerfil);
            });
        });

    } else {
        alert("Erro ao carregar os perfis.");
    }
}


async function abrirModalEditar(idPerfil) {
    try {
        const resposta = await listarPerfis();
        const perfilSelecionado = resposta.data.find(perfil => perfil.id == idPerfil);

        if (!perfilSelecionado) {
            alert("Erro ao buscar perfil.");
            return;
        }

        // Carregar dados no modal
        document.getElementById("editar-nome-perfil").value = perfilSelecionado.funcao;

        // Carregar Módulos no Modal
        const modulos = await obterModulosPorPerfilId(perfilSelecionado.id);
        const checkboxes = document.querySelectorAll('input[name="modulos[]"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
        modulos.forEach(modulo => {
            const checkbox = document.getElementById(`modulo-${modulo}`);
            if (checkbox) checkbox.checked = true;
        });

        // Exibir o modal
        const modal = new bootstrap.Modal(document.getElementById('modalEditarPerfil'));
        modal.show();
    } catch (error) {
        console.error("Erro ao abrir o modal de edição: ", error);
        alert("Erro ao abrir o modal de edição.");
    }
}

carregarPerfis();
