import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Businesslisting.css";
import nextarrowimg from "../../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../../FrontEnd/img/arrow-previous.png";
import { useSelector } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh";
import Select from "react-select";

const Address = () => {
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

  const [searchTerm, setSearchTerm] = useState("");

  const [localAddress, setLocalAddress] = useState("");

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredState = states.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCity = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredassembly = assemblies.filter((assembly) =>
    assembly.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const filteredPincoode = pincodes.filter((pincode) =>
  //   pincode.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // const filteredArea = localities.filter((locality) =>
  //   city.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submissionData),
    })
      .then((response) => response.json())

      .then((responseData) => {
        console.log("API response:", responseData);
        console.log("Address token:", token);
        alert(`Submitted successfully! `);
        navigate("/addcategory");
      })
      .catch((error) => {
        console.error("API error:", error);
        alert("Failed to save communication details. Please try again.");
      });
  };

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <h4>Add Address Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Address Details
              </p>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-4">
                    <label>Country</label>
                    {/* <input
        type="text"
        placeholder="Search Country"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '10px', width: '250px', height: '30px' }}
      /> */}
                    <select
                      className="wide add_bottom_10 country"
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      required
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        width: "250px",
                        height: "50px",
                      }}
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
                    <label htmlFor="state">State</label>
                    <select
                      className="wide add_bottom_10 state "
                      id="state"
                      value={selectedState}
                      onChange={handleStateChange}
                      required
                      style={{
                        border: "1px, solid #ccc",
                        borderRadius: "4px",
                        width: "250px",
                        height: "50px",
                      }}
                    >
                      <option value="">Select State</option>
                      {filteredState.map((states) => (
                        <option
                          key={states.stateID}
                          value={states.stateID}
                        >
                          {states.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="city">City</label>
                    <select
                      className="wide add_bottom_10 city "
                      id="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      required
                      style={{
                        border: "1px, solid #ccc",
                        borderRadius: "4px",
                        width: "250px",
                        height: "50px",
                      }}
                    >
                      <option value="">Select City</option>
                      {filteredCity.map((city) => (
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
                      className="wide add_bottom_10 locality "
                      value={selectedAssembly}
                      onChange={handleLocalityChange}
                      required
                      style={{
                        border: "1px, solid #ccc",
                        borderRadius: "4px",
                        width: "250px",
                        height: "50px",
                      }}
                    >
                      <option value="">Select Locality</option>
                      {filteredassembly.map((assembly) => (
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
                      className="wide add_bottom_10 pincode "
                      value={selectedPincode}
                      onChange={handlePincodeChange}
                      required
                      style={{
                        border: "1px, solid #ccc",
                        borderRadius: "4px",
                        width: "250px",
                        height: "50px",
                      }}
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
                      className="wide add_bottom_10 area "
                      value={selectedLocality}
                      onChange={handleAreaChange}
                      required
                      style={{
                        border: "1px, solid #ccc",
                        borderRadius: "4px",
                        width: "250px",
                        height: "50px",
                      }}
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
                  <button
                    type="submit"
                    className="btn_1"
                    style={{ marginRight: "50px" }}
                  >
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
                    <Link to="/addCommunication">
                      <img src={previousarrowimg} style={{ height: "30px" }} />
                    </Link>
                    <Link to="/addcategory">
                      <img src={nextarrowimg} style={{ height: "30px" }} />
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Address;
