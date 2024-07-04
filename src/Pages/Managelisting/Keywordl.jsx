import React from "react";
import { Link } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";

function Keywordl() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Keywords</h4>
              <p className="add-lidting-title-from">
              Add Listing / Keywords
                <span>
                  <Link className="back_btn mx-3" to="/addcompanyl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div class="form-group col-md-6">
                  <label for="name">Keywords </label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter Keyword"
                  />
                </div>
                
                
                
                
                

               
                <div className="text-left col-12 mt-3">
                  <Link to="/addressl" className="btn_1 ">
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
export default Keywordl;
