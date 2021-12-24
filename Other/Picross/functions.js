/*
Display Functions (CSS)
*/

function generatetiles() {
  //Generates and displays the 15x15 grid

  var row = document.createElement("tr"); // Row 1: The column number displays + Top Left Corner block
  var box = document.createElement("td"); // Top Left Corner Box
  box.className = "LCBox";
  row.appendChild(box);


  //Class Names. Size of elements determined here depending on size
  var columnName = "CND-large";
  var rowName = "RND-large";
  var tileName = "tile-large";
  if (size > 20) {
    columnName = "CND-small";
    rowName = "RND-small";
    tileName = "tile-small";
  } else if (size > 10) {
    columnName = "CND-medium";
    rowName = "RND-medium";
    tileName = "tile-medium";
  }

  // Append the column number displays
  for (var i = 0; i < size; i++) {
    var col = document.createElement("td");

    col.className = "ColNumDisplay";
    col.classList.add(columnName);

    // Add class to display grey border for every 5th column display
    if (i % 5 == 4 && i != size-1) {
      col.classList.add("CND-5");
    } else if (i % 5 == 0 && i != 0) {
      col.classList.add("CND-0");
    }

    col.id = "CND_" + String(i);
    row.appendChild(col);
  }
  grid.appendChild(row);


  // Append all other rows
  // Each row consists of row number display + size numbers of tiles
  for (var i = 0; i < size; i++){


    var line_row = document.createElement("tr");

    //Row Display
    var rowDisplay = document.createElement("td");
    rowDisplay.className = "RowNumDisplay";
    rowDisplay.classList.add(rowName);

    // Add class to display grey border for every 5th row display
    if (i % 5 == 4 && i != size-1) {
      rowDisplay.classList.add("RND-5");
    } else if (i % 5 == 0 && i != 0) {
      rowDisplay.classList.add("RND-0");
    }

    rowDisplay.id = "RND_" + String(i);
    line_row.appendChild(rowDisplay);

    // Add tiles
    for(var j = 0; j < size; j += 1) {
      var td = document.createElement("td");
      td.id = String(i) + "_" + String(j);
      td.className = tileName;
      td.classList.add("tile");
      td.classList.add(get_tile_class(i,j, size));
      line_row.appendChild(td);
    }
    grid.appendChild(line_row);
  }
}


function display_numbers() {
  // Figures out the numbers for each row, column display and displays it

  // Determines size of Top Left Box
  if (size <= 10) {
    $(".LCBox").css("width", maxRowNumbers*16);
  } else if (size <= 20) {
    $(".LCBox").css("width", maxRowNumbers*14);
  } else {
    $(".LCBox").css("width", maxRowNumbers*10);
  }

  var row_temp;
  var col_temp;
  // Loops over all rows, column displays
  for (var i = 0; i < size; i++) {
    row_temp = [0];
    col_temp = [0];

    // Row Display
    var row_index = "#RND_" + String(i);
    var rowNumDisplay = $(row_index);
    var rowString = "";
    var rowValues = solution_rows[i];
    for (var j = 0; j < rowValues.length; j++) {
      rowString += "<span class=\"clickable\" id=R" + String(i) + "_" + String(j) + ">" + String(rowValues[j]) + "</span> ";
      row_temp.push(0);
    }
    rowNumDisplay.html(rowString);
    clickable_rows.push(row_temp);

    // Column Display
    var colString = "";
    var col_index = "#CND_" + String(i);
    var colNumDisplay = $(col_index);
    var colValues = solution_columns[i];
    var colLength = colValues.length;
    for (var j = 0; j < maxColNumbers - colLength; j++) {
      colString += "<br>";
    }
    for (var j = 0; j < colLength - 1; j++) {
      colString += "<span class=\"clickable\" id=C" + String(i) + "_" + String(j) + ">" + String(colValues[j]) + "</span><br>";
      col_temp.push(0);
    }
    colString += "<span class=\"clickable\" id=C" + String(i) + "_" + String(j) + ">" + String(colValues[colLength - 1]) + "</span>";
    colNumDisplay.html(colString);
    clickable_cols.push(col_temp);
  }
}




