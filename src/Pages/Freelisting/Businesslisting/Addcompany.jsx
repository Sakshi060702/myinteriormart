import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import nextarrowimg from "../../../FrontEnd/img/Frontarrow.png";
import "./Businesslisting.css";
import { useSelector } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh";
import Select from "react-select";
import Popupalert from "../../Popupalert";
import { validateName } from "../../Validation";

function Addcompany() {

  const isAuthenticated= useSelector((state)=>state.auth.isAuthenticated);
  console.log("0000000000000------------------000000000000000000000", isAuthenticated);
  


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

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const [error, setError] = useState("");

  const token = useSelector((state) => state.auth.token);

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

  const prepend = (value, array) => {
    var newArray = array.slice();
    newArray.unshift(value);
    return newArray;
  }
  let filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  // filteredOptions = prepend({value:"Select Business Type", label:"Select Business Type"},filteredOptions)
  // console.log(prepend("Select Business Type",filteredOptions));
  // console.log(filteredOptions);

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

    if (companynameError) {
      setError({
        companyName: companynameError,
        // gstNumber: gstnumberError,
      });
      return;
    }


    const apiUrl =
      "https://apidev.myinteriormart.com/api/CompanyDetails/AddOrUpdateCompanyDetails";

    console.log("Submitting data:", formData);
    console.log(formData.companyName);
    console.log(formData.businessTypes);
    console.log(formData.natureOfBusiness);
    console.log(formData.yearOfEstablishment);
    console.log(formData.numberOfEmployees);
    console.log(formData.turnover);
    console.log(formData.gstNumber);
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
      console.log("API response:", responseData);
      console.log("Token", token);

      // alert("Company details saved successfully!");
      setSuccessMessage("Company Details Saved Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
      setShowPopup(false);
      navigate("/addCommunication");
    }, 2000); // Show popup for 3 seconds before redirect

    } catch (error) {
      console.error("API error:", error);
      setErrorMessage("Failed to save company details. Please try again later.");
    setSuccessMessage(""); // Clear any existing success message
    setShowPopup(true);
    }
  };

  return (
    <>
      <div className="">
        <h4>Add Company Details</h4>
        <form onSubmit={handleSubmit}>
          <p className="add-lidting-title-from">
            Add Listing / Add Company Details
          </p>
          <div className="row">
            <div className="form-group col-md-4">
              <label>
                Company Name <span className="text-danger">*</span>
              </label>
              <input
                className="form-control form-control-sm box"
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
                placeholder= "Type to search"
                noOptionsMessage={() => (
                  <div
                    onClick={handleAddNewOption}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {inputValue ? ` ${inputValue}` : "Type to search"}
                  </div>
                )}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    width: "250px",
                    height: "50px",
                  }),
                }}
                value={
                  
                    allOptions.find((option) => option.value === formData.businessCategory) !== undefined ? (allOptions.find((option) => option.value === formData.businessCategory).value =='' ?
                    {value:'Select Business Type', label:'Select Business Type'}: allOptions.find((option) => option.value === formData.businessCategory)) : {value:'Select Business Type', label:'Select Business Type'}
                  
                  } // Set the selected value
              />
            </div>{" "}
            <div className="form-group col-md-4">
              <label>
                Nature of Business <span className="text-danger">*</span>
              </label>
              <select
                className="wide add_bottom_10 "
                name="natureOfBusiness"
                value={formData.natureOfBusiness}
                onChange={handleChange}
                required
                style={{
                  border: "1px, solid #ccc",
                  borderRadius: "4px",
                  width: "250px",
                  height: "50px",
                }}
              >
                <option value="" disabled>
                  Select Nature of Business
                </option>
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
                className="form-control form-control-sm box"
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
                className="form-control form-control-sm box"
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
                className="wide add_bottom_10"
                id="turnover"
                name="turnover"
                value={formData.turnover}
                onChange={handleChange}
                required
                style={{
                  border: "1px, solid #ccc",
                  borderRadius: "4px",
                  width: "250px",
                  height: "50px",
                }}
              >
                <option value="" disabled>
                  Select Turnover
                </option>
                <option value="Upto 1 Lac">Upto 1 Lac</option>
                <option value="Upto 2 Lacs">Upto 2 Lacs</option>
                <option value="Upto 3 Lacs">Upto 3 Lacs</option>
                <option value="Upto 5 Lacs">Upto 5 Lacs</option>
                <option value="Upto 50 Lacs">Upto 50 Lacs</option>
                <option value="Upto 1 Crore">Upto 1 Crore</option>
                <option value="Upto 10 Crore & Above">
                  Upto 10 Crore & Above
                </option>
              </select>
            </div>
            <div className="form-group col-md-4">
              <label>GST Number</label>
              <input
                className="form-control form-control-sm box"
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
              <button
                type="submit"
                className="btn_1"
                style={{ marginRight: "50px" }}
              >
                Save & Continue
              </button>

              <Link to="/addCommunication" className="pull-center">
                <img src={nextarrowimg} style={{ height: "30px" }} />
              </Link>
            </div>
          </div>
          {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
          />
          )}
        </form>
      </div>
    </>
  );
}

export default withAuthh(Addcompany);
