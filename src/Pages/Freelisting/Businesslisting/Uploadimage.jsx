import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Uploadbtngroup from "./Uploadbtngroup";
import Btngroupl from "../../Managelisting/Btngroupl";
import Addlogo from "./Addlogo";
import Addgallery from "./Addgallery";
import Addteam from "./Addteam";
import Addcertification from "./Addcertification";
import Addbanner from "./Addbanner";
import Addclient from "./Addclient";
import nextarrowimg from "../../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../../FrontEnd/img/Backarrow.png";
import Uploadimagel from "../../Managelisting/Uploadimagel";


const buttons=[
  {title:"Logo", component:Addlogo},
  {title:"Owner",component:Addteam},
  {title:"Gallery",component:Addgallery},
  {title:"Banner",component:Addbanner},
  {title:"Certifications",component:Addcertification},
  {title:"Our Client",component:Addclient}
  
]

function Uploadimage() {
  const [selectedButton, setSelectedButton] = useState(0);
  const SelectedComponent = buttons[selectedButton].component;

  return (
    <>
      <div >
        <div >
          <div >
            <div >
              <h4>Upload Images</h4>
              <p className="add-lidting-title-from">
                Add Listing / Upload Images
                
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
              <div style={{display:"flex",justifyContent:"flex-start",gap:'10px'}}>                    
                      <Link to="/addpayment" ><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                    <Link to="/Addsociallink" ><img src={nextarrowimg} style={{height:'30px'}}/></Link>
                    </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Uploadimage;
