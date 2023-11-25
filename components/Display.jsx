import React, { useState } from 'react'; 

function Display({ showText, setShowText }) {
  const [inputValue, setInputValue] = useState(""); 
  const [displayText, setDisplayText] = useState(""); 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    setDisplayText(inputValue); 
  };

  const camera_capture = () => {
    setShowText((prevShowText) => !prevShowText);
  };

  return (
    <div style={{ display: showText ? "block" : "none" }}>
      <div className="display" onClick={camera_capture}>
        <p className="top">
          {displayText}
        </p>
      </div>

      <div className="answer">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleButtonClick}>SEND</button>
      </div>
    </div>
  );
}

export default Display;
