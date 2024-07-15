import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Workinghoursl() {
  const navigate = useNavigate();

  const [workingHours, setWorkingHours] = useState({
    mondayFrom: "",
    mondayTo: "",
    tuesdayFrom: "",
    tuesdayTo: "",
    wednesdayFrom: "",
    wednesdayTo: "",
    thursdayFrom: "",
    thursdayTo: "",
    fridayFrom: "",
    fridayTo: "",
    saturdayFrom: "",
    saturdayTo: "",
    sundayFrom: "",
    sundayTo: "",
    saturdayHoliday: false,
    sundayHoliday: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkingHours({
      ...workingHours,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const formatTime = (time) => {
    if (!time) return "";
    const today = new Date();
    const [hours, minutes] = time.split(":");
    today.setHours(hours, minutes);
    return today.toISOString();
  };

  const handleSubmit = async () => {
    const formattedWorkingHours = {
      ...workingHours,
      mondayFrom: formatTime(workingHours.mondayFrom),
      mondayTo: formatTime(workingHours.mondayTo),
      tuesdayFrom: formatTime(workingHours.tuesdayFrom),
      tuesdayTo: formatTime(workingHours.tuesdayTo),
      wednesdayFrom: formatTime(workingHours.wednesdayFrom),
      wednesdayTo: formatTime(workingHours.wednesdayTo),
      thursdayFrom: formatTime(workingHours.thursdayFrom),
      thursdayTo: formatTime(workingHours.thursdayTo),
      fridayFrom: formatTime(workingHours.fridayFrom),
      fridayTo: formatTime(workingHours.fridayTo),
      saturdayFrom: formatTime(workingHours.saturdayFrom),
      saturdayTo: formatTime(workingHours.saturdayTo),
      sundayFrom: formatTime(workingHours.sundayFrom),
      sundayTo: formatTime(workingHours.sundayTo),
    };

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/WorkingHours/WorkingHours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ workinghoursVM: formattedWorkingHours }),
        }
      );
      const data = await response.json();
      if (data.message === "WorkingHours Details Updated successfully") {
        navigate("/paymentmodel");
      } else {
        alert("Failed to update working hours");
      }
    } catch (error) {
      console.error("Error updating working hours:", error);
      alert("An error occurred while updating working hours");
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
                  <button className="btn btn-primary" style={{ backgroundColor: '#fb830d' }}>Copy to All</button>
                </div>
              </div>
              <div className="row">
                {["monday", "tuesday", "wednesday", "thursday", "friday"].map((day) => (
                  <React.Fragment key={day}>
                    <div className="form-group col-md-6">
                      <label htmlFor={`${day}From`}>{`${day.charAt(0).toUpperCase() + day.slice(1)} From`}</label>
                      <input
                        className="form-control form-control-sm"
                        type="time"
                        name={`${day}From`}
                        id={`${day}From`}
                        value={workingHours[`${day}From`]}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor={`${day}To`}>{`${day.charAt(0).toUpperCase() + day.slice(1)} To`}</label>
                      <input
                        className="form-control form-control-sm"
                        type="time"
                        name={`${day}To`}
                        id={`${day}To`}
                        value={workingHours[`${day}To`]}
                        onChange={handleInputChange}
                      />
                    </div>
                  </React.Fragment>
                ))}
                <hr />
                {["saturday", "sunday"].map((day) => (
                  <React.Fragment key={day}>
                    <div className="col-md-12">
                      <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                          <label className="container_check">
                            {`${day.charAt(0).toUpperCase() + day.slice(1)} Holiday`}
                            <input
                              type="checkbox"
                              id={`${day}Holiday`}
                              name={`${day}Holiday`}
                              checked={workingHours[`${day}Holiday`]}
                              onChange={handleInputChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label className="control-label" htmlFor={`${day}From`}>{`${day.charAt(0).toUpperCase() + day.slice(1)} From`}</label>
                        <input
                          className="form-control form-control-sm"
                          id={`${day}From`}
                          type="time"
                          name={`${day}From`}
                          value={workingHours[`${day}From`]}
                          onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label className="control-label" htmlFor={`${day}To`}>{`${day.charAt(0).toUpperCase() + day.slice(1)} To`}</label>
                          <input
                            className="form-control form-control-sm"
                            id={`${day}To`}
                            type="time"
                            name={`${day}To`}
                            value={workingHours[`${day}To`]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                  <div className="text-left col-12 mt-3">
                    <button className="btn_1" onClick={handleSubmit}>
                      Save & Continue
                    </button>
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
  
