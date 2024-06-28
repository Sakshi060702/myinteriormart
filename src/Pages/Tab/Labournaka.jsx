import React from "react";

import Labournakaservices from "./Labournakaservices";
import './labournakastyle.css';
import Labournakainfo from "./Labournakainfo";
import LabourAbout from "./LabourAbout";
import Labournakareviews from "./Labournakareviews";


function Labournaka(){
    return(
        <>
       
     
        <main id="labour_naka">
            <div className="container individual-listing">
                <div className="row">
               
                <Labournakaservices></Labournakaservices>
               <div className="col-lg-9 individual-listing-main padding-5">
                <div className="company-listing-main">
                    <Labournakainfo></Labournakainfo>
                    <LabourAbout></LabourAbout>
                    {/* <Labournakaclientreviews></Labournakaclientreviews> */}
                    <Labournakareviews/>
                </div>
               </div>
              
                </div>
            </div>
        </main>
      

        </>
    )
}
export default Labournaka;
