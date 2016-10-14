const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const Game = require('./game.js');

let callback = function () {
  reader.question("Want to play again? (y, n) \n", (response) => {
    if (response === "y"){
      let newGame = new Game(reader, callback);
    }
    else {
      console.log("Bye bye!");
      reader.close();
    }
  });
};

let game = new Game(reader, callback);
