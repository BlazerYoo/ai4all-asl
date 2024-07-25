const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const label = document.getElementById('label');
const captureSpeed = document.getElementById('captureSpeed');
const captureButton = document.getElementById('captureButton');
const saveButton = document.getElementById('saveButton');
const capturedImagesContainer = document.getElementById('capturedImages');
const context = canvas.getContext('2d');
const images = [];

let captureInterval;

// Request access to the webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(err => {
        console.error("Error accessing webcam: ", err);
    });

// Start capturing images while button is held down
captureButton.addEventListener('mousedown', () => {
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Start capturing frames every 100ms (adjust as needed)
    captureInterval = setInterval(() => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const filename = `${label.value}-${timestamp}.png`;

        // Add to list of images
        images.push({ dataUrl, filename });

        // Display captured images
        const imgElement = document.createElement('img');
        imgElement.src = dataUrl;
        imgElement.style.width = '100px';
        imgElement.style.marginRight = '10px';
        capturedImagesContainer.appendChild(imgElement);
    }, captureSpeed.value); // Capture every 100ms (adjust as needed)
});

// Stop capturing images when the button is released
captureButton.addEventListener('mouseup', () => {
    clearInterval(captureInterval);
});

// Save all captured images as a ZIP file
saveButton.addEventListener('click', () => {
    if (images.length === 0) {
        alert("No images to save.");
        return;
    }

    const zip = new JSZip();

    images.forEach(image => {
        zip.file(image.filename, image.dataUrl.split(';base64,').pop(), { base64: true });
    });

    zip.generateAsync({ type: 'blob' })
        .then(content => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `${label.value}.zip`;
            link.click();
        })
        .catch(err => {
            console.error("Error creating ZIP file: ", err);
        });
});
