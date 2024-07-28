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
    if (handsKeypoints.length !== 0) {

      const handsKeypoints2D = handsKeypoints[0].keypoints;
      console.log(handsKeypoints2D);

      // Convert to array
      const keypointsArr = new Array();
      handsKeypoints2D.map((coord) => {
        keypointsArr.push(coord.x);
        keypointsArr.push(coord.y);
      });
      console.log(keypointsArr);
    }
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