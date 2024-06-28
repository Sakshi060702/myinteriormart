import React from "react";
import { Link } from "react-router-dom";

function Workingdetails(){
    return(
        
        <div className="tab1" style={{ display: 'block' }}>
            <h4>Work Information</h4>
            <p className="add-lidting-title-from"></p>
        <div className="row">
        <div className="form-group col-md-4">
            <label htmlFor="tag-line">Tag Line <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" type="text" name="full-name" id="tag-line" />
        </div>

        <div className="form-group col-md-4">
            <label htmlFor="tag-line">Since <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" type="text" name="since" id="since" />
        </div>

        <div className="form-group col-md-4">
            <label htmlFor="tag-line">Per Day Payment <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" type="text" name="per-day-payment" id="per-day-payment" />
        </div>

        <div className="form-group col-md-4">
            <label htmlFor="tag-line">7 Day Payment <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" type="text" name="7-day-payment" id="7-day-payment" />
        </div>

        <div className="form-group col-md-4">
            <label htmlFor="tag-line">15 Day Payment <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" type="text" name="15-day-payment" id="15-day-payment" />
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="tag-line">28 Day Payment <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" type="text" name="28-day-payment" id="28-day-payment" />
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="tag-line">30 Day Payment <span className="text-danger">*</span></label>
            <input className="form-control form-control-sm" type="text" name="30-day-payment" id="30-day-payment" />
        </div>

        <div className="form-group col-md-4">
    <label>Working Time</label>
    <select className="wide add_bottom_10 city selectdrp" name="working-time">
        <option></option>
        <option value="9:00 AM TO 6:00 PM">9:00 AM TO 6:00 PM</option>
    </select>
</div>
<div className="form-group col-md-4">
    <label>Sunday Working?</label>
    <select className="wide add_bottom_10 assembly selectdrp" name="sunday-working">
        <option></option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
</div>
<div className="form-group col-md-4">
    <label>Festival Working?</label>
    <select className="wide add_bottom_10 assembly selectdrp" name="festival-working">
        <option></option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
</div>
<div className="form-group col-md-4">
    <label>Night Working?</label>
    <select className="wide add_bottom_10 assembly selectdrp" name="night-working">
        <option></option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
</div>
<div className="form-group col-md-4">
    <label>Out of City Working?</label>
    <select className="wide add_bottom_10 assembly selectdrp" name="out-city-working">
        <option></option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
    </select>
</div>
<div className="form-group col-12">
    <label htmlFor="about">About Us <span className="text-danger">*</span></label>
    <textarea className="form-control form-control-sm" id="about" name="about" style={{ height: '100px' }}></textarea>
</div>

        {/* Similar input fields for other details */}
        <div className="text-left col-12 mt-3">
            <Link to="/Personalinformation" className="btn_1 mx-2">Back</Link>
            <Link to="/Addaddressdetails" className="btn_1 ">Save & Continue</Link>
        </div>
    </div>

        </div>
        
    )
}
export default Workingdetails;