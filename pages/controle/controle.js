import { navigateTo } from '../../routes/routes.js';

document.addEventListener('DOMContentLoaded', () => {
    const optionCards = document.querySelectorAll('.option-card');
    
    optionCards.forEach(card => {
        card.addEventListener('click', () => {
            const controlType = card.getAttribute('data-type');
            navigateTo('todosJogos', { controlType });
        });
    });

    const userIcons = document.querySelectorAll('.user-icon');
    
    userIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            console.log('Ícone do usuário clicado'); // Verifique se isso é exibido
            navigateTo('login');
        });
    });
});
