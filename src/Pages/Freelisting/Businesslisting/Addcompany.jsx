import React from "react";
import { Link } from "react-router-dom";
import "./Businesslisting.css";

function Addcompany() {
  return (
    <div className="tab" style={{ display: "block" }}>
      <h4>Add Company Details</h4>
      <p className="add-lidting-title-from">
        {/* Business Listing / Add Company Details */}
      </p>
      <div className="row">
        <div className="form-group col-md-4">
          <label>
            Company Name <span className="text-danger">*</span>
          </label>
          <input
            className="form-control  form-control-sm"
            type="text"
            name="name"
            placeholder="Enter your company name"
          />
        </div>
        <div className="form-group col-md-4">
          <label for="business-type">
            Business Type <span className="text-danger">*</span>
          </label>
          <br></br>
          <select
            className="wide add_bottom_10 natureofbusiness selectdrp"
            name="business-type"
          >
            <option value="" selected>
              Select Business Type
            </option>
            <option value="Type 1">Type 1</option>
            <option value="Type 2">Type 2</option>
            <option value="Type 3">Type 3</option>
            <option value="Type 4">Type 4</option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <label>
            Nature of business <span className="text-danger">*</span>
          </label>
          <select
            className="wide add_bottom_10 natureofbusiness selectdrp"
            name="natureofbusiness"
          >
            <option value="">Select Nature of Business</option>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Private Limited Company">
              Private Limited Company
            </option>
            <option value="Public Limited Company">
              Public Limited Company
            </option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <label className="control-label">
            Year Of Establishment <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            className="form-control  form-control-sm"
            value="mm-dd-yy"
            required
          />
        </div>
        <div className="form-group col-md-4">
          <label>
            Number of Employees <span className="text-danger">*</span>
          </label>
          <input
            className="form-control form-control-sm"
            type="number"
            name="number-of-employees"
            placeholder="Enter number of employees"
          />
        </div>
        <div className="form-group col-md-4">
          <label className="control-label" htmlFor="Turnover">
            Turnover <span className="text-danger">*</span>
          </label>
          <select
            className="wide add_bottom_10 turnover selectdrp"
            id="Turnover"
            name="Turnover"
          >
            <option value="">Select Turnover</option>
            <option value="Upto 1 Lac">Upto 1 Lac</option>
            <option value="Upto 5 Lacs">Upto 5 Lacs</option>
            <option value="Upto 10 Lacs">Upto 10 Lacs</option>
          </select>
        </div>
        <div className="form-group col-md-4">
          <label>GST Number</label>
          <input
            className="form-control  form-control-sm"
            type="text"
            name="gst-no"
            placeholder="Enter GST number"
          />
        </div>
        <div className="from-group col-12">
          <label htmlFor="address">About Us</label>
          <textarea
            className="form-control form-control-sm"
            id="Address"
            name="Address"
            style={{ height: "100px" }}
          ></textarea>
        </div>
        <div className="text-left col-12 mt-3">
          <Link to="/addCommunication" className="btn_1">
            Save & Continue
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Addcompany;
