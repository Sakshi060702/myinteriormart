import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../FrontEnd/css/Paymentmode.css";
import successimg from "../../FrontEnd/img/mimsuccess.png";
import Deleteimg from "../../FrontEnd/img/userdelete3.png";
import DeleteAcccountPopup2 from "./DeleteAccoutnPopup2";

const DeleteAcccountPopup1 = ({ isOpen, onClose }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const [listingPackage, setListingPackage] = useState([]);
  const [listingId, setListingId] = useState(null);
  const [status, setStatus] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const cityName = localStorage.getItem("cityname");
  const pathlisting = `/${cityName}`;

  const listingpage = `/labournakapage`;

  //   useEffect(() => {
  //     fetch(
  //       "https://apidev.myinteriormart.com/api/ListingPackage/GetListingPackage",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setListingPackage(data.listingPackages); // Set listing packages
  //       })
  //       .catch((error) => console.error("Error fetching listing packages:", error));
  //   }, []);

  // Fetch listing status and ID
  //   const fetchStatus = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://apidev.myinteriormart.com/api/ManageListingFromStatus/GetManageListingFromStatus",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       const data = await response.json();
  //       setStatus(data.status);
  //       setListingId(data.listingId); // Set the listing ID from the API
  //       console.log(data.listingId);
  //     } catch (error) {
  //       console.error("Error fetching status:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchStatus();
  //   }, [token]);

  // const handleContinue = () => {
  //   onClose();
  //   navigate(pathlisting);
  // };

  const handleContinue = () => {
    onClose();
    if (!listingId) {
      console.error("Listing ID is not available");
      return;
    }

    // const packageData = {
    //   companyID: listingId,
    //   PackageID: packageId, // Use the package ID from the clicked button
    // };

    // fetch(
    //   "https://apidev.myinteriormart.com/api/PackageBuy/UpdatePackageStatus",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(packageData),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Package status updated", data);
    //     navigate(pathlisting);
    //   })
    //   .catch((error) => console.error("Error updating package status:", error));
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRedirect = () => {
    navigate(listingpage);
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
          <button className="close-button" onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}>
            X
          </button>
            <div>
              <img
                src={Deleteimg}
                className="paymentimage"
                style={{ height: "80px", width: "80px", marginBottom: "12px" }}
              ></img>
              <h3
                className="success-message"
                style={{ textAlign: "center", color: "black" }}
              >
                Delete User Account
              </h3>
              <h6 style={{ textAlign: "center", color: "red" }}>
                Are you sure want to Delete this Acccount
              </h6>
            </div>

            <div className="UDApopup1tbtn">
              <div className="UDApopupbutton1-container paymentgatewaypopup">
                <button onClick={togglePopup} className="udpbtn1">
                  Yes
                </button>
              </div>
              <div className="UDApopupbutton2-container paymentgatewaypopup">
                <button onClick={() => handleRedirect()} className="udpbtn2">
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <DeleteAcccountPopup2 isOpen={showPopup} onClose={togglePopup} />
    </>
  );
};

export default DeleteAcccountPopup1;
