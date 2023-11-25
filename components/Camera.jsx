import React, { useState, useRef } from "react";
import Webcam from "react-webcam";

const Camera = ({ showText, setShowText }) => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

  const capture = React.useCallback(() => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImages([capturedImage, ...images]);
    setShowText((prevShowText) => !prevShowText);
  }, [webcamRef, images]);

  return (
    <>
      <div className="camera" style={{ display: !showText ? "block" : "none" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            facingMode: "user",
          }}
          className="webcam"
        />
        <button className="button_capture" onClick={capture}>
          =
        </button>
      </div>
      <div>
        {images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            alt={`Captured ${index}`}
            style={{ margin: "10px" }}
          />
        ))}
      </div>
    </>
  );
};

export default Camera;
