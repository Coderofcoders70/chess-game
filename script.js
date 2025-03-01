let currentPlayer = "white";
let selectedPiece = null;
let timer = 0;
let timerInterval;
let boardState = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

function startTimer() {
    clearInterval(timerInterval);
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        let minutes = Math.floor(timer / 60).toString().padStart(2, '0');
        let seconds = (timer % 60).toString().padStart(2, '0');
        document.getElementById("timer").textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

function createBoard() {
    const board = document.getElementById("chessboard");
    board.innerHTML = "";
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square", (row + col) % 2 === 0 ? "white" : "black");
            square.dataset.row = row;
            square.dataset.col = col;
            square.textContent = boardState[row][col];
            square.addEventListener("click", handleMove);
            board.appendChild(square);
        }
    }
}

function isValidMove(startRow, startCol, endRow, endCol) {
    return boardState[endRow][endCol] === "" || boardState[endRow][endCol].charCodeAt(0) !== boardState[startRow][startCol].charCodeAt(0);
}

function handleMove(event) {
    const square = event.target;
    const row = parseInt(square.dataset.row);
    const col = parseInt(square.dataset.col);
    const piece = boardState[row][col];

    if (selectedPiece) {
        if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
            boardState[row][col] = boardState[selectedPiece.row][selectedPiece.col];
            boardState[selectedPiece.row][selectedPiece.col] = "";
            currentPlayer = currentPlayer === "white" ? "black" : "white";
            document.getElementById("status").textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)} to move`;
            document.getElementById("gameMessage").textContent = "Game in progress...";
            selectedPiece = null;
            createBoard();
        } else {
            selectedPiece = null;
        }
    } else if (piece !== "") {
        if ((currentPlayer === "white" && "♙♖♘♗♕♔".includes(piece)) || (currentPlayer === "black" && "♟♜♞♝♛♚".includes(piece))) {
            selectedPiece = { row, col };
        }
    }
}

function restartGame() {
    boardState = [
        ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
        ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", ""],
        ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
        ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
    ];
    selectedPiece = null;
    currentPlayer = "white";
    document.getElementById("status").textContent = "White to move";
    document.getElementById("gameMessage").textContent = "Game has restarted!";
    startTimer();
    createBoard();
}

startTimer();
createBoard();