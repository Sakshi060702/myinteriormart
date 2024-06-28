import React from "react";
import { Link } from "react-router-dom";

function Addspecialisation()
{
    return(

     <div className="tab" style={{ display: 'block' }}>
   <h4>Add Specialisations Details</h4>
    <p className="add-lidting-title-from">
        {/* Business Listing / Add Specialisations Details */}
    </p>
    <div className="row mb-3">
        <div className="col-md-12">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Select all
                        <input type="checkbox" id="select-all" name="select-all" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-3">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Exhibition Stall
                        <input type="checkbox" id="Exhibition" name="Exhibition" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Hotel
                        <input type="checkbox" id="Hotel" name="Hotel" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Restaurants
                        <input type="checkbox" id="Restaurants" name="Restaurants" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
        <div className="col-md-3">
            <div className="clearfix add_bottom_15">
                <div className="checkboxes float-left">
                    <label className="container_check">Banks
                        <input type="checkbox" id="Banks" name="Banks" />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="text-left col-12 mt-3">
                    <Link to="/addcategory" className="btn_1 mx-2">Back</Link>
                    <Link to="/addworkinghours" className="btn_1 ">Save & Continue</Link>
        </div>
    </div>
        </div>
        
    )
}

export default Addspecialisation;