import React, { useState } from "react";
import { useEffect } from "react";
import ContractorImage from "../../../FrontEnd/img/banner/Contractor.jpg";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import "../../../FrontEnd/css/Cate.css";

import fslide from "../../../FrontEnd/img/banner/Dream Land Home.jpg";
import sslide from "../../../FrontEnd/img/banner/Furniture.jpg";

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
                          to={`/Thirdcategoriesc/${category.secondCategoryID}${localStorage.getItem('cityname')}`}
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
            <div className="col-lg-10 col-md-12 brand-category-list">
              <div className="mim-Box">
                <div className="row no-gutters">
                  <div className="col-md-4 mim-Box-img">
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
                            className="col-md-3 col-sm-3 col-3 mim-Box-item"
                            key={category.secondCategoryID} >
                            <Link
                              to={`/Thirdcategoriesc/${category.secondCategoryID}${localStorage.getItem('cityname')}`}
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
        <div
          id="carouselExampleFade"
          class="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={fslide} className="img-fluid" alt="First Slide" />
            </div>
            <div class="carousel-item">
              <img src={sslide} className="img-fluid" alt="Second Slide" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Contractor1;
