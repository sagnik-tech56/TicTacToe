//<DOM Manipulation>
//<Function Declaration>
//<Array Methods>
//<Event Handling>
//<Conditional Statements>
//<Random Number Generation>
//<Updating Element Values>

const array = [1,2,3,4,5];
let foundElement;

// Iterator is like a person who repeats a process or iteration
// Array is an iterator collection

// find is an iterative function

// Using array.find
// 1st way
function findMe(element) {
    return (element > 3);
}
foundElement = array.find(findMe); // Returns the first element which triggers true with the custom function
console.log(foundElement);

// 2nd way
foundElement = array.find(function(element){
    return (element>3);
}); // Using a temporary function
console.log(foundElement);

// 3rd way (recommended)
foundElement = array.find((element) => {
    return (element > 3);
}); // Using lambda function
console.log(foundElement);

// 4th way
foundElement = array.find(element => {
    return (element > 3);
}); // Using modified lambda function
console.log(foundElement);

let boardValues = Array(9).fill(""); // Filling an array with default values
// let BoardValues = [" ", " ", " ", " ", " ", " ", " ", " ", " "]; // Doing is manually
let cellValues = [];
let currentPlayer = "X";

const boardElement = document.getElementById("board");
for (let i=0; i<9; i++){
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.addEventListener("click", () => playerMove(i));
    boardElement.appendChild(cell);
    cellValues.push(cell);
}
updateBoard();

function updateBoard() {
    for (let i=0; i<cellValues.length; i++){
        cellValues[i].textContent = boardValues[i];
    }
}
function playerMove(index) {
    if (boardValues[index] == ""){
        boardValues[index] = "X";
        updateBoard();
        if (checkWinner("X")) endGame("You Win");
        else if (isDraw()) endGame("Draw");
        else computerMove();
    }
}

function computerMove() {
    let move = findBestMove();
    boardValues[move] = "O"
    updateBoard();
    if (checkWinner("O")) endGame("Computer Win");
    else if (isDraw()) endGame("Draw");
}

function endGame(message) {
    document.getElementById("message").textContent = message;
    setTimeout(resetGame, 2000);
}

function resetGame() {
    boardValues.fill("");
    document.getElementById("message").textContent = "";
    updateBoard();
}

function isDraw() {
    return boardValues.every((pocket) => { // Checks all values in the array with given condition
        return (pocket != "");
    })
}

function checkWinner(player) {
    var wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    for (let j=0; j<wins.length; j++){
        var combo = wins[j];
        var isWinning = true;
        for (let i=0; i<combo.length; i++){
            if (boardValues[combo[i]] != player){
                isWinning = false;
                break;
            }
        }
        if (isWinning)
            return true;
    }
    return false;
}

function findBestMove() {
    for (let i=0; i<9; i++){
        if (boardValues[i] === "" && canWin(i, "O"))
            return i;
    }
    for (let i=0; i<9; i++){
        if (boardValues[i] === "" && canWin(i, "X"))
            return i;
    }
    if (boardValues[4] === "")
        return 4;
    return [0,2,6,8].find((i) => boardValues[i] === "") || boardValues.findIndex((i) => i === "");
}

function canWin(index, player) {
    boardValues[index] = player;
    let win = checkWinner(player);
    boardValues[index] = "";
    return win;
}