import React, { useState } from "react";
import { useEffect } from "react";
import ListingHomeImage from "../../../FrontEnd/img/banner/Dealers.jpg";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import "../../../FrontEnd/css/Cate.css";

function Dealer1() {
  const [catDealer, setcatDealer] = useState([]);
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
                        <Link to={`/Thirdcategoriesd/${cat.secondCategoryID}`}>
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
                                className="col-md-3 col-sm-3 col-3 mim-Box-item"
                                key={cat.secondCategoryID}
                              >
                                <Link
                                  to={`/Thirdcategoriesd/${cat.secondCategoryID}`}
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
