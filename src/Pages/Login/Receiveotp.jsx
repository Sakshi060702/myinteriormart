import React from "react";
import { Link } from 'react-router-dom';
import mobileImage from '../../FrontEnd/img/icon/mobile.png'; 
import { useLocation } from "react-router-dom";

function Receiveotp(){

    const location = useLocation();
    const { otp, mobile } = location.state || { otp: '', mobile: '' }; 

    return(
        <>
        <div className="container-fluid sign_up_container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog" style={{ maxWidth: '500px' }}>
                        <div className="step first">
                               <div>
                               
                                 <div>
                                      <h2 className="text-center pt-3" style={{ whiteSpace: 'nowrap' }}>Verify Your Mobile Number</h2>
                                      
                                 </div>
                                 <div className="row justify-content-center">
                                    <h5 >Get Connected to Verified Sellers</h5>
                                 </div>
                                
                                 
                            </div>
                           
                            <div className="tab-content checkout">
                                <div>
                                   <form action="#" method="post">
                                    
                                        <div className="form-group mr-2">
                                             <p>Enter 4 digit One Time Password(OTP) sent to your Mobile Number +91 {mobile} via SMS</p>
                                        </div>
                                        <div className="form-group mb-4 d-flex align-items-center" >
                                            <div style={{ marginTop: '-20px' }}>
                                                <img src={mobileImage} alt="Mobile Icon" style={{ width: '80px', height: '80px', marginRight: '10px' }}/>
                                            </div>
                                            <div>
                                                <input 
                                                type="text"
                                                name="OTP"
                                                placeholder="OTP"
                                                value={otp}
                                                />
                                            </div>
                                        <div className="form-group mr-2 align-self-stretch">
                                            <input
                                                        className="form-control input"
                                                        type="text"
                                                        name="OTP"
                                                        placeholder="OTP"
                                                        style={{ width: '120px', height: '50px' }}
                                                        // value={otp}
                                                        readOnly
                                                    />
                                        </div>
                                        <br></br>
                                        
                                        <div className="form-group mr-2 align-self-stretch">
                                            <Link to="/register" className="btn_1 full-width mb-4 input"  style={{ height: '50px' }} >Submit</Link>  
                                        </div>

                                        </div>
       </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}
export default Receiveotp;