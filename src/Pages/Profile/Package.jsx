import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import packageimg from "../../FrontEnd/img/ContactUs.jpeg";
import { useNavigate } from "react-router-dom";

function Package() {
  const [listingPackage, setListingPackage] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    fetch(
      "https://apidev.myinteriormart.com/api/ListingPackage/GetListingPackage",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setListingPackage(data.listingPackages))
      .catch((error) => console.error("Error fetching enquiries:", error));
  });

  const handleClick=()=>{
    navigate(`/Paymentgateway/${localStorage.getItem('cityname')}`)
  }

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>Upgrad Package</h5>
          <div className="row">
            {listingPackage.length > 0 ? (
              listingPackage.map((pkg) => (
                <div className="col-md-4 col-6 mb-3" key={pkg.id}>
                  <div className="add_listing_card  justify-content-start packagebox">
                    <div>
                      <img
                        className="packageimg"
                        src={`https://admin.myinteriormart.com${pkg.packageImagepath}`}
                      ></img>
                    </div>
                    <div style={{ padding: "13px" }}>
                      <div
                        className="add_listing_card_title"
                        style={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        {pkg.packageTitle}
                      </div>
                      <div className="add_listing_card_descriptionl">
                        {pkg.packageDescription
                          .split("\r\n")
                          .map((line, index) => (
                            <p className="descriptionline" key={index}>{line}</p>
                          ))}
                      </div>
                      <div
                        className="add_listing_card_price"
                        style={{ textAlign: "center" }}
                      >
                        Price:{pkg.price}
                      </div>
                    </div>

                    <div className="add_listing_card_btn">
                      <button className="buybtn" onClick={handleClick}>BUY</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Package found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Package;
