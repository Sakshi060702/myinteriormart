import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Uploadimagel from "./Uploadimagel";
import Galleryimagel from "./Galleryimagel";
import Bannerimagel from "./Bannerimagel";
import Certificationimagel from "./Certificationimagel";
import Clientimagel from "./Clientimagel";
import Teamimagel from "./Teamimagel";
import Btngroupl from "./Btngroupl";

const buttons=[
  {title:"Logo", component:Uploadimagel},
  {title:"Team",component:Teamimagel},
  {title:"Gallery",component:Galleryimagel},
  {title:"Banner",component:Bannerimagel},
  {title:"Certifications",component:Certificationimagel},
  {title:"Our Client",component:Clientimagel}
  
]

function Imagesl() {
  const [selectedButton, setSelectedButton] = useState(0);
  const SelectedComponent = buttons[selectedButton].component;

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Upload Images</h4>
              <p className="add-lidting-title-from">
                Add Listing / Upload Images
                <span>
                  <Link className="back_btn mx-3" to="/paymentmodel">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
              <div className="col-lg-12">
            <Btngroupl
              buttons={buttons}
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
             
            />
          </div>
          <div className="col-lg-12">
            <SelectedComponent />
          </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Imagesl;
