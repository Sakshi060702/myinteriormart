import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import '../../../FrontEnd/css/Paymentmode.css';
import userimage from'../../../FrontEnd/img/success.jpg'
import successimg from '../../../FrontEnd/img/mimsuccess.png'

const Paymentpopup = ({ isOpen, onClose,message }) => {

 
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const cityName = localStorage.getItem('cityname');
  const pathlisting = `/${cityName}`;

  const handleContinue = () => {
    onClose();
    navigate(pathlisting);
  };

  

  return (
    <>
      
      {isOpen && (
        <div className="popup2-overlay" onClick={onClose}>
          <div className="popup2-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <img src={successimg} className="paymentimage" style={{height:'80px',width:'80px',marginBottom:'12px'}}></img>
            <h3 className="success-message" style={{ textAlign: 'center',color:'orange' }}>SUCCESS</h3>
            <h6 style={{ textAlign: 'center' }}>{message}</h6>
           <h6>Congratulation! Your Business Listing has Under review. After

review your listing has been live within 48 hour's - My Interior Mart Team.</h6>
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
