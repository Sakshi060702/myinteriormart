import React, { useState,useEffect } from "react";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Select from 'react-select';
import "./Businesslisting.css";
import nextarrowimg from "../../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh"
import Popupalert from "../../Popupalert";
import { validateEmail,validateMobile } from "../../Validation";
import useAuthCheck from "../../../Hooks/useAuthCheck";

function Addcommunication(){
  const [formData, setFormData] = useState({
    languages: [],
    email: "",
    registerMobile: "",
    mobile: "",
    telephone: "",
    website: "",
    tollfree: ""
  });

  const [languageOptions, setLanguageOptions] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const [email, setEmail] = useState('');
  const location = useLocation();

  const [error, setError] = useState("");

  const isAuthenticated = useAuthCheck();


  useEffect(() => {
    if (location.state && location.state.email) {
      console.log("Setting email from location.state:", location.state.email);
      setFormData((prevFormData) => ({
        ...prevFormData,
        email: location.state.email
      }));
    } else {
      console.log("No email found in location.state");
    }
  }, [location.state]);



  useEffect(() => {
    // Function to fetch communication details
    const fetchCommunicationDetails = async () => {
      const apiUrl = "https://apidev.myinteriormart.com/api/BinddetailsListing/GetCommunicationDetailslisting";

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API response error data:", errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("API response:", responseData);

        // Convert language string to array of objects if necessary
        const languages = responseData.language
          ? responseData.language.split(',').map(lang => ({ value: lang, label: lang }))
          : [];

        setFormData({
          email: responseData.email || "",
          registerMobile: responseData.telephoneSecond || "",
          mobile: responseData.mobile || "",
          telephone: responseData.telephone || "",
          website: responseData.website || "",
          tollfree: responseData.tollFree || "",
          languages,
        });

      } catch (error) {
        console.error("API error:", error);
        
      }
    };

    if(isAuthenticated){
      fetchCommunicationDetails();
    }
    
  }, [token]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Ensure only numeric values are set
    if (name === 'tollfree') {
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleSelectChange = (selectedOptions) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      languages: selectedOptions
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    setError("");

    const emailError=validateEmail(formData.email);
    const registermobileError=validateMobile(formData.registerMobile)
    const mobileError=validateMobile(formData.mobile);
    const telephoneError=validateMobile(formData.telephone);

    if(emailError||registermobileError||mobileError||telephoneError){
      setError({
        communicationEmail:emailError,
        communicationRegisterMobile:registermobileError,
        commuincationMobile:registermobileError,
        communicationTelephone:telephoneError,
      });
      return;
    }

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
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
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
      console.log("Communication Token",token);

      setSuccessMessage("Communication Details Saved  Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/address");
      }, 2000);

      
    } catch (error) {
      console.error("API error:", error);
      setErrorMessage("Failed to save communication details. Please try again later.");
    setSuccessMessage(""); // Clear any existing success message
    setShowPopup(true);
    }
  };

  const languageOptionsList  = [
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
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <h4>Add Communication Details</h4>
              <form onSubmit={handleSubmit}>
                <p className="add-lidting-title-from">
                  Add Listing / Add Communication Details
                  
                </p>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="lang">
                      Languages <span className="text-danger">*</span>
                    </label>
                    <Select
                      isMulti
                      name="languages"
                      options={languageOptionsList}
                      className="basic-multi-select box"
                      classNamePrefix="select"
                      onChange={handleSelectChange}
                      value={formData.languages}
                      required
                     
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="email">Email<span className="text-danger">*</span></label>
                    <input
                      className="form-control form-control-sm box"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {error.communicationEmail && (
                      <div className="text-danger">{error.communicationEmail}</div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="Mobile">
                      Registered Mobile <span className="text-danger">*</span>
                    </label>
                    <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="registerMobile"
                      id="Mobile"
                      placeholder="Enter Registered Mobile Number"
                      value={formData.registerMobile}
                      onChange={handleChange}
                     maxLength={10}
                      required
                    />
                    {error.communicationRegisterMobile && (
                      <div className="text-danger">{error.communicationRegisterMobile}</div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="Mobile2">Mobile<span className="text-danger">*</span> </label>
                    <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="mobile"
                      id="Mobile2"
                      placeholder="Enter your Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      maxLength={10}
                    />
                    {error.commuincationMobile && (
                      <div className="text-danger">{error.commuincationMobile}</div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="telephone">Telephone<span className="text-danger">*</span></label>
                    <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="telephone"
                      id="telephone"
                      placeholder="Enter telephone number"
                      value={formData.telephone}
                      onChange={handleChange}
                      required
                      maxLength={10}
                    />
                     {error.communicationTelephone && (
                      <div className="text-danger">{error.communicationTelephone}</div>
                    )}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="website">Website<span className="text-danger">*</span></label>
                    <input
                      className="form-control form-control-sm box"
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
                    <label htmlFor="tollfree">Toll Free<span className="text-danger">*</span></label>
                    <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="tollfree"
                      id="tollfree"
                      placeholder="Enter Tollfree No"
                      value={formData.tollfree}
                      onChange={handleInputChange}
                      pattern="[0-9]*"
                      required
                      maxLength={18}
                    />
                  </div>

                  <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                    <button type="submit" className="btn_1" style={{marginRight:'50px'}}>
                      Save & Continue
                    </button>
                    <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                      <Link to="/addcompany" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/address" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
                    </div>

                  </div>
                  {showPopup && (
  <Popupalert 
    message={successMessage || errorMessage} 
    type={successMessage ? 'success' : 'error'} 
  />
)}
                 
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addcommunication;