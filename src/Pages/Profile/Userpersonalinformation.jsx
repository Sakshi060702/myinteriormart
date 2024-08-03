import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../FrontEnd/img/arrow-previous.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";

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
        setQualifications(data.qualifications);
      } else {
        console.error("Failed to fetch qualifications");
      }
    } catch (error) {
      console.error("Error fetching qualifications of user :", error);
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
        alert(`Data Submitted successfully! `);
        navigate('/');
       
      })
      .catch((error) => {
        console.error("API error:", error);
        alert("Failed to save communication details. Please try again.");
      });
  };

  return (
    <>
      <div className="">
        <h4>Add Address Details</h4>
        <p className="add-lidting-title-from">
          Add Listing / Add Address Details
          <span>
            <Link className="back_btn mx-3" to="/labournakapage">
              Back
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
              <select
                className="wide add_bottom_10 "
                name="maritalStatus"
                value={selectedMaritalStatus}
                onChange={handleMaritalStatusChange}
                required
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
              >
                <option value="" disabled>
                  Select Marital Status
                </option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label>
                Qualification <span className="text-danger">*</span>
              </label>
              <select
                className="wide add_bottom_10 "
                name="qualification"
                value={selectedQualification}
                onChange={handleQualificationChange}
                required
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
              >
                <option value="" disabled>
                  Qualification
                </option>
                {qualificationId.map((qualificationId) => (
                  <option key={qualificationId.id} value={qualificationId.id}>
                    {qualificationId.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label>Country</label>
              <select
                className="wide add_bottom_10 country "
                value={selectedCountry}
                onChange={handleCountryChange}
                required
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.countryID} value={country.countryID}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="state">State</label>
              <select
                className="wide add_bottom_10 state"
                id="state"
                value={selectedState}
                onChange={handleStateChange}
                required
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
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
                className="wide add_bottom_10 city "
                id="city"
                value={selectedCity}
                onChange={handleCityChange}
                required
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
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
                className="wide add_bottom_10 locality"
                value={selectedAssembly}
                onChange={handleLocalityChange}
                required
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
              >
                <option value="">Select Locality</option>
                {assemblies.map((assembly) => (
                  <option key={assembly.assemblyID} value={assembly.assemblyID}>
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
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
              >
                <option value="">Select Pincode</option>
                {pincodes.map((pincode) => (
                  <option key={pincode.pincodeID} value={pincode.pincodeID}>
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
                style={{border:'1px, solid #ccc',borderRadius:'4px', width:'250px', height:'50px'}}
              >
                <option value="">Select Area</option>
                {localities.map((locality) => (
                  <option key={locality.localityID} value={locality.localityID}>
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
        </form>
      </div>
    </>
  );
};

export default withAuthh(Userpersonalinformation);


