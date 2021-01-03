function display(value) {
  var min = Math.floor(value / 60)
  var sec = value % 60;
  if(sec == 0) {
    return parseInt(min) + ":00";
  }
  return parseInt(min) + ":" + parseInt(sec);
}
