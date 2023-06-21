# Wordle Clone

This project is a Wordle clone built using React.js and Bootstrap. Wordle is a popular word-guessing game where players have to guess a five-letter word by entering different words and receiving feedback on their guesses.

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the project dependencies.

## Usage

1. Run `npm start` to start the development server.
2. Open your web browser and visit `http://localhost:3000` to see the Wordle game.

## Features

### Guessing Words

- The player can enter a word into the input field and submit their guess.
- The word is validated and compared against the target word.
- Feedback is provided for each guess, indicating correct letters and their positions.
- Feedback includes green color for correct letters in the correct positions and yellow color for correct letters in the wrong positions.
- The incorrect letters are uncolored.

### Game State

- The player has a total of 6 guesses to find the word.
- Once the player guesses the word correctly, they win the game.
- If the player runs out of attempts without guessing the word correctly, they lose the game.

### Random Word Generation

- The target word is randomly generated per day from a predefined list of words.
- Each day a new word is chosen as the target.

## Technologies Used

- React.js: A JavaScript library for building user interfaces.
- Bootstrap: A popular CSS framework for creating responsive and mobile-first web pages.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify it for your own purposes.