function get_tile_class(i,j) {
  // Determines the classes for each tile
  // So that every 5th line for both row and column is black
  // i: x coordinate of tile
  // j: y coordinate of tile
  // Both: (0,0) is top left corner, and y is inverted (down is positive)

  var top = (i % 5 == 4 && i != size - 1);
  var bottom = (i % 5 == 0 && i != 0);
  var left = (j % 5 == 0 && j != 0);
  var right = (j % 5 == 4 && j != size - 1);

  if (top) {
    if (left) {
      return "tile-sl";
    }
    if (right) {
      return "tile-sr";
    }
    return "tile-s";
  } else if (bottom) {
    if (left) {
      return "tile-bl";
    }
    if (right) {
      return "tile-br";
    }
    return "tile-b";
  }
  if (left) {
    return "tile-l";
  }
  if (right) {
    return "tile-r";
  }
  return "tile-n";
}


function generate_puzzle() {

  // Generates a puzzle
  // Randomly tiles between 50% to 65%, shuffles it, then pushes the resulting
  // grid to solution_grid
  var min_size = Math.round(0.5 * size * size);
  var max_size = Math.round(0.65 * size * size);
  total_amount = min_size + Math.round((max_size - min_size) * Math.random());
  save_key_value("tile_count", String(total_amount));
  // Resets solution_grid, uncovered_grid as we're generating a new one
  solution_grid = [];
  uncovered_grid = [];

  var value_grid = Array.from({length: size * size}, (x,i) => i);
  var position_grid = Array.from({length: size * size}, (x) => 0);
  var marked_element_list = value_grid.sort((x) => 0.5 - Math.random()).slice(0, total_amount);

  marked_element_list.forEach((x,i) => position_grid[x] = 1);

  for (var i = 0; i < size; i++) {

    uncovered_grid.push(new Array(size).fill(-1));
    solution_grid.push(position_grid.slice(size*i, size*i+size));
  }


}

/*
Click Functions
*/
function detect_click(type, tile, toAnchor) {
  // Triggered when a tile detects click (or is moused over while clicked)
  // type: left (true), right (false) click, only here to be passed to on_tile_click
  // tile: The html element of the tile that is clicked
  // toAnchor: true if the tile was clicked on, false if mouseovered while holding click
  // ^Used to set anchor_coordinates to ensure only tiles in straight line are effected in a single click & drag

  var id = tile.attr('id').split("_");
  var x = parseInt(id[1]);
  var y = parseInt(id[0]);
  if (toAnchor) {
    anchor_coordinates = [x,y];
    on_tile_click(x,y,type, tile);
  } else if (anchor_coordinates[0] == x || anchor_coordinates[1] == y) {
    on_tile_click(x,y,type, tile);
  }
}

function on_tile_click(x, y, type, tile) {
  // Checks with solution_grid on tile clicked
  // Marks the true value, and puts an x and updates mistakes if user picked wrong option
  // Also marks it on uncovered_grid

  // x: x coordinate of tile
  // y: y coordinate of tile
  // type: User input (True: 1, False: 0)
  // tile: html element of tile

  var true_val = solution_grid[y][x];
  tile.addClass("s-tile");
  if (true_val == 0) {
    tile.addClass("s-tile-0"); // True negative
  }
  else {
    tile.addClass("s-tile-1"); // True positive
  }

  // If incorrect: updates mistakes and marks x on tile
  if (true_val != type) {
    tile.html("x");
    errors += 1;
    $("#mistakes").html(String(errors));
    $("#mistakes").css("color", "red");
  }
  uncovered_grid[y][x] = type;
  if (!complete()) {
    save_key_value("uncovered_grid", JSON.stringify(uncovered_grid));
  }

}

