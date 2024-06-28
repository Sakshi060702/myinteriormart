import React from "react";
import rightarrow from '../../../FrontEnd/img/rightarrow3.svg';
import './Contractor.css'

function Cleaning(){
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
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Debris Removal</a>
                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Waste Disposal</a>
                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Drainage Cleaning</a>
                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Road Cleaning</a>
                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Water Tank Cleaning</a>
                    </div>
                </div>

            </div>

           

           
          
          
            
        </div>
        </>
    )
}
export default Cleaning;