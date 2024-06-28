import React from "react";
import { Link } from "react-router-dom";

function Addworkinghours()
{
    return(

     <div className="tab" style={{ display: 'block' }}> 
<h4>Add Working Hours</h4>
    <p className="add-lidting-title-from">
        {/* Business Listing / Add Working Hours */}
    </p>
    <div className="row">
        <div className="form-group col-md-6">
            <label htmlFor="mondayfrom">Monday From</label>
            <input className="form-control form-control-sm" type="time" name="mondayfrom" id="mondayfrom" />
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="mondayto">Monday To</label>
            <input className="form-control form-control-sm" type="time" name="mondayto" id="mondayto" />
        </div>
        {/* Similar input fields for other days */}
        <hr />
        <div className="col-md-12">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Saturday Holiday
                        <input type="checkbox" id="SaturdayHoliday" name="SaturdayHoliday" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label className="control-label" htmlFor="SaturdayFrom">Saturday From</label>
                <input className="form-control form-control-sm" id="SaturdayFrom" type="time" name="SaturdayFrom" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label className="control-label" htmlFor="SaturdayTo">Saturday To</label>
                <input className="form-control form-control-sm" id="SaturdayTo" type="time" name="SaturdayTo" />
            </div>
        </div>
        <hr />
        <div className="col-md-12">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Sunday Holiday
                        <input type="checkbox" id="SundayHoliday" name="SundayHoliday" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label className="control-label" htmlFor="SundayFrom">Sunday From</label>
                <input className="form-control form-control-sm" id="SundayFrom" type="time" name="SundayFrom" />
            </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
                <label className="control-label" htmlFor="Sundayto">Sunday To</label>
                <input className="form-control form-control-sm" id="Sundayto" type="time" name="Sundayto" />
            </div>
        </div>
        <div className="text-left col-12 mt-3">
             <Link to="/addspecialisation" className="btn_1 mx-2">Back</Link>
            <Link to="/addpayment" className="btn_1 ">Save & Continue</Link>
        </div>
    </div>
        </div>
        
    )
}

export default Addworkinghours;