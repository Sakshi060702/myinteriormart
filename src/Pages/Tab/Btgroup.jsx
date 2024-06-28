import React from "react";

function Btgroup({ buttons, selectedButton, setSelectedButton }) {
  return (
    <div style={{ display: "flex" }}>
      {buttons.map((button, index) => (
        <button
          key={index}
          className={`button ${selectedButton === index ? "selected" : ""} review`}
          onClick={() => setSelectedButton(index)}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
}

export default Btgroup;