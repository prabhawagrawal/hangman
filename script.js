function initializeHangmanImage() {
  document.getElementById('hangmanFigure').src = 'imgs/hg0.png';
}

window.onload = initializeHangmanImage;

const words = ['javascript', 'hangman', 'programming', 'computer', 'developer', "elephant", "bicycle", "sunshine", "cupcake", "telescope", "piano", "rainbow", "coconut", "fireworks", "castle", "chocolate", "butterfly", "watermelon", "adventure", "galaxy", "umbrella", "dragonfly", "mystery", "squirrel", "bubble", "lighthouse", "jellyfish", "paradise", "tornado", "mountain", "treasure", "pirate", "journey", "starfish", "penguin", "crocodile", "waterfall", "volcano", "mermaid", "carnival", "robot", "cactus", "seashell", "astronaut", "dragon", "moonlight", "garden", "snowflake", "galaxy", "adventure", "treasure", "butterfly", "dream", "magic", "apple", "banana", "orange", "strawberry", "pineapple", "kiwi", "grape", "blueberry", "peach", "pear", "mango", "lemon", "lime", "watermelon", "coconut", "avocado", "cherry", "apricot", "plum", "fig", "date", "pomegranate", "raspberry", "blackberry", "melon", "guava", "papaya", "dragonfruit", "tangerine", "lychee", "passionfruit", "cranberry", "gooseberry", "cat", "dog", "fish", "bird", "frog", "snake", "mouse", "rabbit", "hamster", "turtle", "pig", "cow", "horse", "goat", "sheep", "duck", "elephant", "lion", "tiger", "zebra", "giraffe", "monkey", "bear", "panda", "koala", "fox", "wolf", "deer", "squirrel", "rhinoceros", "hippopotamus", "crocodile", "alligator", "shark", "whale", "dolphin", "seal", "otter", "penguin", "octopus", "jellyfish", "starfish", "crab", "lobster", "butterfly", "bee", "ant", "spider", "snail"];
let chosenWord = '';
let guessedLetters = [];
let hangmanState = 0;

function chooseWord() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
  let display = '';
  for (let letter of chosenWord) {
    if (guessedLetters.includes(letter)) {
      display += letter + ' ';
    } else {
      display += '_ ';
    }
  }
  document.getElementById('word').textContent = display.trim();
}

function displayLetters() {
  let display = '';
  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    if (!guessedLetters.includes(letter)) {
      display += `<span onclick="guess('${letter}')">${letter}</span>`;
    }
  }
  document.getElementById('letters').innerHTML = display;
}

// Add event listener for keydown event on the document
document.addEventListener('keydown', function(event) {
  // Get the pressed key as lowercase
  const keyPressed = event.key.toLowerCase();
  // Check if the pressed key is an alphabet letter
  if (/^[a-z]$/.test(keyPressed)) {
    // Check if the letter has already been guessed
    if (!guessedLetters.includes(keyPressed)) {
      // Call the guess function with the pressed letter
      guess(keyPressed);
    }
  }
});


function guess(letter) {
  guessedLetters.push(letter);
  if (!chosenWord.includes(letter)) {
    hangmanState++;
    document.getElementById('hangmanFigure').src = 'imgs/hg' + hangmanState + '.png';
  }
  displayWord();
  displayLetters();
  checkWinOrLoss();
}

function checkWinOrLoss() {
  if (hangmanState >= 6) {
    document.getElementById('status').innerHTML = 'You lost! The word was: ' + chosenWord;
    setTimeout(resetGame, 2500);
  } else if (!document.getElementById('word').textContent.includes('_')) {
    document.getElementById('status').innerHTML = 'Congratulations! You won!';
    setTimeout(resetGame, 2500);
  }
}

function resetGame() {
  guessedLetters = [];
  hangmanState = 0;
  document.getElementById('hangman').textContent = '';
  document.getElementById('status').innerHTML = '';
  chooseWord();
  displayWord();
  displayLetters();
  initializeHangmanImage();
}

chooseWord();
displayWord();
displayLetters();
document.getElementById('reset').addEventListener('click', resetGame);