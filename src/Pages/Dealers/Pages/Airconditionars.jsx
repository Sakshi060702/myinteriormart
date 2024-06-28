import React from "react";
import rightarrow from '../../../FrontEnd/img/rightarrow3.svg';
import './Dealers.css'

function Airconditionars(){
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
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Window AC</a>
                        

                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Spilt AC</a>
                        

                    </div>
                </div>

            </div>

             <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">VRF Air Conditioning </a>
                        

                    </div>
                </div>

            </div>

             <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">VRV Air Conditioning </a>
                        

                    </div>
                </div>

            </div>

             <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
                    <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Portable Air Conditioner </a>
                        

                    </div>
                </div>

            </div>

            
        </div>
        </>
    )
}
export default Airconditionars;