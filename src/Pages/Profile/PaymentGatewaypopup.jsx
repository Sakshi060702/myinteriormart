import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../FrontEnd/css/Paymentmode.css";
import successimg from "../../FrontEnd/img/mimsuccess.png";

const PaymetGatewaypopup = ({ isOpen, onClose, message,packageId  }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [listingPackage, setListingPackage] = useState([]);
  // const [packageId, setPackageId] = useState(null); // Package ID for the clicked package
  const [listingId, setListingId] = useState(null); // Listing ID from GetManageListingFromStatus API
  const[status,setStatus]=useState([]);
  

  const cityName = localStorage.getItem("cityname");
  const pathlisting = `/${cityName}`;

  const listingpage = `/labournakapage/in-${localStorage.getItem("cityname")}`;


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
      .catch((error) => console.error("Error fetching listing packages:", error));
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


  // const handleContinue = () => {
  //   onClose();
  //   navigate(pathlisting);
  // };


  const handleContinue = (pkgId) => {
    onClose();
    if (!listingId) {
      console.error("Listing ID is not available");
      return;
    }

    const packageData = {
      companyID: listingId,
      PackageID: packageId, // Use the package ID from the clicked button
    };

    fetch(
      "https://apidev.myinteriormart.com/api/PackageBuy/UpdatePackageStatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(packageData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Package status updated", data);
        navigate(pathlisting);
      })
      .catch((error) => console.error("Error updating package status:", error));
  };


  // const handlelisting = () => {
  //   onClose();
  //   navigate(listingpage);
  // };

  return (
    <>
      {isOpen && (
        <div className="popup2-overlay packagepayment" onClick={onClose}>
          <div className="popup2-content" onClick={(e) => e.stopPropagation()}>
            <div>
              <img
                src={successimg}
                className="paymentimage"
                style={{ height: "80px", width: "80px", marginBottom: "12px" }}
              ></img>
              <h3
                className="success-message"
                style={{ textAlign: "center", color: "orange" }}
              >
                Thank You
              </h3>
              <h6 style={{ textAlign: "center" }}>{message}</h6>
            </div>

            <div className="paymentbtn">
              <div className="popupbutton-container paymentgatewaypopup">
              <button
  onClick={() => handleContinue(packageId)}  // Pass the packageId correctly
  style={{ color: "white", fontSize: "18px" }}
>
  Continue
</button>

              </div>
              {/* <div className="popupbutton-container paymentgatewaypopup">
                <button
                  onClick={handlelisting}
                  style={{ color: "white", fontSize: "18px" }}
                >
                  Go to Listing
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymetGatewaypopup;
