import React from "react";
import '../../../FrontEnd/css/Mangelisting.css'

function Uploadbtngroup({ buttons, selectedButton, setSelectedButton }) {
  return (
    <div className="button-container">
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

export default Uploadbtngroup;