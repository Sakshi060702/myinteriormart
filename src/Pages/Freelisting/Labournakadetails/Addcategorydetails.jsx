import React from "react";
import { Link } from "react-router-dom";

function Addcategorydetails()
{
    return(
        
    <div className="tab1" style={{ display: 'block' }}>

    <h4>Add Category Details</h4>
    <p className="add-lidting-title-from">
        {/* Business Listing / Add Category Details */}
    </p>
    <div className="row">
        <div className="form-group col-md-6">
            <label htmlFor="fcategory">First Category </label>
            <select className="wide add_bottom_10 fcategory selectdrp">
                <option></option>
                <option value="scategory">scategory</option>
            </select>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="scategory">Second Category </label>
            <select className="wide add_bottom_10 scategory selectdrp" id="scategory">
                <option></option>
                <option value="scategory">dasdasd</option>
                <option value="scategory">Second Category</option>
                <option value="scategory">asdasd dasdasd</option>
                <option value="scategory">asdasd dasdasdds</option>
            </select>
        </div>
        <div className="text-left col-12 mt-3">
            <Link to="/Addaddressdetails" className="btn_1 mx-2">Back</Link>
            <Link to="/Addspecialisationdetails" className="btn_1 ">Save & Continue</Link>

        </div>
    </div>

        </div>
       
    )
}

export default Addcategorydetails;