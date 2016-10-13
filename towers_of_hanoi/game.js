const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Game {

  constructor() {
    this.stacks = [[3,2,1],[],[]];
  }

  promptMove(callback) {
    console.log(this.stacks);
    reader.question(`From which stack? `, function (stackOne) {
      reader.question(`Where to? `, function (stackTwo) {
        const startTowerIdx = parseInt(stackOne);
        const endTowerIdx = parseInt(stackTwo);

        callback(startTowerIdx, endTowerIdx);
      });
    });
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    let st = this.stacks;
    let firstRing = st[startTowerIdx][st[startTowerIdx].length - 1];
    let lastRing = st[endTowerIdx][st[endTowerIdx].length - 1];
    if (lastRing === undefined) {
      return true;
    }
    else if (firstRing === undefined){
      return false;
    }
    else if (firstRing < lastRing) {
      return true;
    }
    else {
      return false;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.stacks[endTowerIdx].push(this.stacks[startTowerIdx].pop());
      return true;
    }
    else {
      return false;
    }
  }

  print() {
    console.log(this.stacks);
  }

  isWon() {
    if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
      return true;
    }
    else {
      return false;
    }
  }

  run() {
    console.log(`won? ${this.isWon}`);
    while (!this.isWon) {
      this.promptMove(this.move);
    }
    console.log(`Congratulations!`);
  }

}

let game = new Game();
game.run();

// console.log(game.move(0, 1));
// console.log(game.stacks);
// console.log(game.move(1, 0));
// console.log(game.stacks);
// console.log(game.move(2, 0));
// console.log(game.stacks);

// console.log(game.isValidMove(0, 1)); // should work
// console.log(game.isValidMove(1, 0)); // shouldn't work
