import React,{useState,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import "../Businesslisting/Businesslisting.css";
import nextarrowimg from "../../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../../FrontEnd/img/arrow-previous.png";
import { useSelector } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh"

function Addsociallink() {

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
      console.log("API response:", responseData);
      console.log("Social Link token",token);
      alert("SocialLink details saved successfully!");
      navigate("/Addseokeyword")
     
    }
    catch(error){
      console.error("API error:", error);
      alert("Failed to save company details. Please try again later.");
    }
  }
  return (
    <>
      <div >
        <div >
          <div >
            <div >
              <h4>Social Links</h4>
              <p className="add-lidting-title-from">
                Add Listing / Social Links
                
              </p>
              <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="name">Facebook </label>
                  <input
                      className="form-control form-control-sm box"
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
                      className="form-control form-control-sm box"
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
                      className="form-control form-control-sm box"
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
                      className="form-control form-control-sm box"
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
                      className="form-control form-control-sm box"
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
                      className="form-control form-control-sm box"
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
                      className="form-control form-control-sm box"
                      type="text"
                      name="pinterest"
                      id="pinterest"
                      placeholder="Enter Pinterest Link"
                      value={formData.pinterest}
                      onChange={handleChange}
                    />
                </div>

               
                <div className="text-left col-12 mt-3" style={{display:'flex'}}>
                    <button type="submit" className="btn_1" style={{marginRight:'50px'}} onClick={handleSubmit}>
                      Save & Continue
                    </button>
                    <div style={{display:"flex",justifyContent:"center",gap:'10px',paddingTop:'10px'}}>                    
                      <Link to="/Uploadimage" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/Addseokeyword" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
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
export default withAuthh(Addsociallink);
