import React from "react";
import Buyimageslider from "./Buyimageslider";

import './labournakastyle.css';
import Buyinfo from "./Buyinfo";
import BuyAbout from "./BuyAbout";
import Labournakaclientreviews from "./Labournakaclientreview";

function Buyrightsection(){
    return(
        <>
        <div className="col-lg-9 individual-listing-main padding-5">
            <div className="company-listing-main">
                <div className="listing-details">
                    <Buyimageslider/>
                    <Buyinfo/>
                </div>
                <BuyAbout/>
                <Labournakaclientreviews/>
            </div>
        </div>
        </>
    )
}
export default Buyrightsection;