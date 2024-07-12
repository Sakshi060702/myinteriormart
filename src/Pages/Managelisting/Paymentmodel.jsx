import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";

function Paymentmodel() {
  const[payment,setPayment]=useState({
    selectAll:false,
    cash:false,
    cheque:false,
    rtgsNeft:false,
    debitCard:false,
    creditCard:false,
    netBanking:false,
    
  })

  const navigate=useNavigate();
  const handleCheckboxChange=(event)=>{
    const{name,checked}=event.target;
    setPayment((prevState)=>({
      ...prevState,
      [name]:checked,
    }));
  };
  const handleSelectAll=()=>{
    const allSelected=!payment.selectAll;
    const updatedPayment=Object.fromEntries(
      Object.keys(payment).map((key)=>[key,allSelected])
    );
    setPayment(updatedPayment);
  };

  const handleSubmit=async()=>{
    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/PaymentMode/CreatePaymentMode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      alert("Data saved successfully")
      navigate("/workinghoursl")
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error:", error);
      // Handle error (e.g., show an error message)
    }
  }
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Payment Mode</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Payment Mode
                <span>
                  <Link className="back_btn mx-3" to="/workinghoursl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div className="col-md-12 add_bottom_15">
                    <button className="btn btn-primary" style={{backgroundColor:'#fb830d'}}
                    onClick={handleSelectAll}>Select All</button>
                </div>
              </div>
              <div className="row">
              {Object.keys(payment).map(
                (key, index) =>
                  key !== "selectAll" && (
                    <div className="col-md-3" key={index}>
                      <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                          <label className="container_check">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            <input
                              type="checkbox"
                              id={key}
                              name={key}
                              checked={payment[key]}
                              onChange={handleCheckboxChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )
              )}
                <div className="text-left col-12 mt-3">
                  <button type="submit" className="btn_1" onClick={handleSubmit}>
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Paymentmodel;
