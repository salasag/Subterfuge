import React from "react";
import Main from "./Main/Main";
import background from "./resources/background.jpg"

function App() {
  const appStyle= {
    height:"100vh", 
    backgroundImage: `url(${background})`,
    padding: 40
  }

  return (
    <div style={appStyle}>
      <Main />
    </div>
  );
}

export default App;
