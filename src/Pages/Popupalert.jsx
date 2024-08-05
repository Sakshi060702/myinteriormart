// src/components/Popup.js
import React from 'react';
import '../Pages/Freelisting/Businesslisting/Businesslisting.css'


const Popupalert = ({ message, type }) => {
  return (
    <div className={`popup1 ${type}`}>
      {message}
    </div>
  );
};

export default Popupalert;