function get_solution_row_column() {
  // Updates solution_rows and solution_columns
  // with the true values of each.
  // true values: i.e. "1 1 2 1 1"
  // Also finds the maximum length of a value in solution_rows, solution_columns
  // for use in display_numbers

  solution_rows = [];
  solution_columns = [];
  maxRowNumbers = 1;
  maxColNumbers = 1;
  var curRow = [];
  var curColumn = [];
  var curRowSum = 0;
  var curColSum = 0;


  for (var i = 0; i < size; i++) {

    // Determine the true values of each row/column of solution_grid
    // true values: i.e. "1 1 2 1 1"
    for (var j = 0; j < size; j++) {
      if (solution_grid[i][j] == 1) {
        curRowSum += 1;
      } else {
        if (curRowSum > 0) {
          curRow.push(curRowSum);
          curRowSum = 0;
        }
      }
      if (solution_grid[j][i] == 1) {
        curColSum += 1;
      } else {
        if (curColSum > 0) {
          curColumn.push(curColSum);
          curColSum = 0;
        }
      }
    }

    // Adds the last element to row/column (if row/column of solution grid ends in a 1)
    if (curRowSum > 0) {
      curRow.push(curRowSum);
      curRowSum = 0;
    }
    if (curColSum > 0) {
      curColumn.push(curColSum);
      curColSum = 0;
    }

    // Sets a row/column value to [0] if everything is row/column is 0
    if (curRow.length == 0) {
      curRow.push(0);
    } else if (curRow.length > maxRowNumbers) {
      maxRowNumbers = curRow.length;
    }
    if (curColumn.length == 0) {
      curColumn.push(0);
    } else if (curColumn.length > maxColNumbers) {
      maxColNumbers = curColumn.length;
    }

    // Update values
    solution_rows.push(curRow);
    solution_columns.push(curColumn);
    curRow = [];
    curColumn = [];
  }
}


function start_game(reset) {
  // Starts the game
  // reset: Whether or not to recreate solution_grid, uncovered_grid

  // Reset, recalculate new grid and displays them
  $("#display").prop("hidden", true);
  $("#complete").prop("hidden", true);
  $("#perfect").prop("hidden", true);
  if (reset) {
    generate_puzzle(size);
  }
  save_key_value("sol_grid", JSON.stringify(solution_grid));
  save_key_value("uncovered_grid", JSON.stringify(uncovered_grid));
  get_solution_row_column();
  generatetiles();
  display_numbers();

  // Since the tiles are remade, we need to reattach another listener for tiles
  reload_listeners();

  if (dark == "true") {
    toggle_dark(true);
  }

}

function re_tile() {
  // Re-tiles the tiles already tiled previously
  // Also re-greys previously greyed numbers
  // Only called at start if there is a previous game going

  for (var i = 0; i < size; i++) { // y coordinate
    for (var j = 0; j < size; j++) { // x coordinate
      var current_value = uncovered_grid[i][j];
      if (current_value != -1) {
        on_tile_click(j, i, current_value, $("#" + String(i) + "_" + String(j)));
      }
    }
  }

  for (var i = 0; i < size; i++) {
    var col_len = clickable_cols[i].length;
    for (var j = 0; j < col_len; j++) {
      if (clickable_cols[i][j] == 1) {
        $("#C" + String(i) + "_" + String(j)).addClass("clicked_number");
      }
    }
    var row_len = clickable_rows[i].length;
    for (var k = 0; k < row_len; k++) {
      if (clickable_rows[i][k] == 1) {
        $("#R" + String(i) + "_" + String(k)).addClass("clicked_number");
      }
    }
  }
}

