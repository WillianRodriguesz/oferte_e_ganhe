function loadContent(page) {
    fetch(`/pages/content/${page}.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('.content').innerHTML = data;

            executeScripts();
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.querySelector('.content').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        });
}

function executeScripts() {
    const scripts = document.querySelectorAll('.content script');

    scripts.forEach(script => {
        if (script.src) {
            const isModule = script.hasAttribute('data-module');
            loadExternalScript(script.src, isModule);
        } else {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;

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

    if (isModule) {
        script.type = 'module';
    }

    script.onload = () => console.log(`${src} carregado com sucesso!`);
    script.onerror = (error) => console.error(`Erro ao carregar o script externo: ${src}`, error);

    document.body.appendChild(script);
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const navigationMenu = document.querySelector('.navigation-menu');  

    sidebar.classList.toggle('closed');
    content.classList.toggle('adjusted');
    navigationMenu.classList.toggle('adjusted');  
}