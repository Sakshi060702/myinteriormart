import React from "react";
import BuyImage from "./BuyImage";
import Buyinfo from "./Buyinfo";
import './labournakastyle.css';
import Buyimageslider from "./Buyimageslider";
import Buyrightsection from "./Buyrightsection";

function Buy(){
    return (
        <>
        <main id="buy">
            <div className="container individual-listing">
                <div className="row">
                    <BuyImage/>
                   <Buyrightsection/>
                   

                </div>
            </div>
        </main>
        </>
    )
}
export default Buy;