import React from "react";
import { Link } from "react-router-dom";

function Categoriesl() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Category Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Category Details
                <span>
                  <Link className="back_btn mx-3" to="/communicationl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div className="col-md-12 add_bottom_15">
                    <button className="btn btn-primary" style={{backgroundColor:'#fb830d'}}>Select All</button>
                </div>
              </div>
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
                  <select
                    className="wide add_bottom_10 scategory selectdrp"
                    id="scategory"
                  >
                    <option></option>
                    <option value="scategory">dasdasd</option>
                    <option value="scategory">Second Category</option>
                    <option value="scategory">asdasd dasdasd</option>
                    <option value="scategory">asdasd dasdasdds</option>
                  </select>
                </div>
                <div className="text-left col-12 mt-3">
                  
                  <Link to="/specialisationl" className="btn_1 ">
                    Save & Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categoriesl;
