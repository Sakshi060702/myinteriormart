import React from "react";
import { Link } from "react-router-dom";

function Productinfo(){
    return(
         
    <div className="tab1" style={{ display: 'block' }}>
  
        <h4>Product Information</h4>
         <p className="add-lidting-title-from"></p>
        <div className="row">
       <div className="form-group col-md-4">
        <label htmlFor="condition">Product Condition </label>
        <select className="wide add_bottom_10 fcategory selectdrp" id="condition">
          <option></option>
          <option value="Good">Good</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="product-age">Product Age <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="product-age" id="product-age" />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="warranty">Warranty <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="warranty" id="warranty" />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="product-store">Product Store </label>
        <select className="wide add_bottom_10 scategory selectdrp" id="product-store">
          <option></option>
          <option value="Cold Place">Cold Place</option>
          <option value="Hot Place">Hot Place</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label>Washable </label>
        <select className="wide add_bottom_10 city selectdrp" name="washable">
          <option></option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label>Last Day </label>
        <select className="wide add_bottom_10 city selectdrp" name="last-day">
          <option></option>
          <option value="Last Day">Last Day</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label>Prize Negotiable </label>
        <select className="wide add_bottom_10 city selectdrp" name="prize-negotiable">
          <option></option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="delivery">Delivery <span className="text-danger">*</span></label>
        <input className="form-control form-control-sm" type="text" name="delivery" id="delivery" />
      </div>
      <div className="form-group col-md-4">
        <label>Payment </label>
        <select className="wide add_bottom_10 city selectdrp" name="payment">
          <option></option>
          <option value="Cash">Cash</option>
          <option value="Online">Online</option>
        </select>
      </div>

    
      <div className="text-left col-12 mt-3">
         <Link to="/Productdetails" className="btn_1 mx-2">Back</Link>
            <Link to="/Buyupload" className="btn_1 ">Save & Continue</Link>
      </div>
    </div>

        </div>
       
    )
}
export default Productinfo;