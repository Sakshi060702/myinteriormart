import React, { useState,useEffect } from "react";
import { Link, useNavigate,useLocation} from "react-router-dom";
import Select from 'react-select';
import "../Freelisting/Businesslisting/Businesslisting.css";
import nextarrowimg from "../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Popupalert from "../Popupalert";
import { validateEmail,validateMobile } from "../Validation";
import { height } from "@fortawesome/free-solid-svg-icons/faL";

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

  const [email,setEmail]=useState('');
  const location=useLocation();

  useEffect(()=>{
    if(location.state){
      const{email}=location.state;
      if(email)
      {
        setEmail(email)
      }
    }
  },[location.state]);



  const [languageOptions, setLanguageOptions] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const [error, setError] = useState("");


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

          const storedemail=localStorage.getItem("email")||responseData.email || "";
          const storedmobile=localStorage.getItem("mobile")||responseData.telephoneSecond || "";

          console.log('storedemail',storedemail);

        setFormData({
          email: storedemail,
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

    fetchCommunicationDetails();
  }, [token]);


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

    setError("");

    const emailError=validateEmail(formData.email);
    const registermobileError=validateMobile(formData.registerMobile)
    const mobileError=validateMobile(formData.mobile);
    const telephoneError=validateMobile(formData.telephone);

    if(mobileError){
      setError({
        // communicationEmail:emailError,
        // communicationRegisterMobile:registermobileError,
        commuincationMobile:registermobileError,
        // communicationTelephone:telephoneError,
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
      // console.log("API response:", responseData);
      // console.log("Communication Token",token);

      const cityName = localStorage.getItem('cityname');
      const pathlisting = `/addressl`;
      navigate(pathlisting);
    //   setSuccessMessage("Communication Details Saved Successfully");
    //   setErrorMessage("");
    //   setShowPopup(true);

    //   setTimeout(() => {
    //   setShowPopup(false);
    //   navigate("/addressl");;
    // }, 2000);
      
    } catch (error) {
      console.error("API error:", error);
      setErrorMessage("Failed to save Communication details. Please try again later.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ffa500" : "white", // Orange on hover
      color: state.isFocused ? "white" : "black", // Text color change on hover
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      height: "auto", // Increase the height of the select box
      minHeight: "50px", // Ensure minimum height of the select box
      border: "1px solid #ccc",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid orange", // Border on hover
      },
    }),
    valueContainer:(provided,state)=>({
      ...provided,
      display:'flex',
      flexWrap:'wrap',
      height:'auto',
      overflowY:'auto',
      maxHeight:'150px',
      padding:'4px',
    })
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
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Communication Details</h4>
              <form onSubmit={handleSubmit}>
                <p className="add-lidting-title-from">
                  Add Listing / Add Communication Details
                  <span>
                  <Link className="back_btn mx-3" to={`/labournakapage`}>
                      Back
                    </Link>
                  </span>
                </p>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label htmlFor="lang">
                     Known Languages <span className="text-danger">*</span>
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
                      styles={customStyles}
                     
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="email">Email</label>
                    <input
                      className="form-control form-control-sm box companyD"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      // onChange={(e) => setEmail(e.target.value)}
                      // required
                    />
                    {/* {error.communicationEmail && (
                      <div className="text-danger">{error.communicationEmail}</div>
                    )} */}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="Mobile2">Mobile<span className="text-danger">*</span> </label>
                    <input
                      className="form-control form-control-sm box companyD"
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
                  <div className="form-group col-md-4 ">
                    <label htmlFor="Mobile">
                    Alternate Mobile No 
                    </label>
                    <input
                      className="form-control form-control-sm box companyD"
                      type="text"
                      name="registerMobile"
                      id="Mobile"
                      placeholder="Enter Registered Mobile Number"
                      value={formData.registerMobile}
                      onChange={handleChange}
                      // required
                     
                    />
                    {/* {error.communicationRegisterMobile && (
                      <div className="text-danger">{error.communicationRegisterMobile}</div>
                    )} */}
                  </div>
                  
                  <div className="form-group col-md-4">
                    <label htmlFor="telephone">Telephone</label>
                    <input
                      className="form-control form-control-sm box companyD"
                      type="text"
                      name="telephone"
                      id="telephone"
                      placeholder="Enter telephone number"
                      value={formData.telephone}
                      onChange={handleChange}
                      // required
                      maxLength={10}
                      
                    />
                    {/* {error.communicationTelephone && (
                      <div className="text-danger">{error.communicationTelephone}</div>
                    )} */}
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="website">Website</label>
                    <input
                      className="form-control form-control-sm box companyD"
                      type="text"
                      name="website"
                      id="website"
                      placeholder="Enter your Website"
                      value={formData.website}
                      onChange={handleChange}
                      // required
                      
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="tollfree">Toll Free</label>
                    <input
                      className="form-control form-control-sm box companyD"
                      type="text"
                      name="tollfree"
                      id="tollfree"
                      placeholder="Enter Tollfree No"
                      value={formData.tollfree}
                      onChange={handleChange}
                      // required
                      maxLength={12}
                    />
                  </div>

                  <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                    <button type="submit" className="btn_1" >
                      Save & Continue
                    </button>
                    <div style={{display:"flex",justifyContent:"center",paddingTop:'10px'}}>                    
                      <Link to="/addcompanyl" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/addressl" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
                    </div>

                  </div>
                  {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
            onClose={handleClosePopup}
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

export default withAuthh(Communicationl);
