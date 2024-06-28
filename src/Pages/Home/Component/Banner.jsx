import React from "react";

import labourNakaImage from '../../../FrontEnd/img/labour-naka.jpeg';
import buyImage from '../../../FrontEnd/img/buy.jpeg'
import sellImage from '../../../FrontEnd/img/sell.jpeg'
import jobImage from '../../../FrontEnd/img/job.jpeg'

// import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Labournaka from "../../Tab/Labournaka";

import { NavLink } from 'react-router-dom';




function Banner(){
    return(
        <>
            
        <div className="row home_category_row py-1">
            <div className="col-md-2 col-4 cat_box">
             <NavLink to="/labor" className="home_category_link">
                    <div className="home_category_card">
                        <img src={labourNakaImage} className="home_category_img" alt="Company" />
                        <div className="home_category_name">Labour Naka</div>
                    </div>
                </NavLink>
            </div>
            <div className="col-md-2 col-4 cat_box ">
                 <NavLink to="/buy" className="home_category_link">
                    <div className="home_category_card">
                        <img src={buyImage} className="home_category_img" alt="Company"></img>
                        <div className="home_category_name">Buy</div>
                    </div>
                </NavLink>
            </div>
            <div className="col-md-2 col-4 cat_box">
                <NavLink to="/buy" className="home_category_link">
                    <div className="home_category_card">
                         <img src={sellImage} className="home_category_img" alt="Company"></img>
                        <div className="home_category_name">Sell</div>
                    </div>
                </NavLink>
            </div>
            <div className="col-md-2 col-4 cat_box">
                <a href="#" className="home_category_link">
                    <div className="home_category_card">
                         <img src={sellImage} className="home_category_img" alt="Company"></img>
                        <div className="home_category_name">Offer</div>
                    </div>
                </a>
            </div>
            <div className="col-md-2 col-4 cat_box">
                <NavLink to="/job" className="home_category_link">
                    <div className="home_category_card">
                       <img src={jobImage} className="home_category_img" alt="Company"></img>
                        <div className="home_category_name">Job</div>
                    </div>
                </NavLink>
            </div>
            <div className="col-md-2 col-4 cat_box">
                <a href="#" className="home_category_link">
                    <div className="home_category_card">
                       <img src={jobImage} className="home_category_img" alt="Company"></img>
                        <div className="home_category_name">Tender</div>
                    </div>
                </a>
            </div>
        </div>

       </>
    )
}

export default Banner;