import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, Link , useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import banner from "../../../FrontEnd/img/home_section_1.jpg";
import banner1 from "../../../FrontEnd/img/listing-img.jpeg";
import nextarrowimage from "../../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../../FrontEnd/img/Backarrow.png";
import Popup from "../../Listing/Popup";
import Getquotespopup from "../../Listing/Getquotespopup";
import "../../../FrontEnd/css/Lisiting.css";
import "../../../FrontEnd/css/RegistrationMV.css";
import Searchbar from "./Searchbar";
import CryptoJS from "crypto-js";
import { Carousel } from "react-bootstrap";
import verifiedImage from '../../../FrontEnd/img/Golden_Membership-removebg-preview.png'

import drparrowimg from "../../../FrontEnd/img/icon (20).png"


import { useSelector } from "react-redux";

const encryptionKey = "myinterriorMart@SECRETKEY";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function SearchListing() {
  const { secondCategoryName, subcategoryName } = useParams();
  const [searchParams] = useSearchParams();
  const navigate=useNavigate()
  const searching = searchParams.get("searchkey");
  // console.log(searching,useParams());
  const [listing, setListing] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState([false, null]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [homecategoryBanners, setHomeCategoryBanners] = useState([]);
  const[advertiseCategoryBanner,setAdvertiseCategoryBanner]=useState([]);

  const listingId_enc = searchParams.get("secatEncyt");
  // const secondCategoryId = decrypt(decodeURIComponent(listingId_enc));
  // console.log(secondCategoryId);
  // console.log("secondcategoryid", secondCategoryId);
  // console.log(decrypt(listingId_enc));

  

  const { categoryid, categoryname, keyword } = useParams(); 

  const location=useLocation

  //for mobile pagination

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return isMobile;
  };

  const isMobile = useIsMobile();

  // useEffect(() => {
  //   fetchListings();
  // }, [secondCategoryId, currentPage, secondCategoryName, subcategoryName]);

  const token = useSelector((state) => state.auth.token);
  // console.log("token", token);

  // console.log(encrypt(listing.listingId));

  const fomattedcity = localStorage.getItem("cityname");

 
  useEffect(() => {
    if (searching) {
      const fetchCategoryListings = async () => {
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/SearchListings/search?searchText=${searching}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          console.log(' listings data', data);
          console.log('serching',searching);

          //keyword
          const matchingKeyword = data.keywords?.find(
            (keyItem) => keyItem.keyword.trim().toLowerCase() === searching.trim().toLowerCase()
          );

          console.log('matchingKeyword',matchingKeyword)
  
          // Filter listings with a valid listingId
          const filteredListings = matchingKeyword?.listings.filter(
            (listing) => listing.listingId
          ) || [];
  
          console.log('Filtered Listings:', filteredListings);

          //specilisation
          const matchingSpecilisation=data.specializationMatches?.find(
            (speItem)=>speItem.specialization.trim().toLowerCase()===searching.trim().toLowerCase())

            console.log('matchingSp',matchingSpecilisation);
  
          
          //console.log('SerchListing',SerchListing);
      
          // Prepend the fetched listings on top of the current listings
          setListing(filteredListings);
        } catch (error) {
          console.error('Error fetching listings:', error);
        }
      };
      
      fetchCategoryListings();
    } else {
      
    }
  }, [ searching,  token, fomattedcity]);
  

  // Horizontal banner
  useEffect(() => {
    const fetchCategoryBanners = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data =await response.json();
        console.log(data);
        setHomeCategoryBanners(data.categoryBanners.homecategoryBanners);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };
    fetchCategoryBanners();
  }, []);


  //Vertical Banners

  useEffect(() => {
    const fetchAdvertismentBanners = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data =await response.json();
        console.log(data);
        setAdvertiseCategoryBanner(data.categoryBanners.advertiseCategoryBanner);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };
    fetchAdvertismentBanners();
  }, []);

  const fetchListingsmobile = async (isAppending = false) => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${listing.subCategory[0]?.id}&cityName=${fomattedcity}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log("Fetched Data", data);

      // Filter listings if needed based on subCategoryId
      const filterdListing = data.filter((listing) => {
        return listing.subCategory.some(
          (subcat) => subcat.id.toString() === listing.subCategory[0]?.id
        );
      });

      // setListing(filterdListing);
      // console.log(filteredListing)
      // console.log(itemsPerPage);

      if (isAppending) {
        // Append new listings to existing ones
        setListing((prevListings) => [...prevListings, ...filterdListing]);
      } else {
        // Replace the listings if not appending (for initial load)
        setListing(filterdListing);
      }
    } catch (error) {
      console.error("Error fetching listings", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleViewMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    fetchListingsmobile(true); // Fetch and append new listings
  };

  useEffect(() => {
    if (isMobile) {
      fetchListingsmobile();
    }
  }, [currentPage, isMobile]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
 

  

  const ClaimForgetpassword=`/ForgetpasswordClaim/in-${localStorage.getItem('cityname')}`

  const Getclaimhandleclick=()=>{
navigate(ClaimForgetpassword)
  }
 
  // const handleListingClick = (listingId) => {
  //   localStorage.setItem("scrollPosition", window.scrollY); // Save current scroll position
  //   // Perform your navigation logic here (e.g., navigate to the details page)
  // };

  // useEffect(() => {
  //   const savedPosition = localStorage.getItem("scrollPosition");
  //   if (savedPosition) {
  //     window.scrollTo(0, parseInt(savedPosition, 10));
  //     localStorage.removeItem("scrollPosition");
  //   }
  // }, []);

  useEffect(() => {
    if (location.state?.fromListingPage) {
      const savedScrollPosition = sessionStorage.getItem("scrollPosition");
      const savedPage = sessionStorage.getItem("currentPage");
  
      if (savedScrollPosition && savedPage) {
        window.scrollTo(0, parseInt(savedScrollPosition, 10));
        setCurrentPage(parseInt(savedPage, 10)); // Set the currentPage from session storage
      }
  
      sessionStorage.removeItem("scrollPosition");
      sessionStorage.removeItem("currentPage");
    } else {
      sessionStorage.removeItem("scrollPosition");
      sessionStorage.removeItem("currentPage");
    }
  }, [location]);

 
  

  // useEffect(()=>{
  //   if(location.hash){
  //     const elementId=location.hash.replace('#','');
  //     const element=document.getElementById(elementId);
  //     if(element){
  //       element.scrollIntoView({behavior:'smooth'});
  //     }
  //   }
  // },[location])

  
  return (
    <>
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="sticky-searchbar">
          <Searchbar />
        </div>

        <div className="banner-block one-block categorybanner">
          <div className="row">
            <div className="col-12">
              <div className="grid-item listingpagebanner">
                {/* <img
                  src={banner1}
                  alt="Banner"
                  style={{ height: "110px", width: "100%" }}
                /> */}
                <div>
                  <Carousel
                    interval={2500}
                    autoPlay={true}
                    fade
                    animationEffect="Fade"
                    pause={false}
                    controls={false}
                  >
                    {homecategoryBanners.length > 0 ? (
                      homecategoryBanners.map((banner) => (
                        <Carousel.Item key={banner.id}>
                          <a
                            href={banner.bannerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              className="d-block w-100 bannerimg"
                              src={`https://admin.myinteriormart.com${banner.imagePath}`}
                              alt={`Banner ${banner.location}`}
                              style={{ height: "110px", width: "100%" }}
                            />
                          </a>
                        </Carousel.Item>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="listing-list col-9 ">
            {listing.length > 0 ? (
              listing.map((item,index) => (
                <div key={`${item.listingId}-${index}`} className="row mb-10">
                  <div className="col-12">
                    <Link to={`/company/${item.companyName
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${item.category.replace(/\s+/g, "-").toLowerCase()}/in-${item.localityName
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${localStorage.getItem(
                        "cityname"
                      )}?listingEncyt=${encodeURIComponent(
                        encrypt(item.listingId)
                      )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
                        encrypt(parseInt(item.categoryid))
                      )}`}>
                      <div className="strip map_view stripmapviewdesign" style={{
                            border:
                              searching == item.companyName
                                ? "2px solid white"
                                : "None",
                          }}>
                        {/* <h5>Hello world</h5> */}
                        <h6 className="listingcompanyname">
                          
                            {" "}
                            <h5
                              style={{
                                fontWeight: "600",
                                fontFamily: "PoppinsSemiBold",
                                fontSize:'15px'
                              }}
                            >
                              {" "}
                              {item.companyName}
                            </h5>
                         
                        </h6>
                        <div
                          className="row no-gutters "
                          // style={{
                          //   border:
                          //     searching == listing.listingKeyword
                          //       ? "2px solid gray"
                          //       : "None",
                          // }}
                        >
                          <div className="col-6 listingdiv">
                            <div className="wrapper listingdetailsdiv">
                              {/* <h3 style={{ color: "black" }}>
                              <Link
                                to={`/company/${listing.companyName
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}/${secondCategoryName}/in-${listing.locality
                                  .replace(/\s+/g, "-")
                                  .toLowerCase()}/${localStorage.getItem(
                                  "cityname"
                                )}?listingEncyt=${encodeURIComponent(
                                  encrypt(listing.listingId)
                                )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
                                  encrypt(parseInt(secondCategoryId))
                                )}`}
                              >
                                {" "}
                                {listing.companyName}
                              </Link>
                            </h3> */}


                              {/* <small className="listingcolor">
                                {listing.listingKeyword}
                              </small> */}

                              <p className="listingcolor" style={{marginBottom:'4px'}}>
                                <i
                                  className="fa fa-map-marker"
                                  style={{ paddingRight: "5px" }}
                                ></i>
                                {item.areaName},<span style={{marginLeft:'8px'}}>{item.localityName}</span>
                              </p>
                             
                            </div>
                          </div>

                          

                        
                        </div>
                      </div>
                      </Link>
                  </div>

                  {/* <div className="col-2">
                  <div className="grid-item" style={{ paddingBottom: "6px" }}>
                    <img
                      src={banner}
                      alt="Banner"
                      style={{ height: "108px", width: "100%" }}
                    />
                  </div>
                  <div className="grid-item">
                    <img
                      src={banner1}
                      alt="Banner"
                      style={{ height: "115px", width: "100%" }}
                    />
                  </div>
                </div> */}
                </div>
              ))
            ) : (
              <p>Coming soon.</p>
            )}
          </div>

          <div className="col-3 listingbanner">
            <div className="grid-item" style={{ paddingBottom: "6px" }}>
              {/* <img
                src={banner}
                alt="Banner"
                style={{ height: "474px", width: "100%" }}
              /> */}
              <Carousel
                    interval={2500}
                    autoPlay={true}
                    fade
                    animationEffect="Fade"
                    pause={false}
                    controls={false}
                  >
                    {advertiseCategoryBanner.length > 0 ? (
                      advertiseCategoryBanner.map((banner) => (
                        <Carousel.Item key={banner.id}>
                          <a
                            href={banner.bannerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              className="d-block w-100 bannerimg"
                              src={`https://admin.myinteriormart.com${banner.imagePath}`}
                              alt={`Banner ${banner.location}`}
                              style={{ height: "474px", width: "100%" }}
                            />
                          </a>
                        </Carousel.Item>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Carousel>
            </div>
            <div className="grid-item">
              {/* <img
                src={banner1}
                alt="Banner"
                style={{ height: "474px", width: "100%" }}
              /> */}
              <Carousel
                    interval={2500}
                    autoPlay={true}
                    fade
                    animationEffect="Fade"
                    pause={false}
                    controls={false}
                  >
                    {advertiseCategoryBanner.length > 0 ? (
                      advertiseCategoryBanner.map((banner) => (
                        <Carousel.Item key={banner.id}>
                          <a
                            href={banner.bannerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              className="d-block w-100 bannerimg"
                              src={`https://admin.myinteriormart.com${banner.imagePath}`}
                              alt={`Banner ${banner.location}`}
                              style={{ height: "474px", width: "100%" }}
                            />
                          </a>
                        </Carousel.Item>
                      ))
                    ) : (
                      <p>Loading...</p>
                    )}
                  </Carousel>
            </div>
          </div>
        </div>

        <div className="pagination">
          {/* for dekstop */}
          {!isMobile && (
            <>
              {/* <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
                <img src={previousarrowimg} style={{ height: "30px" }} />
              </button> */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={currentPage === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={listing.length < itemsPerPage} // Disable "Next" if fewer than 10 listings
              >
                Next
                {/* <img src={nextarrowimage} style={{ height: "30px" }} /> */}
              </button>
            </>
          )}

          {/* mobile view more */}
          {isMobile && listing.length === itemsPerPage && (
            <button
              onClick={handleViewMore}
              className="view-more-btn"
              style={{
                borderRadius: "32px",
                backgroundColor: "white",
                paddingTop: "5px",
                paddingBottom: "5px",
                fontSize: "14px",
                width: "210px",
                color: "orange",
                fontWeight:'bold'
              }}
            >
              More Search Results<img style={{height:'20px',paddingLeft:'5px'}} src={drparrowimg}/>
            </button>
          )}
        </div>
       
      </div>

      {token ? (
        <Getquotespopup
          isOpen={isPopupOpen[0]}
          companyID={isPopupOpen[1]}
          onClose={() => setIsPopupOpen([false, null])}
        />
      ) : (
        <Popup
          isOpen={isPopupOpen[0]}
          companyID={null}
          onClose={() => setIsPopupOpen([false, null])}
        />
      )}
      {/* <div className="sticky-footer">
        <Foot />
      </div> */}
    </>
  );
}

const BusinessHours = ({ businessWorking }) => {
  const { isBusinessOpen, isBusinessOpenText, closeTime } = businessWorking;

  return (
    <p>
      <i className="fa fa-clock-o"></i> :
      <span style={{ color: isBusinessOpen ? "green" : "red" }}>
        {isBusinessOpenText} {isBusinessOpen && `until ${closeTime}`}
      </span>
    </p>
  );
};
export default SearchListing;
