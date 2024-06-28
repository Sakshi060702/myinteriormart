import React from "react";
import { Link } from "react-router-dom";
import "./Businesslisting.css"

function Addcommunication(){
    
    return(
          
        <div className="tab" style={{ display: 'block' }}>         
     <h4>Add Communication Details</h4>
      <p className="add-lidting-title-from">
        {/* Business Listing / Add Communication Details */}
      </p>
      <div className="row">
        <div className="form-group col-md-4">
          <label htmlFor="lang">Languages <span className="text-danger">*</span></label>
          <select className="wide add_bottom_10 state selectdrp" id="lang">
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Marathi">Marathi</option>
          </select>
          
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="Mobile">Mobile 1 <span className="text-danger">*</span></label>
          <input className="form-control form-control-sm" type="number" name="Mobile" id="Mobile" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="Mobile2">Mobile 2 </label>
          <input className="form-control form-control-sm" type="number" name="Mobile2" id="Mobile2" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="telephone">Telephone</label>
          <input className="form-control form-control-sm" type="number" name="telephone" id="telephone" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="tollfree">Toll Free</label>
          <input className="form-control form-control-sm" type="number" name="tollfree" id="tollfree" />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="website">Website</label>
          <input className="form-control form-control-sm" type="name" name="website" id="website" />
        </div>

        <div className="text-left col-12 mt-3">
        <Link to="/addcompany" className="btn_1 mx-2">Back</Link>
        <Link to="/address" className="btn_1 ">Save & Continue</Link>
         
       
        </div>
      </div>
            
        </div>
      
    )
}
export default Addcommunication;