import React  from "react";
import './labournakastyle.css';
 import Homeimage from '../../FrontEnd/img/home_section_1.jpg'; 
 import Furnitureimage from '../../FrontEnd/img/furniture-design.jpg'; 

function BuyImage(){
    return(
        <>
        <div className="col-lg-3 individual-listing-sidebar padding-5">
            <div className="ad_img">
                             <img src={Homeimage} alt="Home" />
                        </div>
                        <div className="ad_img mt-3">
                             <img src={Furnitureimage} alt="Furniture" />
                        </div>

        </div>
        </>
    )
}
export default BuyImage;