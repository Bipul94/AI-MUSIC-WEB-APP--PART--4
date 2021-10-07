song1 = "";
song2 = "";
leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
song1_status = "";
song2_status = "";

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);

}

function draw() {
    image(video, 0, 0, 600, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000")
    stroke("#FF0000")

    if(scoreRightWrist > 0.2){
      circle(rightWristX , rightWristY , 20)
      song2.stop

      if(song1_status == false){
        song1.play()
        document.getElementById("song_name").innerHTML = "Playing - Devil"
        
      }
    }

    if(scoreLeftWrist > 0.2){
        circle(lefttWristX , leftWristY , 20)
        song1.stop
  
        if(song2_status == false){
          song2.play()
          document.getElementById("song_name").innerHTML = "Playing - Imagine Dragons Beliver"
          
        }
      }

    circle(leftWristX , leftWristY , 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
}

function preload()
{
    song1 = loadSound("Devil.mp3");
    song2 = loadSound("Imagine Dragons Believer.mp3");
}

function play()
{
    song.play();
    song.rate(1);
    song.setVolume(1);

}

function modelLoaded() {
    console.log('PoseNet Is Intialized');
}

function gotPoses(results) {
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = "+ leftWristX);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = "+ rightWristX);
    }
}