// Função genérica para exportar relatórios
async function exportarRelatorio(tipoRelatorio) {
    const token = localStorage.getItem('auth_token');
    if (!token) {
        console.error('Token de autenticação não encontrado.');
        throw new Error('Token de autenticação não encontrado.');
    }

    try {
        const response = await fetch(`http://localhost:3000/relatorio/${tipoRelatorio}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log(`Status da resposta: ${response.status}`);

        if (!response.ok) {
            let result;
            try {
                result = await response.json();
            } catch (e) {
                result = { message: 'Erro desconhecido' };
            }
            console.error('Erro no servidor:', result);
            throw new Error(result.message || `Erro ao gerar o relatório. Status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `relatorio_${tipoRelatorio}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return `Relatório de ${tipoRelatorio} exportado com sucesso.`;
    } catch (error) {
        console.error('Erro ao exportar relatório:', error.message);
        throw new Error('Erro ao exportar relatório: ' + error.message);
    }
}

// Função para configurar os eventos dos botões
function configurarBotaoRelatorio(btnId, tipoRelatorio) {
    const btn = document.getElementById(btnId);
    if (btn) {
        btn.addEventListener('click', async function() {
            console.log(`Botão de ${tipoRelatorio} clicado`);
            try {
                // Chama a função de exportação do relatório
                const resultado = await exportarRelatorio(tipoRelatorio);
                console.log(resultado); // Exibe o resultado no console
            } catch (error) {
                console.error(`Erro ao exportar relatório de ${tipoRelatorio}:`, error.message);
            }
        });
    }
}

// Configura os eventos para os botões de relatórios
configurarBotaoRelatorio('btn-estoque', 'estoque');
configurarBotaoRelatorio('btn-recebimento', 'recebimento');
configurarBotaoRelatorio('btn-talao', 'talao');
configurarBotaoRelatorio('btn-perfis', 'perfis');
configurarBotaoRelatorio('btn-usuarios', 'usuarios');
