import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Address1() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted!");
  };

  const [selectStatus, setSelectstatus] = useState("Select Marrital Status");
  const handleSelect = (eventKey) => {
    switch (eventKey) {
      case "Single":
        setSelectstatus("Single");
        break;
      case "Married":
        setSelectstatus("Married");
        break;

      default:
        setSelectstatus("Select Marrital Status");
    }
  };

  const [selectState, setSelectState] = useState("Select Marrital Status");
  const handleSelectstate = (eventKey) => {
    switch (eventKey) {
      case "Mumbai":
        setSelectState("Mumbai");
        break;
      case "Gujarat":
        setSelectState("Gujarat");
        break;
      case "Other":
        setSelectState("Other");
        break;

      default:
        setSelectState("Select State");
    }
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>Edit Address</h5>
          <form className="icon-form-group" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-12">
                <label>D.O.B</label>
                <input className="form-control" type="date" name="dob" />
                <i className="icon_date"></i>
              </div>
              <div className="form-group col-12">
                <div className="custom-select-form">
                  <label>Marital Status</label>
                  <DropdownButton
                    id="dropdown-basic-button"
                    className="custom-dropdown2"
                    title={selectStatus}
                    onSelect={handleSelect}
                    variant="transparent"
                  >
                    <Dropdown.Item eventKey="Single">Single</Dropdown.Item>
                    <Dropdown.Item eventKey="Married">Married</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              <div className="form-group col-12">
                <label>Qualification</label>
                <input
                  className="form-control"
                  type="text"
                  name="qualification"
                />
              </div>
              <div className="form-group col-12">
                <label>Permanent Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  style={{ height: "100px" }}
                ></textarea>
              </div>
              <div className="form-group col-6">
                <div className="custom-select-form">
                  <label>State</label>
                  <DropdownButton
                    id="dropdown-basic-button"
                    className="custom-dropdown"
                    title={selectState}
                    onSelect={handleSelectstate}
                    variant="transparent"
                  >
                    <Dropdown.Item eventKey="Mumbai">Mumbai</Dropdown.Item>
                    <Dropdown.Item eventKey="Gujarat">Gujarat</Dropdown.Item>
                    <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
              <div className="form-group col-6">
                <label>City</label>
                <input className="form-control" type="text" name="city" />
                <i className="ti-location-arrow"></i>
              </div>
              <div className="form-group col-6">
                <label>Pin Code</label>
                <input
                  className="form-control"
                  type="number"
                  max="6"
                  name="pinCode"
                />
                <i className="ti-location-pin"></i>
              </div>
              <div className="text-center col-12 mt-3">
                <input
                  type="submit"
                  value="Submit"
                  className="btn_1 full-width"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <style jsx>{`
        .custom-dropdown2,
        .custom-dropdown {
          width: 100%;
        }

        .custom-dropdown2 .dropdown-toggle,
        .custom-dropdown .dropdown-toggle {
          width: 100%;
          text-align: left;
        }
      `}</style>
    </>
  );
}
export default Address1;
