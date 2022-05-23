video = "";
Status = "";
ojects=[];
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480 , 380);
    canvas.center();
}


function draw(){
    image(video, 0, 0, 480, 480);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++)
        {
        document.getElementbyId("status").innerHTML = "Status : Objects Detected";
            document.getElementbyId("number_of_onjects").innerHTML = "Number of objects detected are : "+ objects.length;
            
            fill("red");
            percent= floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function gotResults(error, results)
{
if(error){
console.error(error);
}
 else{
 console.log(results);
     objects=results;
 }   
}


function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}


function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
