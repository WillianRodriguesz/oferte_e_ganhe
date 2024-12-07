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
                    <a href="#" onclick="excluirPerfil(${perfil.id})" class="btn btn-danger btn-sm mx-1" title="Excluir Perfil">
                        <i class="bi bi-trash-fill"></i> Excluir
                    </a>
                </td>
            `;
            tabela.appendChild(row);
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
      alert(`Perfil "${novoPerfil}" cadastrado com sucesso.`);
      carregarPerfis();
      document.getElementById("nome-perfil").value = "";
    } else {
      alert(resposta.message);
    }
  } catch (error) {
    alert(error.message);
  }
}

const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', cadastrarNovoPerfil);

carregarPerfis();
