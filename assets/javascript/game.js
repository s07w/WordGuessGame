wordBank = [
    "unix",
    "ddos",
    "1337",
    "nedry",
    "root",
    "bios",
    "swordfish",
    "zerocool",
    "basic",
    "gibson",
    "mainframe"
];

const maxGuesses = 7;
var guessedLetters = [];
var currentWordIndex;
var mysteryWord;
var guessesLeft = 0;
var gameStart = false;
var gameOver = false;
var wins = 0;

// resets global variables and clears game functions
function reset(){

    guessesLeft = maxGuesses;

    currentWordIndex = Math.floor(Math.random() * (wordBank.length));

    // reset arrays
    guessedLetters = [];
    mysteryWord = [];
 
    // clear image
    document.getElementById("hangmanImg").src="";

    // select new word and replace letters with "_"
    for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
        mysteryWord.push("_");
    }
    
    //hide win/lose screens/txt
    document.getElementById("tryAgain").style.cssText = "display:none";
    document.getElementById("lose-img").style.cssText = "display:none";
    document.getElementById("win-img").style.cssText= "display:none";

    updateDisplay();

};

//updates HTML page

function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;

    // display how much of word has been guessed
    var guessingWordText = "";
    for (var i = 0; i < mysteryWord.length; i++) {
        guessingWordText += mysteryWord[i];
    } 


    document.getElementById("currentWord").innerText = guessingWordText;
    document.getElementById("guessesLeft").innerText = guessesLeft;
    document.getElementById("guessedLetters").innerText = guessedLetters;
};

//updates hangman-img based on guess result. thanks d orlovsky for this method
    function updateHangmanImg() {
        document.getElementById("hangmanImg").src = "assets/images/" + (maxGuesses - guessesLeft) + ".png";
    };

// take letter from array, check index for all instances of it
// and replace "_" with the letter. 
function evaluateGuess (letter) {
    var positions = [];

for (var i = 0; i < wordBank[currentWordIndex].length; i++) {
    if(wordBank[currentWordIndex][i] === letter) {
        positions.push(i);
    }
}

//decrement guesses or increment guess word by one letter if correct
if (positions.length <= 0) {
    guessesLeft--;
    updateHangmanImg();
} else {
    for(var i = 0; i <positions.length; i++) {
        mysteryWord[positions[i]] = letter;
    }
}
};

function checkWin() {
    if(mysteryWord.indexOf("_") === -1) {
        document.getElementById("win-img").style.cssText = "display:block";
        document.getElementById("tryAgain").style.cssText = "display: block";
        wins++;
        gameOver = true;
    }
};

function checkLoss() {
    if(guessesLeft <= 0) {
    document.getElementById("lose-img").style.cssText = "display: block";
    document.getElementById("tryAgain").style.cssText = "display: block";
    gameOver = true;
    }
};

// when user presses key for guess, returns this:
function makeGuess (letter) {
    if (guessesLeft > 0) {
        if (!gameStart) {
            gameStart = true;
        }

        if(guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }
}

// key event. uses 48-90 so user can only guess alphanumeric event keycodes
// included the top row of numbers for the super secret mystery "word"
document.onkeyup = function(event) {
    if(gameOver) {
        reset();
        gameOver = false;
    } else {
        if(event.keyCode >= 48 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
            updateDisplay();
            checkWin();
            checkLoss();
        }
    }
};