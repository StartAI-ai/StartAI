import apiService from '../../IA/ApiService.js';
import { navigateTo } from '../../routes/routes.js';


let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');
let currentCell = 0; // Controla a célula destacada
let winningCombo = []; // Armazena a combinação vencedora

// Adiciona o evento de clique para cada célula do tabuleiro
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

var controle = false;

const userIcons = document.querySelectorAll('.user-icon');
    
userIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        console.log('Ícone do usuário clicado'); // Verifique se isso é exibido
        navigateTo('login');
    });
});

let timerInterval;
let seconds = 0;
let minutes = 0;

function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timer').textContent = timeString;
}

function startTimer() {
    timerInterval = setInterval(updateTimer, 2000);
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    document.getElementById('timer').textContent = '00:00';
    document.getElementById('score').textContent = '000';
}

// Extrai o parâmetro da URL
const urlParams = new URLSearchParams(window.location.search);
const controlType = urlParams.get('controlType');

// Inicia o seletor com base no parâmetro
startSelector(controlType);

function startSelector(param) {
    if (param === 'teclado') {
        squares.forEach(square => {
            square.addEventListener('click', handleSquareClick);
        });
    } else {
        startGame();
    }
}


// Função para iniciar o jogo
async function startGame() {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'block'; 

    if(controlType == 'ocular'){
        apiService.getBlinkData('http://localhost:3000/conectado/olho').subscribe((data) => {

            if(data.success){
                spinner.style.display = 'none'; 
                highlightNextCell();
                setInterval(moveToNextCell, 2000);    
                startTimer();    
            }
    
            if(data.piscada){
                handleCellClick(currentCell);
            }
        });
    }

    if(controlType == 'luva'){
        apiService.getBlinkData('http://localhost:3000/conectado/luva').subscribe((data) => {
    
            if(data.piscada){
                if(!controle){
                    var controle = true;
                    spinner.style.display = 'none'; 
                    highlightNextCell();
                    setInterval(moveToNextCell, 2000);    
                }
                handleCellClick(currentCell);
            }
        });
    }


    
}

// Função para lidar com o clique nas células
function handleCellClick(index) {
    // Verifica se a célula está vazia, se é a vez do jogador humano e se é a célula destacada
    if (board[index] === '' && currentPlayer === 'X' && index === currentCell) {
        board[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
        currentPlayer = 'O';
        if (!checkWinner()) {
            // Espera 500ms antes do bot jogar
            setTimeout(autoPlay, 1000);
        }
    }
}

// Função para destacar a próxima célula em ordem de coluna e linha
function highlightNextCell() {
    // Remove o destaque de todas as células
    cells.forEach(cell => cell.classList.remove('highlight'));

    // Destaca a célula atual
    cells[currentCell].classList.add('highlight');
}

// Função que faz o bot jogar
function autoPlay() {
    let bestMove = findBestMove();
    if (bestMove !== null) {
        board[bestMove] = 'O';
        cells[bestMove].textContent = 'O';
        currentPlayer = 'X';
        currentCell = (bestMove + 1) % 9; // Reinicia a célula destacada
        highlightNextCell(); // Destaca a próxima célula após o movimento do bot
        if (!checkWinner()) {
            // Verifica novamente após o movimento do bot
            checkWinner();
        }
    }
}

// Função para encontrar a melhor jogada para o bot
function findBestMove() {
    // Verifica se o bot pode ganhar
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWinnerSimulation('O')) {
                board[i] = ''; // Reverte a mudança
                return i;
            }
            board[i] = ''; // Reverte a mudança
        }
    }

    // Verifica se o bot precisa bloquear o jogador humano
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWinnerSimulation('X')) {
                board[i] = ''; // Reverte a mudança
                return i;
            }
            board[i] = ''; // Reverte a mudança
        }
    }

    // Se não houver jogada de vitória ou bloqueio, escolhe uma jogada aleatória
    let availableCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    if (availableCells.length > 0) {
        return availableCells[Math.floor(Math.random() * availableCells.length)];
    }
    return null;
}

// Função para simular uma verificação de vitória sem alterar o tabuleiro original
function checkWinnerSimulation(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] === player && board[a] === board[b] && board[a] === board[c]) {
            return combo; // Retorna a combinação vencedora
        }
    }
    return null;
}

// Função para verificar se há um vencedor ou empate
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winningCombo = combo; // Armazena a combinação vencedora
            setTimeout(() => {
                drawWinningLine(combo); // Desenha a linha vencedora
                alert(`Player ${board[a]} ganhou!`);
                resetGame();
            }, 500); // Atraso para permitir a visualização do último movimento
            return true;
        }
    }
    if (!board.includes('')) {
        alert('É um empate!!');
        resetGame();
        return true;
    }
    return false;
}

// Função para desenhar a linha vencedora
function drawWinningLine(combo) {
    const [a, b, c] = combo;
    const startCell = cells[a].getBoundingClientRect();
    const endCell = cells[c].getBoundingClientRect();

    // Cria uma linha para a vitória
    const line = document.createElement('div');
    line.className = 'winning-line';
    document.querySelector('.board').appendChild(line);

    // Define a posição e o comprimento da linha
    const width = Math.sqrt(Math.pow(endCell.left - startCell.left, 2) + Math.pow(endCell.top - startCell.top, 2));
    const angle = Math.atan2(endCell.top - startCell.top, endCell.left - startCell.left) * 180 / Math.PI;

    line.style.left = `${startCell.left + startCell.width / 2}px`;
    line.style.top = `${startCell.top + startCell.height / 2}px`;
    line.style.width = `${width}px`;
    line.style.transformOrigin = '0 0';
    line.style.transform = `rotate(${angle}deg)`;
}

// Função para resetar o jogo
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('highlight');
    });
    currentPlayer = 'X';
    currentCell = 0; // Reinicia a célula destacada
    winningCombo = []; // Limpa a combinação vencedora

    // Remove a linha vencedora
    const winningLine = document.querySelector('.winning-line');
    if (winningLine) {
        winningLine.remove();
    }

    highlightNextCell(); // Inicia o destaque das células
}

// Função para mover a seleção de célula para a próxima
function moveToNextCell() {
    currentCell = (currentCell + 1) % 9; // Move para a próxima célula circularmente
    highlightNextCell();
}

