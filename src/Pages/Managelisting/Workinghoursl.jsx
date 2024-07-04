import React from "react";
import { Link } from "react-router-dom";

function Workinghoursl() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Working Hours</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Working Hours
                <span>
                  <Link className="back_btn mx-3" to="/specialisationl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div className="col-md-12 add_bottom_15">
                    <button className="btn btn-primary" style={{backgroundColor:'#fb830d'}}>Copy to All</button>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="mondayfrom">Monday From</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayfrom"
                    id="mondayfrom"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="mondayto">Monday To</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayto"
                    id="mondayto"
                  />
                </div>
                
                <div className="form-group col-md-6">
                  <label htmlFor="mondayfrom">Tuesday From</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayfrom"
                    id="mondayfrom"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="mondayto">Tuesday To</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayto"
                    id="mondayto"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="mondayfrom">Wednesday From</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayfrom"
                    id="mondayfrom"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="mondayto">Wednesday To</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayto"
                    id="mondayto"
                  />
                </div>

                <div className="form-group col-md-6">
                  <label htmlFor="mondayfrom">Thrusday From</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayfrom"
                    id="mondayfrom"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="mondayto">Thrusday To</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayto"
                    id="mondayto"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="mondayfrom">Friday From</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayfrom"
                    id="mondayfrom"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="mondayto">Friday To</label>
                  <input
                    className="form-control form-control-sm"
                    type="time"
                    name="mondayto"
                    id="mondayto"
                  />
                </div>
                {/* Similar input fields for other days */}
                <hr />
                <div className="col-md-12">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Saturday Holiday
                        <input
                          type="checkbox"
                          id="SaturdayHoliday"
                          name="SaturdayHoliday"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label" htmlFor="SaturdayFrom">
                      Saturday From
                    </label>
                    <input
                      className="form-control form-control-sm"
                      id="SaturdayFrom"
                      type="time"
                      name="SaturdayFrom"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label" htmlFor="SaturdayTo">
                      Saturday To
                    </label>
                    <input
                      className="form-control form-control-sm"
                      id="SaturdayTo"
                      type="time"
                      name="SaturdayTo"
                    />
                  </div>
                </div>
                <hr />
                <div className="col-md-12">
                  <div className="clearfix add_bottom_15">
                    <div className="checkboxes float-left">
                      <label className="container_check">
                        Sunday Holiday
                        <input
                          type="checkbox"
                          id="SundayHoliday"
                          name="SundayHoliday"
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label" htmlFor="SundayFrom">
                      Sunday From
                    </label>
                    <input
                      className="form-control form-control-sm"
                      id="SundayFrom"
                      type="time"
                      name="SundayFrom"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label" htmlFor="Sundayto">
                      Sunday To
                    </label>
                    <input
                      className="form-control form-control-sm"
                      id="Sundayto"
                      type="time"
                      name="Sundayto"
                    />
                  </div>
                </div>
                <div className="text-left col-12 mt-3">
                 
                  <Link to="/paymentmodel" className="btn_1 ">
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

export default Workinghoursl;
