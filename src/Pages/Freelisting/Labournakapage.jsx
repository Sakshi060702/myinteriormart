
import React from "react";

import { Link } from "react-router-dom";

function Labournakapage(){
    return(
        <>
         <div className="tab" style={{ display: 'block' }}>
            <h4>Labour Naka</h4>

            <div className="row">
                {/* First row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to="/Personalinformation" className="link-large">Personal Information</Link></div>
                      <div className="link-box" ><Link to="/Workingdetails" className="link-large">Work Information</Link></div>
                      <div className="link-box"> <Link to="/Addaddressdetails" className="link-large">Address</Link></div>
                        
                        
                       
                    </div>
                </div>

                {/* Second row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"> <Link to="/Categorydetails" className="link-large">Categories</Link></div>
                      <div className="link-box"><Link to="/Addspecialisationdetails" className="link-large">Specialisations</Link></div>
                      <div className="link-box"> <Link to="/Uploadimg" className="link-large">Upload Images</Link></div>
                       
                        
                       
                    </div>
                </div>

                {/* Third row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to="/paymentmode" className="link-large">Payment Modes</Link></div>
                        
                       
                    </div>
                </div>
            </div>
        </div>                                       
        </>
    )
}
export default Labournakapage;