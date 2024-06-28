import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Services from "../Services/Webdevelopment/Website/Services";
import BookmarkButton from "./Bookmark";
import profile from "../../FrontEnd/img/profile.svg";
import banner2 from "../../FrontEnd/img/hero_in_restaurants_detail.jpg";
import banner3 from "../../FrontEnd/img/Thumbnail-MIM-Photo-Coming-Soon.jpg";
import { Link } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons/faL";

function Listingdetails() {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); 
  const [initialBookmarkStatus, setInitialBookmarkStatus] = useState(false); 
  const[isLike,setIsLike]=useState(false);
  const [initialLikeStatus, setInitialLikeStatus] = useState(false);

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

      //for bookmark
       const bookmarkStatus = company.bookmark && company.bookmark.bookmark;
       setIsBookmarked(bookmarkStatus);
       setInitialBookmarkStatus(bookmarkStatus);

       //for like
       const likeStatus = company.like && company.like.like;
       setIsLike(likeStatus);
       setInitialLikeStatus(likeStatus);


    } catch (error) {
      console.error("Error in fetching listing Details", error);
    }
  };

  //for bookmark
  const handleBookmarkToggle = () => {
     setIsBookmarked((prev) => !prev);
  };

  //for like
  const handleLikeToggle = () => {
    setIsLike((prev) => !prev);
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
                          businessWorking={listingDetails.businessWorking}
                          workingtime={listingDetails.workingtime}
                        />
                      </div>
                      <div className="social-details">
                        <button className="btn btn-guotes btn-sm">
                          Get Quotes
                        </button>

                        <button
                          id="SubscribeMe"
                          classname="pushRight btn btn-light btn-sm ml-1"
                        >
                          <i className="fa fa-bell-o"></i>Subscribe
                        </button>

                        <button
                          id="BookmarkMe"
                          className="pushRight btn btn-light btn-sm"
                          style={{
                            backgroundColor: "transparent",
                            color: "Black",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={handleBookmarkToggle}
                        >
                          <i
                            className={
                              isBookmarked ? "fa fa-bookmark" : "fa fa-bookmark"
                            }
                            style={{
                              color: initialBookmarkStatus ? "red" : "green",
                            }}
                          ></i>{" "}
                          Bookmark
                        </button>
                        <a className="mim-marginLeft-Minus20 btn btn-light btn-sm">
                          <i className="icon-share"></i>Share
                        </a>

                        {/* <button
                          id="LikeMe"
                          className="pushRight btn btn-light btn-sm ml-1"
                          style={{
                            backgroundColor: "transparent",
                            color: "Black",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={handleLikeToggle}
                        >
                          <i
                            className={
                              isLike ? "fa fa-thumbs-up" : "fa fa-thumbs-up"
                            }
                            style={{
                              color: initialLikeStatus ? "green" : "red",
                            }}
                          ></i>{" "}
                          Like
                        </button> */}
                      </div>
                    </div>
                  </div>
                  <div className="banner-block one-block my-5">
                    <div className="row px-3">
                      <div className="col-12">
                        <h3>About us</h3>
                        <p>{listingDetails.description}</p>
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
      
    </>
  );
}

const BusinessHours = ({ workingtime, businessWorking }) => {

  const[IsOpen,setIsOpen]=useState(false);

  const getWorkingHours = (from, to) => {
    const fromTime = new Date(`1970-01-01T${from}Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const toTime = new Date(`1970-01-01T${to}Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${fromTime} - ${toTime}`;
  };

  const days = [
    { day: "Monday", from: workingtime.mondayFrom, to: workingtime.mondayTo },
    {
      day: "Tuesday",
      from: workingtime.tuesdayFrom,
      to: workingtime.tuesdayTo,
    },
    {
      day: "Wednesday",
      from: workingtime.wednesdayFrom,
      to: workingtime.wednesdayTo,
    },
    {
      day: "Thursday",
      from: workingtime.thursdayFrom,
      to: workingtime.thursdayTo,
    },
    { day: "Friday", from: workingtime.fridayFrom, to: workingtime.fridayTo },
    {
      day: "Saturday",
      from: workingtime.saturdayFrom,
      to: workingtime.saturdayTo,
      isHoliday: workingtime.saturdayHoliday,
    },
    {
      day: "Sunday",
      from: workingtime.sundayFrom,
      to: workingtime.sundayTo,
      isHoliday: workingtime.sundayHoliday,
    },
  ];

  const getCurrentStatus = () => {
    const now = new Date();
    const dayIndex = now.getDay(); // 0 is Sunday, 6 is Saturday
    const currentDay = days[dayIndex];
    const currentTime = now.toTimeString().split(" ")[0];

    const isOpen =
      currentTime >= currentDay.from && currentTime <= currentDay.to;

    let nextOpenDay;
    for (let i = 0; i <= 7; i++) {
      const nextIndex = (dayIndex + i) % 7;
      const nextDay = days[nextIndex];
      if (!nextDay.isHoliday) {
        nextOpenDay = nextDay;
        break;
      }
    }

    const nextOpenTime = nextOpenDay
      ? getWorkingHours(nextOpenDay.from, nextOpenDay.to)
      : null;

    return {
      isOpen,
      currentDay,
      nextOpenDay,
      nextOpenTime,
    };
  };

  const toggelDropdown=()=>{
    setIsOpen(!IsOpen);
  }

  const { isOpen, currentDay, nextOpenDay, nextOpenTime } = getCurrentStatus();

  return (
    <div>
      <div className="current-status">
        <p>
          <span style={{ color: isOpen ? "green" : "red" }}>
            {isOpen ? "Open" : "Closed"}
          </span>

          {isOpen ? (
            <>
              {" "}
              (Closes at{" "}
              {new Date(`1970-01-01T${currentDay.to}Z`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              )
            </>
          ) : (
            <>
              {" "}
              Opens{" "}
              {nextOpenDay ? `${nextOpenDay.day} at ${nextOpenTime}` : "soon"}
            </>
          )}
        </p>
        
      </div>
      <div className="business-hours">
        <p>Business Hours:</p>
        <ul>
          {days.map((day, index) => (
            <li key={index}>
              <span>{day.day}:</span>
              {day.isHoliday ? (
                <span>Holiday</span>
              ) : (
                <span>{getWorkingHours(day.from, day.to)}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Listingdetails;
