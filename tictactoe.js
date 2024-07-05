const boardElement = document.getElementById("board");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");
const restartButton = document.getElementById("restart");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let scoreX = 0;
let scoreO = 0;
let roundsPlayed = 0;

function createBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => makeMove(index));
    boardElement.appendChild(cellElement);
  });
}

function makeMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    createBoard();
    checkWinner();
  }
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showWinner(board[a]);
      updateScore(board[a]);
      return;
    }
  }
  if (!board.includes("")) {
    alert("It's a tie!");
    resetGame();
  }
}

function showWinner(winner) {
  const winnerPopup = document.createElement("div");
  winnerPopup.style.display = "flex";
  winnerPopup.style.position = "fixed";
  winnerPopup.style.top = "50%";
  winnerPopup.style.left = "50%";
  winnerPopup.style.transform = "translate(-50%, -50%)";
  winnerPopup.style.padding = "20px";
  winnerPopup.style.backgroundColor = "rgb(255, 255, 255)";
  winnerPopup.style.border = "1px solid rgb(0, 0, 0)";
  winnerPopup.style.borderRadius = "10px";
  winnerPopup.style.boxShadow = "rgba(0, 0, 0, 0.5) -1px -1px 20px 7px";
  winnerPopup.style.alignItems = "center";
  winnerPopup.style.flexDirection = "column";
  winnerPopup.innerHTML =  `<p>Player ${winner} wins!</p><button onclick="closePopup(this)">Close</button>`
  document.body.appendChild(winnerPopup);
}

function closePopup(button) {
  const popup = button.parentElement;
  popup.remove();
  resetGame();
}

function updateScore(winner) {
  if (winner === "X") {
    scoreX++;
  } else {
    scoreO++;
  }
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
  roundsPlayed++;
  if (roundsPlayed === 4) {
    declareOverallWinner();
  }
}

function declareOverallWinner() {
  if (scoreX > scoreO) {
    alert("Player X wins the game!");
  } else if (scoreO > scoreX) {
    alert("Player O wins the game!");
  } else {
    alert("The game is a tie!");
  }
  resetScore();
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  createBoard();
}

function resetScore() {
  scoreX = 0;
  scoreO = 0;
  roundsPlayed = 0;
  scoreXElement.textContent = scoreX;
  scoreOElement.textContent = scoreO;
  resetGame();
}

restartButton.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetScore);

createBoard();