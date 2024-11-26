import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import nextarrowimg from "../../FrontEnd/img/Frontarrow.png";
// import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import "../Freelisting/Businesslisting/Businesslisting.css";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import Select from "react-select";
import Popupalert from "../Popupalert";
import {
  validateName,
  validateGstNumber,
  validateDescriptionLength,
} from "../Validation";
import { values } from "lodash";

function Addcompanyl() {
  const [formData, setFormData] = useState({
    companyName: "",
    businessCategory: "",
    natureOfBusiness: "",
    yearOfEstablishment: "",
    numberOfEmployees: "",
    turnover: "",
    gstNumber: "",
    description: "",
  });

  const navigate = useNavigate();
  const [businessTypes, setBusinessTypes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allOptions, setAllOptions] = useState([]);

  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      const apiUrl =
        "https://apidev.myinteriormart.com/api/CompanyDetails/GetBussinessCategorys";

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API response error data:", errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const fetchedBusinessTypes = responseData.bussinessCategory;
        const fetchedOptions = fetchedBusinessTypes.map((type) => ({
          value: type,
          label: type,
        }));
        setBusinessTypes(fetchedBusinessTypes);
        setAllOptions(fetchedOptions); // Set the options for the Select component
      } catch (error) {
        console.error("API error:", error);
        alert("Failed to fetch business types. Please try again later.");
      }
    };

    fetchBusinessTypes();
  }, [token]);

  const filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddNewOption = () => {
    if (
      inputValue &&
      !allOptions.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      const newOption = { label: inputValue, value: inputValue };
      setAllOptions((prevOptions) => [...prevOptions, newOption]);
      setInputValue(""); // Clear the input after adding
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      businessCategory: selectedOption ? selectedOption.value : "",
    }));
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const apiUrl =
        "https://apidev.myinteriormart.com/api/BinddetailsListing/GetCompanyDetailslisting";
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API response error data:", errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const companyDetails = await response.json();

        const formattedDate = companyDetails.yearOfEstablishment
          ? new Date(companyDetails.yearOfEstablishment).toLocaleDateString(
              "en-CA"
            ) // Formats date as YYYY-MM-DD
          : "";

        setFormData({
          companyName: companyDetails.companyName || "",
          businessCategory: companyDetails.businessCategory || "",
          natureOfBusiness: companyDetails.natureOfBusiness || "",
          yearOfEstablishment: formattedDate,
          numberOfEmployees: companyDetails.numberOfEmployees || "",
          turnover: companyDetails.turnover || "",
          gstNumber: companyDetails.gstNumber || "",
          description: companyDetails.description || "",
        });
      } catch (error) {
        console.error("API error:", error);
      }
    };
    fetchCompanyDetails();
  }, [token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const companynameError = validateName(formData.companyName);
    // const gstnumberError = validateGstNumber(formData.gstNumber);
    const descriptionErrror = validateDescriptionLength(formData.description);

    if (companynameError || descriptionErrror) {
      setError({
        companyName: companynameError,
        // gstNumber: gstnumberError,
        description: descriptionErrror,
      });
      return;
    }

    const apiUrl =
      "https://apidev.myinteriormart.com/api/CompanyDetails/AddOrUpdateCompanyDetails";

    console.log("Submitting data:", formData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error data:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      // console.log("API response:", responseData);
      // console.log("Token", token);

      const cityName = localStorage.getItem("cityname");
      const pathlisting = `/communicationl`;

      navigate(pathlisting);

      // setSuccessMessage("Company Details Saved Successfully");
      // setErrorMessage("");
      // setShowPopup(true);

      // setTimeout(() => {
      //   setShowPopup(false);
      //   navigate("/communicationl");
      // }, 2000);
    } catch (error) {
      console.error("API error:", error);
      setErrorMessage(
        "Failed to save company details. Please try again later."
      );
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const options = [
    { value: "Proprietorship", label: "Proprietorship" },
    { value: "Private Limited Company", label: "Private Limited Company" },
    { value: "Public Limited Company", label: "Public Limited Company" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ffa500" : "white", // Orange on hover
      color: state.isFocused ? "white" : "black", // Text color change on hover
      padding: 10,
    }),
    control: (provided,state) => ({
      ...provided,
      height: "50px", // Increase the height of the select box
      minHeight: "50px", // Ensure minimum height of the select box
      borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
    }),
  };

  const turnoverOptions = [
    { value: "Upto 1 Lac", label: "Upto 1 Lac" },
    { value: "Upto 2 Lacs", label: "Upto 2 Lacs" },
    { value: "Upto 3 Lacs", label: "Upto 3 Lacs" },
    { value: "Upto 5 Lacs", label: "Upto 5 Lacs" },
    { value: "Upto 50 Lacs", label: "Upto 50 Lacs" },
    { value: "Upto 1 Crore", label: "Upto 1 Crore" },
    { value: "Upto 10 Crore & Above", label: "Upto 10 Crore & Above" },
  ];

  // console.log("Hello")

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Company Details</h4>
              <form onSubmit={handleSubmit}>
                <p className="add-lidting-title-from">
                  Add Listing / Add Company Details
                  <span>
                    <Link
                      className="back_btn mx-3"
                      to={`/labournakapage`}
                    >
                      Back
                    </Link>
                  </span>
                </p>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm box companyD"
                      type="text"
                      name="companyName"
                      placeholder="Enter your company name"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                    {error.companyName && (
                      <div className="text-danger">{error.companyName}</div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="businessCategory">Business Type</label>
                    <Select
                      options={filteredOptions}
                      onInputChange={(newValue) => setInputValue(newValue)}
                      onChange={handleSelectChange} // Handle the select change
                      placeholder="Select or Type Keyword"
                      noOptionsMessage={() => (
                        <div
                          onClick={handleAddNewOption}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "orange",
                          }}
                        >
                          {inputValue ? ` ${inputValue}` : "Type to search"}
                        </div>
                      )}
                      styles={{
                        control: (provided,state) => ({
                          ...provided,
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          height: "50px", // Increase the height of the select box
                          minHeight: "50px", // Ensure minimum height of the select box
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        // singleValue:(provided)=>({
                        //   ...provided,
                        //   backgroundColor:'orange',
                        //   color:'white'
                        // }),
                        menu: (provided) => ({
                          ...provided,
                          zIndex: 9999, 
                        }),
                      }}
                      value={allOptions.find(
                        (option) => option.value === formData.businessCategory
                      )} // Set the selected value
                    />
                  </div>{" "}
                  <div className="form-group col-md-4">
                    <label>
                      Nature of Business <span className="text-danger">*</span>
                    </label>
                    <Select
                      styles={customStyles}
                      name="natureOfBusiness"
                      options={options}
                      value={options.find(
                        (option) => option.value === formData.natureOfBusiness
                      )}
                      onChange={(selectedOption) =>
                        handleChange({
                          target: {
                            name: "natureOfBusiness",
                            value: selectedOption.value,
                          },
                        })
                      }
                      // isClearable
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="control-label">
                      Year Of Establishment{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm box companyD"
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
                      className="form-control form-control-sm box companyD"
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
                    <Select
                      styles={customStyles}
                      id="turnover"
                      name="turnover"
                      options={turnoverOptions}
                      value={turnoverOptions.find(
                        (option) => option.value === formData.turnover
                      )}
                      onChange={(selectedOption) =>
                        handleChange({
                          target: {
                            name: "turnover",
                            value: selectedOption.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>GST Number</label>
                    <input
                      className="form-control form-control-sm box companyD"
                      type="text"
                      name="gstNumber"
                      placeholder="Enter GST number"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      maxLength={15}
                    />
                    {/* {error.gstNumber && (
                      <div className="text-danger">{error.gstNumber}</div>
                    )} */}
                  </div>
                  <div className="form-group col-12">
                    <label htmlFor="description labelabout">About Us</label>
                    <textarea
                      className="form-control form-control-sm textareaabout companyD" 
                      id="description"
                      name="description"
                      style={{ height: "100px" }}
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                    {error.description && (
                      <div className="text-danger">{error.description}</div>
                    )}
                  </div>
                  <div className="text-left col-12 mt-3">
                    <button type="submit" className="btn_1">
                      Save & Continue
                    </button>
                    <Link to="/communicationl" className="pull-center mr-2">
                      <img src={nextarrowimg} style={{ height: "30px" }} />
                    </Link>
                  </div>
                </div>
                {showPopup && (
                  <Popupalert
                    message={successMessage || errorMessage}
                    type={successMessage ? "success" : "error"}
                    onClose={handleClosePopup}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthh(Addcompanyl);
