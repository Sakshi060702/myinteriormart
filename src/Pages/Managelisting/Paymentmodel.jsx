import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import nextarrowimg from "../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Popupalert from "../Popupalert";

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
  const token=useSelector((state)=>state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  useEffect(()=>{
    const fetchPaymentmode=async()=>{
      try{
        const response=await fetch("https://apidev.myinteriormart.com/api/BinddetailsListing/GetPaymentmodeDetailslisting",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);

        }
        const data=await response.json();
        setPayment((prevState)=>({
          ...prevState,
          ...data,
        }))
      }
      catch(error){
        console.error("Error:", error);
      }
    };
    fetchPaymentmode();
  },[token]);


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


    const isAnyCheckboxSelected = Object.keys(payment).some(
      (key) => payment[key] === true
    );
  
    if (!isAnyCheckboxSelected) {
      setErrorMessage("Please select at least one payment mode.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
      return; // Prevent form submission
    }
    
    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/PaymentMode/CreatePaymentMode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payment),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const cityName = localStorage.getItem('cityname');
      const pathlisting = `/Imagesl/${cityName}`;
      navigate(pathlisting);

    //   console.log("Response:", data);
    //   console.log("Payment token",token);
    //   setSuccessMessage("Payment Details Saved Successfully");
    //   setErrorMessage("");
    //   setShowPopup(true);

    //   setTimeout(() => {
    //   setShowPopup(false);
    //   navigate("/Imagesl");
    // }, 2000);
     
      
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to save payment details. Please try again later.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
      // Handle error (e.g., show an error message)
    }
  }
  const handleClosePopup = () => {
    setShowPopup(false);
  };
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
                <Link className="back_btn mx-3" to={`/labournakapage/${localStorage.getItem('cityname')}`}>
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
              {Object.keys(payment)
                .filter(key => !['selectAll', 'listingID', 'ownerGuid', 'ipAddress','payTM','phonePay','paypal'].includes(key))
                .map((key, index) => (
                  <div className="col-md-4" key={index}>
                    <div className="clearfix add_bottom_15">
                      <div className="checkboxes float-left">
                        <label className="container_check">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
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
                ))}
                  <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                  <button type="submit" className="btn_1"  onClick={handleSubmit}>
                  Save & Continue
                  </button>
                  <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                  <Link to="/workinghoursl" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/Imagesl" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
                    </div>
                </div>
              </div>
              {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
            onClose={handleClosePopup}
          />
          )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthh(Paymentmodel);
