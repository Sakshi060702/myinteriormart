import React from "react";
import Services from "./Services";
import Webreviews from "./Webreviews";
import profile from '../../../../FrontEnd/img/profile.svg'
import banner from '../../../../FrontEnd/img/furniture-design.jpg'
import banner2 from '../../../../FrontEnd/img/access_bg.jpg'
import banner3 from '../../../../FrontEnd/img/Thumbnail-MIM-Photo-Coming-Soon.jpg'



function CreativeconeptDetails(){
    return(
        <>
        <div className="container individual-listing">
        <div className="row">
            <div className="col-lg-3 individual-listing-sidebar padding-5">
                <div className="box_detail_cus">
                    <div className="p-3">
                        <div className="user_logo_sec">
                            <img src={banner} className="user_log_img"/>
                        </div>
                    </div>
                </div>
                <div className="box_detail_cus">
                    <div className="cust-profile">
                        <img src={profile} alt="profile"></img>
                        <h6 className="cust_name">Shafi Shekh</h6>
                        <span className="cust-type">Owner</span>
                    </div>
                </div>
                <Services></Services>
                


            </div>
            <div className="col-lg-9 individual-listing-main padding-5">
                    <div className="listing-gallery">
                        <div className="gallery">
                            <a>
                                <img src={banner2} alt="Image2" title="Image 2" style={{width:'100%'}}/> </a>
                        </div>
                    </div>
                    <div className="company-listing-main">
                        <div className="listing-details">
                            <div className="col-lg-4 col-md-12 company-map padding-all-5">
                                <div className="pro-large-img img-zoom gallery1">
                                     <img src={banner3} alt="ImageComingSoon" style={{ width: '100%' }} />
    
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12 company-details-list padding-all-5">
                                <div className="company-addes">
                                    <div className="company-details">
                                        <h5 class="company-name">Creative Concept Pvt. Ltd.</h5>

                                    </div>
                                    <span className="company-category-name"></span>
                                    <span className="company-rating">4.0
                                    <div className="cat_star">
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                                <i className="icon_star active"></i>
                                            </div>
                                            2 Rating
                                    </span>
                                </div>
                                <div className="col-lg-12 mim-Address">
                                    <p>
                                        <i className="fa fa-map-marker"></i>
                                        <span>
                                            Andheri West
                                            Mumbai
                                            Maharashtra
                                            India

                                        </span>
                                        <a>More...</a>
                                    </p>
                                    <p>
                                        <span>
                                            <i className="fa fa-map-o"></i>
                                            Bhavnas College
                                        </span>
                                    </p>
                                    <p>
                                        <span>
                                            <i className="fa fa-map-signs"></i>
                                            Andheri West
                                        </span>
                                    </p>

                                </div>
                                <div className="col-lg-12 mb-1 px-0 year_gst">
                                    <p className="m-0"><i className="fa fa-calender"></i>
                                        
                                        Year of Establishment 2014
                                    </p>

                                </div>
                                <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                                     <p className="mb-0">
                                         <i className="fa fa-users"></i> 50 Employees
                                    </p>
                                </div>
                                <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                                    <p className="mb-0">
                                        <b>Turnover :</b>
                                        Upto 5 lacs
                                    </p>

                                </div>
                                <div classname="col-lg-12 mb-1 px-0 year_gst">
                                    <p className="m-0">
                                        <i className="fa fa-language mr-1"></i>
                                    </p>

                                </div>
                                <div classname="col-lg-12 mb-1 p-0">
                                    <i className="fa fa-mobile"></i>
                                    <a title="Call Now" className="callstyle">8948342255</a>

                                    <i className="fa fa-whatsapp"></i>
                                    <a title="Whatsapp">8948342255</a>
                                </div>
                                <div classname="company-time">
                                    {/* <a className="company-time-title btn btn-link collapsed" >Company Time</a> */}
                                    <i className="fa fa-clock-o"></i>
                                    <span>
                                        <b style={{color:'green'}}>Open</b>
                                    </span>
                                </div>
                                <div className="social-details">
                                    <button className="btn btn-guotes btn-sm">Get Quotes</button>
                                    <button id="BookmarkMe" className="pushRight btn btn-light btn-sm">
                                        <i className="fa fa-bookmark-o"></i>Bookmark
                                    </button>
                                    <a className="mim-marginLeft-Minus20 btn btn-light btn-sm">
                                        <i className="icon-share"></i>Share
                                    </a>
                                    <button id="LikeMe" className="pushRight btn btn-light btn-sm ml-1">
                                        <i className="fa fa-thumbs-o-up"></i> Like
                                    </button>
                                    <button id="SubscribeMe" classname="pushRight btn btn-light btn-sm ml-1">
                                        <i className="fa fa-bell-o"></i>Subscribe
                                    </button>

                                </div>

                            </div>
                        </div>
                        <div className="banner-block one-block my-5">
                            <div classname="row px-3">
                                <div className="col-12">
                                    <h3>About Us</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus minima modi hic distinctio asperiores similique ea corporis? Voluptatum adipisci voluptatem repellat cumque quod blanditiis quibusdam, explicabo minima, tenetur, ea magnam?</p>
                                </div>
                            </div>
                        </div>
                      <Webreviews/>
                    </div>


                </div>
        </div>
        </div>
        </>
        
    )
}

export default CreativeconeptDetails