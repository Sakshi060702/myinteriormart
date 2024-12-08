import React from "react";
import { Link, useParams } from "react-router-dom";
import companyimg from "../../FrontEnd/img/banner/offfice.png";
import communicationimg from "../../FrontEnd/img/banner/communication.png";
import addressimg from "../../FrontEnd/img/banner/address.png";
import categoryimg from "../../FrontEnd/img/banner/category.png";
import specialisationimg from "../../FrontEnd/img/banner/specialities.png";
import workinghoursimg from "../../FrontEnd/img/banner/workin-hour.png";
import paymentmodeimg from "../../FrontEnd/img/banner/payment.png";
import uploadimg from "../../FrontEnd/img/share.png";
import sociallinkimg from "../../FrontEnd/img/banner/links.png";
import seoimg from "../../FrontEnd/img/banner/SEO.png";

import "../../FrontEnd/css/Mangelisting.css";



function Labournakapage() {
  // const {listingId} = useParams();
  return (
    <>
      <div className="tab" style={{ display: "block" }}>
        <h4>Manage Listing</h4>

        <div className="row">
          {/* First row */}
          <div className="col-12 mt-3">
            <div className="link-group">
              <Link  to={`/addcompanyl`} className="link-box">
                <div className="link-large">
                  <img
                    src={companyimg}
                    className="managelistingimg"
                    alt="Company Details"
                  />
                  Company Details
                </div>
              </Link>
              <Link  to={`/communicationl`} className="link-box">
                <div className="link-large">
                  <img
                    src={communicationimg}
                    className="managelistingimg"
                    alt="Communication"
                  />
                  Communication
                </div>
              </Link>
              <Link to={`/addressl`}  className="link-box">
                <div className="link-large">
                  <img
                    src={addressimg}
                    className="managelistingimg"
                    alt="Address"
                  />
                  Address
                </div>
              </Link>
            </div>
          </div>

          {/* Second row */}
          <div className="col-12 mt-3">
            <div className="link-group">
              <Link to={ `/Categoryapi`} className="link-box">
                {" "}
                <div className="link-large">
                  <img src={categoryimg} className="managelistingimg" />
                  Categories
                </div>
              </Link>
              <Link to={`/specialisationl`} className="link-box">
                <div className="link-large">
                  <img src={specialisationimg} className="managelistingimg" />
                  Specialisations
                </div>
              </Link>
              <Link to={`/workinghoursl`} className="link-box">
                {" "}
                 <div className="link-large">
                  <img src={workinghoursimg} className="managelistingimg" />
                  Working Hours
                </div>
              </Link>
            </div>
          </div>

          {/* Third row */}
          <div className="col-12 mt-3">
            <div className="link-group">
              <Link to={`/paymentmodel`} className="link-box">
                <div className="link-large">
                  <img src={paymentmodeimg} className="managelistingimg" />
                  Payment Modes
                </div>
              </Link>
              <Link to={`/Imagesl`} className="link-box">
                <div className="link-large">
                  <img src={uploadimg} className="managelistingimg" />
                  Upload Images
                </div>
              </Link>
              <Link to={`/Sociallinkl`} className="link-box">
                <div className="link-large">
                  <img src={sociallinkimg} className="managelistingimg" />
                  Add Social Links
                </div>
              </Link>
            </div>
          </div>

          <div className="col-12 mt-3">
            {/* <div className="link-group seolinkgroup" > */}
            <div className="link-group " >
              <Link to={`/Keywordl`} className="link-box">
                <div className="link-large">
                  <img src={seoimg} className="managelistingimg" />
                  SEO Keywords
                </div>
              </Link>
              <Link to={`/Workingarea`} className="link-box">
                <div className="link-large">
                  <img src={seoimg} className="managelistingimg" />
                  Working Area
                </div>
              </Link>
              
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
export default Labournakapage;
