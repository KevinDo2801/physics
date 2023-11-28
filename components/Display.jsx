import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

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

function Display({ showText, setShowText }) {
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");

  const database = getDatabase();
  const textRef = ref(database, "currentText/"); 

  useEffect(() => {
    onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setDisplayText(data);
      }
    });
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    set(textRef, inputValue);
    setInputValue("");
  };

  const camera_capture = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  return (
    <div style={{ display: showText ? "block" : "none" }}>
      <div className="display" onClick={camera_capture}>
        <p className="top">{displayText}</p>
      </div>

      <div className="answer">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>SEND</button>
      </div>
    </div>
  );
}

export default Display;
