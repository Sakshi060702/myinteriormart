import React from "react";

import './Profile.css'

function Buttongroup({buttons, isSelected, setisSelected}) {
    return (
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
    );
}

export default Buttongroup;