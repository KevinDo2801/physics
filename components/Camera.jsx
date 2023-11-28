import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, push, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDJ39dqHQZn7FjjWl6kj-K5q_tWmyldMPs",
  authDomain: "physic-test.firebaseapp.com",
  databaseURL: "https://physic-test-default-rtdb.firebaseio.com",
  projectId: "physic-test",
  storageBucket: "physic-test.appspot.com",
  messagingSenderId: "651491662870",
  appId: "1:651491662870:web:258a840b7e375dc3b3e937",
};
initializeApp(firebaseConfig);

const Camera = ({ showText, setShowText }) => {
  const webcamRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = () => {
      const db = getDatabase();
      const imgRef = ref(db, "imgPhy");

      onValue(imgRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const fetchedImages = Object.entries(data).map(([key, url]) => ({
            key,
            url,
          }));
          setImages(fetchedImages);
        }
      });
    };

    fetchImages();
  }, []);

  const capture = React.useCallback(() => {
    const capturedImage = webcamRef.current.getScreenshot();
    setImages((prevImages) => [capturedImage, ...prevImages]);
    setShowText((prevShowText) => !prevShowText);
    const imgRef = ref(getDatabase(), "imgPhy");
    push(imgRef, capturedImage);
  }, [webcamRef, setImages, setShowText]);

  const handleImageDoubleClick = (indexToRemove) => {
    const imageToRemove = images[indexToRemove];
    if (imageToRemove && imageToRemove.key) {
      const imgRef = ref(getDatabase(), `imgPhy/${imageToRemove.key}`);
      remove(imgRef);

      setImages((prevImages) =>
        prevImages.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  return (
    <>
      <div className="camera" style={{ display: !showText ? "block" : "none" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            width: 1280,
            height: 720,
            facingMode: "environment",
          }}
          className="webcam"
          screenshotQuality={1}
        />
        <div className="overlay" onClick={capture}></div>
      </div>

      <div>
        {[...images].map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc.url}
            alt={`Captured ${images.length - index - 1}`}
            style={{ margin: "10px" }}
            onDoubleClick={() =>
              handleImageDoubleClick(images.length - index - 1)
            }
          />
        ))}
      </div>
    </>
  );
};

export default Camera;
