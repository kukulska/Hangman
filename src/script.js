let cities = [
  "Shanghai",
  "Mumbai",
  "Jakarta",
  "Tokyo",
  "Seoul",
  "Bangkok",
  "Chicago",
  "Wuhan",
  "Mumbai",
  "Houston",
  "Philadelphia",
  "Beijing",
  "Washington",
  "Alexandria",
  "London",
  "Paris",
];

let answer = "";
let maxWrong = 6;
let mistakes = 0;
let guessed = [];
let wordStatus = null;

function randomWord() {
  answer = cities[Math.floor(Math.random() * cities.length)];
}

function generateButtons() {
  let buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(generateLetters)
    .join("");

  let keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = buttonsHTML;
}

function generateLetters(letter) {
  return `<button
    class="letters"
    id="${letter}"
    onClick=handleGuess("${letter}")>${letter}</button>`;
}

function handleGuess(chosenLetter) {
  let chosenLetterUpperCase = chosenLetter.toUpperCase();
  if (guessed.indexOf(chosenLetter) === -1) {
    guessed.push(chosenLetter);
    guessed.push(chosenLetterUpperCase);
  }

  let letter = document.getElementById(chosenLetter);
  letter.setAttribute("disabled", true);

  if (
    answer.indexOf(chosenLetter) >= 0 ||
    answer.indexOf(chosenLetterUpperCase) >= 0
  ) {
    guessedWord();
    checkIfGameWon();
  } else {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function guessedLetter(letter) {
  if (guessed.indexOf(letter) >= 0) {
    return letter;
  } else {
    return `  __  `;
  }
}

function guessedWord() {
  wordStatus = answer.split("").map(guessedLetter).join("");

  let wordDisplay = document.getElementById("wordSpotlight");
  wordDisplay.innerHTML = wordStatus;
}

function updateHangmanPicture() {
  let currentPicture = document.getElementById("hangmanPic");
  currentPicture.src = `./images/hangman${mistakes}.jpg`;
}

function checkIfGameWon() {
  if (wordStatus === answer) {
    let winner = document.getElementById("keyboard");
    winner.innerHTML = "You Won!";
  }
}

function checkIfGameLost() {
  if (mistakes === maxWrong) {
    let answerCity = document.getElementById("wordSpotlight");
    answerCity.innerHTML = `The answer was: ${answer}`;
    let looser = document.getElementById("keyboard");
    looser.innerHTML = `Sorry, You lost!`;
  }
}

function updateMistakes() {
  let madeMistakes = document.getElementById("mistakes");
  madeMistakes.innerHTML = mistakes;
}

function reset() {
  mistakes = 0;
  guessed = [];
  let pictureStart = document.getElementById("hangmanPic");
  pictureStart.src = "./images/hangman0.jpg";

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
}

let maxWrongDisplay = document.getElementById("maxWrong");
maxWrongDisplay.innerHTML = maxWrong;

randomWord();
generateButtons();
guessedWord();
