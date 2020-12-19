function operation(val1, val2, symb) {
  switch(symb) {
    case "+":
      return val1 + val2;
    case "-":
      return val1 - val2;
    case "*":
      return val1 * val2;
    case "/":
      return (val1 / val2);
  }
}


function arrayOperation(arr) {
  if (arr.length % 2 == 0) {
    arr.pop();
  }
  if (arr.length == 0) {
    return 0;
  }
  for (var i = 1; i < arr.length; i+=2) {
    if (arr[i] == "*" || arr[i] == "/") {
      var value = operation(arr[i-1], arr[i+1], arr[i]);
      arr.splice(i-1, 3, value);
      i -= 2;
    }
  }
  for (var i = 1; i < arr.length; i+=2) {
    var value = operation(arr[i-1], arr[i+1], arr[i]);
    arr.splice(i-1, 3, value);
    i -= 2;
  }
  console.log(arr);
  return arr[0];
}

function appendToArray(arr, val) {
  var ops = ["+", "-", "*", "/"];
  var valInOps = ops.includes(val);
  console.log(arr);

  if (arr.length == 0) {
    if (valInOps) { return arr; }
    arr.push(val);
    return arr;
  }

  if (valInOps) {
    if (ops.includes(arr.slice(-1)[0])) {
      arr.pop();
      arr.push(val);

      return arr;
    }
    arr.push(val);
    return arr;
  }
  if (ops.includes(arr.slice(-1)[0])) {
    arr.push(val);
    return arr;
  }
  return arr;
}

function append(val1, val2) {
  if (val1 == "") {
    if (val2 == ".") {
      return "0.";
    }
    return val2;
  }
  return (val2 == "." ? (val1.includes(".") ? val1 :  val1 + val2) : val1 == "0" ? val2 : val1 + val2);
}
