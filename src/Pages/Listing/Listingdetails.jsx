import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams, useNavigate,useLocation } from "react-router-dom";
import Services from "../Services/Webdevelopment/Website/Services";
import Webreviews from "../Services/Webdevelopment/Website/Webreviews";
import profile from "../../FrontEnd/img/profile.svg";
import banner2 from "../../FrontEnd/img/Bimg.png";
import banner3 from "../../FrontEnd/img/Thumbnail-MIM-Photo-Coming-Soon.jpg";
import gallerydummy from "../../FrontEnd/img/Gimg.png";
import { Link } from "react-router-dom";
import { faL } from "@fortawesome/free-solid-svg-icons/faL";
import Popup from "./Popup";
import Sociallink from "./Sociallink";
import Sharelink from "./Sharelink";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Helmet } from "react-helmet";

function Listingdetails() {
  // const { listingId } = useParams();
  // console.log("RTEST");

  const [searchParams] = useSearchParams();
  const location=useLocation();
  // console.log(searchParams);

  const { listingPage, secondCategoryName } = useParams();

  // const currentPage = listingPage.split('-')[1];
  // const itemsPerPage = listingPage.split('-')[2];

  const currentPage = searchParams.get("page");
  const itemsPerPage = searchParams.get("itemperpage");

  // const secondCategoryId = useParams().listingId.split('-')[3];

  // console.log("currentpage", currentPage);
  // console.log("Itemperpage", itemsPerPage);

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

  const [isBookmarkPopupOpen, setIsBookmarkPopupOpen] = useState(false);

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

  const [isWebsiteClicked, setIsWebsiteClicked] = useState(false);

  const [socialLink, setSocialLink] = useState("");

  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed in milliseconds
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // appendDots: (dots) => (
    //   <div style={{ marginBottom: "57px" }}>
    //     <ul> {dots} </ul>
    //   </div>
    // ),
  };

  // if(){
  // }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 1,
          background: "gainsboro",
          top: "60px",
          right: "29px",
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          zIndex: 1,
          background: "gainsboro",
          top: "60px",
          left: "29px",
        }}
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

  //view source
  // useEffect(() => {
  //   if (listingDetails) {
  //     document.title = `${listingDetails.companyName} | Justdial Clone`;

  //     // Set meta description
  //     let metaDescription = document.querySelector("meta[name='description']");
  //     if (metaDescription) {
  //       metaDescription.setAttribute("content", listingDetails.aboutUs || "");
  //     } else {
  //       // Create meta tag if it doesn't exist
  //       metaDescription = document.createElement("meta");
  //       metaDescription.setAttribute("name", "description");
  //       metaDescription.setAttribute("content", listingDetails.aboutUs || "");
  //       document.head.appendChild(metaDescription);
  //     }
  //   }
  // }, [listingDetails]);

  // useEffect(() => {
  //   if (listingDetails) {
  //     document.title = `${listingDetails.companyName} | Justdial Clone`;

  //     // Update meta tag with name="Title" if needed
  //     let metaTitle = document.querySelector("meta[name='Title']");
  //     if (metaTitle) {
  //       metaTitle.setAttribute("content", `${listingDetails.companyName} | Justdial Clone`);
  //     }
  //   }
  // }, [listingDetails]);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

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

  const handleBookmarkClick = () => {
    if (!token) {
      setIsBookmarkPopupOpen(true);
      console.log("hello");
    } else {
      handleBookmarkToggle();
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

  const handleLikeClick = () => {
    if (!token) {
      setIsBookmarkPopupOpen(true);
      // console.log("hello");
    } else {
      handleLikeToggle();
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

  const handleSubscribeClick = () => {
    if (!token) {
      setIsBookmarkPopupOpen(true);
      // console.log("hello");
    } else {
      handleSubscribeToggle();
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
        "https://apidev.myinteriormart.com/api/FetchAddressMaster/FetchAddressDropdownMaster",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const data = await response.json();
      console.log("address array", data);

      console.log("stateid", countryID);
      console.log("countryid", stateID);
      const country_detials = data["countries"].filter(
        (count) => count.countryID == countryID
      );
      // console.log('country',country_detials);

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
      console.log("Owner Image Data:", ownerImageData);

      const fetchedStates = await fetchStates(
        undefined,
        ownerImageData.countryId,
        ownerImageData.stateId
      );
      console.log("fechedstates", fetchedStates);

      const stateName =
        fetchedStates.find((state) => state.stateID === ownerImageData.stateId)
          ?.name || "State not found";

      // console.log(stateName);

      // Update team image details
      setTeamImageDetails(
        ownerImageData.imagepath.map((img, index) => ({
          url: img,
          prefix: ownerImageData.prefix[index],
          title: `${ownerImageData.ownerName[index] || "no name"} ${
            ownerImageData.lastName[index]
          }`,
          designation: ownerImageData.designation[index] || "no name",
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

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetSocialLinkDetails",
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
        console.log(data);
        setSocialLink(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSocialLinks();
    // if (isAuthenticated) {
    //   fetchGalleryImage();
    // }
  }, [listingId]);

  const [selectedImage, setSelectedImage] = useState(0);

  const swiperRef = React.useRef(null);
  const thumbnailsContainerRef = useRef(null);
  const activeThumbnailRef = useRef(null);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index); // Slide to the clicked thumbnail's image
    }
    
  };

  const handleSlideChange = (swiper) => {
    setSelectedImage(swiper.activeIndex);
    scrollThumbnailsToView(swiper.activeIndex);
  };

  // const handleSlideChangeimage = (swiper) => {
  //   const index = swiper.activeIndex;
  //   setSelectedImage(index);

  //   // Automatically scroll the thumbnails container to center the active thumbnail
  //   const thumbnail = thumbnailsContainerRef.current.children[index];
  //   const container = thumbnailsContainerRef.current;

  //   if (thumbnail && container) {
  //     const containerWidth = container.offsetWidth;
  //     const thumbnailWidth = thumbnail.offsetWidth;
  //     const thumbnailOffset = thumbnail.offsetLeft;

  //     // Center the active thumbnail within the container
  //     container.scrollLeft =
  //       thumbnailOffset - (containerWidth - thumbnailWidth) / 2;
  //   }
  // };
  const handleSlideChangeImg = (swiper) => {
    const activeIndex = swiper.activeIndex;
    setSelectedImage(activeIndex);

    //  scrollThumbnailsToView(activeIndex);

    // Scroll the active thumbnail into view on slide change
    
    if (thumbnailsContainerRef.current && activeThumbnailRef.current) {
      activeThumbnailRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const scrollThumbnailsToView = (index) => {
    const thumbnailWidth = 100; // approximate width of a thumbnail (adjust based on your CSS)
    const container = thumbnailsContainerRef.current;
    if (container) {
      const scrollPosition =
        index * thumbnailWidth - container.clientWidth / 2 + thumbnailWidth / 2;
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
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

  const [modalOpen, setModalOpen] = useState(false);
  // const[selectedImage,setSelectedImage]=useState(null);

  const openModel = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModel = () => {
    setSelectedImage(null);
    setModalOpen(false);
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

  const ClaimForgetpassword = `/ForgetpasswordClaim/in-${localStorage.getItem(
    "cityname"
  )}`;

  const Getclaimhandleclick = () => {
    navigate(ClaimForgetpassword,{
      state:{mobile:listingDetails.mobile,
        email:listingDetails.email
      },
    });
  };




  return (
    <>
      <Helmet>
        <title>{`${listingDetails.companyName} | Myinteriormart`}</title>
        <meta
          name="title"
          content={`${listingDetails.companyName} | Myinteriormart`}
        />
      </Helmet>
      <div className="sticky-searchbar">
        <Searchbar />
      </div>
      <div className="container individual-listing">
        <div className="row">
          {listingDetails ? (
            <>
              <div className="col-lg-3 individual-listing-sidebar padding-5 pagebottom">
                <>
                  {status === 1 && listingDetails.logoImage ? (
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
                            <div>
                              {/* <div
                              className="client_first_letter"
                              style={{
                                height: "100px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {listingDetails.companyFirstLetter}
                            </div> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </>

                <>
                  {status === 1 && teamimageDetails.length > 0 ? (
                    <div className="box_detail_cus">
                      <div className="cust-profile">
                        {/* <img src={profile} alt="profile"></img> */}

                        {/* current working code........................ */}
                        {/* {teamimageDetails.length > 0 && (
                      <div>
                        <img
                          className="upload_images"
                          src={
                            teamimageDetails[0].url
                              ? `https://apidev.myinteriormart.com${teamimageDetails[0].url}`
                              : ""
                          }
                          alt="Owner Image"
                          style={{ borderRadius: "50px" }}
                        />
                        <h5 style={{ fontSize: "20px" }}>
                          {teamimageDetails[0].prefix}.
                          <span style={{ marginLeft: "6px" }}>
                            {teamimageDetails[0].title}
                          </span>
                        </h5>
                        <h6 style={{ fontSize: "14px" }}>
                          {teamimageDetails[0].designation}
                        </h6>
                        <h6 style={{ fontSize: "14px" }}>
                          From : {teamimageDetails[0].state}
                        </h6>
                      </div>
                    )} */}

                        {teamimageDetails.length > 0 && (
                          <Slider {...settings}>
                            {teamimageDetails.map((teamImage, index) => (
                              <div key={index}>
                                <img
                                  className="upload_images"
                                  src={`https://apidev.myinteriormart.com${teamImage.url}`}
                                  alt="Owner Image"
                                  style={{
                                    borderRadius: "50px",
                                    width: "100px",
                                    height: "100px",
                                    display: "inline-block",
                                  }}
                                />
                                <h5 style={{ fontSize: "20px" }}>
                                  {teamImage.prefix}.
                                  <span style={{ marginLeft: "6px" }}>
                                    {teamImage.title}
                                  </span>
                                </h5>
                                <h6 style={{ fontSize: "14px" }}>
                                  {teamImage.designation}
                                </h6>
                                <h6 style={{ fontSize: "14px" }}>
                                  From: {teamImage.state}
                                </h6>
                              </div>
                            ))}
                          </Slider>
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
                  ) : (
                    <></>
                  )}
                </>
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

                    {/* <div className="main-image"> */}
                    
                    {/* Mobile view Gallery */}
                    <style>
                      {`
                                .swiper-button-prev,
                                .swiper-button-next ,
                                .swiper-pagination{
                                  display: none !important;
                                }
                             `}
                    </style>
                    <div></div>
                    <Swiper
                      modules={[Pagination, Autoplay]}
                      spaceBetween={10}
                      slidesPerView={1}
                      onSlideChange={handleSlideChangeImg}
                      initialSlide={selectedImage}
                      autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                      }}
                      onSwiper={(swiper) => (swiperRef.current = swiper)}
                    >
                      {imageDetails.length > 0 ? (
                        imageDetails.map((image, index) => (
                          <SwiperSlide key={index}>
                            <img
                              src={`https://apidev.myinteriormart.com${image.url}`}
                              alt={`Slide ${index + 1}`}
                              className="main-image-display photogallerymain"
                              onClick={() => openModel(image.url)}
                            />
                          </SwiperSlide>
                        ))
                      ) : (
                        <SwiperSlide>
                          <img
                            src={gallerydummy}
                            alt="Dummy Image"
                            className="main-image-display photogallerymaindummy"
                            style={{ border: "1px solid gainsboro" }}
                          />
                        </SwiperSlide>
                      )}
                    </Swiper>

                    {/* Modal for image popup */}
                    {modalOpen && (
                      <div className="Gmodal-overlay">
                        <div
                          className="Gmodal-content"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button className="Gmodal-close" onClick={closeModel}>
                            &times;
                          </button>
                          <img
                            src={`https://apidev.myinteriormart.com${selectedImage}`}
                            alt="Full View"
                            className="Gmodal-image"
                          />
                        </div>
                      </div>
                    )}

                    <div
                      className="thumbnails scrollmenu"
                      ref={thumbnailsContainerRef}
                      style={{
                        marginTop: "2px",
                        overflowX: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {imageDetails.length > 0 ? (
                        imageDetails.map((image, index) => (
                          <div
                            key={index}
                            className="thumbnail imgScroll photogallerythumbnail "
                            onClick={() => handleThumbnailClick(index)}
                            style={{
                              border:
                                selectedImage === index
                                  ? "2px solid gray"
                                  : "2px solid transparent",
                              display: "inline-block",
                            }}
                            ref={
                              selectedImage === index
                                ? activeThumbnailRef
                                : null
                            } // Assign ref to the active thumbnail
                          >
                            <img
                              src={`https://apidev.myinteriormart.com${image.url}`}
                              alt={`Thumbnail ${index + 1}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))
                      ) : (
                        <div style={{ display: "flex" }}>
                          <div style={{ marginRight: "2px" }}>
                            {" "}
                            <img
                              src={gallerydummy}
                              style={{ border: "1px solid gainsboro" }}
                            />
                          </div>
                          <div style={{ marginRight: "2px" }}>
                            {" "}
                            <img
                              src={gallerydummy}
                              style={{ border: "1px solid gainsboro" }}
                            />
                          </div>
                          <div>
                            {" "}
                            <img
                              src={gallerydummy}
                              style={{ border: "1px solid gainsboro" }}
                            />
                          </div>
                        </div>
                      )}
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

                          {/* <div className="main-image"> */}

                          <style>
                            {`
                                .swiper-button-prev,
                                .swiper-button-next ,
                                .swiper-pagination{
                                  display: none !important;
                                }
                                  .main-image-display{
                                  width:252px;
                                  height:52px;
                                  object-fit: cover;
                                  }
                             `}
                          </style>
                          <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={1}
                            onSlideChange={handleSlideChange}
                            initialSlide={selectedImage}
                            autoplay={{
                              delay: 4000,
                              disableOnInteraction: false,
                            }}
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                          >
                            {imageDetails.length > 0 ? (
                              imageDetails.map((image, index) => (
                                <SwiperSlide key={index}>
                                  <img
                                    src={`https://apidev.myinteriormart.com${image.url}`}
                                    alt={`Slide ${index + 1}`}
                                    className="main-image-display photogallerymain"
                                    onClick={() => openModel(image.url)}
                                  />
                                </SwiperSlide>
                              ))
                            ) : (
                              <SwiperSlide>
                                <img
                                  src={gallerydummy}
                                  alt="Dummy Image"
                                  className="main-image-display photogallerymain"
                                  style={{ border: "1px solid gainsboro" }}
                                />
                              </SwiperSlide>
                            )}
                          </Swiper>

                          {/* Modal for image popup */}
                          {modalOpen && (
                            <div className="Gmodal-overlay">
                              <div
                                className="Gmodal-content"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <button
                                  className="Gmodal-close"
                                  onClick={closeModel}
                                >
                                  &times;
                                </button>
                                <img
                                  src={`https://apidev.myinteriormart.com${selectedImage}`}
                                  alt="Full View"
                                  className="Gmodal-image"
                                />
                              </div>
                            </div>
                          )}

                          {/* </div> */}

                          {/* Thumbnails Display */}
                          <div
                            className="thumbnails scrollmenu"
                            ref={thumbnailsContainerRef}
                            style={{
                              marginTop: "2px",
                              overflowX: "hidden",
                              whiteSpace: "nowrap",
                              maxWidth: "100%",
                            }}
                          >
                            {imageDetails.length > 0 ? (
                              imageDetails.map((image, index) => (
                                <div
                                  key={index}
                                  className="thumbnail imgScroll photogallerythumbnail"
                                  onClick={() => handleThumbnailClick(index)}
                                  style={{
                                    border:
                                      selectedImage === index
                                        ? "2px solid gray"
                                        : "2px solid transparent",
                                    display: "inline-block",
                                  }}
                                >
                                  <img
                                    src={`https://apidev.myinteriormart.com${image.url}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              ))
                            ) : (
                              <div style={{ display: "flex" }}>
                                <div style={{ marginRight: "2px" }}>
                                  {" "}
                                  <img
                                    src={gallerydummy}
                                    style={{ border: "1px solid gainsboro" }}
                                  />
                                </div>
                                <div style={{ marginRight: "2px" }}>
                                  {" "}
                                  <img
                                    src={gallerydummy}
                                    style={{ border: "1px solid gainsboro" }}
                                  />
                                </div>
                                <div>
                                  {" "}
                                  <img
                                    src={gallerydummy}
                                    style={{ border: "1px solid gainsboro" }}
                                  />
                                </div>
                              </div>
                            )}
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
                      <div
                        className="company-addes"
                        style={{ borderBottom: "1px solid #f1f1f1" }}
                      >
                        <div className="company-details">
                          <h5
                            className="company-name"
                            style={{ fontSize: "17px" }}
                          >
                            {listingDetails.companyName}
                          </h5>
                        </div>
                        <div style={{ display: "flex" }}>
                          <span
                            className="company-category-name listingcolor ratingsize"
                            style={{ fontWeight: "bold", fontSize: "14px" }}
                          >
                            {listingDetails.listingKeyword}
                          </span>
                          <span className="company-rating ">
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
                            ({listingDetails.ratingCount})
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-12 mim-Address">
                        <p>
                          <i
                            className="fa fa-map-marker "
                            style={{ marginRight: "8px" }}
                          ></i>
                          <span className="ListingpageFont">
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
                        <div className="listingarea listinga">
                          <p className="listingdetailslocality">
                            <span className="ListingpageFont">
                              <i
                                className="fa fa-map-o"
                                style={{ marginRight: "8px" }}
                              ></i>
                              {listingDetails.area}
                            </span>
                          </p>
                          <p className="listingareatabs">
                            <span className="ListingpageFont">
                              <i
                                className="fa fa-map-signs"
                                style={{ marginRight: "8px" }}
                              ></i>
                              {listingDetails.locality}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div classname="col-lg-12 mb-1 px-0 year_gst">
                        <p className="m-0 ListingpageFont">
                          <i
                            className="fa fa-globe"
                            style={{ marginRight: "4px" }}
                          ></i>
                          <a
                            href={
                              listingDetails.website.startsWith("http://") ||
                              listingDetails.website.startsWith("https://")
                                ? listingDetails.website
                                : `https://${listingDetails.website}`
                            }
                            target="_blank"
                            style={{ color: "orange" }}
                            rel="noopener noreferrer"
                          >
                            {" "}
                            {listingDetails.website}
                          </a>
                        </p>
                        <p style={{display:'none'}}>{listingDetails.email}</p>
                      </div>
                      <div className="listingemp">
                        {/* <div className="col-lg-6 px-0 mb-1 year_gst mt-0">
                          <p className="mb-0 noemployee ListingpageFont">
                            <i
                              className="fa fa-users"
                              style={{ marginRight: "8px" }}
                            ></i>
                            {listingDetails.numberOfEmployees} Employees
                          </p>
                        </div> */}
                      </div>

                      <div className="listingemp listinglocality">
                        <div className="col-lg-6 mb-1 px-0 year_gst listingempyear">
                          <p className="m-0 ListingpageFont">
                            <i
                              className="fa fa-calendar"
                              style={{ marginRight: "8px" }}
                            ></i>
                            Since {listingDetails.yearOfEstablishment}
                          </p>
                        </div>
                        <div className="col-lg-6 mb-1 px-0 year_gst listingempyear">
                          <p
                            className="mb-0 noemployee ListingpageFont"
                            style={{ marginLeft: "-1px" }}
                          >
                            <i
                              className="fa fa-users"
                              style={{ marginRight: "8px" }}
                            ></i>
                            {listingDetails.numberOfEmployees} Employees
                          </p>
                        </div>

                        {/* <div className="col-lg-6 px-0 mb-1 year_gst mt-0">
                          <p className="mb-0 noemployee ListingpageFont">
                            <i
                              className="fa fa-users"
                              style={{ marginRight: "8px" }}
                            ></i>
                            {listingDetails.numberOfEmployees} Employees
                          </p>
                        </div> */}
                      </div>

                      <div className="col-lg-6 mb-1 px-0 year_gst listingempyear">
                        <p className="mb-0 ListingpageFont">
                          Turnover : {listingDetails.turnover}
                        </p>
                      </div>

                      {/* <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0 ListingpageFont">
                          Turnover :{listingDetails.turnover}
                        </p>
                      </div> */}
                      {/* gstnumber */}
                      <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0 ListingpageFont">
                          GST NO : {listingDetails.gstNumber}
                        </p>
                      </div>
                      <div className="col-lg-12 px-0 mb-1 year_gst mt-0">
                        <p className="mb-0 ListingpageFont">
                          <i
                            className="fa fa-language mr-1"
                            style={{ marginRight: "4px" }}
                          ></i>
                          {listingDetails.languges}
                        </p>
                      </div>

                      {/* <div classname="col-lg-12 mb-1 p-0">
                        <i
                          className="fa fa-mobile"
                          style={{ marginRight: "8px" }}
                        ></i>
                        <a
                          href={`tel:${listingDetails.mobile}`}
                          style={{ marginRight: "8px", color: "orange" }}
                          className="ListingpageFont"
                        >
                          {listingDetails.mobile}
                        </a> */}

                      {/* <i
                          className="fa fa-whatsapp"
                          style={{ marginRight: "8px" }}
                        ></i> */}
                      {/* <Link style={{ color: "orange" }}>
                          {listingDetails.whatsapp}
                        </Link>
                      </div> */}

                      {/* dekstop view */}
                      <div className="listingnumberD">
                        <div className="listingemp listingtoll">
                          {/* registered mobile */}
                          <div
                            classname="col-lg-12 mb-1 listingtelephone"
                            style={{ width: "19%" }}
                          >
                            <i
                              className="fa fa-mobile"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.registerMobile}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.registerMobile}
                            </a>
                          </div>
                          {/* mobile number */}
                          <div classname="col-lg-12 mb-1 p-0">
                            <i
                              className="fa fa-mobile"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.mobile}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.mobile}
                            </a>
                          </div>
                          {/* telephone */}
                          <div
                            classname="col-lg-12 mb-1 listingtelephone"
                            style={{ width: "20%" }}
                          >
                            <i
                              className="fa fa-phone"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.telephone}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.telephone}
                            </a>
                          </div>

                          {/* tollfree */}
                          <div classname="col-lg-12 mb-1 p-0">
                            <i
                              className="fa fa-headphones"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.tollFree}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.tollFree}
                            </a>
                          </div>
                        </div>
                      </div>
                      {/* mobile view */}
                      <div className="listingnumberM">
                        <div className="listingemp listingtoll">
                          {/* registered mobile */}
                          <div
                            classname="col-lg-12 mb-1 listingtelephone"
                            style={{ width: "27%" }}
                          >
                            <i
                              className="fa fa-mobile"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.registerMobile}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.registerMobile}
                            </a>
                          </div>
                          {/* mobile number */}
                          <div classname="col-lg-12 mb-1 p-0">
                            <i
                              className="fa fa-mobile"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.mobile}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.mobile}
                            </a>
                          </div>
                          {/* telephone */}
                          <div
                            classname="col-lg-12 mb-1 listingtelephone"
                            style={{ width: "-1%" }}
                          >
                            <i
                              className="fa fa-phone"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.telephone}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.telephone}
                            </a>
                          </div>

                          {/* tollfree */}
                          {/* <div classname="col-lg-12 mb-1 p-0">
                          <i
                            className="fa fa-headphones"
                            style={{ marginRight: "8px" }}
                          ></i>
                          <a
                            href={`tel:${listingDetails.tollFree}`}
                            style={{ marginRight: "8px", color: "orange" }}
                            className="ListingpageFont"
                          >
                            {listingDetails.tollFree}
                          </a>
                        </div> */}
                        </div>
                      </div>
                      <div className="listingnumberM">
                        <div className="listingemp listingtoll">
                          <div
                            classname="col-lg-12 mb-1 p-0"
                            style={{ marginLeft: "-2px" }}
                          >
                            <i
                              className="fa fa-headphones"
                              style={{ marginRight: "8px" }}
                            ></i>
                            <a
                              href={`tel:${listingDetails.tollFree}`}
                              style={{ marginRight: "8px", color: "orange" }}
                              className="ListingpageFont"
                            >
                              {listingDetails.tollFree}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* <div className="listingemp listingtoll"> */}
                      {/* telephone number */}
                      {/* <div classname="col-lg-12 mb-1 listingtelephone" style={{width:'51%'}}>
                          <i
                            className="fa fa-phone"
                            style={{ marginRight: "8px" }}
                          ></i>
                          <a
                            href={`tel:${listingDetails.telephone}`}
                            style={{ marginRight: "8px", color: "orange" }}
                            className="ListingpageFont"
                          >
                            {listingDetails.telephone}
                          </a>
                        </div> */}
                      {/* tollFree number */}
                      {/* <div classname="col-lg-12 mb-1 p-0">
                          <i
                            className="fa fa-headphones"
                            style={{ marginRight: "8px" }}
                          ></i>
                          <a
                            href={`tel:${listingDetails.tollFree}`}
                            style={{ marginRight: "8px", color: "orange" }}
                            className="ListingpageFont"
                          >
                            {listingDetails.tollFree}
                          </a>
                        </div> */}
                      {/* </div> */}

                      <div
                        classname="company-time ListingpageFont"
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
                        {listingDetails.claimedListing ? (
                          <button
                            className="btn btn-guotes btn-sm"
                            // onClick={() => setIsPopupOpen(true)}
                            style={{ marginRight: "10px", font: "bold" }}
                            onClick={(event) => {
                              event.preventDefault();

                              Getclaimhandleclick();
                            }}
                          >
                            Claim Listing
                          </button>
                        ) : (
                          <button
                            className="btn btn-guotes btn-sm"
                            onClick={() => setIsPopupOpen(true)}
                            style={{ marginRight: "10px", font: "bold" }}
                          >
                            Get Quotes
                          </button>
                        )}

                        <button
                          className={`btn btn-bookmark ${
                            isBookmarked ? "active" : ""
                          } ${isBookmarked ? "icon-active" : ""}`}
                          onClick={handleBookmarkClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bookmark`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b
                            style={{ color: isBookmarked ? "orange" : "black" }}
                          >
                            Bookmark
                          </b>
                        </button>

                        <button
                          className="btn-custom pushRight btn btn-light btn-sm btnshare"
                          onClick={() => setIsSociallinkOpen(true)}
                          style={{ height: "32px", fontSize: "13px" }}
                        >
                          <i
                            className="fa fa-share"
                            style={{ marginRight: "4px" }}
                          ></i>
                          <b
                            style={{
                              color: isSociallinkOpen ? "orange" : "black",
                            }}
                          >
                            Share
                          </b>
                        </button>

                        <button
                          className={`btn btn-like ${isLike ? "active" : ""} ${
                            isLike ? "icon-active" : ""
                          }`}
                          onClick={handleLikeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-thumbs-up`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b style={{ color: isLike ? "orange" : "black" }}>
                            Like
                          </b>
                        </button>
                        <button
                          className={`btn btn-subscribe ${
                            isSubscribe ? "active" : ""
                          } ${isSubscribe ? "icon-active" : ""}`}
                          onClick={handleSubscribeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bell`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b
                            style={{ color: isSubscribe ? "orange" : "black" }}
                          >
                            Subscribe
                          </b>
                        </button>
                      </div>
                      <div
                        className="social-details mobile"
                        style={{ marginLeft: "-5px" }}
                      >
                        <button
                          className={`btn btn-bookmark ${
                            isBookmarked ? "active" : ""
                          } ${isBookmarked ? "icon-active" : ""}`}
                          onClick={handleBookmarkClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bookmark`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b
                            style={{ color: isBookmarked ? "orange" : "black" }}
                          >
                            Bookmark
                          </b>
                        </button>

                        <button
                          className="btn-custom pushRight btn btn-light btn-sm btnshare"
                          onClick={() => setIsSociallinkOpen(true)}
                          style={{ height: "32px", fontSize: "13px" }}
                        >
                          <i
                            className="fa fa-share"
                            style={{ marginRight: "4px" }}
                          ></i>
                          <b
                            style={{
                              color: isSociallinkOpen ? "orange" : "black",
                            }}
                          >
                            Share
                          </b>
                        </button>

                        <button
                          className={`btn btn-like ${isLike ? "active" : ""} ${
                            isLike ? "icon-active" : ""
                          }`}
                          onClick={handleLikeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-thumbs-up`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b style={{ color: isLike ? "orange" : "black" }}>
                            Like
                          </b>
                        </button>
                        <button
                          className={`btn btn-subscribe ${
                            isSubscribe ? "active" : ""
                          } ${isSubscribe ? "icon-active" : ""}`}
                          onClick={handleSubscribeClick}
                          style={{ marginRight: "5px", fontSize: "13px" }}
                        >
                          <i
                            className={`fa fa-bell`}
                            style={{ marginRight: "5px" }}
                          ></i>
                          <b
                            style={{ color: isSubscribe ? "orange" : "black" }}
                          >
                            Subscribe
                          </b>
                        </button>
                      </div>
                      <div
                        className="social-details mobile"
                        style={{ marginTop: "-13px" }}
                      >
                        {listingDetails.claimedListing ?(<button
                            className="btn btn-guotes btn-sm"
                            // onClick={() => setIsPopupOpen(true)}
                            style={{ marginRight: "10px", font: "bold" }}
                            onClick={(event) => {
                              event.preventDefault();

                              Getclaimhandleclick();
                            }}
                          >
                            Claim Listing
                          </button>):(<button
                          className="btn btn-guotes btn-sm"
                          onClick={() => setIsPopupOpen(true)}
                          style={{ marginRight: "10px", fontWeight: "bold" }}
                        >
                          Get Quotes
                        </button>)}

                      </div>
                      <div className="col-lg-12 social-share p-0 listingpageSocialLink">
                        {socialLink.whatsappGroupLink && (
                          <a
                            href={`https://${
                              socialLink.whatsappGroupLink || "#0"
                            }`}
                            className="vendorSocialLink"
                          >
                            <i
                              className="fa fa-whatsapp"
                              style={{ marginRight: "-1px", color: "orange" }}
                            ></i>
                          </a>
                        )}
                        {socialLink.facebook && (
                          <a
                            href={`https://${socialLink.facebook || "#0"}`}
                            className="vendorSocialLink"
                          >
                            <i
                              className="ti-facebook"
                              style={{ marginRight: "-1px", color: "orange" }}
                            ></i>
                          </a>
                        )}

                        {socialLink.linkedin && (
                          <a
                            href={`https://${socialLink.linkedin || "#0"}`}
                            className="vendorSocialLink"
                          >
                            <i
                              className="ti-linkedin"
                              style={{ marginRight: "3px", color: "orange" }}
                            ></i>
                          </a>
                        )}

                        {socialLink.twitter && (
                          <a
                            href={`https://${socialLink.twitter || "#0"}`}
                            className="vendorSocialLink"
                          >
                            {/* <i className="bi bi-twitter-x" style={{marginRight:'5px',color:'orange'}}></i> */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="currentColor"
                              color="orange"
                              className="bi bi-twitter-x svg-margin"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                            </svg>
                          </a>
                        )}

                        {socialLink.youtube && (
                          <a
                            href={`https://${socialLink.youtube || "#0"}`}
                            className="vendorSocialLink"
                          >
                            <i
                              className="ti-youtube"
                              style={{ marginRight: "3px", color: "orange" }}
                            ></i>
                          </a>
                        )}

                        {socialLink.instagram && (
                          <a
                            href={`https://${socialLink.instagram || "#0"}`}
                            className="vendorSocialLink"
                          >
                            <i
                              className="ti-instagram"
                              style={{ marginRight: "5px", color: "orange" }}
                            ></i>
                          </a>
                        )}

                        {socialLink.pinterest && (
                          <a
                            href={`https://${socialLink.pinterest || "#0"}`}
                            className="vendorSocialLink"
                          >
                            <i
                              className="ti-pinterest"
                              style={{ marginRight: "5px", color: "orange" }}
                            ></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <>{status===1?():()}</> */}
                  {listingDetails.description && (
                    <div className="banner-block one-block my-5 listingaboutus">
                      <div className="row px-3">
                        <div className="col-12">
                          <h3>About us</h3>
                          <p
                            className={
                              showFullAboutus ? "full-text" : "limited-text"
                            }
                            style={{ textIndent: "30px", display: "inline" }}
                          >
                            {showFullAboutus
                              ? listingDetails.description
                              : `${listingDetails.description.slice(
                                  0,
                                  300
                                )}...`}
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
                  )}

                  <Webreviews companyID={listingDetails.listingId} />
                  <div className="col-lg-4 col-md-12 company-map padding-all-5 listinggallery listingb">
                    <div
                      className="pro-large-img img-zoom gallery1"
                      style={{ marginTop: "-4px", marginBottom: "-49px" }}
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

      <Popup
        isOpen={isBookmarkPopupOpen}
        onClose={() => setIsBookmarkPopupOpen(false)}
      />

      {token ? (
        <Getquotespopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          companyID={listingDetails.listingId}
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
    const formatTime = (time) => {
      const [hour, minute] = time.split(":").map(Number);
      const isPM = hour >= 12;
      const formattedHour = hour % 12 || 12;
      const ampm = isPM ? "PM" : "AM";
      return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
    };
    const fromTime = formatTime(from);
    if (formatStartOnly) {
      return fromTime;
    }
    const toTime = formatTime(to);
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

  //funtion for handleclickoutside function
  // const handleClickOutside = (event) => {
  //   if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //     setIsDropdownOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const { isOpen, currentDay, nextOpenDay, nextOpenTime, nextTime } =
    getCurrentStatus();

  return (
    <div>
      <div className="current-status">
        <button
          className="timedrp"
          onClick={toggleDropdown}
          style={{ cursor: "pointer" }}
          type="button"
        >
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
              {/* Opens {nextOpenDay ? `${nextTime} at ${nextOpenDay.day}` : "soon"} */}
            </>
          )}
          <i
            className={`fa ${
              isDropdownOpen ? "fa-chevron-up" : "fa-chevron-down"
            }`}
            style={{ marginLeft: "8px" }}
          ></i>
        </button>
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
