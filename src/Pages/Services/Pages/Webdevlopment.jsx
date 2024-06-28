import React from "react";
import rightarrow from '../../../FrontEnd/img/rightarrow3.svg';
import './Legaladvisory.css'
import { Link } from 'react-router-dom';
import Website from "../Webdevelopment/Website";

function Webdevelopment(){
    return(
        <>
        <div className="container margin_80_55">
            <div className="main_title_2">
                <h2>Popular Categories</h2>
            </div>
        </div>
        <div className="row justify-content-center categories-list border-box" >
            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                         <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <Link to={'/website'}>Website</Link>
                        

                    </div>
                </div>

            </div>
            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                        <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Mobile App Development</a>
                        

                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                        <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Software Development</a>
                        

                    </div>
                </div>

            </div>

            
            
        </div>
        </>

    )
}
export default Webdevelopment;