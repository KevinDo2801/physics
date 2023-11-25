import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';

const Camera = () => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

  const capture = React.useCallback(() => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImages([capturedImage, ...images]);
  }, [webcamRef, images]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "environment" 
        }}
      />
      <button onClick={capture}>Capture photo</button>
      <div>
        {images.map((imgSrc, index) => (
          <img key={index} src={imgSrc} alt={`Captured ${index}`} style={{ margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default Camera;
