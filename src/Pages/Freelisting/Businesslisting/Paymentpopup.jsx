import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../../FrontEnd/css/Paymentmode.css';
import userimage from'../../../FrontEnd/img/success.jpg'

const Paymentpopup = ({ isOpen, onClose,message }) => {

 
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const handleContinue = () => {
    onClose();
    navigate("/");
  };

  

  return (
    <>
      
      {isOpen && (
        <div className="popup2-overlay" onClick={onClose}>
          <div className="popup2-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <img src={userimage} style={{height:'80px',width:'80px', marginLeft:'190px',marginBottom:'12px'}}></img>
            <h3 className="success-message" style={{ textAlign: 'center' }}>SUCCESS</h3>
            <h6 style={{ textAlign: 'center' }}>{message}</h6>
           
            </div>
           
           
            <div className="popupbutton-container">
              <button onClick={handleContinue} style={{color:"white",fontSize:'18px'}}>Continue</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Paymentpopup;
