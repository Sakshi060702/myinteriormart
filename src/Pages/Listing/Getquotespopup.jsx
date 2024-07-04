import React from "react";
import { Link } from "react-router-dom";

const Getquotespopup = ({ isOpen, onClose }) => {
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
          <h6>Enquiry Now</h6>
         
          <hr></hr>
          <div className="row">
            <div className="col-md-6">
                <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" type="text" placeholder="Full Name"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Mobile Number</label>
                    <input className="form-control" type="number" maxLength={10} placeholder="Mobile Number"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Enquiry Title</label>
                    <input className="form-control" type="text" placeholder="Enquiry Title"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="text" placeholder="Email"/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Message</label>
                    <textarea className="form-control" type="text" placeholder="Message" style={{width:'460px',height:'100px'}}/>
                </div>
            </div>
            <button className="btn btn-primary w-100" style={{backgroundColor:'orange'}}>Submit</button>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Getquotespopup;
