// Load trained model
const sess = new onnx.InferenceSession();
const loadingModelPromise = sess.loadModel('onnx_model.onnx');

const captureButton = document.getElementById('captureButton');
const predictionText = document.getElementById('prediction');

let handsKeypoints;

// Get predictions

function argMax(array) {
  return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

function get_letter(index) {
  const mapping = {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "K",
    10: "L",
    11: "M",
    12: "N",
    13: "O",
    14: "P",
    15: "Q",
    16: "R",
    17: "S",
    18: "T",
    19: "U",
    20: "V",
    21: "W",
    22: "X",
    23: "Y",
  };
  return mapping[index];
}

async function updatePredictions(keypointsArr) {
  const input = new onnx.Tensor(new Float32Array(keypointsArr), "float32", [1, 42]);

  const outputMap = await sess.run([input]);
  const outputTensor = outputMap.values().next().value;
  const predictions = outputTensor.data;

  const prediction = get_letter(argMax(predictions));

  predictionText.innerText = prediction;
}

// Get poses
captureButton.addEventListener('click', () => {
  if (handsKeypoints.length !== 0) {

    const handsKeypoints2D = handsKeypoints[0].keypoints3D;
    //console.log(handsKeypoints2D);

    // Convert to array
    const keypointsArr = new Array();
    handsKeypoints2D.map((coord) => {
      keypointsArr.push(coord.x);
      keypointsArr.push(coord.y);
    });
    //console.log(keypointsArr);

    // Make prediction
    updatePredictions(keypointsArr);
  }
  //console.log(`x: ${handsKeypoints[0].keypoints3D.map((kp) => kp.x)}`);
  //console.log(`y: ${handsKeypoints[0].keypoints3D.map((kp) => kp.y)}`);
  //console.log(`z: ${handsKeypoints[0].keypoints3D.map((kp) => kp.z)}`);
});