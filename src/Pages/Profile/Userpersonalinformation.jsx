import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../FrontEnd/img/arrow-previous.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import Popupalert from "../Popupalert";
import LocalityPopup from "../Freelisting/Businesslisting/Localitypopup";
import PincodePopup from "../Freelisting/Businesslisting/Pincodepopup";
import Areapopup from "../Freelisting/Businesslisting/Areapopup";
import Select from 'react-select';

const Userpersonalinformation = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [assemblies, setAssemblies] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [localities, setLocalities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");

  const [address, setLocalAddress] = useState("");

  const [qualificationId, setQualifications] = useState([]);
  
  const [selectedQualification, setSelectedQualification] = useState("");

  const [dateOfBirth, setDateofBirth] = useState([]);
  const [selectedDateofBirth, setSelectedDateofBirth] = useState("");

  const [maritalStatus, setMaritalStatus] = useState([]);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState("");

  const [isProfileCompleted, setIsProfileCompleted] = useState(true);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const [showAddressPopup, setShowAddressPopup] = useState([false, null]);
  const[showPincodePopup,setShowPincodePopup]=useState([false,null]);
  const[showAreaPopup,setShowAreaPopup]=useState([false,null]);



  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const apiUrl =
    "https://apidev.myinteriormart.com/api/FetchAddressMaster/FetchAddressDropdownMaster";

  const fetchData = async (type, parentID = null) => {
    let body = {
      type,
      CountryID: setSelectedCountry,
      StateID: setSelectedState,
      CityID: setSelectedCity,
      AssemblyID: setSelectedAssembly,
      PincodeID: setSelectedPincode,
      LocalityID: setSelectedLocality,
      LocalAddress: "", // Assuming this is default or required in your API
    };
    if (parentID) body.parentID = parentID;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Data fetched for ${type}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return null;
    }
  };

  useEffect(() => {
    fetchData("countries").then((data) => {
      // console.log(data)
      if (data) setCountries(data.countries);
    });
  }, [token]);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/UserBindndUpdateProfile/GetProfileInfo",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        setSelectedCountry(data.userProfile.countryID);
        setSelectedState(data.userProfile.stateID);
        setSelectedCity(data.userProfile.cityID);
        setSelectedAssembly(data.userProfile.assemblyID);
        setSelectedPincode(data.userProfile.pincodeID);
        setSelectedLocality(data.userProfile.localityID);
        setLocalAddress(data.userProfile.address);
        setDateofBirth(data.userProfile.dateOfBirth.split("T")[0]); // Format date for input
        setSelectedMaritalStatus(data.userProfile.maritalStatus);
        setSelectedQualification(data.userProfile.qualificationId);

        console.log("User Address Fetched", data);
      } catch (error) {
        console.error("Error fetching user categories:", error);
      }
    };
    fetchUserAddress();
  }, [token]);

  useEffect(() => {
    if (selectedCountry) {
      const selectcountry = countries.find(
        (address) => address.countryID === selectedCountry
      );
      if (selectcountry) {
        setStates(selectcountry.states || []);
      }
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (selectedState) {
      const selectstate = states.find(
        (address) => address.stateID === selectedState
      );
      if (selectstate) {
        setCities(selectstate.cities || []);
      }
    }
  }, [selectedState, states]);

  useEffect(() => {
    if (selectedCity) {
      const selectcity = cities.find(
        (address) => address.cityID === selectedCity
      );
      if (selectcity) {
        setAssemblies(selectcity.assemblies || []);
      }
    }
  }, [selectedCity, cities]);

  useEffect(() => {
    if (selectedAssembly) {
      const selectAssembly = assemblies.find(
        (address) => address.assemblyID === selectedAssembly
      );
      if (selectAssembly) {
        setPincodes(selectAssembly.pincodes || []);
      }
    }
  }, [selectedAssembly, assemblies]);

  useEffect(() => {
    if (selectedPincode) {
      const selectpincode = pincodes.find(
        (address) => address.pincodeID === selectedPincode
      );
      if (selectpincode) {
        setLocalities(selectpincode.localities || []);
      }
    }
  }, [selectedPincode, pincodes]);

  const handleCountryChange = (e) => {
    const countryID = e.target.value;
    setSelectedCountry(countryID);
    setSelectedState("");
    setSelectedCity("");
    setSelectedAssembly("");
    setSelectedPincode("");
    setSelectedLocality("");
    const selectedCountryData = countries.find(
      (country) => country.countryID === parseInt(countryID)
    );
    if (selectedCountryData) {
      console.log("Selected country states:", selectedCountryData.states);
      setStates(selectedCountryData.states);
    } else {
      setStates([]);
    }
  };

  const handleStateChange = (e) => {
    const stateID = e.target.value;
    setSelectedState(stateID);
    setSelectedCity("");
    setSelectedAssembly("");
    setSelectedPincode("");
    setSelectedLocality("");

    const selectedStateData = states.find(
      (state) => state.stateID === parseInt(stateID)
    );
    if (selectedStateData) {
      console.log("Selected state cities:", selectedStateData.cities);
      setCities(selectedStateData.cities);
    } else {
      setCities([]);
    }
  };

  const handleCityChange = (e) => {
    const cityID = e.target.value;
    setSelectedCity(cityID);
    setSelectedAssembly("");
    setSelectedPincode("");
    setSelectedLocality("");

    const selectedCityData = cities.find(
      (city) => city.cityID === parseInt(cityID)
    );
    if (selectedCityData) {
      console.log("Selected city assemblies:", selectedCityData.assemblies);
      setAssemblies(selectedCityData.assemblies);
    } else {
      setAssemblies([]);
    }
  };

  const handleLocalityChange = (e) => {
    const assemblyID = e.target.value;
    setSelectedAssembly(assemblyID);
    setSelectedPincode(""); // Clear selected pincode when locality changes
    setSelectedLocality("");

    const selectedLocalityData = assemblies.find(
      (assembly) => assembly.assemblyID === parseInt(assemblyID)
    );
    if (selectedLocalityData) {
      console.log("Selected locality pincodes:", selectedLocalityData.pincodes);
      setPincodes(selectedLocalityData.pincodes);
    } else {
      setPincodes([]);
    }
  };

  const handlePincodeChange = (e) => {
    const pincodeID = e.target.value;
    setSelectedPincode(pincodeID);
    setSelectedLocality("");

    const selectedPincodeData = pincodes.find(
      (pincode) => pincode.pincodeID === parseInt(pincodeID)
    );
    if (selectedPincodeData) {
      console.log(
        "Selected pincode localities:",
        selectedPincodeData.localities
      );
      setLocalities(selectedPincodeData.localities);
    } else {
      setLocalities([]);
    }
  };

  const handleAreaChange = (e) => {
    const localityID = e.target.value;
    setSelectedLocality(localityID);
  };

  useEffect(() => {
    fetchQualifications();
  }, [token]);

  const fetchQualifications = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/UserBindndUpdateProfile/GetProfileInfo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const qualificationOptions = data.qualifications.map(q => ({
          value: q.id,
          label: q.name
        }));
        setQualifications(qualificationOptions);
      } else {
        console.error("Failed to fetch qualifications");
      }
    } catch (error) {
      console.error("Error fetching qualifications:", error);
    }
  };
  const handleMaritalStatusChange = (event) => {
    setSelectedMaritalStatus(event.target.value);
  };

  const handleQualificationChange = (event) => {
    setSelectedQualification(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const submissionData = {
      dateofbirth: dateOfBirth,
      maritalStatus: selectedMaritalStatus,
      qualificationId: selectedQualification,
      countryID: selectedCountry,
      stateID: selectedState,
      cityID: selectedCity,
      assemblyID: selectedAssembly,
      pincodeID: selectedPincode,
      localityID: selectedLocality,
      address: address,
    };

    console.log("Submitting data:", submissionData);

    fetch(
      "https://apidev.myinteriormart.com/api/UserBindndUpdateProfile/GetProfileInfoUpdate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submissionData),
      }
    )
      .then((response) => response.json())

      .then((responseData) => {
        console.log("API response:", responseData);
        console.log("Address token:", token);
      
       
        setSuccessMessage("Data Submitted Successfully");
        setErrorMessage("");
        setShowPopup(true);
  
        setTimeout(() => {
          setShowPopup(false);
          navigate('/');
        }, 2000);
       
      })
      .catch((error) => {
        console.error("API error:", error);
        setErrorMessage("Error in updating profile. Please try again later.");
        setSuccessMessage(""); // Clear any existing success message
        setShowPopup(true);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'orange' : provided.backgroundColor,
      color: 'black',
    }),
    control: (provided) => ({
      ...provided,
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '250px',
      height: '50px',
    }),
    menu: (provided) => ({
      ...provided,
      width: '250px',
    }),
  };
  
  const maritalStatusOptions = [
    { value: 'Single', label: 'Single' },
    { value: 'Married', label: 'Married' },
  ];

  const handleChange = (selectedOption) => {
    setSelectedMaritalStatus(selectedOption);
  };

  const handlequaliChange = (selectedOption) => {
    setSelectedQualification(selectedOption);
  };

  //country
  const handleCounChange = (selectedOption) => {
    setSelectedCountry(selectedOption ? selectedOption.value : "");
  };

  const countryOptions = countries.map((country) => ({
    value: country.countryID,
    label: country.name,
  }));

  const handleStaChange = (selectedOption) => {
    setSelectedState(selectedOption ? selectedOption.value : "");
  };

  const stateOptions = states.map((state) => ({
    value: state.stateID,
    label: state.name,
  }));


  const handleCiChange = (selectedOption) => {
    setSelectedCity(selectedOption ? selectedOption.value : "");
  };

  const cityOptions = cities.map((city) => ({
    value: city.cityID,
    label: city.name,
  }));

  const handleLocalChange = (selectedOption) => {
    setSelectedAssembly(selectedOption ? selectedOption.value : "");
  };

  const assemblyOptions = assemblies.map((assembly) => ({
    value: assembly.assemblyID,
    label: assembly.name,
  }));


  const handlePinChange = (selectedOption) => {
    setSelectedPincode(selectedOption ? selectedOption.value : "");
  };

  const pincodeOptions = pincodes.map((pincode) => ({
    value: pincode.pincodeID,
    label: pincode.number,
  }));

  const handleArChange = (selectedOption) => {
    setSelectedLocality(selectedOption ? selectedOption.value : "");
  };

  const localityOptions = localities.map((locality) => ({
    value: locality.localityID,
    label: locality.name,
  }));



  return (
    <>
      <div className="">
        <h4>Add Address Details</h4>
        <p className="add-lidting-title-from">
          Add Listing / Add Address Details
          <span>
            <Link className="back_btn mx-3" to="/">
              Go To Home 
            </Link>
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="form-group col-md-4">
              <label className="control-label">
                D.O.B <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control form-control-sm box"
                name="yearOfEstablishment"
                value={dateOfBirth}
                onChange={(e) => setDateofBirth(e.target.value)}
                required
              />
            </div>
            <div className="form-group col-md-4">
              <label>
                Marital Status <span className="text-danger">*</span>
              </label>
              <Select
      styles={customStyles}
      options={maritalStatusOptions}
      value={selectedMaritalStatus}
      onChange={handleChange}
      placeholder="Select Marital Status"
     
    />
            </div>

            <div className="form-group col-md-4">
              <label>
                Qualification <span className="text-danger">*</span>
              </label>
               <Select
      styles={customStyles}
      options={qualificationId}
      value={selectedQualification}
      onChange={handlequaliChange}
      placeholder="Qualification"
     
    />
            </div>
            <div className="form-group col-md-4">
              <label>Country</label>
              <Select
                      className="wide add_bottom_10 country selectdrp"
                      value={countryOptions.find(
                        (option) => option.value === selectedCountry
                      )}
                      onChange={handleCounChange}
                      options={countryOptions}
                      placeholder="Select Country"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "orange" : "white", // Background color orange on hover
                          color: state.isFocused ? "white" : "black", // Adjust text color for contrast
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          // borderColor: "#ccc",
                          // "&:hover": { borderColor: "#aaa" },
                        }),
                      }}
                    />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">State</label>
              <Select
                      className="wide add_bottom_10 state selectdrp"
                      value={stateOptions.find(
                        (option) => option.value === selectedState
                      )}
                      onChange={handleStaChange}
                      options={stateOptions}
                      placeholder="Select State"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "orange" : "white", // Hover background color change
                          color: state.isFocused ? "white" : "black", // Text color for contrast
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "#aaa" }, // Hover effect for the control
                        }),
                      }}
                    />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="city">City</label>
              <Select
                      className="wide add_bottom_10 city selectdrp"
                      value={cityOptions.find(
                        (option) => option.value === selectedCity
                      )}
                      onChange={handleCiChange}
                      options={cityOptions}
                      placeholder="Select City"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "orange" : "white", // Orange background on hover
                          color: state.isFocused ? "white" : "black", // Adjust text color for contrast
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "#aaa" }, // Control hover effect
                        }),
                      }}
                    />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-4">
              <label>Locality</label>
              <Select
                      className="wide add_bottom_10 locality selectdrp"
                      value={assemblyOptions.find(
                        (option) => option.value === selectedAssembly
                      )}
                      onChange={handleLocalChange}
                      options={assemblyOptions}
                      placeholder="Select Locality"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "orange" : "white", // Orange background on hover
                          color: state.isFocused ? "white" : "black", // Adjust text color for contrast
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "#aaa" }, // Control hover effect
                        }),
                      }}
                    />
              <button onClick={(e)=>{ e.preventDefault(); return setShowAddressPopup([true,selectedCity])}}>Add Locality +</button>
            </div>
            <div className="form-group col-md-4">
              <label>Pincode</label>
             <Select
                      className="wide add_bottom_10 pincode selectdrp"
                      value={pincodeOptions.find(
                        (option) => option.value === selectedPincode
                      )}
                      onChange={handlePinChange}
                      options={pincodeOptions}
                      placeholder="Select Pincode"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "orange" : "white", // Orange background on hover
                          color: state.isFocused ? "white" : "black", // Adjust text color for contrast
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "#aaa" }, // Hover effect for the control
                        }),
                      }}
                    />
              <button onClick={(e)=>{ e.preventDefault();  return setShowPincodePopup([true,selectedAssembly])}}>Add Pincode +</button>
            </div>
            <div className="form-group col-md-4">
              <label>Area</label>
              <Select
                      className="wide add_bottom_10 area selectdrp"
                      value={localityOptions.find(
                        (option) => option.value === selectedLocality
                      )}
                      onChange={handleArChange}
                      options={localityOptions}
                      placeholder="Select Area"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor: state.isFocused ? "orange" : "white", // Orange background on hover
                          color: state.isFocused ? "white" : "black", // Adjust text color for better contrast
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                          width:'76%',
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "#aaa" }, // Control hover effect
                        }),
                      }}
                    />
              <button onClick={(e)=>{ e.preventDefault();console.log("assembly", selectedAssembly);console.log("pincode",selectedPincode);  return setShowAreaPopup([true,selectedAssembly,selectedPincode])}}>Add Area +</button>
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="localAddress">Local Address</label>
              <textarea
                type="text"
                className="form-control localAddress-textarea"
                id="localAddress"
                placeholder="Enter local address"
                value={address}
                onChange={(e) => setLocalAddress(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="text-left col-12 mt-3">
            <button type="submit" className="btn btn-primary w-100" style={{backgroundColor:'#fb830d'}}>
              Save & Continue
            </button>
            {/* <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Link to="/communicationl">
                <img src={previousarrowimg} style={{ height: "30px" }} />
              </Link>
              <Link to="/Categoryapi">
                <img src={nextarrowimg} style={{ height: "30px" }} />
              </Link>
            </div> */}
          </div>

          {showAddressPopup && (
                  <LocalityPopup
                  isOpen={showAddressPopup[0]} cityId={showAddressPopup[1]}
                  onClose={()=>setShowAddressPopup([false,null])}/>
                )}

{
                  showPincodePopup && (
                    <PincodePopup 
                    isOpen={showPincodePopup[0]} localityId={showPincodePopup[1]}
                    onClose={()=>setShowPincodePopup([false,null])}/>
                  )
                }

{
                  showAreaPopup && (
                    <Areapopup 
                    isOpen={showAreaPopup[0]} pincodeId={showAreaPopup[1]} localityId={showAreaPopup[1]}
                    onClose={()=>setShowAreaPopup([false,null,null])}/>
                  )
                }

          {showPopup && (
  <Popupalert 
    message={successMessage || errorMessage} 
    type={successMessage ? 'success' : 'error'} 
    onClose={handleClosePopup}
  />
)}
        </form>
      </div>
    </>
  );
};

export default withAuthh(Userpersonalinformation);


