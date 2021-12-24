var size = localStorage.getItem("size");
if (size == null || size == "15") {
  size = 15;

} else {
  $("#size").val(size);
  size = parseInt(size);
}


var solution_grid = localStorage.getItem("sol_grid");
if (solution_grid != null) {
  solution_grid = JSON.parse(solution_grid);
}

var uncovered_grid = localStorage.getItem("uncovered_grid");
if (uncovered_grid != null) {
  uncovered_grid = JSON.parse(uncovered_grid);
}

var solution_rows = [];
var solution_columns = [];

var clickable_rows = localStorage.getItem("click_rows");
if (clickable_rows != null) {
  clickable_rows = JSON.parse(clickable_rows);
} else {
  clickable_rows = [];
}
var clickable_cols = localStorage.getItem("click_cols");
if (clickable_cols != null) {
  clickable_cols = JSON.parse(clickable_cols);
} else {
  clickable_cols = [];
}

var maxRowNumbers = 1;
var maxColNumbers = 1;
var total_amount = 0;

var anchor_coordinates = [-1,-1];
var errors = 0;

var grid = document.createElement("div");
var dark = localStorage.getItem("dark");

grid.className = "grid";


var main = document.getElementById("main");
main.appendChild(grid);

$(document.body).mouseup(function(e){
  anchor_coordinates = [-1,-1];
});

$("#darkbox").click(function() {
  save_key_value("dark", $(this).prop("checked"));
  toggle_dark($(this).prop("checked"));
});
$('#size').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        new_game();
    }
});


if (solution_grid == null) {
  start_game(true);
} else {
  load_game();
}

if (dark == "true") {
  toggle_dark(true);
  $("#darkbox").prop("checked", true);
}
