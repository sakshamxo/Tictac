const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll('[data-cell]');
const gameBoard = document.querySelector('.game-board');
const restartButton = document.querySelector('.restart-button');
const gameStatus = document.querySelector('.game-status');
let oTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    oTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true});
    });
    setBoardHoverClass();
    gameStatus.innerText = "";
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        gameStatus.innerText = "Draw!";
    } else {
        gameStatus.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    cellElements.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
}

function setBoardHoverClass() {
    gameBoard.classList.remove(X_CLASS);
    gameBoard.classList.remove(O_CLASS);
    if (oTurn) {
        gameBoard.classList.add(O_CLASS);
    } else {
        gameBoard.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBOS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}
