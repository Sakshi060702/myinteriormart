import React, { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import banner from "../../FrontEnd/img/banner/banner2.png";
import banner1 from "../../FrontEnd/img/listing-img.jpeg";
import Popup from "./Popup";
import Getquotespopup from "./Getquotespopup";
import { useSelector } from "react-redux";
import "../../FrontEnd/css/Lisiting.css";
import "../../FrontEnd/css/RegistrationMV.css";

function Listingc() {
  const { secondCategoryId } = useParams();
  const [searchParams] = useSearchParams();
  const searching = searchParams.get("searchkey");
  const [listing, setListing] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchListings();
  }, [secondCategoryId, currentPage]);

  const token = useSelector((state) => state.auth.token);

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing?pageNumber=${currentPage}&pageSize=${itemsPerPage}&subCategoryid=${secondCategoryId}`,
        {
          method: "GET", // You can adjust the method if needed
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
      const filterdListing = data.filter((listing) => {
        return listing.subCategory.some(
          (subcat) => subcat.id.toString() === secondCategoryId
        );
      });
      setListing(filterdListing);
      if (filterdListing.length < itemsPerPage) {
        setTotalItems(
          (currentPage - 1) * itemsPerPage + filterdListing.length
        );
      } else {
        setTotalItems(currentPage * itemsPerPage + 1);
      }
    } catch (error) {
      console.error("Error fetching listings", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className="container" style={{ marginBottom: "30px" }}>
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
                  style={{ height: "350px", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="listing-list">
          {listing.length > 0 ? (
            listing.map((listing) => (
              <div key={listing.listingId} className="row mb-3">
                <div className="col-12">
                  <div className="strip map_view">
                    <div className="row no-gutters">
                      <div className="col-3">
                        {listing.logoImage && listing.logoImage.imagePath ? (
                          <img
                            // src={listing.logoImage.imagePath}
                            src={`https://apidev.myinteriormart.com${listing.logoImage.imagePath}`}
                            alt={`${listing.companyName} Logo`}
                            className="card-img-top"
                            style={{ height: "150px" }}
                          />
                        ) : (
                          <div className="client_first_letter">
                            {listing.companyFirstLetter}
                          </div>
                        )}
                      </div>
                      <div className="col-9">
                        <div className="wrapper">
                          <h3 style={{ color: "black" }}>
                            <Link
                              to={`/company/${listing.listingId}-${currentPage}-${itemsPerPage}-${secondCategoryId}`}
                            >
                              {" "}
                              {listing.companyName}
                            </Link>
                          </h3>
                          <small>{listing.listingKeyword}</small>
                          <p>
                            <i className="fa fa-map-marker"></i>
                            {listing.locality}, {listing.area}
                          </p>
                          <p>
                            <BusinessHours
                              businessWorking={listing.businessWorking}
                            />
                          </p>
                        </div>
                      </div>
                      <div className="col-lg-12 listing-bottom">
                        <ul className="listing-bottom-list">
                          <li>
                            <h5>
                              <b> + {listing.businessYear} Year Business</b>
                            </h5>
                          </li>
                          <li>
                            <p>
                              <Link className="loc_open call-now">
                                Call now
                              </Link>
                            </p>
                          </li>
                          <li>
                            <p>
                              <button
                                className="btn btn-guotes btn-sm"
                                onClick={() =>
                                  setIsPopupOpen([true, listing.listingId])
                                }
                              >
                                Get Quotes
                              </button>
                            </p>
                          </li>
                          <li>
                            <ul className="reating-list">
                              <li>
                                <h4 className="reating-number">
                                  {listing.ratingAverage}.0
                                </h4>
                              </li>
                              <li className="reating-star">
                                <div className="cat_star">
                                  {Array(listing.ratingAverage)
                                    .fill()
                                    .map((_, i) => (
                                      <i
                                        key={i}
                                        className="icon_star active"
                                        style={{ color: "orange" }}
                                      ></i>
                                    ))}
                                </div>
                              </li>
                              <li> {listing.ratingCount} Rating</li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No listings found for the selected category.</p>
          )}
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
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
            Next
          </button>
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
export default Listingc;
