import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Listingpayment from "../Listing/Listingpayment";

function Package() {
  const [listingPackage, setListingPackage] = useState([]);
  const [packageId, setPackageId] = useState(null); // Package ID for the clicked package
  const [listingId, setListingId] = useState(null); // Listing ID from GetManageListingFromStatus API
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();
  const [packageStatus, setPackageStatus] = useState([]);
  const [statusMessage, setStausMessage] = useState([]);

  const { token } = useSelector((state) => state.auth);

  // Fetch listing packages
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
      .then((data) => {
        setListingPackage(data.listingPackages); // Set listing packages
      })
      .catch((error) =>
        console.error("Error fetching listing packages:", error)
      );
  }, []);

  // Fetch listing status and ID
  const fetchStatus = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/ManageListingFromStatus/GetManageListingFromStatus",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setStatus(data.status);
      setListingId(data.listingId); // Set the listing ID from the API
      console.log(data.listingId);
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [token]);

  useEffect(() => {
    const fetchPackageStatuses = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/UpdatePackageStatus/UpdatePackageStatus",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        // Create an object with packageID as the key and packageStatus as the value
        const statusMap = data.reduce((acc, curr) => {
          if (!acc[curr.listingID]) {
            acc[curr.listingID] = {};
            console.log("packlistingid", curr.listingID);
          }
          console.log("packid", curr.packageID);
          acc[curr.listingID][curr.packageID] = {
            packageStatus: curr.packageStatus,
            statusMessage: curr.statusMessage,
          };
          console.log("packagestatus", packageStatus);
          console.log("packagemessage", statusMessage);

          return acc;
        }, {});
        console.log('statusMap',statusMap);

        setPackageStatus(statusMap);
      } catch (error) {
        console.error("Error fetching package statuses:", error);
      }
    };

    fetchPackageStatuses();
  }, []);

  // Helper function to get button color based on package status
  const getStatusColor = (status) => {
    if (status === "1") return "green";
    if (status === "0") return "red";
    return "orange";
  };

  // Handle click to redirect without updating the package status
  const handleClick = (pkgId) => {
    navigate(`/Paymentgateway/${localStorage.getItem("cityname")}`, {
      state: { packageId: pkgId },
    });
  };

  // Handle click to purchase package
  // const handleClick = (pkgId) => {
  //   if (!listingId) {
  //     console.error("Listing ID is not available");
  //     return;
  //   }

  //   const packageData = {
  //     companyID: listingId,
  //     PackageID: pkgId, // Use the package ID from the clicked button
  //   };

  //   fetch(
  //     "https://apidev.myinteriormart.com/api/UpdatePackageStatus/UpdatePackageStatus",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(packageData),
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Package status updated", data);
  //       navigate(`/Paymentgateway/${localStorage.getItem("cityname" )}`,{ state: { packageId: pkgId } });
  //     })
  //     .catch((error) => console.error("Error updating package status:", error));
  // };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>Upgrade Package</h5>
          <div className="row">
            {listingPackage.length > 0 ? (
              listingPackage.map((pkg) => (
                <div className="col-md-4 col-6 mb-3" key={pkg.id}>
                  <div className="add_listing_card  justify-content-start packagebox">
                    <div>
                      <img
                        className="packageimg"
                        src={`https://admin.myinteriormart.com${pkg.packageImagepath}`}
                        alt={pkg.packageTitle}
                      />
                    </div>
                    <div style={{ padding: "13px" }}>
                      <div
                        className="add_listing_card_title"
                        style={{ textAlign: "center", fontWeight: "bold" }}
                      >
                        {pkg.packageTitle}
                      </div>
                      <div className="add_listing_card_description">
                        {pkg.packageDescription
                          .split("\r\n")
                          .map((line, index) => (
                            <p className="descriptionline" key={index}>
                              {line}
                            </p>
                          ))}
                      </div>
                      <div
                        className="add_listing_card_price"
                        style={{ textAlign: "center" }}
                      >
                        Price: {pkg.price}
                      </div>
                    </div>

                    <div className="add_listing_card_btn">
                      <button
                        className="buybtn"
                        style={{
                          backgroundColor: getStatusColor(
                            packageStatus[listingId]?.[pkg.id]?.packageStatus
                          ),
                          color: "white",
                        }}
                        onClick={() => handleClick(pkg.id)}
                        disabled={
                          packageStatus[listingId]?.[pkg.id]?.packageStatus ===
                          "1"
                        }
                      >
                        {packageStatus[listingId]?.[pkg.id]?.statusMessage ||
                          "BUY"}
                      </button>
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
