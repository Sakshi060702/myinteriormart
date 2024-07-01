import React from "react";
import instaimg from '../../FrontEnd/img/icon/instagram.webp';
import facebookimg from '../../FrontEnd/img/icon/facebook.png';
import whatsappimg from '../../FrontEnd/img/icon/whatsapp.png';
import ximg from '../../FrontEnd/img/icon/x.jpg';
import pintarestimg from '../../FrontEnd/img/icon/pinterest.png'

import "../../FrontEnd/css/Lisiting.css";


const Sociallink = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <>
      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .popup-content {
          position:relative;
            background: white;
            padding: 20px;
            border-radius: 5px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
            .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
          }
             
        `}
      </style>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <h6>Social Links</h6>
          <br></br>
          <p>
            <img src={instaimg} className="socialimg" style={{marginLeft:'10px'}} alt="socialmedia"/>
            <img src={facebookimg} className="socialimg" alt="socialmedia"/>
            <img src={whatsappimg} className="socialimg" alt="socialmedia"/>
            <img src={ximg} className="socialimg" alt="socialmedia"/>
            <img src={pintarestimg} className="socialimg" alt="socialmedia"/>
            
          </p>
        </div>
      </div>
    </>
  );
};

export default Sociallink;
