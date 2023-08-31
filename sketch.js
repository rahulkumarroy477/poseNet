

// let capture;
// let posenet;
// let keypoints;
// let skeleton;
// let clothImage;
// const canvasWidth = 800;
// const canvasHeight = 600;
// let leftShoulderX;
// let leftShoulderY;

// function setup() {
//     createCanvas(canvasWidth, canvasHeight);
//     capture = createCapture(VIDEO);
//     capture.hide();
//     posenet = ml5.poseNet(capture, () => console.log('model Loaded'));
//     posenet.on('pose', recvPoses);
//     clothImage = loadImage('rshirt.jpg');
// }

// function recvPoses(poses) {
//     if (poses.length > 0) {
//         keypoints = poses[0].pose.keypoints;
//         skeleton = poses[0].skeleton;
//     }
// }

// function draw() {
//     image(capture, 0, 0, canvasWidth, canvasHeight);

//     if (keypoints) {
//         fill(0, 255, 0); // Set fill color to green (RGB: 0, 255, 0)
//         for (let i = 0; i < keypoints.length; i++) {
//             let keypoint = keypoints[i].position;
//             let scaledX = map(keypoint.x, 0, capture.width, 0, canvasWidth);
//             let scaledY = map(keypoint.y, 0, capture.height, 0, canvasHeight);
//             ellipse(scaledX, scaledY, 10, 10);
//         }
//         console.log(keypoints);
//         stroke(255, 255, 255);
//         strokeWeight(2)
//         for (let j = 0; j < skeleton.length; j++) {
//             line(map(skeleton[j][0].position.x, 0, capture.width, 0, canvasWidth), map(skeleton[j][0].position.y, 0, capture.height, 0, canvasHeight), map(skeleton[j][1].position.x, 0, capture.width, 0, canvasWidth), map(skeleton[j][1].position.y, 0, capture.height, 0, canvasHeight))
//         }
//         // Check if the keypoints array has a valid leftShoulder key
//         image(clothImage, 0, 0, clothImage.width / 2, clothImage.height / 2);
//     }
// }


// let capture;
// let posenet;
// let keypoints;
// let skeleton;
// let clothImage;
// const canvasWidth = 800;
// const canvasHeight = 600;
// let leftShoulderX;
// let leftShoulderY;
// let rightShoulderX;
// let rightShoulderY;

// function setup() {
//     createCanvas(canvasWidth, canvasHeight);
//     capture = createCapture(VIDEO);
//     capture.hide();
//     posenet = ml5.poseNet(capture, () => console.log('model Loaded'));
//     posenet.on('pose', recvPoses);
//     clothImage = loadImage('rshirt.jpg');
// }

// function recvPoses(poses) {
//     if (poses.length > 0) {
//         keypoints = poses[0].pose.keypoints;
//         skeleton = poses[0].skeleton;
//     }
// }

// function draw() {
//     image(capture, 0, 0, canvasWidth, canvasHeight);

//     if (keypoints) {
//         console.log(keypoints);
//         fill(0, 255, 0); // Set fill color to green (RGB: 0, 255, 0)
//         for (let i = 0; i < keypoints.length; i++) {
//             let keypoint = keypoints[i].position;
//             let scaledX = map(keypoint.x, 0, capture.width, 0, canvasWidth);
//             let scaledY = map(keypoint.y, 0, capture.height, 0, canvasHeight);
//             ellipse(scaledX, scaledY, 10, 10);

//             if (i === 5) { // Assuming index 5 corresponds to the left shoulder
//                 leftShoulderX = scaledX;
//                 leftShoulderY = scaledY;
//             }
//         }

//         // Draw the image at the coordinates of the left shoulder
//         if (leftShoulderX !== undefined && leftShoulderY !== undefined) {
//             let imageWidth = clothImage.width / 2;
//             let imageHeight = clothImage.height / 2;
//             image(clothImage, leftShoulderX - imageWidth / 2, leftShoulderY - imageHeight / 2, imageWidth, imageHeight);
//         }

