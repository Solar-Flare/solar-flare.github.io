// Variables
let userInput = ""; // Stores userInput
let curDisplay = "search"; // Alternates between "search" and "searchResults"
let requestSent = false; // Is set to true if request is sent; prevents multiple asyncs

let url = "https://en.wikipedia.org/w/api.php?origin=*"; // Wiki API URL
const idURL = "https://en.wikipedia.org/?curid="; // Wiki ID URL


let elementString = ["<a class=\"clickableDisplayElement\" href=" + idURL, "><div class=\"displayElement\"><h2>", "</h2><h4>", "</h4></div></a>"]
let toInsert = "";


let params = {
    action: "query",
    list: "search",
    srsearch: "", // We only modify this section later
    format: "json"
}; // What the url takes in

let res;
let query;

// Set up signal so that on enter press in input box, call onEnterPress()
$("#userInput").on('keyup', function (e) {
    if (!requestSent && (e.key === 'Enter' || e.keyCode === 13)) { // Legacy Browser Support
      onEnterPress();

    }
});

// What to do on pressing Enter
function onEnterPress() {
  // Stores user input to userInput and calls obtainWikiData()
  userInput = $("#userInput").val();
  if (userInput != "") {
    requestSent = true;
    obtainWikiData();
  }
}

function obtainWikiData() {
  // Sets the param's srsearch to userInput
  // Then queries wikipedia for the links
  // Then passes the data to the processor function
  let tempURL = url;
  params.srsearch = userInput;
  Object.keys(params).forEach(function(key){tempURL += "&" + key + "=" + params[key];});
  fetch(tempURL)
      .then(function(response){return response.json();})
      .then(function(response) {
        res = response;
        query = res.query;
        displayData();
      })
      .catch(function(error){console.log(error);});
}

function swapView() {
  if (curDisplay == "search") {
    document.getElementById("search").style.display = "none";
    document.getElementById("searchResults").style.display = "block";
    curDisplay = "searchResults";
  } else {
    document.getElementById("searchResults").style.display = "none";
    document.getElementById("search").style.display = "block";
    curDisplay = "search";
  }
}


function displayData() {
  var data = query.search;
  toInsert = "";
  data.forEach(function(element) {generateDisplayElement(element)});
  document.getElementById("searches").innerHTML = toInsert;
  swapView();
  requestSent = false;
}

function generateDisplayElement(module) {
  var title = module.title;
  var index = module.snippet.search(/[:?!\.]/);
  var id = module.pageid;
  var snippet;
  if (index == -1) {
    snippet = module.snippet;
  } else {
    snippet = module.snippet.substring(0,index+1);
  }
  toInsert += elementString[0] + id + elementString[1] + title + elementString[2] + snippet + elementString[3];

}
