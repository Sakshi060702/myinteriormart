import React,{useState,useEffect} from "react";
import "../../../FrontEnd/css/RegistrationMV.css";
import { useParams } from "react-router-dom";

import logoSticky from "../../../FrontEnd/img/logo_sticky.svg";
import { NavLink } from "react-router-dom";

const Foot = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
//   const [cityName,setCityName]=useState(null);

  

//   useEffect(() => {
  
//     const city_name=localStorage.getItem('cityname');

  

//    if(city_name){
//      setCityName(city_name)
//    }
//  }, []);
  return (
    <footer className="shadow" style={{ position: "relative" }}>
      <div className="container py-5" style={{ width: "90%" }}>
        <div className="d-flex justify-content-between flex-wrap">
          <div className="footer-logo-container">
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
          </div>
          <div>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Quick Links
            </p>
            <div
              className="d-flex flex-column"
              style={{ cursor: "pointer", padding: "0" }}
            >
              <div
                className="d-flex flex-column"
                style={{ cursor: "pointer", padding: "0" }}
              >
                <NavLink to={`/${localStorage.getItem('cityname')}`} style={{ color: "white" }}>
                  Home
                </NavLink>
                <NavLink to={`/about/${localStorage.getItem('cityname')}`} style={{ color: "white" }}>
                  About Us
                </NavLink>

                <NavLink to={`/contact/${localStorage.getItem('cityname')}`} style={{ color: "white" }}>
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
          <div>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Help
            </p>
            <div
              className="d-flex flex-column"
              style={{ cursor: "pointer", padding: "0" }}
            >
              <a href="/" style={{ color: "white" }}>
                Support
              </a>
            </div>
          </div>
          {/* <div>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Products
            </p>
            <div
              className="d-flex flex-column"
              style={{ cursor: "pointer", padding: "0" }}
            >
              <a href="/" style={{ color: "white" }}>
                Windframe
              </a>
              <a href="/" style={{ color: "white" }}>
                Loop
              </a>
              <a href="/" style={{ color: "white" }}>
                Contrast
              </a>
            </div>
          </div> */}
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
                  <a href="#0">
                    <i className="ti-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <i className="ti-twitter-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <i className="ti-google"></i>
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <i className="ti-pinterest"></i>
                  </a>
                </li>
                <li>
                  <a href="#0">
                    <i className="ti-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="to-top"
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
  );
};

export default Foot;
