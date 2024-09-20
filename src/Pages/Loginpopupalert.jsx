import React from 'react';
import '../Pages/Freelisting/Businesslisting/Businesslisting.css';
import '../FrontEnd/css/Popupnotification.css';
import successimg from '../FrontEnd/img/mimsuccess.png'

const Loginpopupalert = ({ message, type,onClose }) => {
  const isSuccess = type === "success";

  return (
    <div className={`popup3 ${type}`}>
      <div className='popup2-overlay'onClick={onClose}>
        <div className="popup2-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
            X
          </button>
          <div>
              {/* <img src={successimg} className="paymentimage" style={{height:'80px',width:'80px',marginBottom:'12px'}}></img> */}
            {/* <h3 className="success-message" style={{ textAlign: 'center',color:'orange' }}>SUCCESS</h3> */}
            {/* <h6 style={{ textAlign: 'center' }}>{message}</h6> */}
           
            </div>
           
          <div style={{paddingBottom:'20px', textAlign: 'center'}}>
            <img src={successimg}  style={{height:'80px',width:'80px',marginBottom:'12px',marginLeft:'6px'}}></img>
            {/* <div className={`icon-container ${isSuccess ? 'success-icon-container' : 'error-icon-container'}`} style={{paddingLeft:'10px',paddingBottom:'15px'}}>
              <span className={isSuccess ? 'success-icon' : 'error-icon'} >
                {isSuccess ? '✓' : '✗'}
              </span>
            </div> */}
           
            {/* <h3 className={isSuccess ? "success-message" : "error-message"}>
              {isSuccess ? "Success" : "Error"}
            </h3> */}
            <h5>Your User Credential Login Successful</h5>
            <div className='loginpopup'><h5>{message}</h5></div>
            {/* <h5>{message}</h5> */}
          </div>
          {/* <div style={{backgroundColor:'orange', height:'100px'}}></div> */}
        </div>
      </div>
    </div>
  );
};

export default Loginpopupalert;
