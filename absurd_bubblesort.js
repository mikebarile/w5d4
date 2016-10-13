const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function absurdBubbleSort(arr, sortCompletionCallback) {
  let outerBubbleSortLoop = function(madeAnySwaps){
    if (madeAnySwaps === true) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    }
    else {
      sortCompletionCallback(arr);
    }
  };
  outerBubbleSortLoop(true);
}

function askIfGreaterThan(el1, el2, callback) {

  reader.question(`Which is bigger? ${el1} or ${el2}?\n`, function (strNum){
    const response = parseInt(strNum);
    if (el1 === el2) {
      callback(false);
    }
    else if (response === el1) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], (isGreaterThan) => {
      if (isGreaterThan === true) {
        let dummy = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = dummy;
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    });
  } else if (i === (arr.length - 1)) {
    outerBubbleSortLoop(madeAnySwaps);
  }
}

absurdBubbleSort([2,3,4,6], arr => {
  reader.close();
  console.log(arr);
});