function new_game() {
  // Gets size, resets some onscreen values, and calls start_game if valid

  var value = $("#size").val(); // Get input value
  if (value == "") { // if there is no input value
    if (size != 15) {
      save_key_value("size", "15");
    }
    size = 15;
    reload();
    clear_grid();
    start_game(true);
    return
  }
  value = parseInt(value);
  if (value >= 5 && value <= 30) {
    if (size != value) {
      save_key_value("size", value);
    }
    size = value;
    reload();
    clear_grid();
    start_game(true);
  } else {
    alert("Please input a value between 5 and 30, inclusive.") // Input value is not in 5-30
  }
}

function clear_grid() {
  // Clears the grid.

  $(".grid").html("");
}
function reload() {
  errors = 0;
  $("#mistakes").html(String(errors));
  $("#mistakes").css("color", "");
}

function reload_listeners() {
  // Attaches listeners to tiles and clickable numbers
  $(".tile").mousedown(function(event) {
    if (!$(this).hasClass("s-tile")) {
      switch (event.which) {
          case 1:
              detect_click(1, $(this), true);
              break;
          case 3:
              detect_click(0, $(this), true);
              break;
      }
    } else {
      var id = $(this).attr('id').split("_");
      var x = parseInt(id[1]);
      var y = parseInt(id[0]);
      anchor_coordinates = [x,y];
    }

  });
  $(".tile").mouseenter(function(e){

    if(e.buttons == 1 || e.buttons == 2){

      var type;
      if (e.buttons == 1){
        type = 1;
      } else {
        type = 0;
      }
      if (!$(this).hasClass("s-tile")) {
        detect_click(type, $(this), false);
      }
    }
  });

  $(".clickable").mousedown(function() {
    var clicked = $(this).hasClass("clicked_number");
    var value = 1;
    if (clicked) {
      value = 0;
      $(this).removeClass("clicked_number");
    } else {
      $(this).addClass("clicked_number");
    }
    var id = $(this).attr("id")
    var type = id.slice(0,1);
    var values = id.slice(1).split("_");
    var position = parseInt(values[0]);
    var index = parseInt(values[1]);
    if (type == "C") {
      clickable_cols[position][index] = value;
      save_key_value("click_cols", JSON.stringify(clickable_cols));
    } else {
      clickable_rows[position][index] = value;
      save_key_value("click_rows", JSON.stringify(clickable_rows));
    }
  });
}

function load_game() {
  // Called when there's a previous game in progress
  get_solution_row_column();
  generatetiles();
  display_numbers();

  // Since the tiles are remade, we need to reattach another listener for tiles
  reload_listeners();
  re_tile();
}

function complete() {
  //Checks if game is complete
  // Also clears sol_grid and uncovered_grid if complete
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      if (uncovered_grid[j][i] == -1) {
        return false;
      }
    }
  }
  $("#display").prop("hidden", false);
  if ($("#mistakes").html() == "0") {

    $("#perfect").prop("hidden", false);
  } else {
    $("#complete").prop("hidden", false);
  }
  save_key_value("sol_grid", JSON.stringify(null));
  save_key_value("uncovered_grid", JSON.stringify(null));
  return true;
}


function toggle_dark(value) {
  // Sets dark mode to on or off
  // value: true or false

  if (value) {
    dark = "true";
    $(document.body).css("background-color", "black");
    $(document.body).css("color", "white");
    $(".RowNumDisplay").css("border-color", "black");
    $(".ColNumDisplay").css("border-color", "black");
    $(".RND-5").css("border-color", "black black silver black");
    $(".RND-0").css("border-color", "silver black black black");
    $(".CND-5").css("border-color", "black silver black black");
    $(".CND-0").css("border-color", "black black black silver");
    $("#leftboard").css("border-color", "lightblue");
  } else {
    dark = "false";
    $(document.body).css("background-color", "");
    $(document.body).css("color", "");
    $(".RowNumDisplay").css("border-color", "");
    $(".ColNumDisplay").css("border-color", "");
    $("#leftboard").css("border-color", "cyan");
  }
}
