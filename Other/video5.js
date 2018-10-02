var video = document.querySelector("#video");
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
	noCanvas();
	featureExtractor = ml5.featureExtractor('MobileNet', modelReady);
	classifier = featureExtractor.classification(video, videoReady);
}