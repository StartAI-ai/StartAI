import { navigateTo } from '../../routes/routes.js';
import apiService from '../../IA/ApiService.js';

let currentIndex = 0;
const squares = document.querySelectorAll('.game');

// Função para selecionar o próximo quadrado
function selectNextSquare() {
    squares.forEach(square => square.classList.remove('selected'));

    squares[currentIndex].classList.add('selected');

    currentIndex = (currentIndex + 1) % squares.length;
}

// Função para iniciar o seletor
function startSelector(param) {
    // if (param === 'teclado') {
        
    // } else {
    //     startGame();
    // }

    squares.forEach(square => {
        square.addEventListener('click', handleSquareClick);
    });
}

// Função para lidar com o clique no quadrado
function handleSquareClick(event) {
    // if (controlType === 'teclado') {
        
    // }

    const gameId = event.currentTarget.id;
        switch (gameId) {
            case 'square1':
                navigateTo({}, { controlType });
                break;
            case 'square2':
                navigateTo({}, { controlType });
                break;
            case 'square3':
                navigateTo('jogoVelha', { controlType });
                break;
            default:
                navigateTo('jogoMemoria', { controlType });
                break;
        }
}

// Função para iniciar o jogo
function startGame() {

    apiService.onData((data) => {

        console.log(data);

        if(data.success){
            setInterval(selectNextSquare, 2000);
            selectNextSquare();     
        }
            
        if(data.piscada){
            showSelectedGame();
            apiService.closeConnection();
        }
      });
}

// Extrai o parâmetro da URL
const urlParams = new URLSearchParams(window.location.search);
const controlType = urlParams.get('controlType');

// Inicia o seletor com base no parâmetro
startSelector(controlType);

// Função para exibir o jogo selecionado
function showSelectedGame() {
    const selectedSquare = document.querySelector('.game.selected');
    if (selectedSquare) {
        const gameId = selectedSquare.id;

        switch (gameId) {
            case 'square1':
                navigateTo({}, { controlType });
                break;
            case 'square2':
                navigateTo({}, { controlType });
                break;
            case 'square3':
                navigateTo('jogoVelha', { controlType });
                break;
            default:
                navigateTo({}, { controlType });
                break;
        }
    }
}
