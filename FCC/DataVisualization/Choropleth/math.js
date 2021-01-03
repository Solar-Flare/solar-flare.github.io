function color(min, max, value) {
  var stat = 90 - ((value - min) / (max - min)) * 50;
  return "hsl(185, 100%, " + stat + "%)";
}
