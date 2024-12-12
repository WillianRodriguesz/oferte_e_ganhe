import { listarPerfis, cadastrarPerfil, excluirPerfil, editarFuncaoPerfil } from '../services/perfilService.js';
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

                const confirmacao = await Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você deseja excluir este perfil?",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim, excluir',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true
                });

                if (!confirmacao) return;
                try {
                    const respAssociacoes = await excluirAssociacaoPerfilModulo(idPerfil);
                    if (respAssociacoes.success) {
                        const respPerfil = await excluirPerfil(idPerfil);
                        if (respPerfil.success) {
                            // Usando SweetAlert2 para sucesso na exclusão
                            await Swal.fire({
                                icon: 'success',
                                title: 'Perfil excluído!',
                                text: 'O perfil foi excluído com sucesso.',
                            });
                            carregarPerfis();
                        } else {
                            // Usando SweetAlert2 para erro na exclusão do perfil
                            await Swal.fire({
                                icon: 'error',
                                title: 'Erro!',
                                text: 'Erro ao excluir o perfil.',
                            });
                        }
                    } else {
                        // Usando SweetAlert2 para erro ao excluir associações
                        await Swal.fire({
                            icon: 'error',
                            title: 'Erro!',
                            text: 'Erro ao excluir associações do perfil.',
                        });
                    }
                } catch (error) {
                    console.error(error);
                    // Usando SweetAlert2 para erro no processamento da exclusão
                    await Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'Erro ao processar a exclusão do perfil.',
                    });
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
        // Usando SweetAlert2 para erro ao carregar perfis
        await Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao carregar os perfis.',
        });
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

        // Adicionando o evento de clique no botão de salvar alterações
        const btnSalvarAlteracoes = document.querySelector('#formEditarPerfil button[type="submit"]');
        btnSalvarAlteracoes.onclick = async (event) => {
            event.preventDefault();
            await salvarAlteracoes(perfilSelecionado.id);
        };

    } catch (error) {
        console.error("Erro ao abrir o modal de edição: ", error);
        alert("Erro ao abrir o modal de edição.");
    }
}


async function cadastrarNovoPerfil() {
    const novoPerfil = document.getElementById("nome-perfil").value.trim();

    if (!novoPerfil) {
        await Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Por favor, insira um nome de perfil válido.',
        });
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

            // Usando SweetAlert2 para sucesso no cadastro do perfil
            await Swal.fire({
                icon: 'success',
                title: 'Sucesso!',
                text: `Perfil ${novoPerfil} cadastrado e módulos associados com sucesso.`,
            });
            carregarPerfis();
            document.getElementById("nome-perfil").value = "";
        } else {
            // Usando SweetAlert2 para erro no cadastro do perfil
            await Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: resposta.message,
            });
        }
    } catch (error) {
        // Usando SweetAlert2 para erro no processo
        await Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: error.message,
        });
    }
}


async function salvarAlteracoes(idPerfil) {
    try {
        const novaFuncao = document.getElementById("editar-nome-perfil").value.trim();
        if (!novaFuncao) {
            await Swal.fire({
                icon: 'warning',
                title: 'Atenção!',
                text: 'Por favor, insira uma função de perfil válida.',
            });
            return;
        }

        const resultadoEdicao = await editarFuncaoPerfil(idPerfil, { novaFuncao: novaFuncao });
        if (!resultadoEdicao.success) {
            await Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao atualizar a função do perfil.',
            });
            return;
        }

        // Excluir associações antigas
        const respAssociacoesExcluir = await excluirAssociacaoPerfilModulo(idPerfil);
        if (!respAssociacoesExcluir.success) {
            await Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao excluir associações antigas.',
            });
        }

        // Obter os módulos selecionados com base na lógica de regras
        const modulosSelecionados = Array.from(
            document.querySelectorAll('#modalEditarPerfil input[name="modulos[]"]:checked')
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

        // Criar novas associações com os módulos validados
        for (const moduloId of modulosUnicos) {
            try {
                const respCriarAssociacao = await criarAssociacaoPerfilModulo({ perfil_id: idPerfil, modulo_id: moduloId });
                if (!respCriarAssociacao.success) {
                    console.error(`Erro ao associar o módulo ${moduloId} ao perfil ${idPerfil}.`);
                }
            } catch (error) {
                console.error(`Erro ao associar o módulo ${moduloId} ao perfil:`, error.message);
            }
        }

        await Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Alterações salvas com sucesso.',
        });

        const modalElement = document.getElementById('modalEditarPerfil');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        carregarPerfis();
    } catch (error) {
        console.error("Erro ao salvar alterações:", error);
        await Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Erro ao salvar alterações.',
        });
    }
}


const btnRegistrar = document.getElementById('btnRegistrar');
btnRegistrar.addEventListener('click', cadastrarNovoPerfil);

carregarPerfis();
