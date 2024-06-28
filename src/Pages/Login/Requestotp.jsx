import React from "react";
import { Link } from 'react-router-dom'


function Requestotp(){
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
                                            <p>Click below to get 4 digit One Time Password(OTP)
                                                On your Mobile Number +91 xxxxxxxxx via SMS
                                            </p>
                                        </div>
                                        <div className="form-group mb-4">
                                            
                                        </div>
                                        <Link to="/receiveotp" className="btn_1 full-width mb-4">Request OTP</Link>        </form>
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
export default Requestotp