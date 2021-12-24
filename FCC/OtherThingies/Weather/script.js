// https://weather-proxy.freecodecamp.rocks/api/current?lat=35&lon=139

let temperatures = [0,0]; // Stores Celsius and Farenheit
let weather, loc, imageURL;
let currentTempDisplay = "C";

// Generates the URL that the FCC Weather API needs for GET
function generateUrl(lat, lon) {
  return "https://weather-proxy.freecodecamp.rocks/api/current?lat=" + lat.toString() + "&lon=" + lon.toString();
}


// Async processing
function httpGetAsync(theUrl, callback)
{

  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
  if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(xmlHttp.responseText);
  }

  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
}


function onGeoSuccess(data){
  // Debug Purposes
  console.log(data);

  // Get Geolocation and start Async request
  coordinates = data.coords;
  httpGetAsync(generateUrl(coordinates.latitude, coordinates.longitude), processData);
}


function onGeoFailure(data){
  // Do nothing
}


function processData(data) {
  // Converts data to a JSON object
  // Then stores said data to variables
  obj = JSON.parse(data);
  temperatures[0] = parseInt(obj.main.temp);
  weather = obj.weather[0].main;
  imageURL = obj.weather[0].icon;
  loc = obj.name + ", " + obj.sys.country;
  console.log(obj);
  convertCtoF();
  displayData();

}

function displayData() {
  // Blits the data obtained from processData to the HTML file
  document.getElementById("location").innerHTML = loc;
  document.getElementById("temp").innerHTML = temperatures[0];
  document.getElementById("weather").innerHTML = weather;
  document.getElementById("image").src = imageURL;
  document.getElementById("main").style.display = "block";
}


function tempSwitch() {
  // Switches between Celsius and Farenheit. Also blits data to HTML
  if (currentTempDisplay == "C") {
    document.getElementById("tempScale").innerHTML = "F";
    document.getElementById("temp").innerHTML = temperatures[1];
    currentTempDisplay = "F";
  } else {
    document.getElementById("tempScale").innerHTML = "C";
    document.getElementById("temp").innerHTML = temperatures[0];
    currentTempDisplay = "C";
  }
}

function convertCtoF() {
  // Calculates Farenheit from Celsius
  var c = temperatures[0]
  temperatures[1] = parseInt(c * 9 / 5 + 32)
}


// Get User Geolocation Data
if (window.navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition(onGeoSuccess, console.log);

}
