import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import usericon from "../../FrontEnd/img/user1 (4).jpg";
import withAuthh from "../../Hoc/withAuthh";

function Teamimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedBusinessCategory, setSelectedBusinessCategory] = useState("");

  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTeamImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetOwnerImageDetailslisting",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        console.log(data.imagepath);
        setImageURL(data.imagepath); // Assuming data contains image URL and title
        setImageTitleFromAPI(data.imagetitle); // Set the image title from API
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeamImage();
  }, [token]);

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
        Authorization: `Bearer ${token}`,
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

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("designation", selectedBusinessCategory);
    formData.append("firstName", event.target.firstName.value);
    formData.append("lastName", event.target.lastName.value);
    formData.append("countryId", selectedCountry);
    formData.append("stateId", selectedState);

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/ImageUpload/UploadOwnerImage",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const result = await response.json();
      console.log("Upload result:", result);
      console.log("Result",result.imageUrl);
      setImageURL(result.imageUrl);// Ensure this is the correct property
      alert("Team Image Uploaded Successfully");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <div className="row" style={{ paddingTop: "40px" }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px", // Adjust the gap between the form groups as needed
          }}
        >
          <div
            className="form-group"
            style={{
              flex: "1 1 calc(33.3333% - 16px)", // 33.3333% width with the gap considered
              boxSizing: "border-box",
            }}
          >
            <label htmlFor="name">
              Select Team Member <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                border: "1px solid grey",
                height: "50px",
                width: "100%", // Make the input file take the full width of the form group
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              flex: "1 1 calc(33.3333% - 16px)", // 33.3333% width with the gap considered
              boxSizing: "border-box",
            }}
          >
            <label htmlFor="designation">
              Select Designation <span className="text-danger">*</span>
            </label>
            <select
              className="wide add_bottom_10 selectdrp"
              name="businessCategory"
              onChange={handleBusinessCategoryChange}
              value={selectedBusinessCategory}
              style={{
                width: "100%",
                height: "50px", // Adjust height as needed
              }}
            >
              <option value="" disabled>
                Select Business Category
              </option>
              <option value="Owner">Owner</option>
              <option value="Proprietor">Proprietor</option>
              <option value="Director">Director</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div
            className="form-group"
            style={{
              flex: "1 1 calc(33.3333% - 16px)", // 33.3333% width with the gap considered
              boxSizing: "border-box",
            }}
          >
            <label htmlFor="firstName">
              First Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="form-control form-control-sm"
              style={{
                width: "100%",
                height: "50px", // Adjust height as needed
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              flex: "1 1 calc(33.3333% - 16px)", // 33.3333% width with the gap considered
              boxSizing: "border-box",
            }}
          >
            <label htmlFor="lastName">
              Last Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control form-control-sm"
              type="text"
              name="lastName"
              placeholder="Last Name"
              style={{
                width: "100%",
                height: "50px", // Adjust height as needed
              }}
            />
          </div>

          <div
            className="form-group"
            style={{
              flex: "1 1 calc(33.3333% - 16px)", // 33.3333% width with the gap considered
              boxSizing: "border-box",
            }}
          >
            <label>
              Country <span className="text-danger">*</span>
            </label>
            <select
              className="wide add_bottom_10 country selectdrp"
              value={selectedCountry}
              onChange={handleCountryChange}
              style={{
                width: "100%",
                height: "50px", // Adjust height as needed
              }}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country.countryID} value={country.countryID}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div
            className="form-group"
            style={{
              flex: "1 1 calc(33.3333% - 16px)", // 33.3333% width with the gap considered
              boxSizing: "border-box",
            }}
          >
            <label htmlFor="state">
              State <span className="text-danger">*</span>
            </label>
            <select
              className="wide add_bottom_10 state selectdrp"
              id="state"
              value={selectedState}
              onChange={handleStateChange}
              style={{
                width: "100%",
                height: "50px", // Adjust height as needed
              }}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.stateID} value={state.stateID}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-left col-12 mt-3">
            <button
              type="submit"
              className="btn_1"
              style={{ backgroundColor: "#E55923", marginTop: "10px" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <hr style={{ marginTop: "32px" }}></hr>
      <div className="row">
        <div className="col-md-12">
          <h2 style={{ textAlign: "center" }}>Team</h2>
        </div>
      </div>
      <div className="row justify-content-center mt-4">
        <div className="col-md-3 col-lg-2 col-6 mb-5">
          <div className="upload_img_sec">
            <img
              className="upload_images"
              src={imageURL? `https://apidev.myinteriormart.com${imageURL}` : ""}
              alt="Team Image"
            />
          </div>
          <div className="img_title text-center">{imageTitleFromAPI}</div>
        </div>
      </div>
    </>
  );
}

export default Teamimagel;
