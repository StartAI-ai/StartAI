let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const cells = document.querySelectorAll('.cell');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (board[index] === '' && currentPlayer === 'X') {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            currentPlayer = 'O';
            if (!checkWinner()) {
                setTimeout(autoPlay, 500);
            }
        }
    });
});

function autoPlay() {
    let availableCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].textContent = 'O';
        currentPlayer = 'X';
        checkWinner();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            alert(`Player ${board[a]} ganhou!`);
            resetGame();
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

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
}
