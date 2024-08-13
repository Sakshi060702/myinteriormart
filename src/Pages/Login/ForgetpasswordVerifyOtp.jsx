import React, { useState } from 'react';
import '../../FrontEnd/css/dropdown.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '../../FrontEnd/css/Changepassword.css'



function ForgetpasswordVerifyotp() {

    const location=useLocation();
    
    
    const {otp,password,confirmpassword}=location.state ||{otp :'',password:'',confirmpassword:''};
    const[userotp,setuserotp]=useState('');
    const[userPassword,setuserPassword]=useState('');
    const[showPassword,setshowPassword]=useState('false');
    const[userConfirmPassword,setuserConfirmPassword]=useState('');
    const[error,setError]=useState('');
    const [successMessage,setSuccessMessage]=useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);

    const [oldPinVisible, setOldPinVisible] = useState(false);
    const [pinVisible, setPinVisible] = useState(false);
    const [confirmPinVisible, setConfirmPinVisible] = useState(false);
  
    const [pin, setPin] = useState(["", "", "", ""]);
    const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  
    const [userOtp, setUserOtp] = useState(["", "", "", ""]);
    
    
    const handleOtpChange = (e, index) => {
      const { value } = e.target;
  
      // Check if the input value is a digit
      if (/^\d?$/.test(value)) {
        const newOtp = [...userOtp];
        newOtp[index] = value;
        setUserOtp(newOtp);
  
        // Automatically focus on the next input box if there is a value and index < 3
        if (value && index < 3) {
          document.getElementById(`otp-${index + 1}`).focus();
        }
      }
    };

    const handlePinChange = (e, index) => {
      const { value } = e.target;
  
      // Check if the input value is a digit
      if (/^\d?$/.test(value)) {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
  
        // Automatically focus on the next input box if there is a value and index < 3
        if (value && index < 3) {
          document.getElementById(`pin-${index + 1}`).focus();
        }
      }
    };
    const handleConfirmPinChange = (e, index) => {
      const { value } = e.target;
  
      // Check if the input value is a digit
      if (/^\d?$/.test(value)) {
        const newPin = [...confirmPin];
        newPin[index] = value;
        setConfirmPin(newPin);
  
        // Automatically focus on the next input box if there is a value and index < 3
        if (value && index < 3) {
          document.getElementById(`confirm-pin-${index + 1}`).focus();
        }
      }
    };

    const togglePinVisibility = () => {
      setPinVisible(!pinVisible);
    };
  
    const toggleConfirmPinVisibility = () => {
      setConfirmPinVisible(!confirmPinVisible);
    };
  
    const togglePasswordVisibility = () => {
    setshowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmpasswordVisible);
  };
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');

        try{
            const response=await fetch('https://apidev.myinteriormart.com/api/SignIn/VerifyOtpFogotpassword',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':'12345abcde67890fghij12345klmno67890pqr',
                
                },
                body:JSON.stringify({otp:userotp,password:userPassword,confirmpassword:userConfirmPassword})
            });
            const data=await response.json();
            console.log(data);

            if(response.ok){
                console.log("Password updated Successfully");
                setSuccessMessage('Password updated Successfully');

            }
        }
        catch(error){
            setError('Password Not Updated');
        }
        
    }

    return (
      <div className="container sign_up_container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog">
              <div className="step first">
                <h2 className="text-center pt-3">Verify Otp</h2>
                <div className="tab-content checkout">
                  <div>
                    <form onSubmit={handleSubmit}>
                    <div className=" mb-4  align-items-center otp-inputs">
                      {userOtp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleOtpChange(e, index)}
                          className="otp-input "
                          style={{ color: "black" }}
                        />
                      ))}
                    </div>
                      <p>
                        <strong>{otp}</strong>
                      </p>

                      <div className="">
                      <div style={{ paddingLeft: "80px" }}>
                        <div className="pin-group">
                          <label htmlFor="pin">New PIN</label>
                          <div className="pin-input-group">
                            {[...Array(4)].map((_, index) => (
                              <input
                                key={index}
                                id={`pin-${index}`}
                                type={pinVisible ? "text" : "password"}
                                maxLength="1"
                                className="pin-input"
                                value={pin[index] || ""}
                                onChange={(e) => handlePinChange(e, index)}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "Backspace" &&
                                    index > 0 &&
                                    !pin[index]
                                  ) {
                                    const newPin = [...pin];
                                    newPin[index - 1] = "";
                                    setPin(newPin);
                                    document
                                      .getElementById(`pin-${index - 1}`)
                                      .focus();
                                  }
                                }}
                                onFocus={(e) => e.target.select()}
                                required
                              />
                            ))}
                          </div>
                          <i
                            onClick={togglePinVisibility}
                            className={`fa ${
                              pinVisible ? "fa-eye" : "fa-eye-slash"
                            }`}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              color: "orange",
                              fontSize: "20px",
                              marginRight: "60px",
                              marginTop: "20px",
                            }}
                            aria-hidden="true"
                          ></i>
                        </div>

                        <div className="pin-group">
                          <label htmlFor="confirm-pin">Confirm PIN</label>
                          <div className="pin-input-group">
                            {[...Array(4)].map((_, index) => (
                              <input
                                key={index}
                                id={`confirm-pin-${index}`}
                                type={confirmPinVisible ? "text" : "password"}
                                maxLength="1"
                                className="pin-input"
                                value={confirmPin[index] || ""}
                                onChange={(e) =>
                                  handleConfirmPinChange(e, index)
                                }
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "Backspace" &&
                                    index > 0 &&
                                    !confirmPin[index]
                                  ) {
                                    const newPin = [...confirmPin];
                                    newPin[index - 1] = "";
                                    setConfirmPin(newPin);
                                    document
                                      .getElementById(
                                        `confirm-pin-${index - 1}`
                                      )
                                      .focus();
                                  }
                                }}
                                onFocus={(e) => e.target.select()}
                                required
                              />
                            ))}
                          </div>
                          <i
                            onClick={toggleConfirmPinVisibility}
                            className={`fa ${
                              confirmPinVisible ? "fa-eye" : "fa-eye-slash"
                            }`}
                            style={{
                              position: "absolute",
                              top: "50%",
                              right: "10px",
                              transform: "translateY(-50%)",
                              cursor: "pointer",
                              color: "orange",
                              fontSize: "20px",
                              marginRight: "60px",
                              marginTop: "20px",
                            }}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>


                      <button type="submit" className="btn_1 full-width mb-4">
                        Submit
                      </button>
                      {successMessage && (
                        <div className="alert alert-success">
                          {successMessage}
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ForgetpasswordVerifyotp;
