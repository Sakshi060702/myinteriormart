import React from "react";
import Labournakaservices from "./Labournakaservices";
import Jobinfo from "./Jobinfo";
import LabourAbout from "./LabourAbout";
import Labournakaclientreviews from "./Labournakaclientreview";


function Job(){
    return(
        <>
         <main id="labour_naka">
            <div className="container individual-listing">
                <div className="row">
                    <Labournakaservices/>
                    <div className="col-lg-9 individual-listing-main padding-5">
                       <div className="company-listing-main">
                        <Jobinfo/>
                        <LabourAbout/>
                        <Labournakaclientreviews/>
                        

                        </div>
                    </div>

                </div>
            </div>
        </main>
        </>
    )
}
export default Job;