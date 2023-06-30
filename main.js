scoreLeftWrist = 0;
scoreRightWrist = 0;

RightWristX = 0;
RightWristY = 0;

LeftWristX = 0;
LeftWristY = 0;


function preload() {
    defaultsong = document.getElementById("sound").value;
    song = loadSound(defaultsong);

}



function setup() {

    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);


}

function changesong() {
    song.stop();
    selectedsong = document.getElementById("sound").value;
    song = loadSound(selectedsong);

}

function playsong() {
if(song.isLoaded()) {
        song.play();
        song.setVolume(1);
        song.rate(1);
    }
}


function pausesong() {
    song.pause();
}



function stopsong() {
    song.stop();
}

function modelLoaded() {

    console.log("PoseNet is intialized");

}


function gotPoses(results) {

    if (results.length > 0) {

        console.log(results);
        RightWristX = results[0].pose.rightWrist.x;
        RightWristY = results[0].pose.rightWrist.y;
        console.log("Right wrist cordinates" + RightWristX + RightWristY);
        LeftWristX = results[0].pose.leftWrist.x;
        LeftWristY = results[0].pose.leftWrist.y;
        console.log("Left wrist cordinates" + LeftWristX + LeftWristY);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

    }
}


function draw()
{

    background("white");
    image(video, 0, 0, 500, 500);

    fill("red");
    stroke("deep red");

    if (scoreLeftWrist > 0.2) {
        
    
    circle(LeftWristX, LeftWristY, 20);

    NumLeftWristY = Number(LeftWristY);
    remove_decimal = floor(NumLeftWristY);
    volume = remove_decimal/500 ;
    document.getElementById("volume_label").innerHTML = "Volume" + volume ;
    song.setVolume(volume);

                              }



    if (scoreRightWrist > 0.2) {

       
        
       circle(RightWristX, RightWristY, 20);

       NumRightWristY = Number(RightWristY);




       if (NumRightWristY > 0 && NumRightWristY < 100) {

        document.getElementById("speed_label").innerHTML = "Speed = 0.5x";
        song.rate(0.5);

       }
    
    
       else if (NumRightWristY > 100 && NumRightWristY < 200) {

        document.getElementById("speed_label").innerHTML = "Speed = 1x";
        song.rate(1);

       }


       else if (NumRightWristY > 200 && NumRightWristY < 300) {

        document.getElementById("speed_label").innerHTML = "Speed = 1.5x";
        song.rate(1.5);

       }
    
       else if (NumRightWristY > 300 && NumRightWristY < 400) {

        document.getElementById("speed_label").innerHTML = "Speed = 2x";
        song.rate(2);

       }


       else {

        document.getElementById("speed_label").innerHTML = "Speed = 2.5x";
        song.rate(2.5);

       }
    
    }

}

