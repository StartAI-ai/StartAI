const routes = {
    home: '/index.html',
    todosJogos: '/pages/todosjogos/todosjogos.html',
    login: '/pages/login/cadastroPage.html',
    jogoVelha: '/pages/jogovelha/velha.html'
};

// Função para redirecionar para uma rota com parâmetros de consulta
function navigateTo(routeName, params = {}) {
    const route = routes[routeName];
    console.log(routeName);
    if (route) {
        // Verifica se a rota é a de login; se for, não adiciona parâmetros
        if (routeName === 'login') {
            window.location.href = route;
        } else {
            const queryString = new URLSearchParams(params).toString();
            const url = queryString ? `${route}?${queryString}` : route;
            window.location.href = url;
        }
    } else {
        console.error('Rota não encontrada');
    }
}

// Expor a função para uso externo
export { navigateTo };
