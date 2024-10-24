import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PaymetGatewaypopup from "./PaymentGatewaypopup";

function Paymentgateway() {
  const location = useLocation(); // Fix: call useLocation() as a function
  const [showPopup, setShowPopup] = useState(false);
  const message = "Your payment was successful!";

  // Toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Access packageId from the state passed via navigate
  const packageId = location.state?.packageId;
  console.log("packageId", packageId); // Check if packageId is logged correctly

  return (
    <>
      <div className="tab-pane fade show active" style={{ height: "221px" }}>
        <div className="add-review">
          <h5>Package ID: {packageId}</h5>
          <div>
            <button className="paymentgateway" onClick={togglePopup}>
              Payment Gateway
            </button>
          </div>
        </div>
      </div>
      <PaymetGatewaypopup 
        isOpen={showPopup} 
        onClose={togglePopup} 
        message={message} 
        packageId={packageId}
      />
    </>
  );
}

export default Paymentgateway;
