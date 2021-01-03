function getColor(min, max, temp) {
  /* min: Minimum value
    max: Maximum value
    temp: The value to evaluate
  */
  var ratio = 1-  Math.pow((temp - min) / (max - min), 0.5);
  return ratio * 240;
}
function getMonth(index) {
  // index: From 0-11
  return ["January", "February", "March",
          "April", "May", "June",
          "July", "August", "September",
          "October", "November", "December"][index];
}
