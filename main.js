song="";
song1="";
song2="";
function preload()
{
    song1 = loadSound("peaches.mp3");
    song2 = loadSound("My_shot.mp3")
}

rightWristX = 0;
rightWristY = 0;
scoreLeftwrist = 0;
scoreRightwrist = 0;
leftWristX = 0;
leftWristY = 0;


function setup()
{
    canvas= createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initalized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftwrist = results[0].pose.keypoints[9].score;
        scoreRightwrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +" rightWristY = " + rightWristY)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX +" LeftWristY = " + leftWristY)

    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");
    Peaches = song1.isPlaying();
    My_shot = song2.isPlaying();
    if(scoreLeftwrist > 0.2){
        circle(leftWristX, leftWristY,20);
        song2.stop();
        if(Peaches == false){
            song1.play()
        }
        else{
            document.getElementById("song_name").innerHTML = "Peaches";
        }
    }

    if(scoreRightwrist > 0.2){
        circle(rightWristX, rightWristY,20);
        song1.stop();
        if(My_shot == false){
            song2.play()
        }
        else{
            document.getElementById("song_name").innerHTML = "My Shot";
        }
    }

}