import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import banner from "../../FrontEnd/img/banner/banner2.png";
import banner1 from "../../FrontEnd/img/listing-img.jpeg"
import Popup from "./Popup";
import Getquotespopup from "./Getquotespopup";
import { useSelector } from "react-redux";

function Listingd() {
  const { secondCategoryId } = useParams();
  const [listing, setListing] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchListings();
  }, [secondCategoryId]);

  const token = useSelector((state) => state.auth.token);
  

  const fetchListings = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing`,
        {
          method: 'GET', // You can adjust the method if needed
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched Data", data);
      const filterdListing = data.filter((listing) => {
        return listing.subCategory.some(
          (subcat) => subcat.id.toString() === secondCategoryId
        );
      });
      setListing(filterdListing);
    } catch (error) {
      console.error("Error fetching listings", error);
    }
  };

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
                            <Link to={`/company/${listing.listingId}`}>
                              {" "}
                              {listing.companyName}
                            </Link>
                          </h3>
                          <small>
                            {listing.subCategory
                              .map((subCat) => subCat.name)
                              .join(", ")}
                          </small>
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
                                onClick={() => setIsPopupOpen(true)}
                              >
                                Get Quotes
                              </button>
                            </p>
                          </li>
                          <li>
                            <ul className="reating-list">
                              <li>
                                <h4 className="reating-number">{listing.ratingAverage}.0</h4>
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
      </div>
      {token ? (
        <Getquotespopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
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
export default Listingd;
