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

const Addressl = () => {
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

  const apiUrl =
    "https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster";

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
      if (data) setCountries(data.country);
    });
  }, [token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetAddressDetailslisting",
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

        setSelectedCountry(data.countryID);
        setSelectedState(data.stateID);
        setSelectedCity(data.cityID);
        setSelectedAssembly(data.assemblyID);
        setSelectedPincode(data.pincodeID);
        setSelectedLocality(data.localityID);
        setLocalAddress(data.localAddress);

        console.log("locality",data.assemblyID)
        console.log("pincode",data.pincodeID)

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
    console.log(selectedPincode)
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const submissionData = {
      CountryID: parseInt(selectedCountry),
      StateID: parseInt(selectedState),
      CityID: parseInt(selectedCity),
      AssemblyID: parseInt(selectedAssembly),
      PincodeID: parseInt(selectedPincode),
      LocalityID: parseInt(selectedLocality),
      LocalAddress: localAddress,
    };

    console.log("Submitting data:", submissionData);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())

      .then((responseData) => {
        console.log("API response:", responseData);
        console.log("Address token:", token);
        setSuccessMessage("Address Details Saved Successfully");
        setErrorMessage("");
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/Categoryapi");
        }, 2000);
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
                  <Link
                    className="back_btn mx-3"
                    to={`/labournakapage/${localStorage.getItem("cityname")}`}
                  >
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
                    <select
                      className="wide add_bottom_10 country selectdrp"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      required
                    >
                      <option value="">Select Country</option>
                      {filteredCountries.map((country) => (
                        <option
                          key={country.countryID}
                          value={country.countryID}
                        >
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="state">
                      State<span className="text-danger">*</span>
                    </label>
                    <select
                      className="wide add_bottom_10 state selectdrp"
                      id="state"
                      value={selectedState}
                      onChange={handleStateChange}
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.stateID} value={state.stateID}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="city">
                      City<span className="text-danger">*</span>
                    </label>
                    <select
                      className="wide add_bottom_10 city selectdrp"
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      required
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option key={city.cityID} value={city.cityID}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>
                      Locality<span className="text-danger">*</span>
                    </label>
                    <select
                      className="wide add_bottom_10 locality selectdrp"
                      value={selectedAssembly}
                      onChange={handleLocalityChange}
                      required
                    >
                      <option value="">Select Locality</option>
                      {assemblies.map((assembly) => (
                        <option
                          key={assembly.assemblyID}
                          value={assembly.assemblyID}
                        >
                          {assembly.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        return setShowAddressPopup([true, selectedCity]);
                      }}
                    >
                      Add Locality +
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Pincode<span className="text-danger">*</span>
                    </label>
                    <select
                      className="wide add_bottom_10 pincode selectdrp"
                      value={selectedPincode}
                      onChange={handlePincodeChange}
                      required
                    >
                      <option value="">Select Pincode</option>
                      {filteredPincodes.map((pincode) => (
                        <option
                          key={pincode.pincodeID}
                          value={pincode.pincodeID}
                        >
                          {pincode.number}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        return setShowPincodePopup([true, selectedAssembly]);
                      }}
                    >
                      Add Pincode +
                    </button>
                  </div>
                  <div className="form-group col-md-4">
                    <label>
                      Area<span className="text-danger">*</span>
                    </label>
                    <select
                      className="wide add_bottom_10 area selectdrp"
                      value={selectedLocality}
                      onChange={handleAreaChange}
                      required
                    >
                      <option value="">Select Area</option>
                      {localities.map((locality) => (
                        <option
                          key={locality.localityID}
                          value={locality.localityID}
                        >
                          {locality.name}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        console.log("assembly", selectedAssembly);
                        console.log("pincode", selectedPincode);
                        console.log([
                          true,
                          selectedAssembly,
                          selectedPincode,
                        ]);
                        return setShowAreaPopup([
                          true,
                          selectedAssembly,
                         selectedPincode,
                        ]);
                      }}
                    >
                      Add Area +
                    </button>
                  </div>
                  <div className="form-group col-md-12">
                    <label htmlFor="localAddress">Local Address</label>
                    <textarea
                      type="text"
                      className="form-control localAddress-textarea"
                      id="localAddress"
                      placeholder="Enter local address"
                      value={localAddress}
                      onChange={(e) => setLocalAddress(e.target.value)}
                      required
                    />
                  </div>
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

export default withAuthh(Addressl);
