let featureExtractor;
let classifier;
let video;
let loss;
let ImageAmounts = [0, 0, 0, 0, 0] //Yellow, Red, Green, Purple, Black
let colors = ['Yellow', "Red", "Green", "Purple", "Black"]

video = document.querySelector("#video");
  if (navigator.mediaDevices.getUserMedia) {   
    navigator.mediaDevices.getUserMedia({video: { facingMode: "user" }})
    .then(function(mediaStream){
      video.srcObject = mediaStream;
    })
    .catch(function(err)
    {
      console.log(err);
    })
  }

function setup(){
  featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
  classifier = featureExtractor.classification(video, videoReady);
  buttonSetup();
}
function modelReady() {
  select('#modelStatus').html('Base Model (MobileNet) loaded!');
}

function videoReady () {
  select('#videoStatus').html('Video ready!');
}
function classify() {
  classifier.classify(gotResults);
}

function buttonSetup(){
  TakePhotoButton = select('#takePhoto');
  TakePhotoButton.mousePressed(function() {
    var select = document.getElementById("sort");
    var color = select.options[select.selectedIndex].value;
    classifier.addImage(color);
    var str1 = "amountOf"
    var i;
    for (i = 0; i < 5; i++){
      if (colors[i] == color){
        ImageAmounts[i] += 1;
        document.getElementById(str1.concat(colors[i])).innerHTML = ImageAmounts[i];
        break;
      }
    }
  });

  // Train Button
  train = select('#train');
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if (lossValue) {
        loss = lossValue;
        select('#lossResult').html('Loss: ' + loss);
      } else {
        select('#lossResult').html('Done Training! Final Loss: ' + loss);
      }
    });
  });

  // Predict Button
  buttonPredict = select('#predict');
  buttonPredict.mousePressed(classify);
} 
function gotResults(err, result) {
  // Display any error
  if (err) {
    console.error(err);
  }
  select('#result').html(result);
  classify();
}
document.getElementById('download').addEventListener('click', function() { download("classifier.txt", classifier); }, false);
