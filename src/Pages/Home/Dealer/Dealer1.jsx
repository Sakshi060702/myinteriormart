import React, { useState,useRef } from "react";
import { useEffect } from "react";
import ListingHomeImage from "../../../FrontEnd/img/banner/Dealers.jpg";
import { Link,useNavigate,useLocation } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import "../../../FrontEnd/css/Cate.css";
import CryptoJS from "crypto-js";
import { Carousel } from "react-bootstrap";
import { saveScrollPosition,restoreScrollPosition } from "../../Scrollutilis";

const encryptionKey = "myinterriorMart@SECRETKEY";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function Dealer1() {
  const [catDealer, setcatDealer] = useState([]);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const [dealerBanners, setdealerBanners] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const categoryRefs = useRef({});

  useEffect(() => {
    fetchCategories();
    handleScroll();
  }, [location]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      setcatDealer(data.dealers);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  

  const displayedCategories = catDealer.slice(16, 33);
  const initialCategories = catDealer.slice(0, 16);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Banners/GetFilteredBanners`
        );
        const data = await response.json();
        setdealerBanners(data.galleryBannerImages.dealerBanners);
      } catch (error) {
        console.error("Error fetching banner images", error);
      }
    };
    fetchBannerImages();
  }, []);

  
  // useEffect(() => {
  //   const categoryID = new URLSearchParams(location.search).get("categoryID");
  //   if (categoryID && categoryRefs.current[categoryID]) {
  //     categoryRefs.current[categoryID].scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [location]);

  // Navigate to the category page and store the category ID in URL parameters
  // const handleCategoryClick = (category) => {
  //   const categoryID = category.secondCategoryID;
  //   navigate(`/Dealer/Category/${category.name.replace(/\s+/g, "-").toLowerCase()}/in-${localStorage.getItem("cityname")}?fircatEncyt=${encodeURIComponent(encrypt(categoryID))}&categoryID=${categoryID}`);
  // };

  // useEffect(() => {
    
  //   const hash = window.location.hash;
  //   if (hash) {
  //     const element = document.getElementById(hash.replace("#", ""));
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // }, []);

  const handleScroll = () => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };


  // useEffect(()=>{
  //   restoreScrollPosition('Dealerscrollposition');
  //   return()=>{
  //     saveScrollPosition('Dealerscrollposition')
  //   };
  // },[location.key]);

  return (
    <>
      <div className="category-featured">
        <div className="show-brand">
          <div className="row">
            <div className="col-lg-2 col-md-12 category-list">
              <div className="navbar-brand">
                <button
                  className="btn btn-link navbar-brand-btn"
                  type="button"
                  onClick={toggleMobileMenu}
                >
                  DEALERS
                </button>
              </div>

              <div
                className={`mim-HomeSideMenu ${
                  isMobileMenuVisible ? "mobile-visible" : ""
                }`}
              >
                <ul>
                  {displayedCategories.map((cat) => {
                    const icon = `/FileManager/CategoryIcons/Second/${cat.imageURL}.png`;

                    return (
                      <li className="mim-box-list" key={cat.secondCategoryID}>
                        <Link
                          to={`/Dealer/Category/${cat.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/in-${localStorage.getItem(
                            "cityname"
                          )}?fircatEncyt=${encodeURIComponent(
                            encrypt(parseInt(cat.secondCategoryID))
                          )}`+ `#testingBannerFor_scroll`}
                          
                        >
                          <img
                            src={icon}
                            alt={cat.searchKeywordName}
                            className="img-fluid"
                          />
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mim-box-list">More &gt;&gt;</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-10 col-md-12 brand-category-list" id="testingBannerFor_scroll">
              <div className="mim-Box">
                <div className="row no-gutters">
                  <div className="col-md-4 mim-Box-img">
                    <div className="carasoualVerticalHeight"> 
                    <Carousel
                      interval={5000}
                      autoPlay={true}
                      fade
                      animationEffect="Fade"
                      pause={false}
                      controls={false}
                    >
                      {dealerBanners.length > 0 ? (
                        dealerBanners.map((banner) => (
                          <Carousel.Item key={banner.id}>
                            <a href={banner.bannerLink} target="_blank" rel="noopener noreferrer">
                            <img
                              className="d-block w-100 bannerimg"
                              src={`https://admin.myinteriormart.com${banner.imagePath}`}
                              alt={`Banner ${banner.location}`}
                              style={{
                                width: "100%",
                                maxWidth: "1200px",
                                maxWidth: "1200px",
                              }}
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
                  <div className="col-md-8">
                    <div className="tab-content checkout" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="cutomize"
                        role="tabpanel"
                        aria-labelledby="cutomize"
                      >
                        <div className="row no-gutters">
                          {initialCategories.map((cat) => {
                            const icon = `/FileManager/CategoryIcons/Second/${cat.imageURL}.png`;
                            return (
                              <div
                                className="col-md-3 col-sm-3 col-3 mim-Box-item servicecategorybox"
                                
                                key={cat.secondCategoryID}
                              >
                                <Link
                                  to={`/Dealer/Category/${cat.name
                                    .replace(/\s+/g, "-")
                                    .toLowerCase()}/in-${localStorage.getItem(
                                    "cityname"
                                  )}?fircatEncyt=${encodeURIComponent(
                                    encrypt(parseInt(cat.secondCategoryID))
                                  )}`+ `#testingBannerFor_scroll`}
                                  title={cat.searchKeywordName}
                                >
                                  <img
                                    src={icon}
                                    alt={cat.searchKeywordName}
                                    className="img-fluid"
                                  />
                                  <p>{cat.name}</p>
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="monopoly"
                        role="tabpanel"
                        aria-labelledby="monopoly"
                      >
                        dasd1a231d31sad
                      </div>
                      <div
                        className="tab-pane fade"
                        id="latest"
                        role="tabpanel"
                        aria-labelledby="latest"
                      >
                        dasd1a231d31sad
                      </div>
                      <div
                        className="tab-pane fade"
                        id="running"
                        role="tabpanel"
                        aria-labelledby="running"
                      >
                        dasd1a231d31sad
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dealer1;
