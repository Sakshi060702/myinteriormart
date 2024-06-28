import React from "react";
import furnitureImage from '../../FrontEnd/img/furniture-design.jpg';
import './labournakastyle.css';
import Labournakaclientreviews from "./Labournakaclientreview";


function Labournakainfo(){
    return(
        <>
            <div className="listing-details">
            <div className="col-lg-4 col-md-12 company-map padding-all-5">
                <div className="product-large-slider">
                    <div className="pro-large-img img-zoom gallery1">
                        <a className="big">
                             <img src={furnitureImage} alt="product-details" style={{ width: '100%', height: '100%' }} />
                            
                        </a>
                    </div>
                </div>
                <div className="col-lg-12 mt-1 px-0 text-center">
                    <p className="m-0">
                        <i className="icon-info"></i>
                        Caste, &nbsp; Religion.
                    </p>
                </div>
                <div className="col-lg-12 px-0  text-center">
                    <p className="m-0"><i className="icon-address"></i> From Maharashtra.</p>
                </div>
            </div>
            <div className="col-lg-8 col-md-12 company-details-list padding-all-5">
                <div className="company-addes">
                    <div className="company-details">
                        <h5 className="company-name">Creative Concept interior contractor Pvt. Ltd.</h5>
                    </div>
                    <span className="company-category-name">Web Development</span>
                    <span className="company-rating">
                        <span>4.0</span>
                        <div className="cat_star">
                            <i className="icon_star active"></i>
                            <i className="icon_star active"></i>
                            <i className="icon_star active"></i>
                            <i className="icon_star active"></i>
                            <i className="icon_star"></i>
                        </div>
                        <span>20 Ratings</span>
                    </span>
                    <br /><br />
                    <span className="company-category-name">Age: 30</span>
                    <span className="company-category-name mx-3">Since: 2000</span>
                    <br />
                    <span><i className="icon-address"></i> Andheri West</span>
                </div>
                
                <div className="row padding-all-5" style={{ position: 'relative' }}>
            <div className="col-lg-12 mb-1 px-0">
                <p className="m-0">
                    <i className="icon-location-6"></i> Andheri West, Bhavans College, 400058, Maharashtra, India
                    <a href="#0">more...</a>
                </p>
            </div>
            <div className="col-md-7 mb-1 p-0">
                <i className="icon-mobile-1"></i> <a href="tel:1324567890" title="Call Now">1324567890</a>
                <i className="icon-mobile-1 ml-3"></i> <a href="tel:1324567890" title="Whatsapp">1324567890</a>
            </div>
            <div className="col-lg-8 col-md-8 mb-1 px-0 year_gst">
                <p className="m-0">
                    <i className="icon-info"></i> Fair, &nbsp;Height: 5.6 
                    <i className="icon-info ml-2"></i> Married, &nbsp;&nbsp; Children: 2. 
                </p>
            </div>
            <div className="col-lg-4 col-md-4 mb-1 px-0 price_sec">
                <p className="mb-0 text-dark" style={{ fontSize: '28px', fontWeight: '600' }}><i className="icon-rupee"></i>750.</p>
                <div className="form-group mb-0">
                    <select className="wide add_bottom_10 natureofbusiness" title="Payment" name="payment">
                        <option></option>
                        <option value="Per Day">Per Day</option>
                        <option value="7 Days">7 Days</option>
                        <option value="15 Days">15 Days</option>
                        <option value="30 Days">30 Days</option>
                    </select>
                </div>
            </div>
            <div className="col-lg-12 mb-1 px-0 year_gst">
                <p className="m-0">
                    <i className="icon-edit"></i> Education.
                    <i className="icon-phone" style={{ fontSize: '16px' }}></i>
                    <span>English,</span>
                    <span> Hindi,</span>
                    <span> Marathi</span>
                </p>
            </div>
            <div className="col-lg-12 mb-1 px-0 year_gst">
                <p className="m-0"><i className="icon-clock"></i> Working Time: 9:30 AM To 5:30 PM.</p>
            </div>
            <div className="col-lg-12 mb-1 px-0 year_gst">
                <p className="m-0">
                    <i className="icon-info"></i> Sunday not working,<br className="desk_hide" />
                    &nbsp; Festival not working.
                </p>
            </div>
            <div className="col-lg-12 mb-1 px-0 year_gst">
                <p className="m-0">
                    <i className="icon-info"></i> Night working: Yes,<br className="desk_hide" />
                    &nbsp; Out of city not working.
                </p>
            </div>
            <div className="col-lg-12 mb-2 px-0 year_gst">
                <p className="m-0">
                    <i className="icon-info"></i> Non-Vegetarian. <br className="desk_hide" />
                    <i className="icon-info desk_mrg"></i> Drinking, Smoking, Chewing tobacco.
                </p>
            </div>
            <div>
                <a href="#0" id="BookmarkMe" className="pushRight btn btn-light btn-sm">
                    <i className="icon-bookmark-empty"></i> Bookmark
                </a>
                <a href="#0" className="mim-marginLeft-Minus20 btn btn-light btn-sm"><i className="icon-share-2"></i> Share</a>
                <a href="#0" id="LikeMe" className="pushRight btn btn-light btn-sm">
                    <i className="icon-thumbs-up"></i> Like &nbsp;&nbsp; <span>10</span>
                </a>
                <a href="#0" id="dislike" className="pushRight btn btn-light btn-sm">
                    <i className="icon-thumbs-down"></i> Dislike &nbsp;&nbsp; <span>10</span>
                </a>
                <a href="#0" id="SubscribeMe" className="pushRight btn btn-light btn-sm">
                    <i className="icon-bell"></i> Subscribe
                </a>
            </div>
            <div class="col-lg-12 social-details mt-2">
                <a class="btn btn-guotes bg-success btn-sm text-white">Available</a>
            </div>
            <div class="col-lg-12 social-share p-0">
                <a href="#0"><i class="icon-facebook-squared-1"></i></a>
                <a href="#0"><i class="fa fa-whatsapp"></i></a>
                <a href="#0"><i class="icon-linkedin-3"></i></a>
                <a href="#0"><i class="icon-twitter-rect"></i></a>
                <a href="#0"><i class="icon-youtube-play"></i></a>
                <a href="#0"><i class="icon-instagramm"></i></a>
                <a href="#0"><i class="icon-pinterest-squared"></i></a>
            </div>
          </div>
          </div>

                            
                            

          </div>
          
        </>
    )
}
export default Labournakainfo







