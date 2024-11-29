// Função para carregar o conteúdo de uma página específica dentro do div .content
function loadContent(page) {
    fetch(`/pages/content/${page}.html`)  
        .then(response => response.text())
        .then(data => {
            document.querySelector('.content').innerHTML = data;
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            document.querySelector('.content').innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
        });
}
