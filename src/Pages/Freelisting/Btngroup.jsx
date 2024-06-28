import React from "react";

import './Freelisting.css'

function Btngroup({ buttons, isSelected, setisSelected }){
    return(
         <div style={{ display: 'flex', flexDirection: 'column' }}>
            {buttons.map((text, index) => (
                <button
                    key={index}
                    className={isSelected === index ? "button selected" : "button"}
                    onClick={() => setisSelected(index)}
                >
                    {text}
                </button>
            ))}
        </div>
    )
}
export default Btngroup;