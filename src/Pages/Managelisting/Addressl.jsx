import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";

const Addressl = () => {
const[countries,setCountries]=useState([]);
const[states,setStates]=useState([]);
const[cities,setCities]=useState([]);
const [localities,setLocalities]=useState([]);
const[pincodes,setPincodes]=useState([]);
const[areas,setAreas]=useState([]);

const[selectedCountry,setSelectedCountry]=useState("");
const[selectedState,setSelectedState]=useState("");
const[selectedCity,setSelectedCity]=useState("");
const[selectedLocality,setSelectedLocality]=useState("");
const[selectedPincode,setSelectedPincode]=useState("");
const [selectedArea, setSelectedArea] = useState("");

const navigate = useNavigate();

useEffect(()=>{
  //fetch countries and related data
  const fetchAddressData = async () => {
    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCountries(data.country);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };
  fetchAddressData();
}, []);


const handleCountryChange=(e)=>{
  const countryID=e.target.value;
  setSelectedCountry(countryID);
  const selectedCountryData=countries.find((country)=>country.countryID===parseInt(countryID));
  setStates(selectedCountryData ? selectedCountryData.states:[]);
  setCities([]);
  setLocalities([]);
  setPincodes([]);
  setAreas([]);
};

const handleStateChange=(e)=>{
  const stateID=e.target.value;
  setSelectedState(stateID);
  const selectStateData=states.find((state)=>state.stateID ===parseInt(stateID));
  setCities(selectStateData ?selectStateData.cities:[]);
  setLocalities([]);
  setPincodes([]);
  setAreas([]);
};

const handleCityChange=(e)=>{
  const cityID=e.target.value;
  setSelectedCity(cityID);
  const selectedCityData=cities.find((city)=>city.cityID===parseInt(cityID));
  setLocalities(selectedCityData?selectedCityData.localities:[]);
  setPincodes([]);
  setAreas([]);
}

const handlLocalityChange=(e)=>{
  const localityID=e.target.value;
  setSelectedLocality(localityID);
  const selectedLocalityData=localities.find((localities)=>localities.localityID===parseInt(localityID));
  setPincodes(selectedLocalityData?selectedLocalityData.pincodes:[]);
  setAreas([]);
}

const handlePincodeChange=(e)=>{
  const pincodeID=e.target.value;
  setSelectedPincode(pincodeID);
  const selectedPincodeData=pincodes.find((pincodes)=>pincodes.pincodeID===parseInt(pincodeID));
  setAreas(selectedPincodeData?selectedPincodeData.areas:[]);
  
};

const handleAreaChange = (e) => {
  const areaID = e.target.value;
  setSelectedArea(areaID);
};

const handleSubmit=async(event)=>{
  event.preventDefault();
  const apiUrl="https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster";

  const submissionData={
    countryID: selectedCountry,
    stateID: selectedState,
    cityID: selectedCity,
    localityID: selectedLocality,
    pincodeID: selectedPincode,
    areaID: selectedArea,
    
  };
  console.log("Submitting data:",submissionData);

  try{
    const response=await fetch(apiUrl,{
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(submissionData)
    });

    if(!response.ok){
      const errorData = await response.json();
      console.error("API response error data:", errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
      console.log("API response:", responseData);
      alert("Communication details saved successfully!");
      navigate("/categoryl");
  }
  catch(error)
  {
    console.error("API error:", error);
    alert("Failed to save communication details. Please try again");
  }
}




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
                  <select className="wide add_bottom_10 country selectdrp" 
                  value={selectedCountry}
                  onChange={handleCountryChange}>
                    <option value="">Select Country</option>
                    {countries.map((country)=>(
                      <option key={country.countryID} value={country.countryID}>{country.name}</option>
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
                    {states.map((state)=>(
                      <option key={state.stateID} value={state.stateID}>{state.name}</option>
                    ))}
                    
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>City</label>
                  <select className="wide add_bottom_10 city selectdrp"
                  value={selectedCity}
                  onChange={handleCityChange}
                  >
                    <option>Select City</option>
                    {cities.map((city)=>(
                      <option key={city.cityID} value={city.cityID}>{city.name}</option>
                    ))}
                    
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Locality</label>
                  <select className="wide add_bottom_10 assembly selectdrp"
                  value={selectedLocality}
                  onChange={handlLocalityChange}>
                    <option value="">Select Locality</option>
                    {localities.map((locality)=>(
                      <option key={locality.localityID} value={locality.localityID}>{locality.name}</option>
                    ))}
                    
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Pincode</label>
                  <select className="wide add_bottom_10 pincode selectdrp"
                   value={selectedPincode} 
                   onChange={handlePincodeChange}>
                    <option value="">Select Pincode</option>
                    {pincodes.map((pincode)=>(
                      <option key={pincode.pincodeID} value={pincode.pincodeID}>{pincode.code}</option>
                    ))}
                 
                  </select>
                </div>
                <div className="form-group col-md-4">
                  <label>Area</label>
                  <select className="wide add_bottom_10 area selectdrp"
                      value={selectedArea}
                      onChange={handleAreaChange}>
                      <option value="">Select Area</option>
                      {areas.map((area) => (
                        <option key={area.areaID} value={area.areaID}>{area.name}</option>
                      ))}
                    </select>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="address">
                    Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control form-control-sm"
                    id="Address"
                    name="Address"
                    style={{ height: "100px" }}
                  />
                </div>
                <div className="text-left col-12 mt-3">
                <button type="submit" className="btn_1" >
                    Save & Continue
                  </button>
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

export default Addressl;
