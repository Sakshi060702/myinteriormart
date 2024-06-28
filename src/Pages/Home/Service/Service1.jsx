import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListingHomeImage from "../../../FrontEnd/img/banner/Services.jpg";
import fslide from "../../../FrontEnd/img/banner/Dream Land Home.jpg";
import "../../../FrontEnd/css/Service.css";
import "../../../FrontEnd/css/Cate.css";

const Services1 = () => {
  const [categories, setCategories] = useState([]);
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
      setCategories(data.services);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const displayedCategories = categories.slice(16, 33);
  const initialCategories = categories.slice(0, 16);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
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
                SERVICES
              </button>
            </div>

            <div
              className={`mim-HomeSideMenu ${
                isMobileMenuVisible ? "mobile-visible" : ""
              }`}
            >
              <ul>
                {displayedCategories.map((category) => {
                  const icon = `/FileManager/CategoryIcons/Second/${category.imageURL}.png`;
                  return (
                    <li key={category.secondCategoryID}>
                      <Link
                        to={`/subcategories/${category.secondCategoryID}`}
                        title={category.searchKeywordName}
                        style={{ color: "black" }}
                      >
                        <img
                          src={icon}
                          alt={category.searchKeywordName}
                          className="img-fluid image"
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
                    src={ListingHomeImage}
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
                          key={category.secondCategoryID}
                        >
                          <Link
                            to={`/subcategories/${category.secondCategoryID}`}
                            title={category.searchKeywordName}
                          >
                            <img
                              src={icon}
                              alt={category.searchKeywordName}
                              className="img-fluid bigimage"
                            />
                            <p>{category.name}</p>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row py-1">
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={fslide} className="img-fluid" alt="First Slide" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services1;
