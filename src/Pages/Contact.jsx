import React, { useState, useEffect } from "react";
import contactImage from "../FrontEnd/img/ContactUs.jpeg";
import locationImage from "../FrontEnd/img/location-pin.png";
import phoneImage from "../FrontEnd/img/phone.png";
import megaphoneImage from "../FrontEnd/img/megaphone.png";
import { useSelector } from "react-redux";

function Contact() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const[formData,setFormData]=useState({
    fullName:"",
    email:"",
    mobileNumber:"",
    message:"",
    enquiryTitle:""
  })

  const [cityName,setCityName]=useState(null);
  const[contactInfo,setContactInfo]=useState('');

  useEffect(() => {
   
    const loc_Latitude = localStorage.getItem(latitude);
    const loc_Longitude = localStorage.getItem(longitude);

    const city_name=localStorage.getItem("cityname");

    if (loc_Latitude && loc_Longitude) {
      setLatitude(loc_Latitude);
      setLongitude(loc_Longitude);
    }

    if(city_name){
      setCityName(city_name)
    }
  }, []);


  useEffect(()=>{
    const fetchContcatinfo=async()=>{
      try{
const response=await fetch(`https://apidev.myinteriormart.com/api/PortalSetting/GetPortalSetting`);
const data=await response.json();
const portallink=data.portalSettings[0];
setContactInfo({
  address:portallink.address,
  contactinformation:portallink.contactinformation,
 
})
      }
      catch(error){
console.log('Error in fetching social link',error)
      }
    };
    fetchContcatinfo();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const response=await fetch(
        "https://apidev.myinteriormart.com/api/CreateEnquiry/CreateEnquiry",
        {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify(formData),
        }
      );
      const data=await response.json();
      console.log(data);

    }
    catch(error)
    {
      console.error('Error submitting data',error)
    }
  }

  return (
    <>
      <main style={{ backgroundColor: "white" }}>
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-7 mb-3">
              <div className="contact_form">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <h3 className="font-weight-bold text-dark mx-3 mb-4">
                      Get In Touch
                    </h3>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                          value={formData.fullName ||""}
                          onChange={handleChange}
                          name="fullName"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number"
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          minLength="10"
                          maxLength="10"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          name="mobileNumber"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          value={formData.email || ""}
                          onChange={handleChange}
                          name="email"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Message"
                          value={formData.message}
                          onChange={handleChange}
                          name="message"
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Title"
                          value={formData.enquiryTitle}
                          onChange={handleChange}
                          name="enquiryTitle"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn_1 py-2 px-3 mx-3"
                      id="submit-contact"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-5 d-flex justify-content-center mb-3">
              <div className="contact_us_img_sec">
                <img
                  src={contactImage}
                  style={{ width: "100%", height: "100%" }}
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-5" id="location_contact">
          <div className="container">
            <div className="row justify-content-center px-4">
              <div className="col-md-4 mobile_m">
                <div className="contact_card">
                  <div className="contact_img_sec">
                    <img
                      src={locationImage}
                      className="contact_img"
                      alt="Address"
                    />
                  </div>
                  <div className="contact_heading">Address</div>
                  <div className="contact_text">
                    {contactInfo.address}
                  </div>
                </div>
              </div>
              <div className="col-md-4 mobile_m">
                <div className="contact_card">
                  <div className="contact_img_sec">
                    <img
                      src={phoneImage}
                      className="contact_img"
                      alt="Mobile"
                    />
                  </div>
                  <div className="contact_heading">Helpline</div>
                  <div className="contact_text">
                    <a href={`tel:${contactInfo.contactinformation}`}>{contactInfo.contactinformation}</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mobile_m">
                <div className="contact_card">
                  <div className="contact_img_sec" style={{ width: "20%" }}>
                    <img
                      src={megaphoneImage}
                      className="contact_img"
                      alt="email"
                    />
                  </div>
                  <div className="contact_heading" style={{ marginTop: "7px" }}>
                    Advertisement
                  </div>
                  <div className="contact_text">
                    <a href={`tel:${contactInfo.contactinformation}`}>{contactInfo.contactinformation}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
