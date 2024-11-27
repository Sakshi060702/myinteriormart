import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";
import nextarrowimg from "../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import Popupalert from "../Popupalert";
import LocalityPopup from "../Freelisting/Businesslisting/Localitypopup";
import PincodePopup from "../Freelisting/Businesslisting/Pincodepopup";
import Areapopup from "../Freelisting/Businesslisting/Areapopup";
import Select from "react-select";

const Workingarea = ({ onPinChange }) => {
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
  const [selectedPincode, setSelectedPincode] = useState([]);
  const [selectedLocality, setSelectedLocality] = useState("");

  const [pincodeMap, setPincodeMap] = useState({});

  const [localAddress, setLocalAddress] = useState("");

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showAddressPopup, setShowAddressPopup] = useState([false, null]);
  const [showPincodePopup, setShowPincodePopup] = useState([false, null]);
  const [showAreaPopup, setShowAreaPopup] = useState([false, null]);

  const [searchQuery, setSearchQuery] = useState("");
  const [pincodeSearchQuery, setPincodeSearchQuery] = useState("");

  const [listingId, setListingId] = useState(null); 
  const [status, setStatus] = useState([]);

  const apiUrl =
    "https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster";

    const workiareaUrl='https://apidev.myinteriormart.com/api/WorkingArea/SavePincodes';

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
      // console.log(`Data fetched for ${type}:`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      return null;
    }
  };

  useEffect(() => {
    fetchData("countries").then((data) => {
      if (data) setCountries(data.country);
    });
  }, [token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // useEffect(() => {
  //   const fetchUserAddress = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://apidev.myinteriormart.com/api/BinddetailsListing/GetAddressDetailslisting",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       const data = await response.json();

  //       setSelectedCountry(data.countryID);
  //       setSelectedState(data.stateID);
  //       setSelectedCity(data.cityID);
  //       setSelectedAssembly(data.assemblyID);
  //       setSelectedPincode(data.pincodeID);
  //       setSelectedLocality(data.localityID);
  //       setLocalAddress(data.localAddress);

  //       console.log("locality", data.assemblyID);
  //       console.log("pincode", data.pincodeID);

  //       console.log("User Address Fetched", data);
  //     } catch (error) {
  //       console.error("Error fetching user categories:", error);
  //     }
  //   };
  //   fetchUserAddress();
  // }, [token]);

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
    console.log(selectedPincode);
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

    console.log(selectedPincode);
    console.log(e.target.value);
    console.log(pincodeID);
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

  const handlePincodeSearchChange = (e) => {
    setPincodeSearchQuery(e.target.value);
  };

  const filteredPincodes = pincodes.filter((pincode) =>
    pincode.number.toString().includes(pincodeSearchQuery)
  );

  const handleAreaChange = (e) => {
    const localityID = e.target.value;
    setSelectedLocality(localityID);
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/ManageListingFromStatus/GetManageListingFromStatus",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setStatus(data.status);
      setListingId(data.listingId); // Set the listing ID from the API
      console.log(data.listingId);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [token]);




  const handleSubmit = (event) => {
    event.preventDefault();

    const submissionData = {
     ListingID:listingId,
      CountryID: parseInt(selectedCountry),
      StateID: parseInt(selectedState),
      CityID: parseInt(selectedCity),
      AssemblyID: parseInt(selectedAssembly),
      SelectedPincodesContainer: selectedPincode.map((pincode) => parseInt(pincode, 10))
     
    };
    console.log("Selected Pincodes:", selectedPincode);
    console.log("Submitting data:", submissionData);

    fetch(workiareaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())

      .then((responseData) => {
        const cityName = localStorage.getItem("cityname");
        // const pathlisting = `/Categoryapi`;
        // navigate(pathlisting);
        // console.log("API response:", responseData);
        // console.log("Address token:", token);
        // setSuccessMessage("Address Details Saved Successfully");
        // setErrorMessage("");
        // setShowPopup(true);

        // setTimeout(() => {
        //   setShowPopup(false);
        //   navigate("/Categoryapi");
        // }, 2000);
      })
      .catch((error) => {
        console.error("API error:", error);
        setErrorMessage(
          "Failed to save Address details. Please try again later."
        );
        setSuccessMessage(""); // Clear any existing success message
        setShowPopup(true);
      });
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  //country
  const handleCounChange = (selectedOption) => {
    setSelectedCountry(selectedOption ? selectedOption.value : "");
  };

  const countryOptions = filteredCountries.map((country) => ({
    value: country.countryID,
    label: country.name,
  }));

  //state
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

    if (selectedOption && pincodeOptions.length > 0) {
      const newPincodeMap = {};
      pincodeOptions.forEach((pincode) => {
        newPincodeMap[pincode.value] = pincode.label;
      });

      // Merge the new locality pincodes with existing pincodes
      setPincodeMap((prevMap) => ({ ...prevMap, ...newPincodeMap }));
    }
  };

  const assemblyOptions = assemblies.map((assembly) => ({
    value: assembly.assemblyID,
    label: assembly.name,
  }));

  const handlePinChange = (selectedOption) => {
    setSelectedPincode(selectedOption ? selectedOption.value : "");
  };

  const pincodeOptions = filteredPincodes.map((pincode) => ({
    value: pincode.pincodeID,
    label: pincode.number,
  }));

  //   const handlePincodeCheckboxChange = (e) => {
  //     const value = e.target.value;
  //     if (e.target.checked) {
  //       setSelectedPincode((prev) => [...prev, value]); // Add value to the array
  //     } else {
  //       setSelectedPincode((prev) => prev.filter((pincode) => pincode !== value)); // Remove value from the array
  //     }
  //   };

  //   const handlePChange = (e) => {
  //     const value = e.target.value;
  //     setSelectedPincode((prev) =>
  //       prev.includes(value)
  //         ? prev.filter((pincode) => pincode !== value) // Remove if already selected
  //         : [...prev, value] // Add if not selected
  //     );
  //   };

  // const handlePincodeCheckboxChange = (e) => {
  //   // Handle checkbox change logic
  //   // You can maintain a list of selected pincodes if needed
  //   console.log(`Pincode selected: ${e.target.value}`);
  // };

  const handleCheckboxChange = (pincodeValue) => {
    const isSelected = selectedPincode.includes(pincodeValue);

    if (selectedAssembly && pincodeOptions.length > 0) {
      const newPincodeMap = {};
      pincodeOptions.forEach((pincode) => {
        newPincodeMap[pincode.value] = pincode.label;
      });
      setPincodeMap((prevMap) => ({ ...prevMap, ...newPincodeMap })); // Merge with previous
    }

    if (isSelected) {
      setSelectedPincode((prevSelected) =>
        prevSelected.filter((value) => value !== pincodeValue)
      );
    } else {
      setSelectedPincode((prevSelected) => [...prevSelected, pincodeValue]);
    }
  };

  const handleRemovePincode = (pincodeValue) => {
    const updateSelection = selectedPincode.filter(
      (pin) => pin !== pincodeValue
    );
    setSelectedPincode(updateSelection);

    if (onPinChange) {
      onPinChange(updateSelection);
    }
  };

  const handlePChange = (e, pincode) => {
    if (e.target.checked) {
      setSelectedPincode([...selectedPincode, pincode]);
    } else {
      setSelectedPincode(selectedPincode.filter((item) => item !== pincode));
    }
  };

  const handleArChange = (selectedOption) => {
    setSelectedLocality(selectedOption ? selectedOption.value : "");
  };

  const localityOptions = localities.map((locality) => ({
    value: locality.localityID,
    label: locality.name,
  }));

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Address Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Address Details
                <span>
                  <Link className="back_btn mx-3" to={`/labournakapage`}>
                    Back
                  </Link>
                </span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>
                      Country<span className="text-danger">*</span>
                    </label>
                    {/* <input
        type="text"
        placeholder="Search Country"
        value={searchQuery}
        onChange={handleSearchChange}
        className="form-control mb-2"
      /> */}
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
                          backgroundColor: state.isSelected
                            ? "orange"
                            : state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color: state.isSelected
                            ? "white"
                            : state.isFocused
                            ? "white"
                            : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="state">
                      State<span className="text-danger">*</span>
                    </label>
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
                          backgroundColor: state.isSelected
                            ? "orange"
                            : state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color: state.isSelected
                            ? "white"
                            : state.isFocused
                            ? "white"
                            : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="city">
                      City<span className="text-danger">*</span>
                    </label>
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
                          backgroundColor: state.isSelected
                            ? "orange"
                            : state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color: state.isSelected
                            ? "white"
                            : state.isFocused
                            ? "white"
                            : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>
                      Locality<span className="text-danger">*</span>
                    </label>
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
                          backgroundColor: state.isSelected
                            ? "orange"
                            : state.isFocused
                            ? "orange"
                            : provided.backgroundColor,
                          color: state.isSelected
                            ? "white"
                            : state.isFocused
                            ? "white"
                            : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base,state) => ({
                          ...base,
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "orange" },
                          boxShadow:state.isFocused?'0 0 0 1px orange':'none'
                        }),
                      }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Pincode<span className="text-danger">*</span>
                    </label>

                    <div
                      className="pincode-checkbox-container"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "5px 11px 3px 11px",
                      }}
                    >
                      {pincodeOptions && pincodeOptions.length > 0 ? (
                        pincodeOptions.map((pincode) => (
                          <label
                            key={pincode.value}
                            className="checkbox-label WorkingareaLabel"
                          >
                            <input
                              type="checkbox"
                              className="Workingarea-checkbox"
                              value={pincode.value}
                              checked={selectedPincode.includes(pincode.value)}
                              onChange={() =>
                                handleCheckboxChange(pincode.value)
                              }
                            />
                            {pincode.label}
                          </label>
                        ))
                      ) : (
                        <p>No Pincode Options Available</p>
                      )}
                    </div>
                    {/* <h3>Selected Pincode</h3> */}
                    {/* {selectedPincode.length > 0 ? (
                      <ul>
                        {selectedPincode.map((pincodeValue) => {
                         
                          const pincodeLabel = pincodeOptions.find(
                            (pincode) => pincode.value === pincodeValue
                          )?.label;

                          return (
                            <li key={pincodeValue}>
                              {pincodeLabel ? pincodeLabel : pincodeValue}{" "}
                            
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemovePincode(pincodeValue)
                                }
                              >
                                x
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>No pincode selected</p>
                    )} */}

                    {/* {selectedLocality && (
        <div>
          
          {pincodes.map(pincode => (
            <label key={pincode.id}>
              <input
                type="checkbox"
                value={pincode.id}
                onChange={handlePincodeCheckboxChange}
              />
              {pincode.number}
            </label>
          ))}
        </div>
      )} */}

                    {/* <Select
                      className="wide add_bottom_10 pincode selectdrp"
                      
                      onChange={handlePinChange}
                      options={pincodeOptions}
                      placeholder="Select Pincode"
                      styles={{
                        option: (provided, state) => ({
                          ...provided,
                          backgroundColor:state.isSelected ?"orange": state.isFocused
                          ? "orange"
                          : provided.backgroundColor,
                        color:state.isSelected?'white': state.isFocused ? "white" : provided.color,
                          cursor: "pointer",
                        }),
                        control: (base) => ({
                          ...base,
                          height: "50px",
                          minHeight: "50px",
                          borderColor: "#ccc",
                          "&:hover": { borderColor: "#aaa" }, // Hover effect for the control
                        }),
                      }}
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <h6 className="WorkingareaH6">Selected Pincodes</h6>
                </div>
                <div className="row">
                  {selectedPincode.length > 0 ? (
                    <ul className="WorkingareaUl">
                      {selectedPincode.map((pincodeValue) => {
                        // Get the label from pincodeMap
                        const pincodeLabel = pincodeMap[pincodeValue];

                        return (
                          <li key={pincodeValue} className="WorkingAreaPincode">
                            {pincodeLabel ? pincodeLabel : pincodeValue}{" "}
                            {/* Show label if found, otherwise fallback to value */}
                            <button
                              className="WorkingAreaRemovetbtn"
                              type="button"
                              onClick={() => handleRemovePincode(pincodeValue)}
                            >
                              x
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p></p>
                  )}
                </div>
                <div
                  className="text-left col-12 mt-3"
                  style={{ display: "flex" }}
                >
                  <button type="submit" className="btn_1">
                    Save & Continue
                  </button>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    {" "}
                    <Link to="/communicationl">
                      <img src={previousarrowimg} style={{ height: "30px" }} />
                    </Link>
                    <Link to="/Categoryapi">
                      <img src={nextarrowimg} style={{ height: "30px" }} />
                    </Link>
                  </div>
                </div>

                {showAddressPopup && (
                  <LocalityPopup
                    isOpen={showAddressPopup[0]}
                    cityId={showAddressPopup[1]}
                    onClose={() => setShowAddressPopup([false, null])}
                  />
                )}

                {showPincodePopup && (
                  <PincodePopup
                    isOpen={showPincodePopup[0]}
                    localityId={showPincodePopup[1]}
                    onClose={() => setShowPincodePopup([false, null])}
                  />
                )}

                {showAreaPopup && (
                  <Areapopup
                    isOpen={showAreaPopup[0]}
                    pincodeId={showAreaPopup[1]}
                    localityId={showAreaPopup[2]}
                    onClose={() => setShowAreaPopup([false, null, null])}
                  />
                )}

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
};

export default withAuthh(Workingarea);
