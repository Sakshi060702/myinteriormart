import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Workinghoursl() {
  const navigate = useNavigate();
  const [workingHours, setWorkingHours] = useState({
    mondayFrom: "10:00:00",
    mondayTo: "07:00:00",
    tuesdayFrom: "10:00:00",
    tuesdayTo: "07:00:00",
    wednesdayFrom: "10:00:00",
    wednesdayTo: "07:00:00",
    thursdayFrom: "10:00:00",
    thursdayTo: "07:00:00",
    fridayFrom: "10:00:00",
    fridayTo: "07:00:00",
    saturdayFrom: "00:00:00",
    saturdayTo: "00:00:00",
    sundayFrom: "00:00:00",
    sundayTo: "00:00:00",
    saturdayHoliday: true,
    sundayHoliday: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkingHours({
      ...workingHours,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCopyToAll = () => {
    const { mondayFrom, mondayTo } = workingHours;
    setWorkingHours({
      ...workingHours,
      tuesdayFrom: mondayFrom,
      tuesdayTo: mondayTo,
      wednesdayFrom: mondayFrom,
      wednesdayTo: mondayTo,
      thursdayFrom: mondayFrom,
      thursdayTo: mondayTo,
      fridayFrom: mondayFrom,
      fridayTo: mondayTo,
      saturdayFrom: mondayFrom,
      saturdayTo: mondayTo,
      sundayFrom: mondayFrom,
      sundayTo: mondayTo,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(
      "https://apidev.myinteriormart.com/api/WorkingHours/WorkingHours",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workinghoursVM: workingHours }),
      }
    );
    const data = await response.json();
    if (data.message === "WorkingHours Details Updated successfully") {
      console.log("Response:",data);
      alert(data)
      // Redirect to another page on successful submission
      navigate("/paymentmodel");
    } else {
      // Handle error
      console.error("Error updating working hours:", data);
    }
  };

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
                  <button
                    className="btn btn-primary"
                    style={{ backgroundColor: "#fb830d" }}
                    onClick={handleCopyToAll}
                  >
                    Copy to All
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="mondayFrom">Monday From</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="mondayFrom"
                      id="mondayFrom"
                      value={workingHours.mondayFrom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="mondayTo">Monday To</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="mondayTo"
                      id="mondayTo"
                      value={workingHours.mondayTo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="tuesdayFrom">Tuesday From</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="tuesdayFrom"
                      id="tuesdayFrom"
                      value={workingHours.tuesdayFrom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="tuesdayTo">Tuesday To</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="tuesdayTo"
                      id="tuesdayTo"
                      value={workingHours.tuesdayTo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="wednesdayFrom">Wednesday From</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="wednesdayFrom"
                      id="wednesdayFrom"
                      value={workingHours.wednesdayFrom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="wednesdayTo">Wednesday To</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="wednesdayTo"
                      id="wednesdayTo"
                      value={workingHours.wednesdayTo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="thursdayFrom">Thursday From</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="thursdayFrom"
                      id="thursdayFrom"
                      value={workingHours.thursdayFrom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="thursdayTo">Thursday To</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="thursdayTo"
                      id="thursdayTo"
                      value={workingHours.thursdayTo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="fridayFrom">Friday From</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="fridayFrom"
                      id="fridayFrom"
                      value={workingHours.fridayFrom}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="fridayTo">Friday To</label>
                    <input
                      className="form-control form-control-sm"
                      type="time"
                      name="fridayTo"
                      id="fridayTo"
                      value={workingHours.fridayTo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <div className="clearfix add_bottom_15">
                      <div className="checkboxes float-left">
                        <label className="container_check">
                          Saturday Holiday
                          <input
                            type="checkbox"
                            id="saturdayHoliday"
                            name="saturdayHoliday"
                            checked={workingHours.saturdayHoliday}
                            onChange={handleInputChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="saturdayFrom">
                        Saturday From
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id="saturdayFrom"
                        type="time"
                        name="saturdayFrom"
                        value={workingHours.saturdayFrom}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="saturdayTo">
                        Saturday To
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id="saturdayTo"
                        type="time"
                        name="saturdayTo"
                        value={workingHours.saturdayTo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="clearfix add_bottom_15">
                      <div className="checkboxes float-left">
                        <label className="container_check">
                          Sunday Holiday
                          <input
                            type="checkbox"
                            id="sundayHoliday"
                            name="sundayHoliday"
                            checked={workingHours.sundayHoliday}
                            onChange={handleInputChange}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="sundayFrom">
                        Sunday From
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id="sundayFrom"
                        type="time"
                        name="sundayFrom"
                        value={workingHours.sundayFrom}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="control-label" htmlFor="sundayTo">
                        Sunday To
                      </label>
                      <input
                        className="form-control form-control-sm"
                        id="sundayTo"
                        type="time"
                        name="sundayTo"
                        value={workingHours.sundayTo}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="text-left col-12 mt-3">
                    <button type="submit" className="btn_1">
                      Save & Continue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Workinghoursl;


