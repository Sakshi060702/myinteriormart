import React, { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import nextarrowimg from "../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Popupalert from "../Popupalert";


function Specialisationl() {
  const [specialisations, setSpecialisations] = useState({
    selectAll: false,
    acceptTenderWork: false,
    bank: false,
    beautyParlors: false,
    bungalow: false,
    callCenter: false,
    church: false,
    company: false,
    computerInstitute: false,
    dispensary: false,
    exhibitionStall: false,
    factory: false,
    farmhouse: false,
    gurudwara: false,
    gym: false,
    healthClub: false,
    home: false,
    hospital: false,
    hotel: false,
    laboratory: false,
    mandir: false,
    mosque: false,
    office: false,
    plazas: false,
    residentialSociety: false,
    resorts: false,
    restaurants: false,
    salons: false,
    shop: false,
    shoppingMall: false,
    showroom: false,
    warehouse: false,
  });

  const navigate=useNavigate();
  const token=useSelector((state)=>state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");



  useEffect(()=>{
    const fetchSpecialisations=async()=>{
      try{
        const response=await fetch("https://apidev.myinteriormart.com/api/BinddetailsListing/GetSpecializationDetailslisting",{
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if(!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data=await response.json();
        setSpecialisations((prevState)=>({
          ...prevState,
          ...data,
        }));
      }
      catch(error)
      {
        console.error("Error:", error);
      }
    };
    fetchSpecialisations();
  },[token]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSpecialisations((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSelectAll = () => {
    const allSelected = !specialisations.selectAll;
    const updatedSpecialisations = Object.fromEntries(
      Object.keys(specialisations).map((key) => [key, allSelected])
    );
    setSpecialisations(updatedSpecialisations);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://apidev.myinteriormart.com/api/Specialisation/CreateSpecialisation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(specialisations),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);
      console.log("Specialisation token",token);
      setSuccessMessage("Specialisation Details Saved Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
      setShowPopup(false);
      navigate("/workinghoursl");
    }, 2000);
      
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Failed to save Specialisation details. Please try again later.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-sidebar-content">
            <h4>Add Specialisation Details</h4>
            <p className="add-lidting-title-from">
              Add Listing / Add Specialisation Details
              <span>
                <Link className="back_btn mx-3" to="/labournakapage">
                  Back
                </Link>
              </span>
            </p>
            <div className="row">
              <div className="col-md-12 add_bottom_15">
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#fb830d" }}
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
              </div>
            </div>
            <div className="row">
              {Object.keys(specialisations).map(
                (key, index) =>
                  !["selectAll", "listingID", "ownerGuid", "ipAddress"].includes(key)  && (
                    <div className="col-md-3" key={index}>
                      <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                          <label className="container_check">
                            {key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                            <input
                              type="checkbox"
                              id={key}
                              name={key}
                              checked={specialisations[key]}
                              onChange={handleCheckboxChange}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="text-left col-12 mt-3" style={{display:'flex'}}>
            <button type="submit" onClick={handleSubmit} className="btn_1" style={{marginRight:'50px'}}>
            Save & Continue
                  </button>
                  <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                  <Link to="/Categoryapi" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/workinghoursl" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
                    </div>
                </div>
                {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
          />
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuthh(Specialisationl);
