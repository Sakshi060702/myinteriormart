import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../FrontEnd/css/Mangelisting.css";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../FrontEnd/img/arrow-previous.png";

const Workinghoursl = () => {
  const [workingHours, setWorkingHours] = useState({
    MondayFrom: "10:00:00",
    MondayTo: "07:00:00",
    TuesdayFrom: "10:00:00",
    TuesdayTo: "07:00:00",
    WednesdayFrom: "10:00:00",
    WednesdayTo: "07:00:00",
    ThursdayFrom: "10:00:00",
    ThursdayTo: "07:00:00",
    FridayFrom: "10:00:00",
    FridayTo: "07:00:00",
    SaturdayFrom: "00:00:00",
    SaturdayTo: "00:00:00",
    SundayFrom: "00:00:00",
    SundayTo: "00:00:00",
    SaturdayHoliday: false,
    SundayHoliday: false,
  });

  const navigate = useNavigate();

  const handleCopyToAll = () => {
    const { MondayFrom, MondayTo } = workingHours;
    setWorkingHours({
      ...workingHours,
      TuesdayFrom: MondayFrom,
      TuesdayTo: MondayTo,
      WednesdayFrom: MondayFrom,
      WednesdayTo: MondayTo,
      ThursdayFrom: MondayFrom,
      ThursdayTo: MondayTo,
      FridayFrom: MondayFrom,
      FridayTo: MondayTo,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setWorkingHours({
      ...workingHours,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/WorkingHours/WorkingHours",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(workingHours),
        }
      );

      const result = await response.json();
      console.log(result);
      alert("Data Saved Successfully");
      navigate("/paymentmodel");
    } catch (error) {
      console.error("Error:", error);
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
                  <Link className="back_btn mx-3" to="/labournakapage">
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
                  {Object.keys(workingHours).map((key) => (
                    <div key={key} className="col-md-6">
                      {key === "SaturdayHoliday" ||
                      key === "SundayHoliday" ? null : (
                        <div className="form-group">
                          <label>
                            {key}
                            <input
                              className="form-control form-control-sm"
                              type={
                                key.includes("Holiday") ? "checkbox" : "time"
                              }
                              name={key}
                              checked={
                                key.includes("Holiday")
                                  ? workingHours[key]
                                  : undefined
                              }
                              value={
                                !key.includes("Holiday")
                                  ? workingHours[key]
                                  : undefined
                              }
                              onChange={handleChange}
                              style={{ width: "350%" }}
                            />
                          </label>
                        </div>
                      )}
                      {key === "FridayTo" && (
                        <div className="col-md-12">
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes float-left">
                              <label className="container_check">
                                Saturday Holiday
                                <input
                                  className="form-control form-control-sm"
                                  type="checkbox"
                                  name="SaturdayHoliday"
                                  checked={workingHours["SaturdayHoliday"]}
                                  onChange={handleChange}
                                  style={{ width: "350%" }}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                      {key === "SaturdayFrom" && (
                        <div className="col-md-12">
                          <div className="clearfix add_bottom_15">
                            <div className="checkboxes float-left">
                              <label className="container_check">
                                Sunday Holiday
                                <input
                                  className="form-control form-control-sm"
                                  type="checkbox"
                                  name="SundayHoliday"
                                  checked={workingHours["SundayHoliday"]}
                                  onChange={handleChange}
                                  style={{ width: "350%" }}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="text-left col-12 mt-3">
                    <button type="submit" className="btn_1">
                      Save & Continue
                    </button>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "10px",
                      }}
                    >
                      <Link to="/specialisationl">
                        <img
                          src={previousarrowimg}
                          style={{ height: "30px" }}
                        />
                      </Link>
                      <Link to="/paymentmodel">
                        <img src={nextarrowimg} style={{ height: "30px" }} />
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <form onSubmit={handleSubmit}>
            {Object.keys(workingHours).map((key) => (
                <div key={key}>
                    <label>
                        {key}
                        <input
                            type={key.includes('Holiday') ? 'checkbox' : 'text'}
                            name={key}
                            value={workingHours[key]}
                            onChange={handleChange}
                            checked={workingHours[key] === true}
                        />
                    </label>
                </div>
            ))}
            <button type="submit">Submit</button>
        </form> */}
    </>
  );
};

export default Workinghoursl;
