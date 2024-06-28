import React from "react";
import banner from '../../../FrontEnd/img/banner/banner2.png'
import user from "../../../FrontEnd/img/Asset.png"
import './Website.css'
import { NavLink } from 'react-router-dom';
import CreativeconeptDetails from "./Website/CreativeconceptDetails";

function Website(){
    return(
        <>
        <div className="container" style={{ marginBottom: '30px' }}>
            <div className="banner-block one-block" style={{ marginBottom: '30px' }}>
                <div className="row">
                    <div className="cols-12">
                        <div className="grid-item">
                            <img src={banner} alt="Banner" style={{height:'350px',width:'1200px'}}></img>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listing-list">
                <div className="row">
                    <div className="col-lg-12 mb-space-remove">
                        <div className="strip map_view">
                            <div className="row no-gutters">
                                <div className="col-3">
                                    <figure>
                                        <div className="client_first_letter">U</div>
                                    </figure>
                                </div>
                                <div className="col-9">
                                    <div className="wrapper">
                                        <h3>
                                            <NavLink to='/creativeconceptdetails'>Umarzone India Limited</NavLink>
                                        </h3>
                                        <small>
                                            "Web Development"
                                            <span className="mob_reating">
                                                "4.0"
                                                <i className="icon_star active"></i>
                                            </span>
                                        </small>
                                        <p>
                                            <a className="Address">Andheri West,Azad nagar</a>
                                        </p>
                                        <p className="loc-time">
                                            <i className="fa fa-clock"></i>
                                            <b>Open</b>
                                            <span>until 6pm</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-12 listing-bottom">
                                    <ul className="listing-bottom-list">
                                        <li className="business-year">
                                            <h4>
                                                +
                                                10
                                                year
                                                Business
                                            </h4>
                                        </li>
                                        <li>
                                            <a className="callnow">Call now</a>
                                        </li>
                                        <li>
                                            <button className="btn btn-guotes btn-sm">Get Quotes</button>
                                        </li>
                                        <li>
                                            <ul className="reating-list">
                                                <li>
                                                    <h4 className="reating-number">4.0</h4>

                                                </li>
                                            </ul>
                                        </li>
                                        <li className="reating-star">
                                            <div className="cat_star">
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                            </div>
                                        </li>
                                        <li className="reating-people">
                                            <p>
                                                1 
                                                Rating
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="strip map_view">
                            <div className="row no-gutters">
                                <div className="col-3">
                                    <figure>
                                        <div className="client_first_letter">U</div>
                                    </figure>
                                </div>
                                <div className="col-9">
                                    <div className="wrapper">
                                        <h3>
                                            <a href="/Listing/Mumbai/Umarzone-India-Andheri West/7BB0FEDE-3542-4879-90ED-4630836157E5">Creative Concept Private Limited</a>
                                        </h3>
                                        <small>
                                            "Web Development"
                                            <span className="mob_reating">
                                                "4.0"
                                                <i className="icon_star active"></i>
                                            </span>
                                        </small>
                                        <p>
                                            <a className="Address">Andheri West,Bhavnas Collage</a>
                                        </p>
                                        <p className="loc-time">
                                            <i className="fa fa-clock"></i>
                                            <b>Open</b>
                                            <span>until 6pm</span>
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-12 listing-bottom">
                                    <ul className="listing-bottom-list">
                                        <li className="business-year">
                                            <h4>
                                                + 
                                                1
                                                year
                                                Business
                                            </h4>
                                        </li>
                                        <li>
                                            <a className="callnow">Call now</a>
                                        </li>
                                        <li>
                                            <button className="btn btn-guotes btn-sm">Get Quotes</button>
                                        </li>
                                        <li>
                                            <ul className="reating-list">
                                                <li>
                                                    <h4 className="reating-number">4.0</h4>

                                                </li>
                                            </ul>
                                        </li>
                                        <li className="reating-star">
                                            <div className="cat_star">
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                            </div>
                                        </li>
                                        <li className="reating-people">
                                            <p>
                                                1
                                                Rating
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default Website;