const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, cb) {
  if (numsLeft > 0) {
    reader.question("Enter a number: ", function (strNum){
      const num = parseInt(strNum);
      sum = sum + num;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, cb);
    });
  }
  else if (numsLeft === 0) {
    cb(sum);
    reader.close();
  }
}
addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));
