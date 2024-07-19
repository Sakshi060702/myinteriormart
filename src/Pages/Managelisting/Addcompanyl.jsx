import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import "../Freelisting/Businesslisting/Businesslisting.css";

function Addcompanyl() {
  const [formData, setFormData] = useState({
    companyName: "",
    businessCategory: "",
    natureOfBusiness: "",
    yearOfEstablishment: "",
    numberOfEmployees: "",
    turnover: "",
    gstNumber: "",
    description: ""
  });

  const navigate = useNavigate();
  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      const apiUrl = "https://apidev.myinteriormart.com/api/CompanyDetails/AddOrUpdateCompanyDetails";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            companyName: "Alis Infotech Pvt Ltd.",
            businessCategory: "Consumer",
            natureOfBusiness: "Private Limited Company",
            yearOfEstablishment: "2024-06-27T10:10:51.695Z",
            numberOfEmployees: 3450,
            turnover: "Upto 1 Lac",
            gstNumber: "890353423434",
            description: "this is the best IT Company"
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API response error data:", errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setBusinessTypes(responseData.bussinessType);
      } catch (error) {
        console.error("API error:", error);
        alert("Failed to fetch business types. Please try again later.");
      }
    };

    fetchBusinessTypes();
  }, []);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = "https://apidev.myinteriormart.com/api/CompanyDetails/AddOrUpdateCompanyDetails";

    console.log("Submitting data:", formData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error data:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("API response:", responseData);
      alert("Company details saved successfully!");
      navigate("/communicationl");
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to save company details. Please try again later.");
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Company Details</h4>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                  <label htmlFor="businessCategory">
                    Business Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className="wide add_bottom_10 selectdrp"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Business Category
                    </option>
                    {businessTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>                  <div className="form-group col-md-4">
                    <label>
                      Nature of Business <span className="text-danger">*</span>
                    </label>
                    <select
                      className="wide add_bottom_10 selectdrp"
                      name="natureOfBusiness"
                      value={formData.natureOfBusiness}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Nature of Business</option>
                      <option value="Proprietorship">Proprietorship</option>
                      <option value="Private Limited Company">Private Limited Company</option>
                      <option value="Public Limited Company">Public Limited Company</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">
                      Year Of Establishment <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      name="yearOfEstablishment"
                      value={formData.yearOfEstablishment}
                      onChange={handleChange}
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
                      name="numberOfEmployees"
                      placeholder="Enter number of employees"
                      value={formData.numberOfEmployees}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label" htmlFor="turnover">
                      Turnover <span className="text-danger">*</span>
                    </label>
                    <select
                      className="wide add_bottom_10 selectdrp"
                      id="turnover"
                      name="turnover"
                      value={formData.turnover}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select Turnover</option>
                      <option value="Upto 1 Lac">Upto 1 Lac</option>
                      <option value="Upto 5 Lacs">Upto 5 Lacs</option>
                      <option value="Upto 10 Lacs">Upto 10 Lacs</option>
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label>GST Number</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      name="gstNumber"
                      placeholder="Enter GST number"
                      value={formData.gstNumber}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="description">About Us</label>
                    <textarea
                      className="form-control form-control-sm"
                      id="description"
                      name="description"
                      style={{ height: "100px" }}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="text-left col-12 mt-3">
                    <button type="submit" className="btn_1">
                      Save & Continue
                    </button>
                    <Link to="/communicationl" className="pull-right mr-2"><img src={nextarrowimg} style={{height:'30px'}}/></Link>
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

export default Addcompanyl;
