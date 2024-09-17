import React, { useState } from "react";
import { useEffect } from "react";
import ContractorImage from "../../../FrontEnd/img/banner/Contractor.jpg";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import "../../../FrontEnd/css/Cate.css";
import CryptoJS from "crypto-js";
import { Carousel } from 'react-bootstrap';
import fslide from "../../../FrontEnd/img/banner/Dream Land Home1.jpg";
import seslide from "../../../FrontEnd/img/access_bg.jpg";
import tslide from "../../../FrontEnd/img/banner/Interior1.jpg"




const encryptionKey = 'myinterriorMart@SECRETKEY';

const encrypt = (text) => {
  
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};


const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function Contractor1() {
  const [catContractor, setcatContractor] = useState([]);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      setcatContractor(data.contractors);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const displayedCategories = catContractor.slice(16, 33);
  const initialCategories = catContractor.slice(0, 16);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

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
                  onClick={toggleMobileMenu}>
                  CONTRACTOR
                </button>
              </div>

              <div
                className={`mim-HomeSideMenu ${
                  isMobileMenuVisible ? "mobile-visible" : ""
                }`}>
                <ul>
                  {displayedCategories.map((category) => {
                    const icon = `/FileManager/CategoryIcons/Second/${category.imageURL}.png`;

                    return (
                      <li
                        className="mim-box-list"
                        key={category.secondCategoryID}>
                        <Link
                          to={`/Contractor/${category.name
                            .replace(/\s+/g, "-")
                            .toLowerCase()}/in-${localStorage.getItem("cityname")}?fircatEncyt=${encodeURIComponent(encrypt(parseInt(category.secondCategoryID)))}`}
  
                          title={category.searchKeywordName}
                          style={{ color: "black" }}>
                          <img
                            src={icon}
                            alt={category.searchKeywordName}
                            className="img-fluid"
                          />
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                  <li className="mim-box-list">More &gt;&gt;</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-10 col-md-12 brand-category-list" style={{paddingLeft:'2px'}}>
              <div className="mim-Box">
                <div className="row no-gutters">
                  <div className="col-md-4 mim-Box-img" style={{paddingRight:'2px'}}>
                    <img
                      src={ContractorImage}
                      className="img-fluid"
                      alt="Banner"
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="row no-gutters">
                      {initialCategories.map((category) => {
                        const icon = `/FileManager/CategoryIcons/Second/${category.imageURL}.png`;
                        return (
                          <div
                            className="col-md-3 col-sm-3 col-3 mim-Box-item" style={{height:'142px'}}
                            key={category.secondCategoryID} >
                            <Link
                              to={`/Contractor/${category.name
                                .replace(/\s+/g, "-")
                                .toLowerCase()}/in-${localStorage.getItem("cityname")}?fircatEncyt=${encodeURIComponent(encrypt(parseInt(category.secondCategoryID)))}`}
      
                              title={category.searchKeywordName}>
                              <img
                                src={icon}
                                alt={category.searchKeywordName}
                                className="img-fluid"
                              />
                              <p>{category.name}</p>
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

      <div class="row py-1">
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 bannerimg"
          src={fslide}
          alt="First slide"
          style={{ width: '100%', maxWidth: '1200px' }}
        />
        {/* <Carousel.Caption>
          <h3>First Slide</h3>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100 bannerimg"
          src={tslide}
          alt="Second slide"
          style={{ width: '100%', maxWidth: '1200px' }}
        />
        {/* <Carousel.Caption>
          <h3>Second Slide</h3>
        </Carousel.Caption> */}
      </Carousel.Item>

      {/* Add more slides as needed */}
    </Carousel>

      </div>
    </>
  );
}
export default Contractor1;
