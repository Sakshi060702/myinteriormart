import React, { useState, useEffect,useRef } from "react";
import { useParams } from "react-router-dom";
import Services from "../Services/Webdevelopment/Website/Services";
import Webreviews from "../Services/Webdevelopment/Website/Webreviews";
import profile from "../../FrontEnd/img/profile.svg";
import banner2 from "../../FrontEnd/img/hero_in_restaurants_detail.jpg";
import banner3 from "../../FrontEnd/img/Thumbnail-MIM-Photo-Coming-Soon.jpg";
import { Link } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons/faL";
import Popup from "./Popup";
import Getquotespopup from "./Getquotespopup";
import Sociallink from "./Sociallink";
import "../../FrontEnd/css/Lisiting.css";
import { useSelector } from "react-redux";

function Listingdetailsd() {
  const { listingId } = useParams();
  const [listingDetails, setListingDetails] = useState(null);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [initialBookmarkStatus, setInitialBookmarkStatus] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [initialLikeStatus, setInitialLikeStatus] = useState(false);

  const [isSubscribe, setIsSubscribe] = useState(false);
  const [initialSubscribeStatus, setInitialSubscribeStatus] = useState(false);

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const[isSociallinkOpen,setIsSociallinkOpen]=useState(false);

  const[showFullAddress,setShowFullAddress]=useState(false);

  useEffect(() => {
    fetchListingDetails();
  }, [listingId]);

  useEffect(() => {
    if (listingDetails) {
      const bookmarkStatus = listingDetails.bookmark && listingDetails.bookmark.bookmark;
      setIsBookmarked(bookmarkStatus);

      const likeStatus = listingDetails.like && listingDetails.like.likeandDislike;
      setIsLike(likeStatus);

      const subscribeStatus = listingDetails.subscribe && listingDetails.subscribe.subscribe;
      setIsSubscribe(subscribeStatus);
    }
  }, [listingDetails]);

  const token = useSelector((state) => state.auth.token);

  const fetchListingDetails = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing`,
        {
          method: 'GET', // You can adjust the method if needed
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      const company = data.find(
        (listing) => listing.listingId.toString() === listingId
      );
      setListingDetails(company);

      //for bookmark
      // const bookmarkStatus = company.bookmark && company.bookmark.bookmark;
      // setIsBookmarked(bookmarkStatus);
      // setInitialBookmarkStatus(bookmarkStatus);

      // //for like
      // const likeStatus = company.like && company.like.likeandDislike;
      // setIsLike(likeStatus);
      // setInitialLikeStatus(likeStatus);

      // //for subscribe
      // const subscribeStatus = company.subscribe && company.subscribe.subscribe;
      // setIsSubscribe(subscribeStatus);
      // setInitialSubscribeStatus(subscribeStatus);
    } catch (error) {
      console.error("Error in fetching listing Details", error);
    }
  };

  //for bookmark
  const handleBookmarkToggle = async () => {
    console.log(isBookmarked);
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Bookmark/BookMarks`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId // dynamically add companyID
          })
        }
      );
      if (response.ok) {
        setIsBookmarked((prev) => !prev);
      
      } else {
        console.error('Failed to update bookmark status');
      }
    console.log(setIsBookmarked);
    } catch (error) {
      console.error('Error in updating bookmark status', error);
    }
  };

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
        if (listingDetails && listingDetails.listingId) { // Ensure listingDetails and listingId are available
            try {
                const response = await fetch(
                    `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/Bookmark`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            companyID: listingDetails.listingId // dynamically add companyID
                        })
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    console.log("bookmark", data);
                    setIsBookmarked(data.bookmark); // Assuming response has a field 'bookmark'
                } else {
                    console.error('Failed to fetch bookmark status');
                }
            } catch (error) {
                console.error('Error in fetching bookmark status', error);
            }
        } else {
            console.warn('listingDetails or listingId is not available');
        }
    };

    fetchBookmarkStatus();
}, [listingDetails]); 


  //for like
  const handleLikeToggle = async() => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Like/Likes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId 
          })
        }
      );
      if (response.ok) {
        setIsLike((prev) => !prev);
      } else {
        console.error('Failed to update Like status');
      }
    } catch (error) {
      console.error('Error in updating Like status', error);
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if(listingDetails && listingDetails.listingId){
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/LikeDislike`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                //  listingId: listingId,
                companyID: listingDetails.listingId // dynamically add companyID
              })
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            console.log("Like",data);
            setIsLike(data.likeandDislike); // Assuming response has a field bookmarkStatus
          } else {
            console.error('Failed to fetch like status');
          }
        } catch (error) {
          console.error('Error in fetching like status', error);
        }
  
      }
      else{
        console.warn('listingDetails or listingId is not available');
      }
          };

    fetchLikeStatus();
  }, [listingDetails]);



  //for subscribe
  const handleSubscribeToggle = async() => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Subscribe/Subscribes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId // dynamically add companyID
          })
        }
      );
      if (response.ok) {
        setIsSubscribe((prev) => !prev);
      } else {
        console.error('Failed to update Subscribe status');
      }
    } catch (error) {
      console.error('Error in updating Subscribe status', error);
    }
  };
  useEffect(() => {
    const fetchSubscribeStatus = async () => {
      if(listingDetails && listingDetails.listingId){
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/Subscribes`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                companyID: listingDetails.listingId // dynamically add companyID
            })
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            console.log("Subscribe",data);
            setIsSubscribe(data.subscribe); // Assuming response has a field bookmarkStatus
          } else {
            console.error('Failed to fetch subscribe status');
          }
        } catch (error) {
          console.error('Error in fetching subscribe status', error);
        }
  
      }
      else{
        console.warn('listingDetails or listingId is not available');
      }
          };

    fetchSubscribeStatus();
  }, [listingDetails]);



  //for address
  const toggleAddress=()=>{
    setShowFullAddress(!showFullAddress);
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

  if (!listingDetails) {
    return <p></p>; // or some other loading indicator
  }

  const fullAddress = listingDetails.fullAddress;
  const shortAddress = fullAddress.split(',').slice(0, 2).join(', ');


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
                          // src={listingDetails.logoImage.imagePath}
                          src={`https://apidev.myinteriormart.com${listingDetails.logoImage.imagePath}`}

                          alt={`${listingDetails.companyName} Logo`}
                          className="card-img-top"
                          style={{ height: "100px" }}
                        />
                      ) : (
                        <div
                          className="client_first_letter"
                          style={{
                            height: "100px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
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
                    <h6 className="cust_name">Habiba Humaza</h6>
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
                          {listingDetails.ratingAverage}.0
                          <div className="cat_star">
                            {Array(listingDetails.ratingAverage)
                              .fill()
                              .map((_, i) => (
                                <i
                                  key={i}
                                  className="icon_star active"
                                  style={{ color: "orange" }}
                                ></i>
                              ))}
                          </div>
                          {listingDetails.ratingCount} Rating
                        </span>
                      </div>
                      <div className="col-lg-12 mim-Address">
                      <p>
                      <i
                        className="fa fa-map-marker "
                        style={{ marginRight: "8px" }}
                      ></i>
                      <span>
                        {showFullAddress ? fullAddress : `${shortAddress}...`}
                        <a onClick={toggleAddress} style={{ cursor: 'pointer',color:'orange',marginLeft:'5px' }}>
                          {showFullAddress ? 'less' : 'more'}
                        </a>
                      </span>
                    </p>
                        <p>
                          <span>
                            <i
                              className="fa fa-map-o"
                              style={{ marginRight: "8px" }}
                            ></i>
                            {listingDetails.area}
                          </span>
                        </p>
                        <p>
                          <span>
                            <i
                              className="fa fa-map-signs"
                              style={{ marginRight: "8px" }}
                            ></i>
                            {listingDetails.locality}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-12 mb-1 px-0 year_gst">
                        <p className="m-0">
                          <i
                            className="fa fa-calendar"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Year of Establishment{" "}
                          {listingDetails.yearOfEstablishment}
                        </p>
                      </div>
                      <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0">
                          <i
                            className="fa fa-users"
                            style={{ marginRight: "8px" }}
                          ></i>
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
                        <i
                          className="fa fa-mobile"
                          style={{ marginRight: "8px" }}
                        ></i>
                        <Link style={{ marginRight: "8px", color: "orange" }}>
                          {listingDetails.mobile}
                        </Link>

                        <i
                          className="fa fa-whatsapp"
                          style={{ marginRight: "8px" }}
                        ></i>
                        <Link style={{ color: "orange" }}>
                          {listingDetails.whatsapp}
                        </Link>
                      </div>
                      <div
                        classname="company-time"
                        style={{ display: "flex", justifyItems: "center" }}
                      >
                        <i
                          className="fa fa-clock-o"
                          style={{ paddingTop: "5px", marginRight: "8px" }}
                        ></i>
                        <BusinessHours
                          businessWorking={listingDetails.businessWorking}
                          workingtime={listingDetails.workingtime}
                        />
                      </div>
                      <div className="social-details">
                        <button
                          className="btn btn-guotes btn-sm"
                          onClick={() => setIsPopupOpen(true)}
                          style={{ marginRight: "10px", font: "bold" }}
                        >
                          Get Quotes
                        </button>

                        <button
                        className={`btn btn-bookmark ${isBookmarked ? "active" : ""}`}
                        onClick={handleBookmarkToggle}
                      >
                        {isBookmarked ? "Unbookmark" : "Bookmark"}
                      </button>
                        <button className="btn-custom pushRight btn btn-light btn-sm"
                        onClick={() => setIsSociallinkOpen(true)}>
                          <i className="icon-share"></i>Share
                        </button>

                        <button
                        className={`btn btn-bookmark ${isLike ? "active" : ""}`}
                        onClick={handleLikeToggle}
                      >
                        {isLike ? "Dislike" : "Like"}
                      </button>

                      <button
                        className={`btn btn-bookmark ${isSubscribe ? "active" : ""}`}
                        onClick={handleSubscribeToggle}
                      >
                        {isSubscribe ? "Unsubscribe" : "Subscribe"}
                      </button>
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

                  
                  <Webreviews/>
                 
                </div>
              </div>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {token ? (
        <Getquotespopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      ) : (
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      )}
      <Sociallink isOpen={isSociallinkOpen} onClose={()=>setIsSociallinkOpen(false)}/>
    </>
  );
}

const BusinessHours = ({ workingtime, businessWorking }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef=useRef(null);


  

  const getWorkingHours = (from, to,formatStartOnly = false) => {
    const fromTime = new Date(`1970-01-01T${from}Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if(formatStartOnly){
      return fromTime;
    }
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

      const nextTime=nextOpenDay ? getWorkingHours(nextOpenDay.from,null,true) :null;
    return {
      isOpen,
      currentDay,
      nextOpenDay,
      nextOpenTime,
      nextTime,
    };
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside=(event)=>{
    if(dropdownRef.current && !dropdownRef.current.contains(event.target))
      {
        setIsDropdownOpen(false);
      }
  }

  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside);
    return()=>{
      document.removeEventListener('mousedown',handleClickOutside);
    };
  },[]);

  const { isOpen, currentDay, nextOpenDay, nextOpenTime,nextTime } = getCurrentStatus();

  return (
    <div>
      <div className="current-status">
        <p onClick={toggleDropdown} style={{ cursor: "pointer" }}>
          <span style={{ color: isOpen ? "green" : "red"  }}>
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
              {nextOpenDay ? `${nextTime} at ${nextOpenDay.day}` : "soon"}
            </>
          )}
          <i className={`fa ${isDropdownOpen ? 'fa-chevron-up' :'fa-chevron-down'}`}  style={{ marginLeft: '8px' }}></i>
        </p>
      </div>

      {isDropdownOpen && (
        <div className="business-hours" ref={dropdownRef}>
          <ul>
            {days.map((day, index) => (
              <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
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

export default Listingdetailsd;
