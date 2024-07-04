import React from "react";
import { Link } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";

const Addressl = () => {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Address Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Address Details
                <span>
                  <Link className="back_btn mx-3" to="/communicationl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div className="form-group col-md-4">
                  <label>Country</label>
                  <select className="wide add_bottom_10 country selectdrp">
                    <option></option>
                    <option value="india">india</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="state">State</label>
                  <select
                    className="wide add_bottom_10 state selectdrp"
                    id="state"
                  >
                    <option></option>
                    <option value="Maharashtra">Maharashtra</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>City</label>
                  <select className="wide add_bottom_10 city selectdrp">
                    <option></option>
                    <option value="Mumbai">Mumbai</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Assembly</label>
                  <select className="wide add_bottom_10 assembly selectdrp">
                    <option></option>
                    <option value="Dahisar">Dahisar</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Pincode</label>
                  <select className="wide add_bottom_10 pincode selectdrp">
                    <option></option>
                    <option value="400068">400068</option>
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Locality</label>
                  <select className="wide add_bottom_10 locality selectdrp">
                    <option></option>
                  </select>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="address">
                    Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control form-control-sm"
                    id="Address"
                    name="Address"
                    style={{ height: "100px" }}
                  />
                </div>
                <div className="text-left col-12 mt-3">
                  <Link to="/categoryl" className="btn_1 ">
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
};

export default Addressl;
