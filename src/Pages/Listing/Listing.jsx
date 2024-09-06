import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, Link } from "react-router-dom";
import banner from "../../FrontEnd/img/home_section_1.jpg";
import banner1 from "../../FrontEnd/img/listing-img.jpeg";
import nextarrowimage from "../../FrontEnd/img/Frontarrow.png";
import previousarrowimg from "../../FrontEnd/img/Backarrow.png";
import Popup from "./Popup";
import Getquotespopup from "./Getquotespopup";
import "../../FrontEnd/css/Lisiting.css";
import "../../FrontEnd/css/RegistrationMV.css";
import Searchbar from "../Home/Component/Searchbar";
import CryptoJS from "crypto-js";

import { useSelector } from "react-redux";

const encryptionKey = "myinterriorMart@SECRETKEY";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function Listing() {
  const { secondCategoryName, subcategoryName } = useParams();
  const [searchParams] = useSearchParams();
  const searching = searchParams.get("searchkey");
  // console.log(searching,useParams());
  const [listing, setListing] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState([false, null]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const listingId_enc = searchParams.get("secatEncyt");
  const secondCategoryId = decrypt(decodeURIComponent(listingId_enc));
  console.log(secondCategoryId);
  console.log("secondcategoryid", secondCategoryId);
  console.log(decrypt(listingId_enc));

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

  useEffect(() => {
    fetchListings();
  }, [secondCategoryId, currentPage, secondCategoryName, subcategoryName]);

  const token = useSelector((state) => state.auth.token);
  console.log("token", token);

  // console.log(encrypt(listing.listingId));

  const fomattedcity = localStorage.getItem("cityname");

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}&cityName=${fomattedcity}`,
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
          (subcat) => subcat.id.toString() === secondCategoryId
        );
      });

      setListing(filterdListing);
      // console.log(filteredListing)
      // console.log(itemsPerPage);

      if (filterdListing.length < itemsPerPage) {
        setTotalItems((currentPage - 1) * itemsPerPage + filterdListing.length);
      } else {
        setTotalItems(currentPage * itemsPerPage + 1);
      }
    } catch (error) {
      console.error("Error fetching listings", error);
    }
  };

  const fetchListingsmobile = async (isAppending = false) => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}&cityName=${fomattedcity}`,
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
          (subcat) => subcat.id.toString() === secondCategoryId
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

  return (
    <>
      <div className="container" style={{ marginBottom: "30px" }}>
        <div className="sticky-searchbar">
          <Searchbar />
        </div>

        <div
          className="banner-block one-block"
          style={{ marginBottom: "30px" }}
        >
          <div className="row">
            <div className="col-12">
              <div className="grid-item">
                <img
                  src={banner1}
                  alt="Banner"
                  style={{ height: "230px", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div className="listing-list row col-md-8 col-lg-8 col-sm-12 col-xl-8">
            {listing.length > 0 ? (
              listing.map((listing) => (
                <div key={listing.listingId} className="row mb-10">
                  <div className="col-12">
                    <div className="strip map_view stripmapviewdesign">
                      {/* <h5>Hello world</h5> */}
                      <h6 className="listingcompanyname">
                        <Link
                          className="listingcompany"
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
                      </h6>
                      <div
                        className="row no-gutters "
                        style={{
                          border:
                            searching == listing.listingKeyword
                              ? "2px solid gray"
                              : "None",
                        }}
                      >
                        <div className="col-6">
                          <div className="wrapper">
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
                            <small>{listing.listingKeyword}</small>

                            <p>
                              <i
                                className="fa fa-map-marker"
                                style={{ paddingRight: "5px" }}
                              ></i>
                              {listing.locality}, {listing.area}
                            </p>
                            <div className="business-info-container">
                              <BusinessHours
                                businessWorking={listing.businessWorking}
                              />

                              {/* Rating below business hours for mobile */}
                              {/* Rating below business hours for mobile */}
                              <div className="rating-container mobile">
                                <div
                                  className="listingrating"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h4
                                    className="reating-number reactingnumberfont"
                                    style={{ marginRight: "8px" }}
                                  >
                                    {listing.ratingAverage}
                                  </h4>
                                  <div
                                    className="cat_star listingstar"
                                    style={{
                                      display: "flex",
                                      paddingBottom: "11px",
                                    }}
                                  >
                                    {Array(5)
                                      .fill()
                                      .map((_, i) => (
                                        <i
                                          key={i}
                                          className="icon_star"
                                          style={{
                                            color:
                                              i < listing.ratingAverage
                                                ? "orange"
                                                : "gray",
                                            fontSize: "16px",
                                            marginRight: "2px",
                                          }}
                                        ></i>
                                      ))}
                                  </div>
                                </div>
                              </div>

                              <div
                                className="rating-container desktop st"
                                style={{ marginLeft: "8px" }}
                              >
                                <ul
                                  className="listingrating"
                                  style={{
                                    marginTop: "-40px",
                                    marginLeft: "-26px",
                                    marginBottom: "-13px",
                                  }}
                                >
                                  <ul className="reating-list">
                                    <li>
                                      <h4 className="reating-number reactingnumberfont">
                                        {listing.ratingAverage}.0
                                      </h4>
                                    </li>
                                    <li className="reating-star">
                                      <div className="cat_star">
                                        {Array(5)
                                          .fill()
                                          .map((_, i) => (
                                            <i
                                              key={i}
                                              className="icon_star"
                                              style={{
                                                color:
                                                  i < listing.ratingAverage
                                                    ? "orange"
                                                    : "gray",
                                                fontSize: "16px",
                                              }}
                                            ></i>
                                          ))}
                                      </div>
                                    </li>
                                    <li>{listing.ratingCount} Rating</li>
                                  </ul>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-2 listingcompanyletter">
                          {listing.logoImage && listing.logoImage.imagePath ? (
                            <img
                              src={`https://apidev.myinteriormart.com${listing.logoImage.imagePath}`}
                              alt={`${listing.companyName} Logo`}
                              className="card-img-top listingimage"
                              // style={{ height: "150px" }}
                            />
                          ) : (
                            <div
                              className="client_first_letter listingimage"
                              // style={{ height: "141px", width: "141px" }}
                            >
                              {listing.companyFirstLetter}
                            </div>
                          )}
                        </div>

                        <div className="col-lg-12 listing-bottom">
                          <ul className="listing-bottom-list">
                            {/* Rating in listing bottom for desktop */}
                            <div>
                              <div>
                                <li className="listingyear listingyearmim">
                                  <h5 className="yearbusiness">
                                    <p>
                                      {" "}
                                      + {listing.businessYear} Year Business
                                    </p>
                                  </h5>
                                </li>
                              </div>
                            

                            <div style={{ display: "flex" }}>
                              <div>
                                <li
                                  style={{
                                    marginLeft: "4px",
                                    marginRight: "0px",
                                    marginTop: "-6px",
                                  }}
                                >
                                  <p className="listingcallnow">
                                    <Link
                                      className="loc_open call-now callnowl  listingcallnowinner listingcallnow_btn"
                                     
                                    >
                                      Call now
                                    </Link>
                                  </p>
                                </li>
                              </div>
                              <div>
                                <li>
                                  <p className="listinggetclaim">
                                    <button
                                      className="btn btn-guotes btn-sm getclaimbtn"
                                      onClick={() =>
                                        setIsPopupOpen([
                                          true,
                                          listing.listingId,
                                        ])
                                      }
                                    >
                                      Get Claim
                                    </button>
                                  </p>
                                </li>
                              </div>
                            </div>
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
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
              <p>Comming soon.</p>
            )}
          </div>

          <div className="col-4 listingbanner">
            <div className="grid-item" style={{ paddingBottom: "6px" }}>
              <img
                src={banner}
                alt="Banner"
                style={{ height: "474px", width: "100%" }}
              />
            </div>
            <div className="grid-item">
              <img
                src={banner1}
                alt="Banner"
                style={{ height: "474px", width: "100%" }}
              />
            </div>
          </div>
        </div>

        <div className="pagination">
          {/* for dekstop */}
          {!isMobile && (
            <>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {/* Previous */}
                <img src={previousarrowimg} style={{ height: "30px" }} />
              </button>
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
                {/* Next */}
                <img src={nextarrowimage} style={{ height: "30px" }} />
              </button>
            </>
          )}

          {/* mobile view more */}
          {isMobile && listing.length === itemsPerPage && (
            <button onClick={handleViewMore} className="view-more-btn">
              View More
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
export default Listing;
