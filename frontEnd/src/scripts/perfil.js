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
  
      document.getElementById("editar-nome-perfil").value = perfilSelecionado.funcao;
  
      const modulos = await obterModulosPorPerfilId(perfilSelecionado.id);
      const checkboxes = document.querySelectorAll('#modalEditarPerfil input[name="modulos[]"]');
      checkboxes.forEach(checkbox => checkbox.checked = false);
  
      checkboxes.forEach(checkbox => {
        if (modulos.includes(parseInt(checkbox.value))) {
          checkbox.checked = true;
        }
      });
  
      // Exibir o modal
      const modal = new bootstrap.Modal(document.getElementById('modalEditarPerfil'));
      modal.show();
    } catch (error) {
      console.error("Erro ao abrir o modal de edição: ", error);
      alert("Erro ao abrir o modal de edição.");
    }
  }


async function cadastrarNovoPerfil() {
    const novoPerfil = document.getElementById("nome-perfil").value.trim();

    if (!novoPerfil) {
        alert("Por favor, insira um nome de perfil válido.");
        return;
    }

    try {
        // Cadastrar o novo perfil
        const resposta = await cadastrarPerfil({ funcao: novoPerfil });

        if (resposta.success) {
            const perfilId = resposta.data.perfil.id;
            
            let modulosSelecionados = Array.from(
                document.querySelectorAll('input[name="modulos[]"]:checked')
            ).map((checkbox) => parseInt(checkbox.value));

            const modulosComRegras = [];
            modulosSelecionados.forEach((moduloId) => {
                modulosComRegras.push(moduloId);

                if ([3, 5].includes(moduloId)) {
                    if (!modulosComRegras.includes(4)) modulosComRegras.push(4);
                }

                if (moduloId === 2) {
                    if (!modulosComRegras.includes(8)) modulosComRegras.push(8);
                    if (!modulosComRegras.includes(6)) modulosComRegras.push(6);
                }

                if (moduloId === 9) {
                    if (!modulosComRegras.includes(10)) modulosComRegras.push(10);
                }
            });

            // Remover duplicados da lista de módulos
            const modulosUnicos = [...new Set(modulosComRegras)];
            
            for (const moduloId of modulosUnicos) {
                try {
                    await criarAssociacaoPerfilModulo({ perfil_id: perfilId, modulo_id: moduloId });
                } catch (error) {
                    console.error(`Erro ao associar o módulo ${moduloId} ao perfil ${perfilId}:`, error.message);
                }
            }

            alert(`Perfil ${novoPerfil} cadastrado e módulos associados com sucesso.`);
            carregarPerfis();
            document.getElementById("nome-perfil").value = "";
        } else {
            alert(resposta.message);
        }
    } catch (error) {
        alert(error.message);
    }
}
// Adicionando o evento de clique para cadastrar o novo perfil
const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', cadastrarNovoPerfil);

// Carregar a lista de perfis no início da execução
carregarPerfis();
