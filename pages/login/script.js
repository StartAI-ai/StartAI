const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Cadastro
const form = document.getElementById('signupForm');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('CriarConta_Nome').value;
    const email = document.getElementById('CriarConta_Email').value;
    const password = document.getElementById('CriarConta_Senha').value;

    // Verificação de campos obrigatórios
    if (!name || !email || !password) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const userData = {
        email: email,
        password: password
    };

    fetch('https://api-53k8.onrender.com/criar-conta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        // Limpar os campos após o sucesso
        form.reset();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

// Login
const formLogin = document.getElementById('signinForm');

formLogin.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('Login_Email').value;
    const password = document.getElementById('Login_Senha').value;

    // Verificação de campos obrigatórios
    if (!email || !password) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    const userData = {
        email: email,
        password: password
    };

    fetch('https://api-53k8.onrender.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Sucesso:', data);
        formLogin.reset();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});
