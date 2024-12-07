import { listarPerfis } from '../services/perfilService.js';

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

carregarPerfis();