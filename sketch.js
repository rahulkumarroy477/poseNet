// let capture,posenet;
// let singlepose;
// let noseX,noseY;

// const windowHeight = window.innerHeight;
// const windowWidth = window.innerWidth;


// function setup(){
//     createCanvas(800,600);
//     capture = createCapture(VIDEO);
//     capture.hide();
//     posenet = ml5.poseNet(capture,()=>console.log('model Loaded'));
//     posenet.on('pose',recvPoses);
// }

// function recvPoses(poses) {
//     console.log(poses);
//     if (poses.length > 0) {
//         singlepose = poses[0].pose;

//         // Transform the PoseNet coordinates to match the canvas dimensions
//         noseX = map(singlepose.nose.x, 0, capture.width, 0, width);
//         noseY = map(singlepose.nose.y, 0, capture.height, 0, height);

//         console.log("nose : ", noseX, noseY);
//     }
// }

// // function recvPoses(poses){
// //     console.log(poses);
// //     if(poses.length > 0){
// //         singlepose = poses[0].pose;
// //         noseX = singlepose.nose.x;  // Scale the x coordinate
// //         noseY = singlepose.nose.y;  // Scale the y coordinate
// //         console.log("nose : ",noseX,noseY);
// //     }
// // }
// function draw(){
//     image(capture,0,0,800,600);
//     fill(0,255, 0);
//     ellipse(noseX, noseY, 20, 20)
// }


let capture;
let posenet;
let keypoints;

const canvasWidth = 800;
const canvasHeight = 600;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    capture = createCapture(VIDEO);
    capture.hide();
    posenet = ml5.poseNet(capture, () => console.log('model Loaded'));
    posenet.on('pose', recvPoses);
}

function recvPoses(poses) {
    if (poses.length > 0) {
        keypoints = poses[0].pose.keypoints;
    }
}

function draw() {
    image(capture, 0, 0, canvasWidth, canvasHeight);

    if (keypoints) {
        fill(0, 255, 0); // Set fill color to green (RGB: 0, 255, 0)
        for (let i = 0; i < keypoints.length; i++) {
            let keypoint = keypoints[i].position;
            let scaledX = map(keypoint.x, 0, capture.width, 0, canvasWidth);
            let scaledY = map(keypoint.y, 0, capture.height, 0, canvasHeight);
            ellipse(scaledX, scaledY, 10, 10);
        }
    }
}
