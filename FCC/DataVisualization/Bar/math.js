function convert(string) {
  return parseInt(string.slice(0,4)) + potato(parseInt(string.slice(5,7)));
}

function potato(value) {
  return (value - 1) / 3 * 0.25;
}
