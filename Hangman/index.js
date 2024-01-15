// Create element

const body = document.body;

const modal = document.createElement("div");
const content = document.createElement("div");
const modalText1 = document.createElement("h4");
const modalText2 = document.createElement("p");
const modalText3 = document.createElement("b");
const restart = document.createElement("button");
const container = document.createElement("div");
const hangman = document.createElement("div");
const gallows = document.createElement("img");
const hmGame = document.createElement("h1");
const gameBox = document.createElement("div");
const words = document.createElement("ul");
const hint = document.createElement("h4");
const textHint = document.createElement("b");
const incorrect = document.createElement("h4");
const incorrectText = document.createElement("b");
const keyboard = document.createElement("div");

// Add class

modal.className = "modal";
content.className = "content";
restart.className = "restart";
container.className = "container";
hangman.className = "hangman";
gameBox.className = "game-box";
words.className = "words";
hint.className = "hint";
textHint.className = "hint-text";
incorrect.className = "incorrect";
keyboard.classList.add("keyboard");

// add Text

modalText1.innerHTML = "Game Over!";
modalText2.innerHTML = "The correct word was:";
modalText3.innerHTML = " car";
restart.innerHTML = "Play Again";
hmGame.innerHTML = "Hangman Game";
hint.innerHTML = "Hint:";
textHint.innerHTML = " A";
incorrect.innerHTML = "Incorrect guesses:";
incorrectText.innerHTML = " 0 / 6";
hangman.innerHTML = "<img src'./images/gallows.svg' alt = 'gallows'";

// Add nesting

document.body.appendChild(modal);
document.body.appendChild(container);
modal.appendChild(content);
content.appendChild(modalText1);
content.appendChild(modalText2);
modalText2.appendChild(modalText3);
content.appendChild(restart);
container.appendChild(hangman);
gallows.src = "./images/hangman-0.svg";
gallows.alt = "gallows";
hangman.appendChild(gallows);
hangman.appendChild(hmGame);

container.appendChild(gameBox);
gameBox.appendChild(words);
gameBox.appendChild(hint);
hint.appendChild(textHint);
gameBox.appendChild(incorrect);
incorrect.appendChild(incorrectText);
gameBox.appendChild(keyboard);

let currentWord, correct, wrongGuess;
const maxGuesses = 6;

const gameReset = () => {
  // Reset Game
  correct = [];
  wrongGuess = 0;
  incorrectText.innerHTML = `${wrongGuess} / ${maxGuesses}`;
  gallows.src = `images/hangman-${wrongGuess}.svg`;
  words.innerHTML = currentWord
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  keyboard.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  modal.classList.remove("show");
};

// Random Word and Hint

const randomWord = () => {
  const { word, hint } = wordsL[Math.floor(Math.random() * wordsL.length)];
  currentWord = word;
	console.log(word);
  document.querySelector(".hint b").innerText = hint;
  gameReset();
};

const gameOver = (isVictory) => {
  // Victory or not?
  setTimeout(() => {
    const modalText = isVictory
      ? `You found the word`
      : `The correct word was:`;
    modal.querySelector("h4").innerText = `${
      isVictory ? "Congrats!" : "Game Over!"
    }`;
    modal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    modal.classList.add("show");
  }, 300);
};

const startGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    // Showing all correct letters
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correct.push(letter);
        words.querySelectorAll("li")[index].textContent = letter;
        words.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    // is not exist - update the wrongGuess and gallows
    wrongGuess++;
    gallows.src = `images/hangman-${wrongGuess}.svg`;
  }
  if (button) {
    button.disabled = true;
  }
  incorrectText.textContent = `${wrongGuess} / ${maxGuesses}`;

  if (wrongGuess === maxGuesses) {
    return gameOver(false);
  }
  if (correct.length === currentWord.length) {
    return gameOver(true);
  }
};

// Keyboard

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.textContent = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", (event) =>
    startGame(event.target, event.target.textContent)
  );
}

document.addEventListener("keydown", (event) => {
  if (event.key.match(/[a-z]/i)) {
    startGame(null, event.key.toLowerCase());
  }
});

randomWord();

restart.addEventListener("click", randomWord);
