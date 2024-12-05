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
        if (script.src) {
            // Carrega como módulo se tiver o atributo `data-module`
            const isModule = script.hasAttribute('data-module');
            loadExternalScript(script.src, isModule);
        } else {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;

            // Adiciona como script de módulo, se necessário
            if (script.type === 'module') {
                newScript.type = 'module';
            }

            document.body.appendChild(newScript);
        }
    });
}

function loadExternalScript(src, isModule = false) {
    const script = document.createElement('script');
    script.src = src;

    // Adiciona `type="module"` se o script for um módulo
    if (isModule) {
        script.type = 'module';
    }

    script.onload = () => console.log(`${src} carregado com sucesso!`);
    script.onerror = (error) => console.error(`Erro ao carregar o script externo: ${src}`, error);

    // Adicionar o script ao body para ser executado
    document.body.appendChild(script);
}
