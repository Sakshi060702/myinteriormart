import React, { useState } from 'react';
import '../../FrontEnd/css/dropdown.css'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { validateMobile } from '../Validation';


function Forgetpassword() {

    const location=useLocation();
    const {mobile}=location.state ||{mobile :''};
    const[userMobile,setuserMobile]=useState('');
    const[error,setError]=useState({});
    const navigate=useNavigate();
    
    
    

    const handleMobileChange=(e)=>{
        setuserMobile(e.target.value);
    }
    

    const handleSubmit=async(e)=>{
        e.preventDefault();
         setError('');

  const mobileError = validateMobile(userMobile);

  if (mobileError) {
    setError({ userMobile: mobileError });
    return;
  }


        try{
            const response=await fetch('https://apidev.myinteriormart.com/api/SignIn/ForgotPassword',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':'df2359eb-79c7-45b9-9c02-2c66e289d5c8',
                
                },
                body:JSON.stringify({mobile:userMobile})
            });
            const data=await response.json();
            console.log(data);

            if(response.ok){
                console.log("Otp sent Successful");
                navigate('/ForgetpasswordVerifyOtp', { state: { otp: data.otp } });
            }
            else{
                setError('Failed to send otp');
            }
        }
        catch(error){
            setError('Login unsuccessful');
        }
        
    }

    return (
      <div className="container sign_up_container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog">
              <div className="step first">
                <h2 className="text-center pt-3">Forgot Password</h2>
                <div className="tab-content checkout">
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group mb-4">
                        <div className="icon-wrapper">
                          <i className="icon_mail_alt"></i>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          name="mobile"
                          placeholder="Mobile Number"
                          value={userMobile}
                          onChange={handleMobileChange}
                          required
                          maxLength={10}
                        />
                        {error.userMobile && (
                         <div className="text-danger">{error.userMobile}</div>
                      )}
                      </div>
                      <button type="submit" className="btn_1 full-width mb-4">
                        Send OTP
                      </button>
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

export default Forgetpassword;
