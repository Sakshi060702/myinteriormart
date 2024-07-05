import React from "react";
import { Link } from "react-router-dom";

function Paymentmodel() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Payment Mode</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Payment Mode
                <span>
                  <Link className="back_btn mx-3" to="/workinghoursl">
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
                <div className="col-md-4 col-6">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Cash
                        <input type="checkbox" id="Cash" name="Cash" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Cheque
                        <input type="checkbox" id="Cash" name="Cheque" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        RTGS & NEFT
                        <input type="checkbox" id="Cash" name="RTGS&NEFT" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Debit Card
                        <input type="checkbox" id="Cash" name="Debit Card" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Credit Card
                        <input type="checkbox" id="Cash" name="Credit Card" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-6">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Net Banking
                        <input type="checkbox" id="Cash" name="Credit Card" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="text-left col-12 mt-3">
                  
                  <Link to="/Imagesl" className="btn_1 ">
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

export default Paymentmodel;
