import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";
import nextarrowimg from "../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Popupalert from "../Popupalert";

function Sociallinkl() {

  const[formData,setFormData]=useState({
    facebook:"",
    whatsappGroupLink:"",
    linkedin:"",
    twitter:"",
    instagram:"",
    youtube:"",
    pinterest:""

  });
  const navigate=useNavigate();
  const token=useSelector((state)=>state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");


  useEffect(()=>{
    const fetchSociallinkDetails=async()=>{
      const apiUrl="https://apidev.myinteriormart.com/api/BinddetailsListing/GetAddSocialLinkDetailslisting";

      try{
        const response=await fetch(apiUrl,{
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if(!response.ok){
          const errorData=await response.json();
          console.error("API response error data:",errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log("API response:", responseData);

        setFormData({
          facebook:responseData.facebook || "",
          whatsappGroupLink :responseData.whatsappGroupLink || "",
          linkedin : responseData.linkedin || "",
          twitter : responseData.twitter || "",
          youtube:responseData.youtube || "",
          instagram:responseData.instagram || "",
          pinterest :responseData.pinterest || "",
        })
      }

      
      catch(error)
      {
        console.error("API error:", error);
        
      }
    };
    fetchSociallinkDetails();
  },[token]);


  const handleChange=(event)=>{
    const{name,value}=event.target;
    setFormData((prevFormData)=>({
      ...prevFormData,
      [name]:value
    }));
  };

  const handleSubmit=async(event)=>{
    event.preventDefault();
    const apiUrl="https://apidev.myinteriormart.com/api/SocialLink/CreateSocialLink";
    console.log("Submitting data",formData);

    try{
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error data:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();

      const cityName = localStorage.getItem('cityname');
      const pathlisting = `/Keywordl/${cityName}`;
      navigate(pathlisting);


    //   console.log("API response:", responseData);
    //   console.log("Social Link token",token);
    //   setSuccessMessage("Social Link Details Saved Successfully");
    //   setErrorMessage("");
    //   setShowPopup(true);

    //   setTimeout(() => {
    //   setShowPopup(false);
    //   navigate("/Keywordl");
    // }, 2000);
      
     
    }
    catch(error){
      console.error("API error:", error);
      setErrorMessage("Failed to save Social Link details. Please try again later.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  }

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Social Links</h4>
              <p className="add-lidting-title-from">
                Add Listing / Social Links
                <span>
                <Link className="back_btn mx-3" to={`/labournakapage/${localStorage.getItem('cityname')}`}>
                    Back
                  </Link>
                </span>
              </p>
              <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="name">Facebook <span className="text-danger">*</span></label>
                  <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="facebook"
                      id="facebook"
                      placeholder="Enter Facebook Link"
                      value={formData.facebook}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Whatsapp <span className="text-danger">*</span></label>
                  <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="whatsappGroupLink"
                      id="whatsappGroupLink"
                      placeholder="Enter Whatsapp Link"
                      value={formData.whatsappGroupLink}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">LinkdenIn<span className="text-danger">*</span></label>
                  <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      placeholder="Enter LinkedIn Link"
                      value={formData.linkedin}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Twitter<span className="text-danger">*</span></label>
                  <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="twitter"
                      id="twitter"
                      placeholder="Enter Twitter Link"
                      value={formData.twitter}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Youtube<span className="text-danger">*</span></label>
                  <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="youtube"
                      id="youtube"
                      placeholder="Enter YouTube Link"
                      value={formData.youtube}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Instagram<span className="text-danger">*</span></label>
                  <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="instagram"
                      id="instagram"
                      placeholder="Enter Instagram Link"
                      value={formData.instagram}
                      onChange={handleChange}
                      required
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Pinterest<span className="text-danger">*</span></label>
                  <input
                      className="form-control form-control-sm box"
                      type="text"
                      name="pinterest"
                      id="pinterest"
                      placeholder="Enter Pinterest Link"
                      value={formData.pinterest}
                      onChange={handleChange}
                      required
                    />
                </div>

               
                <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                <button type="submit" className="btn_1" >
                Save & Continue
                    </button>
                    <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                      <Link to="/Imagesl" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/Keywordl" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
                    </div>
                  </div>
                  {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
            onClose={handleClosePopup}
          />
          )}
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default withAuthh(Sociallinkl);
