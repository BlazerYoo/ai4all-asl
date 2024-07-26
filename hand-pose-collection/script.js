const captureSpeed = document.getElementById('captureSpeed');
const letterImage = document.getElementById('letterImage');
const captureButton = document.getElementById('captureButton');
const saveButton = document.getElementById('saveButton');

let captureInterval;
let handsKeypoints;

// Show hand sign
label.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== '-') {
        letterImage.src = `assets/${selectedValue}.jpeg`;
    } else {
        letterImage.src = '';
    }
});

// Collect poses
captureButton.addEventListener('mousedown', () => {
  captureInterval = setInterval(() => {
    console.log(handsKeypoints);
    //console.log(`x: ${handsKeypoints[0].keypoints3D.map((kp) => kp.x)}`);
    //console.log(`y: ${handsKeypoints[0].keypoints3D.map((kp) => kp.y)}`);
    //console.log(`z: ${handsKeypoints[0].keypoints3D.map((kp) => kp.z)}`);
  }, captureSpeed.value); // Capture frame every Xms
});

// Stop pose collection
captureButton.addEventListener('mouseup', () => {
  clearInterval(captureInterval);
});

captureButton.addEventListener('mouseleave', () => {
  clearInterval(captureInterval);
});