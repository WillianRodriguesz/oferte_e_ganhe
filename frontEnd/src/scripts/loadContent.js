function loadContent(page) {
    fetch(`/pages/content/${page}.html`)
        .then(response => response.text())
        .then(data => {
            // Injetar o HTML dentro da div.content
            document.querySelector('.content').innerHTML = data;

            // Agora, executar os scripts internos e carregar os scripts externos
            executeScripts();
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.querySelector('.content').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        });
}

// Função para encontrar e executar scripts no conteúdo injetado
function executeScripts() {
    const scripts = document.querySelectorAll('.content script');
    
    scripts.forEach(script => {
        // Verificar se o script é externo (com src)
        if (script.src) {
            loadExternalScript(script.src);  // Carregar script externo
        } else {
            // Caso seja um script interno, cria e executa no body
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.body.appendChild(newScript); // Adiciona o script ao body para execução
        }
    });
}

// Função para carregar scripts externos
function loadExternalScript(src) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => console.log(`${src} carregado com sucesso!`);
    script.onerror = (error) => console.error(`Erro ao carregar o script externo: ${src}`, error);
    
    // Adicionar o script ao body para ser executado
    document.body.appendChild(script);
}
