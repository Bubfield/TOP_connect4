//state variables
const board = (() => {
  //returns 6 rows, 7 columns of an array of 0s
  const board = [];
  for (let i = 0; i < 6; i++) {
    board[i] = [];
    for (let j = 0; j < 7; j++) {
      board[i].push(0);
    }
  }
  return board;
})();

const players = [
  {
    name: "Player One",
    token: 1,
  },
  {
    name: "Player Two",
    token: 2,
  },
];

let activePlayer = players[0];

//function dealing with state
function executePlayerMove(column) {
  const availableColumnSquares = board
    .filter((row) => row[column] === 0)
    .map((row) => row[column]);

  if (!availableColumnSquares.length) return;

  const lowestRow = availableColumnSquares.length - 1;
  board[lowestRow][column] = activePlayer.token;
  //line 39 switches who is active player/player turn
  activePlayer = activePlayer === players[0] ? players[1] : players[0];
  console.log(board);
}

//UI DOM section
const boardDiv = document.querySelector(".board");

function updateActivePlayer() {
  const playerTurnText = document.querySelector(".turn");
  playerTurnText.textContent = `${activePlayer.name}'s turn...`;
}

function updateBoardFromState() {
  //line 54 clears board before it is generated
  boardDiv.textContent = "";
  board.forEach((row) => {
    row.forEach((square, index) => {
      const squareBtn = document.createElement("button");
      squareBtn.classList.add("cell");
      squareBtn.dataset.column = index;
      squareBtn.textContent = square;
      boardDiv.appendChild(squareBtn);
    });
  });
}

boardDiv.addEventListener("click", (e) => {
  executePlayerMove(e.target.dataset.column);
  updateActivePlayer();
  updateBoardFromState();
});

//app start
updateActivePlayer();
updateBoardFromState();
