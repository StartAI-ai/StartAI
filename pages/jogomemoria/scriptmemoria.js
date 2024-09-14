const cardArray = [
    { name: 'banana', img: 'img/banana.png' },
    { name: 'morango', img: 'img/morango.png' },
    { name: 'uvas', img: 'img/uvas.png' },
    { name: 'laranja', img: 'img/laranja.png' },
    { name: 'maca', img: 'img/maca.png' },
    { name: 'mamao', img: 'img/mamao.png' },
    
    // Cartas repetidas para aumentar o número de cartas
    { name: 'banana', img: 'img/banana.png' },
    { name: 'morango', img: 'img/morango.png' },
    { name: 'uvas', img: 'img/uvas.png' },
    { name: 'laranja', img: 'img/laranja.png' },
    { name: 'maca', img: 'img/maca.png' },
    { name: 'mamao', img: 'img/mamao.png' },
    
    { name: 'banana', img: 'img/banana.png' },
    { name: 'morango', img: 'img/morango.png' },
    { name: 'uvas', img: 'img/uvas.png' },
    { name: 'laranja', img: 'img/laranja.png' },

];

cardArray.sort(() => 0.5 - Math.random()); // Embaralha as cartas

let gameBoard = document.getElementById('game-board');
let targetCard = null;
let attempts = 0;

function shuffleCards() {
    cardArray.sort(() => 0.5 - Math.random());
}

function showCardsForTime() {
    gameBoard.innerHTML = ''; // Limpar o tabuleiro
    cardArray.forEach((item, index) => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', index.toString());
        card.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
        gameBoard.appendChild(card);
    });

    setTimeout(() => {
        hideCards();
    }, 3000); // Mostrar as cartas por 3 segundos
}

function hideCards() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.innerHTML = `<div class="cover">?</div>`;
        card.addEventListener('click', flipCard);
    });
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    if (cardArray[cardId].name === targetCard.name) {
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
}

function startGame() {
    attempts = 0;
    shuffleCards();
    targetCard = cardArray[Math.floor(Math.random() * cardArray.length)];
    showCardsForTime();
}

function resetGame() {
    gameBoard.innerHTML = '';
    startGame();
}

startGame();
