import React, { useState, useEffect } from "react";
import "../../../FrontEnd/css/RegistrationMV.css";
import { useParams } from "react-router-dom";
import logoSticky from "../../../FrontEnd/img/logo_sticky.svg";
import { NavLink } from "react-router-dom";
import Getquotespopup from "../../Listing/Getquotespopup";
import Popup from "../../Listing/Popup";
import { useSelector } from "react-redux";
import Sociallink from "../../Listing/Sociallink";
import { useNavigate } from "react-router-dom";


const Foot = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.userType);
  const [isPopupOpen, setIsPopupOpen] = useState([false, null]);
  const [status, setStatus] = useState("");
  const [listingId, setListingId] = useState(null);
  const [isSociallinkOpen, setIsSociallinkOpen] = useState(false);

  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/ManageListingFromStatus/GetManageListingFromStatus",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setStatus(data.status);

        // Save the listingId in state
        setListingId(data.listingId);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
  }, [token]);

 const handleDashboardButtonClick=()=>{
    if(token){
    
      navigate(`/Myactivity/in-${localStorage.getItem('cityname')}`)
    }
    else{
      navigate(`/in-${localStorage.getItem('cityname')}`)
    }
  }

  const homeButtonClick=()=>{
    navigate(`/in-${localStorage.getItem("cityname")}`);
  }
  //   const [cityName,setCityName]=useState(null);

  //   useEffect(() => {

  //     const city_name=localStorage.getItem('cityname');

  //    if(city_name){
  //      setCityName(city_name)
  //    }
  //  }, []);
  return (
    <>
      <footer className="shadow" style={{ position: "relative" }}>
        <div className="container py-5" style={{ width: "90%" }}>
          <div className="d-flex justify-content-between flex-wrap footertabs">
            {/* <div className="footer-logo-container">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img
                src={logoSticky}
                width="220"
                alt="logo"
                className="logo_sticky"
              />
            </a>
            <p
              className="my-3"
              style={{ width: "250px", fontSize: "13px", color: "white" }}
            >
              We are creating High Quality Resources and tools to Aid developers
              during the development of their projects
            </p>
          </div> */}
            <div>
              {/* <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Quick Links
            </p> */}
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                {/* <div
                  className="d-flex flex-column"
                  style={{ cursor: "pointer", padding: "0" }}
                >
                  <NavLink
                    to={`/in-${localStorage.getItem("cityname")}`}
                    style={{ color: "white" }}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to={`/about/in-${localStorage.getItem("cityname")}`}
                    style={{ color: "white" }}
                  >
                    About Us
                  </NavLink>

                  <NavLink
                    to={`/contact/in-${localStorage.getItem("cityname")}`}
                    style={{ color: "white" }}
                  >
                    Contact
                  </NavLink>
                </div> */}
              </div>
            </div>
            <div>
              {/* <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Help
            </p> */}
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <NavLink
                    to={`/in-${localStorage.getItem("cityname")}`}
                    style={{ color: "white" ,paddingBottom:'17px'}}
                  >
                    Home
                  </NavLink>
              </div>
            </div>
            <div>
              {/* <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Products
            </p> */}
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <NavLink
                    to={`/about/in-${localStorage.getItem("cityname")}`}
                    style={{ color: "white" ,paddingBottom:'17px'}}
                  >
                    About Us
                  </NavLink>
              </div>
            </div>

            <div>
              {/* <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Products
            </p> */}
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <NavLink
                    to={`/contact/in-${localStorage.getItem("cityname")}`}
                    style={{ color: "white",paddingBottom:'17px' }}
                  >
                    Contact
                  </NavLink>
              </div>
            </div>

            <div>
              {/* <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Products
            </p> */}
              {/* <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <a href="/" style={{ color: "white" }}>
                  Job
                </a>
              </div> */}
            </div>

            <div>
              {/* <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Products
            </p> */}
              {/* <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <a href="/" style={{ color: "white" }}>
                  Labour Naka
                </a>
              </div> */}
            </div>
          </div>
          <hr style={{ margin: 0 }} />
          <div className="row">
            <div className="col-lg-8 col-12 block-center-footer">
              <ul id="additional_links">
                <li>
                  <a href="termsandconditions.html">Terms and conditions</a>
                </li>
                <li>
                  <a href="privacy-policy.html">Privacy</a>
                </li>
                <li>
                  <a target="_blank" href="http://peaceinfotech.com/">
                    © PeaceInfotech Services Pvt. Ltd
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-lg-4 col-12 block-center-footer">
              <div className="follow_us">
                <ul>
                  <li>
                  <a href="https://www.facebook.com/sharer/sharer.php?description"  target="_blank" rel="noopener noreferrer"><i className="ti-facebook"></i></a>
                    {/* <a href="#0">
                      <i className="ti-facebook"></i>
                    </a> */}
                  </li>
                  <li>
                    <a href="http://twitter.com/share?text" target="_blank" rel="noopener noreferrer">
                      <i className="ti-twitter-alt"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.google.co.in/"  target="_blank" rel="noopener noreferrer">
                      <i className="ti-google"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pinterest.com/pin/create/button/?description" target="_blank" rel="noopener noreferrer">
                      <i className="ti-pinterest"></i>
                    </a>
                  </li>
                  {/* <li>
                    <a href="https://web.whatsapp.com/send?text"  target="_blank" rel="noopener noreferrer">
                    <i class="ti-whatsapp" style={{color:'white'}}></i>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
          <div
            className="to-top "
            onClick={scrollToTop}
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                backgroundColor: "orange",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i className="fa fa-arrow-up" style={{ color: "white" }}></i>
            </div>
          </div>
        </div>
      </footer>
      {/* <span style={{background:'blue',position:'fixed',bottom:'0',width:'100%' ,color:'yellow'}}>Testing</span> */}
      <div class="container-fluid bottom-link-sticky">
        <div class="row">
          <div class="col-3 bottom-link-sticky-list">
            
            <button
            style={{ paddingTop: "7px" }}
             onClick={homeButtonClick}
            ><i className="fa fa-home" style={{ color:'orange',marginRight:'2px' }}></i>
              Home
            </button>
          </div>
          <div class="col-3 bottom-link-sticky-list">
            <button style={{ paddingTop: "7px" }} onClick={handleDashboardButtonClick}>
            <i className="fa fa-user" style={{ color:'orange',marginRight:'2px' }}></i>
              You
            </button>
          </div>
          <div class="col-3 bottom-link-sticky-list">
            <button style={{ paddingTop: "7px" }}>
            <i className="fa fa-lightbulb-o" style={{ color:'orange',marginRight:'2px' }}></i>
            
              Suggestion
            </button>
          </div>
          {/* <div class="col-3 bottom-link-sticky-list">
            <button
              onClick={() => setIsPopupOpen([true, listingId])}
              style={{ paddingTop: "7px" }}
            >
              Send Enquiry
            </button>
          </div> */}
          <div class="col-3 bottom-link-sticky-list">
            <button onClick={() => setIsSociallinkOpen(true)} style={{ paddingTop: "7px",paddingLeft:'14px' }}>
            <i className="fa fa-share" style={{ color:'orange',marginRight:'2px' }}></i>Share</button>
          </div>
        </div>
      </div>

      {token ? (
        <Getquotespopup
          isOpen={isPopupOpen[0]}
          companyID={isPopupOpen[1]}
          onClose={() => setIsPopupOpen([false, null])}
        />
      ) : (
        <Popup
          isOpen={isPopupOpen[0]}
          companyID={null}
          onClose={() => setIsPopupOpen([false, null])}
        />
      )}

      <Sociallink
        isOpen={isSociallinkOpen}
        onClose={() => setIsSociallinkOpen(false)}
      />
    </>
  );
};

export default Foot;
