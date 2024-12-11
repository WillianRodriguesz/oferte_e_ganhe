
async function exportarRelatorio(endpoint) {
    const token = localStorage.getItem('auth_token');

    if (!token) {
        throw new Error('Token de autenticação não encontrado.');
    }

    try {
        const response = await fetch(`http://localhost:3000/relatorio/${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Erro ao gerar o relatório.');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${endpoint}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        return `Relatório ${endpoint} exportado com sucesso.`;
    } catch (error) {
        throw new Error('Erro ao exportar relatório: ' + error.message);
    }
}



