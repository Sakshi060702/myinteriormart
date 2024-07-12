import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";

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

  const apiUrl =
    "https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster";

  const fetchData = (type, parentID = null) => {
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

    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Data fetched for ${type}:`, data);
        return data;
      })
      .catch((error) => {
        console.error(`Error fetching ${type}:`, error);
        return null;
      });
  };

  useEffect(() => {
    fetchData("countries").then((data) => {
      if (data) setCountries(data.country);
    });
  }, []);

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
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())

      .then((responseData) => {
        console.log("API response:", responseData);
        alert(`Submitted successfully! `);
        navigate("/Categoryapi");
      })
      .catch((error) => {
        console.error("API error:", error);
        alert("Failed to save communication details. Please try again.");
      });
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
                  <Link className="back_btn mx-3" to="/communicationl">
                    Back
                  </Link>
                </span>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Country</label>
                    <select
                      className="wide add_bottom_10 country selectdrp"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
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
                    <label htmlFor="state">State</label>
                    <select
                      className="wide add_bottom_10 state selectdrp"
                      id="state"
                      value={selectedState}
                      onChange={handleStateChange}
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
                    <label htmlFor="city">City</label>
                    <select
                      className="wide add_bottom_10 city selectdrp"
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
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
                    <label>Locality</label>
                    <select
                      className="wide add_bottom_10 locality selectdrp"
                      value={selectedAssembly}
                      onChange={handleLocalityChange}
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
                  </div>
                  <div className="form-group col-md-4">
                    <label>Pincode</label>
                    <select
                      className="wide add_bottom_10 pincode selectdrp"
                      value={selectedPincode}
                      onChange={handlePincodeChange}
                    >
                      <option value="">Select Pincode</option>
                      {pincodes.map((pincode) => (
                        <option
                          key={pincode.pincodeID}
                          value={pincode.pincodeID}
                        >
                          {pincode.number}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label>Area</label>
                    <select
                      className="wide add_bottom_10 area selectdrp"
                      value={selectedLocality}
                      onChange={handleAreaChange}
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
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="localAddress">Local Address</label>
                    <textarea
                      type="text"
                      className="form-control"
                      id="localAddress"
                      placeholder="Enter local address"
                      value={localAddress}
                      onChange={(e) => setLocalAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="text-left col-12 mt-3">
                  <button type="submit" className="btn_1">
                    Save & Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addressl;
