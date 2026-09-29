const camera =document.getElementById("camera");

let photoCount = 0;

//gives access to the camera 
navigator.mediaDevices.getUserMedia({video:true})
//then when access is given run this code which tells the video element to display the camera stream
.then(function (stream) {
    camera.srcObject = stream;
});
//making the capture button functional
const captureButton = document.querySelector(".capture");
// when it clicks it runs the function for the canvas element 
captureButton.addEventListener( "click", function() {

    if (photoCount >= 3) {
        return;
    }

    photoCount++;

  const canvas = document.createElement("canvas");
  console.log(canvas);

  canvas.width = camera.videoWidth;
  canvas.height = camera.videoHeight;

  const context = canvas.getContext("2d");

  context.drawImage (camera,0,0,canvas.width,canvas.height);

  const photo = canvas.toDataURL("image/png");
  //here an image element is created and the photo is displayed in the polaroid frame
  const photoImage = document.createElement("img");
    photoImage.src = photo;
    // creates a class so we can use css on the captured photo
    photoImage.classList.add("captured-photo");

    if (photoCount === 1) {
        photoImage.style.top ="405px";
    }

    if(photoCount === 2){
        photoImage.style.top ="580px";
    }
    
    if(photoCount === 3){
        photoImage.style.top ="765px";
    }

  //puts the image in our poloroid frame container
    document.querySelector(".picture").appendChild(photoImage);

});

const rewindButton = document.querySelector(".rewind");

console.log(rewindButton);

rewindButton.addEventListener("click", function() {

        console.log("REWIND CLICKED");

    if (photoCount === 0) {
        return;
    }

    const photos = document.querySelectorAll(".captured-photo");

    photos[photos.length - 1].remove();

    photoCount--;

});

const downloadButton = document.querySelector(".download");

downloadButton.addEventListener("click", function() {


    const frame = document.querySelector(".frame-image");
    const photos = document.querySelectorAll(".captured-photo");

    
    const canvas = document.createElement("canvas");

    canvas.width = 450;
    canvas.height = 800;

    const context = canvas.getContext("2d");

    
    context.drawImage(
        frame,
        0,
        0,
        450,
        800
    );

    photos.forEach(function(photo) {

        const left = 132;
        const originalTop = parseInt(photo.style.top);

        
        const top = originalTop - 326;

        const width = 160;
        const height = 165;

        context.save();

        context.translate(left + width, top);
        context.scale(-1, 1);

     const sourceWidth = photo.naturalWidth;
     const sourceHeight = photo.naturalHeight;

     const sourceRatio = sourceWidth / sourceHeight;
     const targetRatio = width / height;

     let cropWidth = sourceWidth;
     let cropHeight = sourceHeight;
     let cropX = 0;
     let cropY = 0;

     if (sourceRatio > targetRatio) {
      cropWidth = sourceHeight * targetRatio;
      cropX = (sourceWidth - cropWidth) / 2;
    } else {
      cropHeight = sourceWidth / targetRatio;
      cropY = (sourceHeight - cropHeight) / 2;
    }

   context.drawImage(photo, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
        context.restore();
     // now our canvas is done
    });
     // Turning our canvas into an image that can be downloaded
    const downloadImage = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = downloadImage;
    link.download = "Ikram's-Photobooth.png";

    link.click();

    console.log("DOWNLOAD TRIGGERED");

});