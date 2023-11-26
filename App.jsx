import React from "react";
import Camera from "./components/Camera";
import Display from "./components/Display";

function App() {
  const [showText, setShowText] = React.useState(true);

  return (
    <div className="container">
      <Display showText={showText} setShowText={setShowText} />
      <Camera showText={showText} setShowText={setShowText} />
    </div>
  );
}

export default App;
