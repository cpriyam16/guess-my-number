'use strict';

/**
 * Generates a random secret number between 1 and 20 (inclusive)
 * @type {number}
 */
let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);

/**
 * The current score of the player.
 * @type {number}
 */
let score = 20;

/**
 * The DOM element that displays the message to the user.
 * @type {HTMLElement}
 */
const messageText = document.querySelector('.message');

/**
 * The DOM element that displays the current score.
 * @type {HTMLElement}
 */
const scoreMessage = document.querySelector('.score');

/**
 * The DOM element that displays the secret number when guessed correctly.
 * @type {HTMLElement}
 */
const number = document.querySelector('.number');

/**
 * The highscore variable to store the highest score achieved.
 * @type {number}
 */
let highscore = 0;

/**
 * Displays the provided message in the message section.
 * @param {string} message - The message to be displayed.
 */
const displayMessage = function(message) {
    messageText.textContent = message;
};

/**
 * Event listener for the 'check' button click event. It processes the guess of the user.
 */
document.querySelector('.check').addEventListener('click', function() {
    // Get the guessed number from the input field.
    const guess = Number(document.querySelector('.guess').value);
    
    // If no number is provided.
    if (!guess) {
        displayMessage('⛔ No number typed ...');
    } else if (guess !== secretNumber) {
        // If guess is incorrect.
        if (score > 1) {
            displayMessage(guess > secretNumber ? '👆 Too high' : '👇 Too low');
            score--; // Decrease score on wrong guess.
            scoreMessage.textContent = score; // Update score on the screen.
        } else {
            displayMessage('⭕ Game Over !!!'); // Game over message when score reaches 0.
            scoreMessage.textContent = 0; // Set score to 0 on game over.
        }
    } else if (guess === secretNumber) {
        // If the correct number is guessed.
        displayMessage('🎉 Correct number !!!');
        number.textContent = secretNumber; // Display the secret number.
        number.style.width = '30rem'; // Adjust the width of the number display.
        document.querySelector('body').style.backgroundColor = '#60b347'; // Change background color on win.
        
        // Update the highscore if the current score is higher than the previous highscore.
        if (highscore < score) {
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }
});

/**
 * Event listener for the 'again' button click event. It resets the game.
 */
document.querySelector('.again').addEventListener('click', function() {
    // Reset the secret number and score.
    secretNumber = Math.trunc(Math.random() * 20) + 1;
    console.log(secretNumber);
    score = 20;

    // Reset the UI to the initial state.
    displayMessage('Start guessing...');
    scoreMessage.textContent = score;
    number.textContent = '?'; // Hide the secret number.
    number.style.width = '15rem'; // Reset the width of the number display.
    document.querySelector('.guess').value = ''; // Clear the input field.
    document.querySelector('body').style.backgroundColor = '#222'; // Reset background color.
});
