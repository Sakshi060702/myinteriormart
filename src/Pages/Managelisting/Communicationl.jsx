import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import "../Freelisting/Businesslisting/Businesslisting.css";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../FrontEnd/img/arrow-previous.png";

function Communicationl() {
  const [formData, setFormData] = useState({
    languages: [],
    email: "",
    registerMobile: "",
    mobile: "",
    telephone: "",
    website: "",
    tollfree: ""
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSelectChange = (selectedOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      languages: selectedOptions
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = "https://apidev.myinteriormart.com/api/Communication/AddOrUpdateCommunication";

    const submissionData = {
      ...formData,
      language: formData.languages.map(option => option.value).join(',') // Convert array to comma-separated string
    };

    console.log("Submitting data:", submissionData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error data:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API response:", responseData);
      alert("Communication details saved successfully!");
      navigate("/addressl");
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to save communication details. Please try again");
    }
  };

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Marathi', label: 'Marathi' },
    { value: 'French', label: 'French' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Japanese', label: 'Japanese' },
    { value: 'Portuguese', label: 'Portuguese' }

  ];

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Communication Details</h4>
              <form onSubmit={handleSubmit}>
                <p className="add-lidting-title-from">
                  Add Listing / Add Communication Details
                  <span>
                    <Link className="back_btn mx-3" to="/addcompanyl">
                      Back
                    </Link>
                  </span>
                </p>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="lang">
                      Languages <span className="text-danger">*</span>
                    </label>
                    <Select
                      isMulti
                      name="languages"
                      options={languageOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={handleSelectChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control form-control-sm"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="Mobile">
                      Registered Mobile <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      name="registerMobile"
                      id="Mobile"
                      placeholder="Enter Registered Mobile Number"
                      value={formData.registerMobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="Mobile2">Mobile </label>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      name="mobile"
                      id="Mobile2"
                      placeholder="Enter your Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="telephone">Telephone</label>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      name="telephone"
                      id="telephone"
                      placeholder="Enter telephone number"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="website">Website</label>
                    <input
                      className="form-control form-control-sm"
                      type="name"
                      name="website"
                      id="website"
                      placeholder="Enter your Website"
                      value={formData.website}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="tollfree">Toll Free</label>
                    <input
                      className="form-control form-control-sm"
                      type="number"
                      name="tollfree"
                      id="tollfree"
                      placeholder="Enter Tollfree No"
                      value={formData.tollfree}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="text-left col-12 mt-3">
                    <button type="submit" className="btn_1">
                      Save & Continue
                    </button>
                    <Link to="/addcompanyl" className="pull-right mr-2"><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/addressl" className="pull-right mr-2"><img src={nextarrowimg} style={{height:'30px'}}/></Link>
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

export default Communicationl;
