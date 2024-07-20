import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../FrontEnd/img/arrow-previous.png";

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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API response error data:", errorData);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log("API response:", responseData);
      alert("SocialLink details saved successfully!");
     
    }
    catch(error){
      console.error("API error:", error);
      alert("Failed to save company details. Please try again later.");
    }
  }
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
                  <Link className="back_btn mx-3" to="/labournakapage">
                    Back
                  </Link>
                </span>
              </p>
              <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="name">Facebook </label>
                  <input
                      className="form-control form-control-sm"
                      type="text"
                      name="facebook"
                      id="facebook"
                      placeholder="Enter Facebook Link"
                      value={formData.facebook}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Whatsapp </label>
                  <input
                      className="form-control form-control-sm"
                      type="text"
                      name="whatsappGroupLink"
                      id="whatsappGroupLink"
                      placeholder="Enter Whatsapp Link"
                      value={formData.whatsappGroupLink}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">LinkdenIn</label>
                  <input
                      className="form-control form-control-sm"
                      type="text"
                      name="linkedin"
                      id="linkedin"
                      placeholder="Enter LinkedIn Link"
                      value={formData.linkedin}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Twitter</label>
                  <input
                      className="form-control form-control-sm"
                      type="text"
                      name="twitter"
                      id="twitter"
                      placeholder="Enter Twitter Link"
                      value={formData.twitter}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Youtube</label>
                  <input
                      className="form-control form-control-sm"
                      type="text"
                      name="youtube"
                      id="youtube"
                      placeholder="Enter YouTube Link"
                      value={formData.youtube}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Instagram</label>
                  <input
                      className="form-control form-control-sm"
                      type="text"
                      name="instagram"
                      id="instagram"
                      placeholder="Enter Instagram Link"
                      value={formData.instagram}
                      onChange={handleChange}
                    />
                </div>
                <div className="form-group col-md-6">
                  <label for="name">Pinterest</label>
                  <input
                      className="form-control form-control-sm"
                      type="text"
                      name="pinterest"
                      id="pinterest"
                      placeholder="Enter Pinterest Link"
                      value={formData.pinterest}
                      onChange={handleChange}
                    />
                </div>

               
                <div className="text-left col-12 mt-3">
                    <button type="submit" className="btn_1">
                      Save & Continue
                    </button>
                    <div style={{display:"flex",justifyContent:"flex-end",gap:'10px'}}>                    
                      <Link to="/Imagesl" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/Keywordl" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
                    </div>
                  </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Sociallinkl;
