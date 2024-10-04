import React from "react";
import { useState } from "react";
import PaymetGatewaypopup from "./PaymentGatewaypopup";

function Paymentgateway(){
    const[showPopup,setShowPopup]=useState(false);
    const message = "Your payment was successful!";
    const togglePopup=()=>{
        setShowPopup(!showPopup);
    }
    return(
        <>
        <div className="tab-pane fade show active" style={{height:'221px'}}>
            <div className="add-review">
                <div><button className="paymentgateway" onClick={togglePopup}>Payment Gateway</button></div>
            </div>
        </div>
        <PaymetGatewaypopup 
        isOpen={showPopup} 
        onClose={togglePopup} 
        message={message} 
      />
        </>
    )
}
export default Paymentgateway;