import React from "react";
import instaimg from '../../FrontEnd/img/icon/instagram.webp';
import facebookimg from '../../FrontEnd/img/icon/facebook.png';
import whatsappimg from '../../FrontEnd/img/icon/whatsapp.png';
import ximg from '../../FrontEnd/img/icon/x.jpg';
import pintarestimg from '../../FrontEnd/img/icon/pinterest.png'
import linkdenimg from '../../FrontEnd/img/icon/linkedin.png';
import copylink from '../../FrontEnd/img/icon/link.png';

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
            position: relative;
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
          .socialimg {
            width: 60px;
            height: 60px;
            margin-bottom: 10px;
          }
          @media(max-width:767px) {
            .socialimg {
              width: 40px;
              height: 40px;
            }
            .popup-content {
              position: fixed;
              bottom: -100%;
              left: 0;
              right: 0;
              width: 100%;
              max-width: none;
              border-radius: 20px 20px 0 0;
              transition: bottom 0.3s ease-in-out;
            }
            .popup-content.open {
              bottom: 0;
            }
            .close-button {
              top: 15px;
              right: 15px;
              font-size: 1.5rem;
            }
          }
        `}
      </style>
      <div className="popup-overlay" onClick={onClose}>
        <div className={`popup-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <h6>Share Now</h6>
          <br />
          <div style={{ overflowX: 'auto' }}>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
              <a href="https://web.whatsapp.com/send?text" target="_blank" rel="noopener noreferrer">
                <img src={whatsappimg} className="socialimg" alt="whatsapp" style={{ marginLeft: '14px' }} />
              </a>
              <a href="https://www.facebook.com/sharer/sharer.php?description" target="_blank" rel="noopener noreferrer">
                <img src={facebookimg} className="socialimg" alt="facebook" />
              </a>
              <a href="https://www.pinterest.com/pin/create/button/?description" target="_blank" rel="noopener noreferrer">
                <img src={pintarestimg} className="socialimg" alt="pinterest" />
              </a>
              <a href="https://www.linkedin.com/sharing/share-offsite" target="_blank" rel="noopener noreferrer">
                <img src={linkdenimg} className="socialimg" alt="linkedin" />
              </a>
              <a href="http://twitter.com/share?text" target="_blank" rel="noopener noreferrer">
                <img src={ximg} className="socialimg" alt="x" />
              </a>
              <a target="_blank" rel="noopener noreferrer">
                <img src={copylink} className="socialimg" alt="copy link" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sociallink;
