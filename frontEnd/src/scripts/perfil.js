import { listarPerfis, cadastrarPerfil, excluirPerfil } from '../services/perfilService.js';

// Carregar Perfis na tabela
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
                    <a href="editar_perfil.html?id=${perfil.id}" class="btn btn-warning btn-sm mx-1" title="Editar Perfil">
                        <i class="bi bi-pencil-fill"></i> Editar
                    </a>
                    <button class="btn btn-danger btn-sm mx-1" title="Excluir Perfil" data-id="${perfil.id}">
                        <i class="bi bi-trash-fill"></i> Excluir
                    </button>
                </td>
            `;
            tabela.appendChild(row);
        });

        // Adicionando event listener para os botões de exclusão
        const botoesExcluir = document.querySelectorAll('[data-id]');
        botoesExcluir.forEach(botao => {
            botao.addEventListener('click', async (event) => {
                const idPerfil = event.target.closest('[data-id]').getAttribute('data-id');

                // Exibir confirmação para exclusão
                const confirmacao = confirm("Tem certeza que deseja excluir este perfil?");
                if (confirmacao) {
                    try {
                        const resposta = await excluirPerfil(idPerfil);

                        if (resposta.success) {
                            alert("Perfil excluído com sucesso.");
                            carregarPerfis();
                        } else {
                            alert("Erro ao excluir o perfil.");
                        }
                    } catch (error) {
                        alert("Erro ao processar a exclusão do perfil.");
                    }
                } else {
                    alert("A exclusão foi cancelada.");
                }
            });
        });
    } else {
        alert("Erro ao carregar os perfis.");
    }
}

// Cadastrar um novo perfil
async function cadastrarNovoPerfil() {
  const novoPerfil = document.getElementById("nome-perfil").value.trim();

  if (!novoPerfil) {
    alert("Por favor, insira um nome de perfil válido.");
    return;
  }

  try {
    const resposta = await cadastrarPerfil({ funcao: novoPerfil });
    
    if (resposta.success) {
      alert(`Perfil ${novoPerfil} cadastrado com sucesso.`);
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