//         // Draw the skeleton lines
//         // stroke(255, 255, 255);
//         // strokeWeight(2);
//         // for (let j = 0; j < skeleton.length; j++) {
//         //     let startJoint = skeleton[j][0].position;
//         //     let endJoint = skeleton[j][1].position;
//         //     line(map(startJoint.x, 0, capture.width, 0, canvasWidth), map(startJoint.y, 0, capture.height, 0, canvasHeight),
//         //          map(endJoint.x, 0, capture.width, 0, canvasWidth), map(endJoint.y, 0, capture.height, 0, canvasHeight));
//         // }
//     }
// }

let capture;
let posenet;
let keypoints;
let skeleton;
let clothImage;
const canvasWidth = 800;
const canvasHeight = 600;
let leftShoulderX;
let leftShoulderY;
let rightShoulderX;
let rightShoulderY;
let leftHipX;
let leftHipY;
let rightHipX;
let rightHipY;
let imageWidth;
let imageHeight;

function setup() {
    createCanvas(canvasWidth, canvasHeight);
    capture = createCapture(VIDEO);
    capture.hide();
    posenet = ml5.poseNet(capture, () => console.log('model Loaded'));
    posenet.on('pose', recvPoses);
    clothImage = loadImage('shirtcurved.png');
}

function recvPoses(poses) {
    if (poses.length > 0) {
        keypoints = poses[0].pose.keypoints;
        skeleton = poses[0].skeleton;
    }
}

function calculateMedian(pointA, pointB) {
    return createVector((pointA.x + pointB.x) / 2, (pointA.y + pointB.y) / 2);
}

function calculateDistance(pointA, pointB) {
    return dist(pointA.x, pointA.y, pointB.x, pointB.y);
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
            
            // Store left and right shoulder and hip positions
            if (i === 5) {
                leftShoulderX = scaledX;
                leftShoulderY = scaledY;
            } else if (i === 6) {
                rightShoulderX = scaledX;
                rightShoulderY = scaledY;
            } else if (i === 11) {
                leftHipX = scaledX;
                leftHipY = scaledY;
            } else if (i === 12) {
                rightHipX = scaledX;
                rightHipY = scaledY;
            }
        }

        if (leftShoulderX !== undefined && rightShoulderX !== undefined && leftHipX !== undefined && rightHipX !== undefined) {
            // Calculate median points
            let shoulderMedian = calculateMedian(createVector(leftShoulderX, leftShoulderY), createVector(rightShoulderX, rightShoulderY));
            let hipMedian = calculateMedian(createVector(leftHipX, leftHipY), createVector(rightHipX, rightHipY));
            
            // Calculate distance between median points
            let distanceBetweenMedians = calculateDistance(shoulderMedian, hipMedian);
            
            // Calculate difference between left shoulder and right shoulder
            let shoulderWidth = abs(rightShoulderX - leftShoulderX);
            
            // Calculate image dimensions
            imageWidth = shoulderWidth;
            imageHeight = distanceBetweenMedians;
            
            // Draw the image at the calculated position
            image(clothImage, rightShoulderX-35, rightShoulderY-imageHeight/5, imageWidth+imageWidth/2, imageHeight+100);
        }

        // Draw the skeleton lines
        // stroke(255, 255, 255);
        // strokeWeight(2);
        // for (let j = 0; j < skeleton.length; j++) {
        //     let startJoint = skeleton[j][0].position;
        //     let endJoint = skeleton[j][1].position;
        //     line(map(startJoint.x, 0, capture.width, 0, canvasWidth), map(startJoint.y, 0, capture.height, 0, canvasHeight),
        //          map(endJoint.x, 0, capture.width, 0, canvasWidth), map(endJoint.y, 0, capture.height, 0, canvasHeight));
        // }
    }
}
