import React, { useState, useEffect } from "react";

function Teamimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedBusinessCategory, setSelectedBusinessCategory] = useState("");

  const apiUrl =
    "https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster";

  const fetchData = (type, parentID = null) => {
    let body = {
      type,
      CountryID: setSelectedCountry,
      StateID: setSelectedState,
      CityID: 0,
          AssemblyID: 0,
          PincodeID: 0,
          LocalityID: 0,
          LocalAddress: "",
     
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
    
    const selectedStateData = states.find(
      (state) => state.stateID === parseInt(stateID)
    );
    
  };


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBusinessCategoryChange = (event) => {
    setSelectedBusinessCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prepare data to submit to the API
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("designation", selectedBusinessCategory);
    formData.append("firstName", event.target.firstName.value);
    formData.append("lastName", event.target.lastName.value);
    formData.append("countryId", selectedCountry);
    formData.append("stateId", selectedState);

    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadOwnerImage", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }
      // Handle success (e.g., show success message)
      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error uploading image
    }
  };

  return (
    <>
      <div className="row imageSection" id="owner_section">
        <div className="col-12">
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="name">
                  Select Team Member <span className="text-danger">*</span>
                </label>
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      border: "2px solid grey",
                      height: "50px",
                      width: "500px",
                    }}
                  />
                  {/* Designation dropdown */}
                  <select
                    className="wide add_bottom_10 selectdrp"
                    name="businessCategory"
                    onChange={handleBusinessCategoryChange}
                    value={selectedBusinessCategory}
                  >
                    <option value="" disabled>Select Business Category</option>
                    <option value="Owner">Owner</option>
                    <option value="Proprietor">Proprietor</option>
                    <option value="Director">Director</option>
                    <option value="Manager">Manager</option>
                  </select>
                  {/* First Name input */}
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" name="firstName" placeholder="First Name" />
                  </div>
                  {/* Last Name input */}
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" name="lastName" placeholder="Last Name" />
                  </div>
                  {/* Country dropdown */}
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
                  
                  <button type="submit" className="btn btn-primary">Save and Continue</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Teamimagel;
