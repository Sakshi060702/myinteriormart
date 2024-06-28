import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Services from "../Services/Webdevelopment/Website/Services";
import profile from "../../FrontEnd/img/profile.svg";
import banner2 from "../../FrontEnd/img/hero_in_restaurants_detail.jpg";
import banner3 from "../../FrontEnd/img/Thumbnail-MIM-Photo-Coming-Soon.jpg";
import { Link } from "react-router-dom";

function Listingdetails() {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState(null);

  useEffect(() => {
    fetchListingDetails();
  }, [listingId]);

  const fetchListingDetails = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing`
      );
      const data = await response.json();
      const company = data.find(
        (listing) => listing.listingId.toString() === listingId
      );
      setListingDetails(company);
    } catch (error) {
      console.error("Error in fetching listing Details", error);
    }
  };

  return (
    <>
      <div className="container individual-listing">
        <div className="row">
          {listingDetails ? (
            <>
              <div className="col-lg-3 individual-listing-sidebar padding-5">
                <div className="box_detail_cus">
                  <div className="p-3">
                    <div className="user_logo_sec">
                      {listingDetails.logoImage &&
                      listingDetails.logoImage.imagePath ? (
                        <img
                          src={listingDetails.logoImage.imagePath}
                          alt={`${listingDetails.companyName} Logo`}
                          className="card-img-top"
                          style={{ height: "100px" }}
                        />
                      ) : (
                        <div
                          className="client_first_letter"
                          style={{ height: "100px" }}
                        >
                          {listingDetails.companyFirstLetter}
                        </div>
                      )}
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
                    <img
                      src={banner2}
                      alt="Image2"
                      title="Image2"
                      style={{ width: "100%", height: "200px" }}
                    />
                  </div>
                </div>
                <div className="company-listing-main">
                  <div className="listing-details">
                    <div className="col-lg-4 col-md-12 company-map padding-all-5">
                      <div className="pro-large-img img-zoom gallery1">
                        <img
                          src={banner3}
                          alt="ImageComingSoon"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    <div className="col-lg-8 col-md-12 company-details-list padding-all-5">
                      <div className="company-addes">
                        <div className="company-details">
                          <h5 className="company-name">
                            {listingDetails.companyName}
                          </h5>
                        </div>
                        <span className="company-category-name"></span>
                        <span className="company-rating">
                          5.0
                          <div className="cat_star">
                            <i className="icon_star active"></i>
                            <i className="icon_star active"></i>
                            <i className="icon_star active"></i>
                            <i className="icon_star active"></i>
                            <i className="icon_star active"></i>
                          </div>
                          {listingDetails.ratingCount} Rating
                        </span>
                      </div>
                      <div className="col-lg-12 mim-Address">
                        <p>
                          <i className="fa fa-map-marker"></i>
                          <span>{listingDetails.fullAddress}</span>
                        </p>
                        <p>
                          <span>
                            <i className="fa fa-map-o"></i>
                            {listingDetails.area}
                          </span>
                        </p>
                        <p>
                          <span>
                            <i className="fa fa-map-signs"></i>
                            {listingDetails.locality}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-12 mb-1 px-0 year_gst">
                        <p className="m-0">
                          <i className="fa fa-calendar"></i>
                          Year of Establishment{" "}
                          {listingDetails.yearOfEstablishment}
                        </p>
                      </div>
                      <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0">
                          <i className="fa fa-users"></i>
                          {listingDetails.numberOfEmployees} Employees
                        </p>
                      </div>
                      <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0">
                          <b>Turnover :</b>
                          {listingDetails.turnover}
                        </p>
                      </div>
                      <div classname="col-lg-12 mb-1 px-0 year_gst">
                        <p className="m-0">
                          <i className="fa fa-language mr-1"></i>
                        </p>
                      </div>
                      <div classname="col-lg-12 mb-1 p-0">
                        <i className="fa fa-mobile"></i>
                        <Link>{listingDetails.mobile}</Link>

                        <i className="fa fa-whatsapp"></i>
                        <Link>{listingDetails.whatsapp}</Link>
                      </div>
                      <div classname="company-time">
                        <BusinessHours
                        businessWorking={listingDetails.businessWorking}/>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="container">
        {listingDetails ? (
          <div>
            <h2>{listingDetails.companyName}</h2>
            <p>{listingDetails.fullAddress}</p>
            <p>Turnover: {listingDetails.turnover}</p>
            <p>Year of Establishment: {listingDetails.yearOfEstablishment}</p>
            <p>Number of Employees: {listingDetails.numberOfEmployees}</p>
            <p>Mobile: {listingDetails.mobile}</p>
            <p>WhatsApp: {listingDetails.whatsapp}</p>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    </>
  );
}

const BusinessHours=({businessWorking})=>{
    const{isBusinessOpen, isBusinessOpenText, closeTime}=businessWorking;

    return (
      <p>
        {" "}
        <i className="fa fa-clock-o"></i> :
        <span style={{ color: isBusinessOpen ? "green" : "red" }}>
          {isBusinessOpenText}
          {isBusinessOpen && `until ${closeTime}`}
        </span>
      </p>
    );
}

export default Listingdetails;
