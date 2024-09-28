import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Services from "../Services/Webdevelopment/Website/Services";
import Webreviews from "../Services/Webdevelopment/Website/Webreviews";
import profile from "../../FrontEnd/img/profile.svg";
import banner2 from "../../FrontEnd/img/hero_in_restaurants_detail.jpg";
import banner3 from "../../FrontEnd/img/Thumbnail-MIM-Photo-Coming-Soon.jpg";
import { Link } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons/faL";
import Popup from "./Popup";
import Sociallink from "./Sociallink";
import "../../FrontEnd/css/Lisiting.css";
import Getquotespopup from "./Getquotespopup";
import { useSelector } from "react-redux";
import useAuthCheck from "../../Hooks/useAuthCheck";
import Listingspecialisation from "./Listingspecialisation";
import Listingpayment from "./Listingpayment";
import ListinServices from "./ListingServices";
import Listingkeyword from "./Listingkeyword";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../FrontEnd/css/RegistrationMV.css";
import CryptoJS from "crypto-js";
import Searchbar from "../Home/Component/Searchbar";
import { prefix } from "@fortawesome/free-solid-svg-icons";

function Listingdetails() {
  // const { listingId } = useParams();
  // console.log("RTEST");
  const [searchParams] = useSearchParams();
  // console.log(searchParams);

  const { listingPage, secondCategoryName } = useParams();

  // const currentPage = listingPage.split('-')[1];
  // const itemsPerPage = listingPage.split('-')[2];

  const currentPage = searchParams.get("page");
  const itemsPerPage = searchParams.get("itemperpage");

  // const secondCategoryId = useParams().listingId.split('-')[3];

  console.log("currentpage", currentPage);
  console.log("Itemperpage", itemsPerPage);

  // const secondCategoryName = encryptedListingId.split('-')[3];

  // const decryptedListingId = decrypt(listingId_enc);
  // console.log(decryptedListingId);

  // const {encryptedListingId}=useParams();
  // const listingId1=decrypt(encryptedListingId)
  // console.log(listingId1)

  const encryptionKey = "myinterriorMart@SECRETKEY";

  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
  };

  //   const decrypt = (ciphertext) => {
  //     const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  //     console.log(bytes);
  //     console.log(bytes.toString(CryptoJS.enc.Utf8));
  // const decryptstring=bytes.toString(CryptoJS.enc.Utf8);
  // const decryptint=parseInt(decryptstring);
  // console.log(typeof decryptstring)
  // console.log("string",decryptstring)
  // console.log("inttt",parseInt(decryptstring))
  //     return decryptint

  //   };

  const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    // console.log(bytes);
    // console.log(bytes.toString(CryptoJS.enc.Utf8));
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const listingId_enc = searchParams.get("listingEncyt");
  const listingId = decrypt(decodeURIComponent(listingId_enc));
  // console.log(listingId_enc);
  // console.log("listingid",listingId)
  // console.log(decrypt(listingId_enc));
  // console.log("RTEST");

  const secondcategory_enc = searchParams.get("secondCategoryId");
  const secondCategoryId = decrypt(decodeURIComponent(secondcategory_enc));
  // console.log(secondcategory_enc);
  // console.log("secondcategory",secondCategoryId)
  // console.log(decrypt(secondcategory_enc));

  // console.log(useParams().listingId.split('-'));
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
  const [isSociallinkOpen, setIsSociallinkOpen] = useState(false);

  const [showFullAddress, setShowFullAddress] = useState(false);

  const [showFullAboutus, setShowFullAboutus] = useState(false);

  const isAuthenticated = useAuthCheck();

  const [imageURL, setImageURL] = useState(null);

  const [imageDetails, setImageDetails] = useState([]);

  const [slideIndex, setSlideIndex] = useState(1);

  const [teamimageDetails, setTeamImageDetails] = useState([]);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [assemblies, setAssemblies] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [localities, setLocalities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedAssembly, setSelectedAssembly] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");

  const [status, setStatus] = useState("");

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div style={{ marginBottom: "57px" }}>
        <ul> {dots} </ul>
      </div>
    ),
  };

  // if(){
  // }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", right: "10px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", left: "10px" }}
        onClick={onClick}
      ></div>
    );
  }

  useEffect(() => {
    fetchListingDetails();
  }, [listingId]);
  // useEffect(() => {
  //   if (listingDetails) {
  //     const bookmarkStatus = listingDetails.bookmark && listingDetails.bookmark.bookmark;
  //     setIsBookmarked(bookmarkStatus);

  //     const likeStatus = listingDetails.like && listingDetails.like.likeandDislike;
  //     setIsLike(likeStatus);

  //     const subscribeStatus = listingDetails.subscribe && listingDetails.subscribe.subscribe;
  //     setIsSubscribe(subscribeStatus);
  //   }
  // }, [listingDetails]);

  const token = useSelector((state) => state.auth.token);

  const fomattedcity = localStorage.getItem("cityname");

  const fetchListingDetails = async () => {
    try {
      const response = await fetch(
        // `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing`,
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}&cityName=${fomattedcity}`,

        {
          method: "GET", // You can adjust the method if needed
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      const company = data.find(
        (listing) => listing.listingId.toString() === listingId
      );
      // console.log(data)
      // console.log("BRAVOOOOOOOOOOOOOOOOOOOOOooo ----------------", company);
      // console.log("BRAVOOOOOOOOOOOOOOOOOOOOOooo ----------------", listingId);
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId, // dynamically add companyID
          }),
        }
      );
      if (response.ok) {
        setIsBookmarked((prev) => !prev);
      } else {
        console.error("Failed to update bookmark status");
      }
      // console.log(setIsBookmarked);
    } catch (error) {
      console.error("Error in updating bookmark status", error);
    }
  };

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      if (listingDetails && listingDetails.listingId) {
        // Ensure listingDetails and listingId are available
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/Bookmark`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                companyID: listingDetails.listingId, // dynamically add companyID
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log("bookmark", data);
            setIsBookmarked(data.bookmark); // Assuming response has a field 'bookmark'
          } else {
            console.error("Failed to fetch bookmark status");
          }
        } catch (error) {
          console.error("Error in fetching bookmark status", error);
        }
      } else {
        console.warn("listingDetails or listingId is not available");
      }
    };

    fetchBookmarkStatus();
  }, [listingDetails]);

  //for like
  const handleLikeToggle = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Like/Likes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId,
          }),
        }
      );
      if (response.ok) {
        setIsLike((prev) => !prev);
      } else {
        console.error("Failed to update Like status");
      }
    } catch (error) {
      console.error("Error in updating Like status", error);
    }
  };

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (listingDetails && listingDetails.listingId) {
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/LikeDislike`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                //  listingId: listingId,
                companyID: listingDetails.listingId, // dynamically add companyID
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log("Like", data);
            setIsLike(data.likeandDislike); // Assuming response has a field bookmarkStatus
          } else {
            console.error("Failed to fetch like status");
          }
        } catch (error) {
          console.error("Error in fetching like status", error);
        }
      } else {
        console.warn("listingDetails or listingId is not available");
      }
    };

    fetchLikeStatus();
  }, [listingDetails]);

  //for subscribe
  const handleSubscribeToggle = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Subscribe/Subscribes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            //  listingId: listingId,
            companyID: listingDetails.listingId, // dynamically add companyID
          }),
        }
      );
      if (response.ok) {
        setIsSubscribe((prev) => !prev);
      } else {
        console.error("Failed to update Subscribe status");
      }
    } catch (error) {
      console.error("Error in updating Subscribe status", error);
    }
  };

  useEffect(() => {
    const fetchSubscribeStatus = async () => {
      if (listingDetails && listingDetails.listingId) {
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/BindBookmarkLikeSubscribe/Subscribes`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                companyID: listingDetails.listingId, // dynamically add companyID
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            // console.log("Subscribe", data);
            setIsSubscribe(data.subscribe); // Assuming response has a field bookmarkStatus
          } else {
            console.error("Failed to fetch subscribe status");
          }
        } catch (error) {
          console.error("Error in fetching subscribe status", error);
        }
      } else {
        console.warn("listingDetails or listingId is not available");
      }
    };

    fetchSubscribeStatus();
  }, [listingDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/Keywordshowfromstatus/GetKeywordshow",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: listingDetails.listingId,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        setStatus(data.data.status);
        console.log("Status inside fetch:", data.data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
  }, [listingDetails]);

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetBannerImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: parseInt(listingId),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setImageURL(data.imagepath); // Assuming data contains image URL and title
      } catch (error) {
        console.error(error);
      }
    };
    // if (isAuthenticated) {
    //   fetchBannerImage();
    // }
    fetchBannerImage();
  }, []);

  //address api
  const fetchStates = async (type, countryID, stateID, parentID = null) => {
    console.log(type, countryID, parentID);
    let body = {
      type,
      CountryID: countryID,
      StateID: stateID,
      CityID: setSelectedCity,
      AssemblyID: setSelectedAssembly,
      PincodeID: setSelectedPincode,
      LocalityID: setSelectedLocality,
      LocalAddress: "",
    };
    if (parentID) body.parentID = parentID;

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Address/GetAddressDropdownMaster",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const data = await response.json();
      // console.log('address array',data);

      // console.log(countryID);
      const country_detials = data["country"].filter(
        (count) => count.countryID == countryID
      );

      if (!country_detials.length) {
        console.error("Country not found");
        return [];
      }

      const states_details = country_detials[0]["states"].filter(
        (count) => count.stateID == stateID
      );

      // console.log('address array',country_detials[0].name, states_details[0].name);
      // return data.country[0]?.states || [];
      return states_details;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Fetch team image and state details
  const fetchTeamImage = async () => {
    try {
      // Fetch owner image details
      const ownerImageResponse = await fetch(
        "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetOwnerImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyID: parseInt(listingId),
          }),
        }
      );
      if (!ownerImageResponse.ok) {
        throw new Error("Failed to fetch owner image details");
      }
      const ownerImageData = await ownerImageResponse.json();
      // console.log('Owner Image Data:', ownerImageData);

      const fetchedStates = await fetchStates(
        undefined,
        ownerImageData.countryId,
        ownerImageData.stateId
      );
      // console.log('fechedstates',fetchedStates);

      const stateName =
        fetchedStates.find((state) => state.stateID === ownerImageData.stateId)
          ?.name || "State not found";

      // console.log(stateName);

      // Update team image details
      setTeamImageDetails(
        ownerImageData.imagepath.map((img) => ({
          url: img,
          prefix:ownerImageData.prefix,
          title: `${ownerImageData.ownerName} ${ownerImageData.lastName}`,
          designation: ownerImageData.designation,
          state: stateName,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTeamImage();
  }, []);

  useEffect(() => {
    const fetchGalleryImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetGalleryImage",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyID: parseInt(listingId),
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();

        if (data instanceof Object) {
          setImageDetails(
            data.imagepath.map((img) => ({ url: img, title: data.imagetitle }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchGalleryImage();
    // if (isAuthenticated) {
    //   fetchGalleryImage();
    // }
  }, [listingId]);

  const [selectedImage, setSelectedImage] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  const showSlides = (n) => {
    if (n > imageDetails.length) {
      setSlideIndex(1);
    } else if (n < 1) {
      setSlideIndex(imageDetails.length);
    } else {
      setSlideIndex(n);
    }
  };

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  //for address
  const toggleAddress = () => {
    setShowFullAddress(!showFullAddress);
  };

  //for about us
  const toggleAboutus = () => {
    setShowFullAboutus(!showFullAboutus);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here
  };

  if (!listingDetails) {
    return <p></p>; // or some other loading indicator
  }

  const fullAddress = listingDetails.fullAddress;
  const shortAddress = fullAddress.split(",").slice(0, 2).join(", ");

  return (
    <>
      <div className="sticky-searchbar">
        <Searchbar />
      </div>
      <div className="container individual-listing">
        <div className="row">
          {listingDetails ? (
            <>
              <div className="col-lg-3 individual-listing-sidebar padding-5 pagebottom">
                <div className="box_detail_cus">
                  <div className="p-3">
                    <div className="user_logo_sec">
                      {listingDetails.logoImage &&
                      listingDetails.logoImage.imagePath ? (
                        <img
                          src={`https://apidev.myinteriormart.com${listingDetails.logoImage.imagePath}`}
                          // src={listingDetails.logoImage.imagePath}
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
                    {/* <img src={profile} alt="profile"></img> */}
                    {teamimageDetails.length > 0 && (
                      <div>
                        <img
                          className="upload_images"
                          src={
                            teamimageDetails[0].url
                              ? `https://apidev.myinteriormart.com${teamimageDetails[0].url}`
                              : ""
                          }
                          alt="Owner Image"
                        />
                        <h5>{teamimageDetails[0].prefix}.{teamimageDetails[0].title}</h5>
                        <h6>{teamimageDetails[0].designation}</h6>
                        <h6>From : {teamimageDetails[0].state}</h6>
                      </div>
                    )}

                    {/* {teamimageDetails.map((image, index) => (
                      <div key={index}>
                        <img
                          className="upload_images"
                          src={
                            image.url
                              ? `https://apidev.myinteriormart.com${image.url}`
                              : ""
                          }
                          alt="Owner Image"
                        />

                      </div>
                    ))} */}
                    {/* <h6 className="cust_name">Habiba Humaza</h6>
                    <span className="cust-type">Owner</span> */}
                  </div>
                </div>
                <>
                  {status === 1 ? (
                    <Listingkeyword companyID={listingDetails.listingId} />
                  ) : (
                    <></>
                  )}
                </>
                {/* <Listingkeyword companyID={listingDetails.listingId} /> */}

                <Listingspecialisation companyID={listingDetails.listingId} />
                <Listingpayment companyID={listingDetails.listingId} />
              </div>
              <div className="col-lg-9 individual-listing-main padding-5 ">
                <div className="listing-gallery ">
                  <div className="gallery listingbanner">
                    {/* <img
                      src={banner2}
                      alt="Image2"
                      title="Image2"
                      style={{ width: "100%", height: "200px" }}
                    /> */}
                    <img
                      className="upload_imagesbanner "
                      src={
                        imageURL
                          ? `https://apidev.myinteriormart.com${imageURL}`
                          : banner2
                      }
                      alt="Banner Image"
                    />
                    {console.log("Banner", imageURL)}
                  </div>

                  <div className="gallery listinggallery">
                    {/* <img
                      src={banner2}
                      alt="Image2"
                      title="Image2"
                      style={{ width: "100%", height: "200px" }}
                    /> */}
                    {/* <Slider {...settings}>
                      {imageDetails.map((image, index) => (
                        <div
                          className="col-md-3 col-lg-2 col-6 mb-5"
                          key={index}
                        >
                          <div
                            className=""
                            style={{ width: "189px", marginLeft: "50px" }}
                          >
                            <img
                              className="upload_imagesgallery "
                              src={
                                image.url
                                  ? `https://apidev.myinteriormart.com${image.url}`
                                  : ""
                              }
                              alt="Gallery Image"
                              style={{ marginRight: "-42px" }}
                            />
                          </div>
                        </div>
                      ))}
                    </Slider> */}
                    {/* Main Image Display */}
                    <div className="main-image">
                      <img
                        src={
                          imageDetails[selectedImage]?.url
                            ? `https://apidev.myinteriormart.com${imageDetails[selectedImage].url}`
                            : ""
                        }
                        alt="Main Display"
                        className="main-image-display photogallerymain"
                      />
                    </div>

                    {/* Thumbnails Display */}
                    <div
                      className="thumbnails scrollmenu"
                      style={{
                        marginTop: "20px",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {imageDetails.map((image, index) => (
                        <div
                          key={index}
                          className="thumbnail imgScroll photogallerythumbnail"
                          onClick={() => handleThumbnailClick(index)} // Handle thumbnail click
                          style={{
                            border:
                              selectedImage === index
                                ? "2px solid gray"
                                : "2px solid transparent", // Highlight selected thumbnail
                          }}
                        >
                          <img
                            src={
                              image.url
                                ? `https://apidev.myinteriormart.com${image.url}`
                                : ""
                            }
                            alt="Thumbnail"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }} // Fit image into square box
                          />
                        </div>
                      ))}
                    </div>
                    {console.log("Banner", imageURL)}
                  </div>
                </div>
                <div className="company-listing-main">
                  <div className="listing-details">
                    <div className="col-lg-4 col-md-12 company-map padding-all-5 listingbanner">
                      <div className="pro-large-img img-zoom gallery1">
                        <div className="image-gallery">
                          {/* Main Image Display */}
                          <div className="main-image">
                            <img
                              src={
                                imageDetails[selectedImage]?.url
                                  ? `https://apidev.myinteriormart.com${imageDetails[selectedImage].url}`
                                  : ""
                              }
                              alt="Main Display"
                              className="main-image-display photogallerymain"
                            />
                          </div>

                          {/* Thumbnails Display */}
                          <div
                            className="thumbnails scrollmenu"
                            style={{
                              marginTop: "20px",
                              overflowX: "auto",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {imageDetails.map((image, index) => (
                              <div
                                key={index}
                                className="thumbnail imgScroll photogallerythumbnail"
                                onClick={() => handleThumbnailClick(index)} // Handle thumbnail click
                                style={{
                                  border:
                                    selectedImage === index
                                      ? "2px solid gray"
                                      : "2px solid transparent", // Highlight selected thumbnail
                                }}
                              >
                                <img
                                  src={
                                    image.url
                                      ? `https://apidev.myinteriormart.com${image.url}`
                                      : ""
                                  }
                                  alt="Thumbnail"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                  }} // Fit image into square box
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div className="listinggallery">
                <div className="listing-gallery">
                  <div className="gallery">
                   
                    <img
                      className="upload_imagesbanner "
                      src={
                        imageURL
                          ? `https://apidev.myinteriormart.com${imageURL}`
                          : banner2
                      }
                      alt="Banner Image"
                    />
                    {console.log("Banner", imageURL)}
                  </div>
                </div>
                    </div> */}

                    <div className="col-lg-8 col-md-12 company-details-list padding-all-5 company-addes">
                      <div className="company-addes">
                        <div className="company-details">
                          <h5 className="company-name">
                            {listingDetails.companyName}
                          </h5>
                        </div>
                        <div style={{ display: "flex" }}>
                          <span
                            className="company-category-name"
                            style={{ marginRight: "18px" }}
                          >
                            {listingDetails.listingKeyword}
                          </span>
                          <span className="company-rating companyrating">
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
                      </div>
                      <div className="col-lg-12 mim-Address">
                        <p>
                          <i
                            className="fa fa-map-marker "
                            style={{ marginRight: "8px" }}
                          ></i>
                          <span>
                            {showFullAddress
                              ? fullAddress
                              : `${shortAddress}...`}
                            <a
                              onClick={toggleAddress}
                              style={{
                                cursor: "pointer",
                                color: "orange",
                                marginLeft: "5px",
                              }}
                            >
                              {showFullAddress ? "less" : "more"}
                            </a>
                          </span>
                        </p>
                        <div style={{ display: "flex" }}>
                          <p className="listingdetailslocality">
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
                      </div>
                      <div style={{ display: "flex" }}>
                        <div className="col-lg-6 mb-1 px-0 year_gst">
                          <p className="m-0">
                            <i
                              className="fa fa-calendar"
                              style={{ marginRight: "8px" }}
                            ></i>
                            Since {listingDetails.yearOfEstablishment}
                          </p>
                        </div>
                        <div className="col-lg-6 px-0 mb-1 year_gst mt-0">
                          <p className="mb-0 noemployee">
                            <i
                              className="fa fa-users"
                              style={{ marginRight: "8px" }}
                            ></i>
                            {listingDetails.numberOfEmployees} Employees
                          </p>
                        </div>
                      </div>

                      <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0">
                          <b>Turnover :</b>
                          {listingDetails.turnover}
                        </p>
                      </div>
                      {/* <div classname="col-lg-12 mb-1 px-0 year_gst">
                        <p className="m-0">
                          <i className="fa fa-language mr-1"></i>
                        </p>
                      </div> */}
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
                      <div className="social-details desktop">
                        <button
                          className="btn btn-guotes btn-sm"
                          onClick={() => setIsPopupOpen(true)}
                          style={{ marginRight: "10px", font: "bold" }}
                        >
                          Get Quotes
                        </button>
                        <button
                          className={`btn btn-bookmark ${
                            isBookmarked ? "active" : ""
                          } ${isBookmarked ? "icon-active" : ""}`}
                          onClick={handleBookmarkToggle}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bookmark`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          Bookmark
                        </button>

                        <button
                          className="btn-custom pushRight btn btn-light btn-sm btnshare"
                          onClick={() => setIsSociallinkOpen(true)}
                          style={{ height: "32px", fontSize: "13px" }}
                        >
                          <i
                            className="fa fa-share"
                            style={{ color: "gray" }}
                          ></i>
                          Share
                        </button>

                        <button
                          className={`btn btn-like ${isLike ? "active" : ""} ${
                            isLike ? "icon-active" : ""
                          }`}
                          onClick={handleLikeToggle}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-thumbs-up`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          Like
                        </button>
                        <button
                          className={`btn btn-subscribe ${
                            isSubscribe ? "active" : ""
                          } ${isSubscribe ? "icon-active" : ""}`}
                          onClick={handleSubscribeToggle}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bell`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          Subscribe
                        </button>
                      </div>
                      <div className="social-details mobile">
                        <button
                          className={`btn btn-bookmark ${
                            isBookmarked ? "active" : ""
                          } ${isBookmarked ? "icon-active" : ""}`}
                          onClick={handleBookmarkToggle}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bookmark`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          Bookmark
                        </button>

                        <button
                          className="btn-custom pushRight btn btn-light btn-sm btnshare"
                          onClick={() => setIsSociallinkOpen(true)}
                          style={{ height: "32px", fontSize: "13px" }}
                        >
                          <i className="fa fa-share" style={{ color: "gray" }}></i>Share
                        </button>

                        <button
                          className={`btn btn-like ${isLike ? "active" : ""} ${
                            isLike ? "icon-active" : ""
                          }`}
                          onClick={handleLikeToggle}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-thumbs-up`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          Like
                        </button>
                        <button
                          className={`btn btn-subscribe ${
                            isSubscribe ? "active" : ""
                          } ${isSubscribe ? "icon-active" : ""}`}
                          onClick={handleSubscribeToggle}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bell`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          Subscribe
                        </button>
                      </div>
                      <div className="social-details mobile">
                        <button
                          className="btn btn-guotes btn-sm"
                          onClick={() => setIsPopupOpen(true)}
                          style={{ marginRight: "10px", font: "bold" }}
                        >
                          Get Quotes
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="banner-block one-block my-5 listingaboutus">
                    <div className="row px-3">
                      <div className="col-12">
                        <h3>About us</h3>
                        <p
                          className={
                            showFullAboutus ? "full-text" : "limited-text"
                          }
                          style={{ display: "inline" }}
                        >
                          {showFullAboutus
                            ? listingDetails.description
                            : `${listingDetails.description.slice(0, 300)}...`}
                        </p>

                        {/* The More/Less button */}
                        {listingDetails.description.length > 300 && (
                          <button
                            onClick={toggleAboutus}
                            style={{
                              color: "orange",
                              border: "none",
                              background: "none",
                              paddingLeft: "5px",
                              cursor: "pointer",
                              display: "inline",
                            }}
                          >
                            {showFullAboutus ? "Less" : "More"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <Webreviews companyID={listingDetails.listingId}/>
                  <div className="col-lg-4 col-md-12 company-map padding-all-5 listinggallery listingb">
                    <div
                      className="pro-large-img img-zoom gallery1"
                      style={{ marginTop: "-49px", marginBottom: "-49px" }}
                    >
                      <img
                        className="upload_imagesbanner "
                        src={
                          imageURL
                            ? `https://apidev.myinteriormart.com${imageURL}`
                            : banner2
                        }
                        alt="Banner Image"
                      />
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
      {token ? (
        <Getquotespopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      ) : (
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      )}
      <Sociallink
        isOpen={isSociallinkOpen}
        onClose={() => setIsSociallinkOpen(false)}
      />
    </>
  );
}

const BusinessHours = ({ workingtime, businessWorking }) => {
  const [IsOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getWorkingHours = (from, to, formatStartOnly = false) => {
    const fromTime = new Date(`1970-01-01T${from}Z`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (formatStartOnly) {
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

    const nextTime = nextOpenDay
      ? getWorkingHours(nextOpenDay.from, null, true)
      : null;
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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { isOpen, currentDay, nextOpenDay, nextOpenTime, nextTime } =
    getCurrentStatus();

  return (
    <div>
      <div className="current-status">
        {/* <p onClick={toggleDropdown} style={{ cursor: "pointer" }}> */}
        <p style={{ cursor: "pointer", marginBottom: "1px" }}>
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
              {/* {" "}
              Opens {nextOpenDay ? `${nextTime} at ${nextOpenDay.day}` : "soon"} */}
            </>
          )}
          {/* <i
            className={`fa ${
              isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
            style={{ marginLeft: "8px" }}
          ></i> */}
        </p>
      </div>

      {isDropdownOpen && (
        <div className="business-hours" ref={dropdownRef}>
          <ul>
            {days.map((day, index) => (
              <li
                key={index}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
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
