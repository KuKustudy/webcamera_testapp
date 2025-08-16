import React, {useRef, useEffect, useState} from "react";

function App() {
  
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);

  // a function defined to display real time video
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {width:1920, height:1080}
      })
      .then(stream => {

        let video = videoRef.current;
        video.srcObject = stream;
        // wait until video metadata is loaded before playing
        video.onloadedmetadata = () => {
          video.play();
        };

      })
      .catch(err => {
        console.error(err);
      })
    
  }

  // a function that capture the current frame of video, and display it on screen
  const takePhoto = () => {
    let video = videoRef.current;
    let photo = photoRef.current;

    const width = video.videoWidth;
    const height = video.videoHeight;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video,0,0,width,height);
    setHasPhoto(true);

  }

  // a function that delete the taken photo
  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    ctx.clearRect(0,0,photo.width, photo.height);

    setHasPhoto(false);
  }

  // call the function to display real time video
  // only call this function when videoRef already exist to avoid display undefined object
  useEffect(() => {
    getVideo();
  }, [videoRef])

  return (
    <div className="App">
      <div className="camera">
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>
          SNAP!
        </button>
      </div>

    {/* once we got the photo, display it */}
      <div className={'result ' + (hasPhoto ? 'hasPhoto':'')}>
        <canvas ref={photoRef}></canvas>
        <button onClick={closePhoto}>CLOSE!</button>

      </div>
    </div>
  );
}

export default App;
