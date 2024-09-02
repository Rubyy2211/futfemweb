let answer = "";
let currentRow = 0;
let currentTile = 0;
const maxRows = 6;
// Llamada a la API para obtener la palabra
fetch('../api/nombres')
    .then(response => response.json())
    .then(data => {
        answer = data.toLowerCase(); // Asigna la palabra obtenida a la variable 'answer'
        createBoard();
        //createKeyboard();
    })
    .catch(error => {
        console.error('Error fetching word:', error);
        displayMessage('Error loading word.');
    });
function createBoard() {
    const board = document.getElementById("board");
    for (let i = 0; i < maxRows; i++) {
        for (let j = 0; j < 5; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.maxLength = 1; // Limitar a un solo carácter
            input.classList.add("tile");
            input.setAttribute("id", `row-${i}-tile-${j}`);
            input.addEventListener("input", moveToNextTile); // Mover al siguiente input automáticamente
            board.appendChild(input);
        }
    }
}
function moveToNextTile(event) {
    const input = event.target;
    const currentTileId = input.getAttribute("id");
    const [_, row, __, tile] = currentTileId.split("-");

    if (input.value.length === 1 && parseInt(tile) < 4) {
        const nextTile = document.getElementById(`row-${row}-tile-${parseInt(tile) + 1}`);
        nextTile.focus();
    } else if (input.value.length === 1 && parseInt(tile) === 4) {
        // Automatically check the word if on the last tile
        checkWord();
    }
}
function checkWord() {
    const guess = [];
    for (let i = 0; i < 5; i++) {
        const input = document.getElementById(`row-${currentRow}-tile-${i}`);
        guess.push(input.value.toLowerCase());
    }

    if (guess.join("") === answer) {
        displayMessage("¡Correcto! Has ganado.");
        colorTiles(guess);
    } else {
        colorTiles(guess);
        currentRow++;
        if (currentRow === maxRows) {
            displayMessage(`¡Has perdido! La palabra era: ${answer}.`);
        } else {
            const firstTile = document.getElementById(`row-${currentRow}-tile-0`);
            firstTile.focus(); // Mover el foco a la siguiente fila
        }
    }
}
function colorTiles(guess) {
    const letterCount = {};

    for (let i = 0; i < answer.length; i++) {
        const letter = answer[i];
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    }

    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById(`row-${currentRow}-tile-${i}`);
        const letter = guess[i];

        if (letter === answer[i]) {
            tile.classList.add("correct");
            letterCount[letter]--;
        } else if (answer.includes(letter) && letterCount[letter] > 0) {
            tile.classList.add("present");
            letterCount[letter]--;
        } else {
            tile.classList.add("absent");
        }
    }
}
function displayMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}
