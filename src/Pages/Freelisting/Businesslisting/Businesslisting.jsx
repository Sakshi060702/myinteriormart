import React from "react";
import { Link } from 'react-router-dom';
import "./Businesslisting.css"

function Busineslisting(){

  

    return(
            <div className="tab" style={{ display: 'block' }}>
            <h4>Business Listing</h4>

            <div className="row">
                {/* First row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to="/addcompany" className="link-large">Company Details</Link></div>
                      <div className="link-box" ><Link to="/addCommunication" className="link-large">Communication</Link></div>
                      <div className="link-box"> <Link to="/Addaddressdetails" className="link-large">Address</Link></div>
                        
                        
                       
                    </div>
                </div>

                {/* Second row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"> <Link to="/addcategory" className="link-large">Categories</Link></div>
                      <div className="link-box"><Link to="/addspecialisation" className="link-large">Specialisations</Link></div>
                      <div className="link-box"> <Link to="/addworkinghours" className="link-large">Working Hours</Link></div>
                       
                        
                       
                    </div>
                </div>

                {/* Third row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to="/addpayment" className="link-large">Payment Modes</Link></div>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Busineslisting;