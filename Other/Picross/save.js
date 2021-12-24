// Saves a value to a key
// Current keys:
// "dark": Dark Mode: script.js 34
// "size": Size: functions.js 372, 382
// "tile_count": # of tiles:
// "sol_grid": Solution Grid:
// "uncovered": Uncovered Tiles:
// "click_rows": Which values in RNDs are greyed:
// "click_cols": Which values in RNDs are greyed:

function save_key_value(key, value) {
  localStorage.setItem(key, value);
}


// Only here for debugging purposes, never actually used in code
function clear_storage() {
  localStorage.clear();
}
