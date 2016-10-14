class Game {

  constructor(reader, callback) {
    this.reader = reader;
    this.stacks = [[3,2,1],[],[]];
    this.run(callback);
  }

  promptMove(callback) {
    console.log(this.stacks);
    this.reader.question(`From which stack? `, (stackOne) => {
      this.reader.question(`Where to? `, function (stackTwo) {
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

  run(completionCallback) {
    if (this.isWon()){
      console.log(`Congratulations!`);
      completionCallback();
      return;
    }
    this.promptMove( (startTowerIdx, endTowerIdx) => {
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }
      this.run(completionCallback);
    });
  }
}

module.exports = Game;
