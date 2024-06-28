import React from "react";
import rightarrow from '../../../FrontEnd/img/rightarrow3.svg';
import './Legaladvisory.css'

function Tours(){
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
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc">Travel Agent</a>
                        

                    </div>
                </div>

            </div>
            <div className="col-lg-3 col-6">
                <div className="item">
                    <span className="icon" style={{ width: 'fit-content' }}>
<img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Air Ticketing Agent</a>
                        

                    </div>
                </div>

            </div>

             <div className="col-lg-3 col-6">
                <div className="item">
                   <span className="icon" style={{ width: 'fit-content' }}>
                      <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Tour Package</a>
                        

                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                   <span className="icon" style={{ width: 'fit-content' }}>
                      <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Hotel Reservation</a>
                        

                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                   <span className="icon" style={{ width: 'fit-content' }}>
                      <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Bus Ticketing Agent</a>
                        

                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                   <span className="icon" style={{ width: 'fit-content' }}>
                      <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Cab</a>
                        

                    </div>
                </div>

            </div>

            <div className="col-lg-3 col-6">
                <div className="item">
                   <span className="icon" style={{ width: 'fit-content' }}>
                      <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Bus </a>
                        

                    </div>
                </div>

            </div>

           < div className="col-lg-3 col-6">
                <div className="item">
                   <span className="icon" style={{ width: 'fit-content' }}>
                      <img src={rightarrow} alt="rightarrow" style={{ width: '30px', height: '30px' }} />
                    </span>
                    <div className="detail">
                        <a href="/ListingResults/Advocates-Lawyers-Service/tc" >Tempo Travel</a>
                        

                    </div>
                </div>

            </div>

           

           
            
        </div>
        </>

    )
}
export default Tours;