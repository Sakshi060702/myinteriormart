import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../FrontEnd/css/Paymentmode.css";
import successimg from "../../FrontEnd/img/mimsuccess.png";

const PaymetGatewaypopup = ({ isOpen, onClose, message }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const cityName = localStorage.getItem("cityname");
  const pathlisting = `/${cityName}`;

  const listingpage = `/labournakapage/in-${localStorage.getItem("cityname")}`;

  const handleContinue = () => {
    onClose();
    navigate(pathlisting);
  };

  const handlelisting = () => {
    onClose();
    navigate(listingpage);
  };

  return (
    <>
      {isOpen && (
        <div className="popup2-overlay" onClick={onClose}>
          <div className="popup2-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <img
                src={successimg}
                className="paymentimage"
                style={{ height: "80px", width: "80px", marginBottom: "12px" }}
              ></img>
              <h3
                className="success-message"
                style={{ textAlign: "center", color: "orange" }}
              >
                Thank You
              </h3>
              <h6 style={{ textAlign: "center" }}>{message}</h6>
            </div>

            <div style={{ display: "flex" }}>
              <div className="popupbutton-container paymentgatewaypopup">
                <button
                  onClick={handleContinue}
                  style={{ color: "white", fontSize: "18px" }}
                >
                  Home
                </button>
              </div>
              <div className="popupbutton-container paymentgatewaypopup">
                <button
                  onClick={handlelisting}
                  style={{ color: "white", fontSize: "18px" }}
                >
                  Go to Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymetGatewaypopup;
