import React from "react";
import { Link } from "react-router-dom";

function Buypage(){
    return(
        <>
       <div className="tab" style={{ display: 'block' }}>
            <h4>Labour Naka</h4>

            <div className="row">
                {/* First row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to="/Productdetails" className="link-large">Product Information</Link></div>
                      <div className="link-box" ><Link to="/Productinfo" className="link-large">Product Details</Link></div>
                      <div className="link-box"> <Link to="/Buyupload" className="link-large">Upload Image</Link></div>
                        
                        
                       
                    </div>
                </div>

               

               
            </div>
        </div>                
        </>
    )
}
export default Buypage;