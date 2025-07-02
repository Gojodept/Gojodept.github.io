function doMath(x, y, callback) {
  const sum = x + y;
  callback(sum);
}

function printResult(result) {
  console.log("Result:", result);
}

doMath(5, 10, printResult);

