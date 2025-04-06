import React, { useState } from "react";
import "./styles.scss";

export default function SimpleApp() {
 const [size, changeSize] = useState("You didn't press any button yet");

 return (
   <div className="SimpleApp">
     <p id="para1" onClick={changeSize.bind(null, "big")}>
       Make the text big
     </p>
     <p onClick={changeSize.bind(null, "small")}>Make the text small</p>

     <div>
       <h3>Change the font size by pressing a button</h3>
     </div>
     <div id="result" className={`box ${size}`}>
       {size}
     </div>
      <div className="buttons">
        <button onClick={changeSize.bind(null, "big")}>Big</button>
        <button onClick={changeSize.bind(null, "small")}>Small</button>
        <button onClick={changeSize.bind(null, "normal")}>Normal</button>
        <button onClick={changeSize.bind(null, "You didn't press any button yet")}>
          Reset
        </button>
        </div>
     <div className="buttons">
        <button onClick={changeSize.bind(null, "big")}>Big</button>
        <button onClick={changeSize.bind(null, "small")}>Small</button>
        <button onClick={changeSize.bind(null, "normal")}>Normal</button>
        <button onClick={changeSize.bind(null, "You didn't press any button yet")}>
          Reset
        </button>
      </div>
     <div className="buttons">
        <button onClick={changeSize.bind(null, "big")}>Big</button>
        <button onClick={changeSize.bind(null, "small")}>Small</button>
        <button onClick={changeSize.bind(null, "normal")}>Normal</button>
        <button onClick={changeSize.bind(null, "You didn't press any button yet")}>
          Reset
        </button>
      </div>

   </div>
 );
}