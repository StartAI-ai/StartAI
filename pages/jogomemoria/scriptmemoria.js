const cardArray = [
    { name: 'Banana', img: '/pages/jogomemoria/img/banana.png' },
    { name: 'Morango', img: '/pages/jogomemoria/img/morango.png' },
    { name: 'Uva', img: '/pages/jogomemoria/img/uvas.png' },
    { name: 'Laranja', img: '/pages/jogomemoria/img/laranja.png' },
    { name: 'Maçã', img: '/pages/jogomemoria/img/maca.png' },
    { name: 'Mamão', img: '/pages/jogomemoria/img/mamao.png' },
    
    // Cartas repetidas
    { name: 'Banana', img: '/pages/jogomemoria/img/banana.png' },
    { name: 'Morango', img: '/pages/jogomemoria/img/morango.png' },
    { name: 'Uva', img: '/pages/jogomemoria/img/uvas.png' },
    { name: 'Laranja', img: '/pages/jogomemoria/img/laranja.png' },
    { name: 'Maçã', img: '/pages/jogomemoria/img/maca.png' },
    { name: 'Mamão', img: '/pages/jogomemoria/img/mamao.png' },
];

let gameBoard = document.getElementById('game-board');
let targetCard = null;
let attempts = 0;
let currentCol = 0;
let currentRow = 0;
const cols = 4; // Quantidade de colunas no tabuleiro
const rows = cardArray.length / cols; // Quantidade de linhas

// Função para embaralhar as cartas
function shuffleCards() {
    cardArray.sort(() => 0.5 - Math.random());
}

// Função para exibir as cartas por 3 segundos
function showCardsForTime() {
    gameBoard.innerHTML = '';
    cardArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', index.toString());
        card.innerHTML = `<img src="${item.img}" alt="${item.name}" class="fruit-image">`;
        gameBoard.appendChild(card);
    });

    setTimeout(() => {
        hideCards();
    }, 3000); // Exibir por 3 segundos
}

// Função para esconder as cartas
function hideCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.innerHTML = `<div class="cover">?</div>`;
        card.addEventListener('click', selectCard);
    });

    setTimeout(() => {
        showTargetCard();
        highlightNextCard();
    }, 500);
}

// Mostrar a carta alvo que o jogador precisa encontrar
function showTargetCard() {
    const targetCardDisplay = document.createElement('div');
    targetCardDisplay.id = 'target-card';
    targetCardDisplay.innerHTML = `
        <p>Encontre esta fruta:</p>
        <img src="${targetCard.img}" alt="${targetCard.name}" style="width: 100px;">
    `;
    gameBoard.parentElement.appendChild(targetCardDisplay);
}

// Função para destacar a próxima carta a ser selecionada
function highlightNextCard() {
    const cards = document.querySelectorAll('.card');
    
    // Converte para index unidimensional
    const index = currentRow * cols + currentCol;

    if (index >= cards.length) {
        currentCol = 0;
        currentRow = 0;
    }

    // Remove destaque de todas as cartas
    cards.forEach(card => card.classList.remove('highlight'));
    
    // Destaca a carta na posição atual
    cards[index].classList.add('highlight');

    // Avança para a próxima coluna
    currentCol++;
    
    // Se ultrapassar o número de colunas, avança a linha e reinicia a coluna
    if (currentCol >= cols) {
        currentCol = 0;
        currentRow++;
    }
    
    // Espera 1 segundo antes de destacar a próxima carta
    setTimeout(highlightNextCard, 1000);
}

// Função para selecionar uma carta
function selectCard() {
    const cardId = this.getAttribute('data-id');
    const clickedCard = cardArray[cardId];
    
    // Verifica se a carta clicada está destacada
    if (this.classList.contains('highlight')) {
        this.innerHTML = `<img src="${clickedCard.img}" alt="${clickedCard.name}" class="fruit-image">`;
        
        if (clickedCard.name === targetCard.name) {
            alert('Parabéns! Você encontrou a fruta correta!');
            resetGame();
        } else {
            alert('Tente novamente!');
            attempts++;
            if (attempts >= 3) {
                alert('Fim de jogo! A fruta correta era ' + targetCard.name);
                resetGame();
            }
        }

        // Remove destaque da carta selecionada
        this.classList.remove('highlight');
        currentCol = 0; // Reinicia a seleção de coluna
        currentRow = 0; // Reinicia a seleção de linha
    } else {
        // Se a carta não estiver destacada, não permite o clique
        alert('Clique na carta destacada!');
    }
}

// Função para selecionar a carta destacada com a tecla de espaço
function handleKeyPress(event) {
    if (event.code === 'Space') {
        const highlightedCard = document.querySelector('.card.highlight');
        if (highlightedCard) {
            selectCard.call(highlightedCard);
        }
    }
}

// Iniciar o jogo
function startGame() {
    attempts = 0;
    shuffleCards();
    targetCard = cardArray[Math.floor(Math.random() * cardArray.length)];
    showCardsForTime();
    document.addEventListener('keydown', handleKeyPress); // Adiciona o event listener para a tecla de espaço
}

// Reiniciar o jogo
function resetGame() {
    gameBoard.innerHTML = '';
    const targetCardElement = document.getElementById('target-card');
    if (targetCardElement) {
        targetCardElement.remove();
    }
    document.removeEventListener('keydown', handleKeyPress); // Remove o event listener para evitar múltiplos listeners
    startGame();
}

startGame();
