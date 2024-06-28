import React, { useState } from 'react';
import '../../FrontEnd/css/dropdown.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



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
    
    
    const handleOtpChange=(e)=>{
        setuserotp(e.target.value);
    }

    const handlePasswordChange=(e)=>{
         setuserPassword(e.target.value);
    }
    
    const handleConfirmPasswordChange=(e)=>{
        setuserConfirmPassword(e.target.value);
    }

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
                      <div className="form-group mb-4">
                        <div className="icon-wrapper">
                          <i className="icon_key_alt"></i>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          name="otp"
                          placeholder="OTP"
                          value={userotp}
                          onChange={handleOtpChange}
                        />
                      </div>
                      <p>
                        <strong>{otp}</strong>
                      </p>

                      <div
                        className="form-group"
                        style={{ position: "relative", marginBottom: "1rem" }}
                      >
                        <div className="icon-wrapper">
                          <i className="icon_lock_alt"></i>
                        </div>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control"
                          style={{ paddingRight: "2.5rem" }}
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        <i
                          onClick={togglePasswordVisibility1}
                          className={`fa ${
                            passwordVisible ? "fa-eye" : "fa-eye-slash"
                          }`}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "orange",
                            fontSize: "20px",
                          }}
                          aria-hidden="true"
                        ></i>
                      </div>

                      <div
                        className="form-group"
                        style={{ position: "relative", marginBottom: "1rem" }}
                      >
                        <div className="icon-wrapper">
                          <i className="icon_lock_alt"></i>
                        </div>
                        <input
                          type={confirmpasswordVisible ? "text" : "password"}
                          className="form-control"
                          style={{ paddingRight: "2.5rem" }}
                          name="confirmPassword"
                          id="confirm-password"
                          placeholder="Confirm Password"
                          value={userConfirmPassword}
                          onChange={handleConfirmPasswordChange}
                        />
                        <i
                          onClick={toggleConfirmPasswordVisibility}
                          className={`fa ${
                            confirmpasswordVisible ? "fa-eye" : "fa-eye-slash"
                          }`}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "orange",
                            fontSize: "20px",
                          }}
                          aria-hidden="true"
                        ></i>
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
