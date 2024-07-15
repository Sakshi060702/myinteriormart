import React, { useState, useEffect } from "react";

function Teamimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    countryID: "",
    stateID: "",
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadOwnerImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parentID: 0 }), // Assuming parentID: 0 is used to fetch all countries
      });
      const data = await response.json();
      setCountries(data.countries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryID) => {
    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadOwnerImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type: "countries" }),
      });
      const data = await response.json();
      setStates(data.states);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCountryChange = (event) => {
    const countryID = event.target.value;
    setSelectedCountry(countryID);
    setFormData({
      ...formData,
      countryID: countryID,
    });
  };

  const handleSubmitfile = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("file", selectedFile);
      formDataToSubmit.append("firstName", formData.firstName);
      formDataToSubmit.append("lastName", formData.lastName);
      formDataToSubmit.append("designation", formData.designation);
      formDataToSubmit.append("countryID", formData.countryID);
      formDataToSubmit.append("stateID", formData.stateID);

      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadOwnerImage", {
          method: "POST",
          body: formDataToSubmit,
        });
        const result = await response.json();
        console.log(result);
        // Handle the response accordingly
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="row">
      <div className="form-group col-md-4">
        <label htmlFor="name">
          Select Team Member <span className="text-danger">*</span>
        </label>
        <form onSubmit={handleSubmitfile}>
          <input
            type="file"
            onChange={handleFileChange}
            style={{
              border: "2px solid grey",
              height: "26px",
              width: "330px",
            }}
          />
        </form>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="designation">Select Designation</label>
        <select
          className="wide add_bottom_10 selectdrp"
          name="designation"
          value={formData.designation}
          onChange={handleInputChange}
        >
          <option value="" disabled>Select Designation</option>
          <option value="Owner">Owner</option>
          <option value="Proprieter">Proprieter</option>
          <option value="Director">Director</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="firstName">
          First Name <span className="text-danger">*</span>
        </label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          required
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="lastName">Last Name</label>
        <input
          className="form-control form-control-sm"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="countryID">Country</label>
        <select
  className="wide add_bottom_10 selectdrp"
  name="countryID"
  value={formData.countryID}
  onChange={handleCountryChange}
>
  <option value="" disabled>Select Country</option>
  {countries && countries.length > 0 && countries.map((country) => (
    <option key={country.countryID} value={country.countryID}>
      {country.name}
    </option>
  ))}
</select>
      </div>
      <div className="form-group col-md-4">
        <label htmlFor="stateID">State</label>
        <select
  className="wide add_bottom_10 selectdrp"
  name="stateID"
  value={formData.stateID}
  onChange={handleInputChange}
>
  <option value="" disabled>Select State</option>
  {states && states.length > 0 && states.map((state) => (
    <option key={state.stateID} value={state.stateID}>
      {state.name}
    </option>
  ))}
</select>
      </div>
      <div className="text-left col-12 mt-3">
        <button type="submit" className="btn_1" onClick={handleSubmitfile}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

export default Teamimagel;


