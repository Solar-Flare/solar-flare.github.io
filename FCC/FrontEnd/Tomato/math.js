function increment(value) {
  return (value == 60 ? 60 : value + 1);
}

function decrement(value) {
  return (value == 1 ? 1 : value - 1);
}

function display(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = seconds % 60;
  if (min < 10) {
    min = "0" + min;
  } else { min = min.toString(); }
  if (sec < 10) {
    sec = "0" + sec;
  } else { sec = sec.toString(); }
  return (min+":"+sec);
}
