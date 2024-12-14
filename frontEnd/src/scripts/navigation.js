import { logout } from '../services/loginService.js';


fetch('../pages/auxiliary-page/navigation-menu.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navigation-menu-container').innerHTML = data;
        configureButtonSelection(); 
    })
    .catch(error => console.error('Erro ao carregar o navigation-menu:', error));
    
// Carregar o sidebar
fetch('../pages/sidebar-page/sidebar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('sidebar-container').innerHTML = data;
        configureSidebarNavigation();
        configureButtonSelection();
        configureSidebarSelection();  
        loadContent('home');
    })
    .catch(error => console.error('Erro ao carregar o sidebar:', error));

// Configurar eventos do sidebar
function configureSidebarNavigation() {
    const sidebarButtons = document.querySelectorAll('.sidebar nav button');
    const navMenuButtons = document.querySelectorAll('.navigation-menu button');

    const botaoModuloMap = {
        'Dashboard': 'dashboard',
        'Envio de Talões': 'envio',
        'Recebimento de Talões': 'recebimento',
        'Gerenciar Estoque': 'estoques',
        'Gerenciar Perfil': 'perfis',
        'Cadastrar Loja': 'lojas',
        'Gerar Relatórios': 'relatorios'
    };

    const userData = JSON.parse(sessionStorage.getItem('user_data')) || {};
    const modulosAcessados = userData.modulos || [];

    // Inicializa todos os botões do navigation-menu como invisíveis
    navMenuButtons.forEach(navButton => {
        navButton.style.display = 'none'; 
        navButton.disabled = true; 
    });

    // Adiciona eventos de clique nos botões do menu auxiliar
    sidebarButtons.forEach(button => {
        const spanText = button.querySelector('span').innerText.trim();

        // Exibir/ocultar os botões baseados na visibilidade de módulos acessados
        if (spanText === 'Sair do sistema') {
            //button.addEventListener('click', () => {
                //localStorage.clear();
                //sessionStorage.clear();
                
                //window.location.assign('/login');
            //});
            //return;

            button.addEventListener('click', async () => {
                try {
                    await logout();  
        
                    window.location.assign('/login'); 
                } catch (error) {
                    console.error('Erro ao tentar fazer logout:', error);
                }
            });
            return;
        }

        // Verifica se o módulo do botão é acessado pelo usuário
        if (botaoModuloMap[spanText] && modulosAcessados.includes(botaoModuloMap[spanText])) {
            button.style.visibility = 'visible';
            button.disabled = false;
        } else {
            button.style.visibility = 'hidden';
            button.style.height = '0px';
            button.style.width = '0px';
            button.disabled = true;
        }

        // Ao clicar no botão do sidebar, atualizar o navigation menu
        button.addEventListener('click', () => {
            navMenuButtons.forEach(btn => btn.classList.remove('selected'));
            let firstButtonActivated = false;

            navMenuButtons.forEach(navButton => {
                const navButtonText = navButton.innerText.trim();
                const visibilityMap = {
                    'Dashboard': ['Dashboard'],
                    'Envio de Talões': ['Status de Envio', 'Enviar Talão'],
                    'Recebimento de Talões': ['Recebimento'],
                    'Gerenciar Estoque': ['Estoque'],
                    'Gerenciar Perfil': ['Cadastrar Usuário', 'Perfil', 'Usuário'],
                    'Cadastrar Loja': ['Cadastrar Loja', 'Lojas'],
                    'Gerar Relatórios':['Gerar Relatórios']
                };

                if (visibilityMap[spanText] && visibilityMap[spanText].includes(navButtonText)) {
                    navButton.style.display = 'block';  
                    navButton.disabled = false;

                    if (!firstButtonActivated) {
                        navButton.classList.add('selected');  
                        firstButtonActivated = true;  
                        const pageToLoad = navButton.getAttribute('onclick').match(/'([^']+)'/)[1];  
                        loadContent(pageToLoad);
                    }
                } else {
                    navButton.style.display = 'none';   
                    navButton.disabled = true;          
                }
            });
        });
    });
}

// Configurar a seleção de botões no navigation-menu
function configureButtonSelection() {
    const buttons = document.querySelectorAll('.navigation-menu button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}

// Configurar a seleção de botões do sidebar
function configureSidebarSelection() {
    const sidebarButtons = document.querySelectorAll('.sidebar nav button');

    sidebarButtons.forEach(button => {
        button.addEventListener('click', () => {
            sidebarButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
    });
}

