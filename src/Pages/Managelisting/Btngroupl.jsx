import React from "react";

function Btngroupl({ buttons, selectedButton, setSelectedButton }) {
  return (
    <div style={{ display: "flex" }}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`button ${selectedButton === index ? "selected" : ""} review`}
          onClick={() => setSelectedButton(index)}
          style={{backgroundColor:'#fb830d',color:'white',marginLeft:'10px'}}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
}

export default Btngroupl;