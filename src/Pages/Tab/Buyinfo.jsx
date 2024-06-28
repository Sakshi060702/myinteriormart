import React from "react";
import Labournakaclientreviews from "./Labournakaclientreview";
import './labournakastyle.css';

function Buyinfo(){
    return(
        <>
       
                    <div className="col-lg-8 col-md-12 company-details-list padding-all-5">
                        <div className="company-addes">
                                        <div className="company-details">
                                            <h5 className="company-name">Product Name.</h5>
                                           
                              
                                        </div>
                                        <span className="company-category-name">Material: Wood</span>
                                        <span className="m-0 text-dark ml-4">Brand Name</span>
                                        <br className="desk_hide"></br>
                                       
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



                                    </div>

                                   <div className="row padding-all-5" style={{ position: 'relative' }}>

                                       <div className="col-lg-12 mb-1 px-0">
        <p className="m-0">
            <i className="icon-location-6"></i> Azad Nagar, Andheri West.
            <span style={{ float: 'right' }}>
                <a href="#">Ad Reporting</a>
            </span>
        </p>
    </div>
                                        <div className="col-lg-12 col-md-8 mb-1 px-0 year_gst">
        <p className="m-0">
            <i className="icon-info"></i> Product Condition.
            <i className="icon-info ml-2"></i> Product Age.
        </p>
    </div>
                                        <div className="col-lg-12 col-md-8 mb-1 px-0 year_gst">
        <p className="m-0">
            <i className="icon-info"></i> Warranty.
            <i className="icon-info ml-2"></i> Weight: 5kg.
        </p>
    </div>
    <div className="col-lg-12 col-md-8 mb-1 px-0 year_gst">
        <p className="m-0">
            <i className="icon-info"></i> Height: 48 inches, &nbsp;
            Length: 95 inches, <br className="desk_hide" />
            Depth: 18mm.
        </p>
    </div>
                                        <div className="col-lg-12 col-md-8 mb-1 px-0 year_gst">
        <p className="m-0">
            <i className="icon-info"></i> Store: Cold Place.
            <br className="desk_hide" />
            <i className="icon-info"></i> Washable or Not.
        </p>
    </div>
    <div className="col-lg-12 col-md-8 mb-1 px-0 year_gst">
        <p className="m-0">
            <i className="icon-info"></i> Delivery Free.
            <br className="desk_hide" />
            <i className="icon-info"></i> Installation Support.
        </p>
    </div>
                                        <div className="col-lg-12 col-md-8 mb-1 px-0 year_gst">
        <p className="m-0">
            <i className="icon-info"></i> Last: 30 Days.
            <br className="desk_hide" />
            <i className="icon-info"></i> Prize Negotiable.
        </p>
    </div>
    <div className="col-lg-12 col-md-8 mb-1 px-0 year_gst">
        <p className="m-0">
            <i className="icon-info"></i> Payment: Cash.
            <i className="icon-info ml-2"></i> <a href="#">Chat</a>.
        </p>
    </div>
                                        <div className="col-lg-3 col-md-4 mb-1 px-0 price_sec">
        <p className="mb-0 text-dark" style={{ fontSize: '28px', fontWeight: '600' }}><i className="icon-rupee"></i>750.</p>
    </div>
                                    </div>

                                    <div className="social-details">
                                       
                                        <a href="#0" id="BookmarkMe" className="pushRight btn btn-light btn-sm">
                                            <i className="icon-bookmark-empty"></i> Bookmark
                                        </a>
                                        <a href="#0" className="mim-marginLeft-Minus20 btn btn-light btn-sm"><i
                                                className="icon-share"></i> Share</a>
                                        <a href="#0" id="LikeMe" className="pushRight btn btn-light btn-sm">
                                            <i className="icon-thumbs-up"></i> Like
                                        </a>
                                        <a href="#0" id="SubscribeMe" className="pushRight btn btn-light btn-sm">
                                            <i className="icon-bell"></i> Subscribe
                                        </a>
                                    </div>

                                    <div className="col-lg-12 social-share p-0">
    <p nonce="m-0">
        Search Name
        <span style={{ float: 'right' }}>
            Post By: Vendor.
        </span>
    </p>
</div>

                    </div>

            
        </>
    )
}
export default Buyinfo;