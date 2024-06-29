import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Services from "../Services/Webdevelopment/Website/Services";
import Webreviews from "../Services/Webdevelopment/Website/Webreviews";
import profile from "../../FrontEnd/img/profile.svg";
import banner2 from "../../FrontEnd/img/hero_in_restaurants_detail.jpg";
import banner3 from "../../FrontEnd/img/Thumbnail-MIM-Photo-Coming-Soon.jpg";
import { Link } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons/faL";
import Popup from "./Popup";

function Listingdetails() {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState(null);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [initialBookmarkStatus, setInitialBookmarkStatus] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [initialLikeStatus, setInitialLikeStatus] = useState(false);

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const[isPopupOpen,setIsPopupOpen]=useState(false);

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
      const likeStatus = company.like && company.like.likeandDislike;
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

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here
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
                      <button
                                className="btn btn-guotes btn-sm"
                                onClick={() => setIsPopupOpen(true)}
                              >
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

                  <div className="company-listing-tab">
                    <div className="step">
                      <ul class="nav nav-tabs" id="tab_checkout" role="tablist">
                        <li class="nav-item">
                          <a
                            className="nav-link active"
                            id="reviews-tab"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="reviews"
                            aria-selected="true"
                          >
                            Reviews
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            className="nav-link"
                            id="certificates-tab"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="certificates"
                            aria-selected="false"
                          >
                            Certificates
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            className="nav-link"
                            id="clients-tab"
                            data-toggle="tab"
                            role="tab"
                            aria-controls="clients"
                            aria-selected="false"
                          >
                            Clients
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content checkout">
                        <div
                          className="tab-pane fade show active"
                          id="reviews"
                          role="tabpanel"
                          aria-labelledby="reviews"
                        >
                          <div className="review-form mb-3">
                            <div className="d-flex justify-content-between align-items-center ">
                              <div className="Count_review">
                                {listingDetails.ratingAverage} Count Reviews, 100% genuine ratings from My
                                Interior Mart users
                              </div>
                              <span className="desk_mrg">
                                <a
                                  className="btn btn-link"
                                  onClick={() =>
                                    setIsReviewFormOpen(!isReviewFormOpen)
                                  }
                                  aria-expanded={
                                    isReviewFormOpen ? "true" : "false"
                                  }
                                  aria-controls="WriteReview"
                                  style={{ color: "orange" }}
                                >
                                  <i className="icon-pencil"></i> Write Review
                                </a>
                              </span>
                            </div>
                          </div>
                          {isReviewFormOpen && (
                            <div className="write-review-form">
                              <h6>Leave a Review</h6>
                              <form onSubmit={handleSubmit}>
                                {/* Rating stars */}
                                <div className="form-group col-md-6">
                                  <div className="stars">
                                    <i class="icon_star active"></i>
                                    <i className="icon_star active"></i>
                                    <i className="icon_star active"></i>
                                    <i className="icon_star active"></i>
                                    <i classname="icon_star"></i>
                                  </div>
                                </div>
                                <div className="form-group col-md-12">
                                  <label htmlFor="review_text">
                                    Your Review
                                  </label>
                                  <textarea
                                    name="review_text"
                                    id="review_text"
                                    className="form-control"
                                    style={{ height: "130px" }}
                                    value={reviewText}
                                    onChange={handleReviewTextChange}
                                  ></textarea>
                                </div>
                                <div className="form-group col-md-12">
                                  <input
                                    type="submit"
                                    value="Submit"
                                    className="btn_1"
                                    id="submit-review"
                                  />
                                </div>
                              </form>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 col-lg-12 review-user">
                        <div className="row">
                          <div className="col-lg-12">
                            <hr></hr>
                            <div className="row">
                              {listingDetails.reviews &&
                              listingDetails.reviews.length > 0 ? (
                                listingDetails.reviews.map((review, index) => (
                                  <div key={index} className="col-lg-12 mb-3">
                                    <div className="review-box">
                                      <div className="d-flex">
                                        <div className="col-lg-2 col-3 text-center">
                                          <div className="review_img_sec">
                                            <img
                                              src={review.userImage}
                                              alt={review.userName}
                                              style={{
                                                width: "50px",
                                                height: "50px",
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div className="col-lg-10 col-9 pl-lg-0">
                                          <div className="cat-star">
                                            {Array(review.ratings)
                                              .fill()
                                              .map((_, i) => (
                                                <i
                                                  key={i}
                                                  className="icon_star active"
                                                  style={{ color: "orange" }}
                                                ></i>
                                              ))}
                                            <span>
                                              <b>{review.userName}</b>
                                              &nbsp;-&nbsp;&nbsp;
                                              <b>{review.date}</b>
                                            </span>
                                          </div>
                                          <p>{review.comment}</p>
                                        </div>
                                      </div>
                                      {review.ratingReplyMessage && (
                                        <div className="owner_reply">
                                          <span>
                                            <strong>Reply from Owner</strong>{" "}
                                          </span>
                                          <p className="m-0">
                                            {review.ratingReplyMessage}
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                    <hr></hr>
                                  </div>
                                ))
                              ) : (
                                <div className="col-lg-12">
                                  <p>No reviews available.</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
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
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

const BusinessHours = ({ workingtime, businessWorking }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const[isDropdownOpen,setIsDropdownOpen]=useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { isOpen, currentDay, nextOpenDay, nextOpenTime } = getCurrentStatus();

  return (
    <div>
      <div className="current-status">
        <p onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <span style={{ color: isOpen ? "green" : "red" }}>
            {isOpen ? <b>Open</b> : <b>Closed Now</b>}
          </span>

          {isOpen ? (
            <>
              {" "}
              {/* (Closes at{" "}
              {new Date(`1970-01-01T${currentDay.to}Z`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              ) */}
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

{isDropdownOpen && (
 <div className="business-hours">
 
 <ul>
   {days.map((day, index) => (
     <li key={index}>
       <span>{day.day} &nbsp;&nbsp; </span>
       {day.isHoliday ? (
         <span>Holiday</span>
       ) : (
         <span>{getWorkingHours(day.from, day.to)}</span>
       )}
     </li>
   ))}
 </ul>
</div>
)}

      
    </div>
  );
};

export default Listingdetails;
