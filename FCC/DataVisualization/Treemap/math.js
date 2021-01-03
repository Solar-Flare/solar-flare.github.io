function colors(num) {
  var color = 325 / 18 * ((5 * num) % 18);
  return "hsl(" + color + ",100%,50%)";
}

function loadCoordinates(index) {
  var y = (index % 6) * 40;
  var x;
  if (index < 6) {
    x = 0;
  } else if (index < 12) {
    x = 40;
  } else {
    x = 80;
  }
  return [x,y];
}
