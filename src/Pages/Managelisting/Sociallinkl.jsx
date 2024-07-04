import React from "react";
import { Link } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";

function Sociallinkl() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Social Links</h4>
              <p className="add-lidting-title-from">
                Add Listing / Social Links
                <span>
                  <Link className="back_btn mx-3" to="/addcompanyl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div class="form-group col-md-6">
                  <label for="name">Facebook </label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter Facebook Link"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Whatsapp </label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter Whatsapp Link"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">LinkdenIn</label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter LinkdenIn Link"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Twitter</label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter Twitter Link"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Youtube</label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter Youtube Link"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Instagram</label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter Instagram Link"
                  />
                </div>
                <div class="form-group col-md-6">
                  <label for="name">Pinterest</label>
                  <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Enter Pinterest Link"
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
export default Sociallinkl;
