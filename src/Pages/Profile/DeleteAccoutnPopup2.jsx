import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../FrontEnd/css/Paymentmode.css";
import successimg from "../../FrontEnd/img/mimsuccess.png";
import Deleteimg from "../../FrontEnd/img/deletepopup.jpg";
import useAuthCheck from "../../Hooks/useAuthCheck";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/authSlice";

const DeleteAcccountPopup2 = ({ isOpen, onClose }) => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const [listingPackage, setListingPackage] = useState([]);
  const [listingId, setListingId] = useState(null);
  const [status, setStatus] = useState("");
  const [listingID, setListingID] = useState(null);

  const cityName = localStorage.getItem("cityname");
  const pathlisting = `/${cityName}`;

  const listingpage = `/labournakapage`;

  useEffect(() => {
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
        console.log("statusdata", data);
        setStatus(data.status);

        const fetchlistingId = data.listingId;
        console.log("listingidWorking", fetchlistingId);
        setListingID(fetchlistingId);
      } catch (error) {
        console.error("Error in fetching status data", error);
      }
    };
    fetchStatus();
  }, [token]);

  // const handleContinue = () => {
  //   onClose();
  //   navigate(pathlisting);
  // };

  const handleContinue = async () => {
    onClose();
    

    try {
      const DeleteResponse = await fetch(
        "https://apidev.myinteriormart.com/api/UserDeleteListingAccount/UserDeleteListing",
        {
          method: "POST",
           headers: {
            //  Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
           },
          body: JSON.stringify({ ListingID: listingID }),
        }
      );
      console.log("DeleteResponse", DeleteResponse);
      if (DeleteResponse.ok) {
        console.log("Account deleted succesfully");
        dispatch(logout());
        navigate("/");
      } else {
        console.error("Failed to delete account:", DeleteResponse.statusText);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }

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

  // const handlelisting = () => {
  //   onClose();
  //   navigate(listingpage);
  // };

  const handleRedirect = () => {
    navigate(listingpage);
  };

  return (
    <>
      {isOpen && (
        <div className="popup2-overlay packagepayment" onClick={onClose}>
          <div className="popup2-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
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
                Your Account will be Deleted permantly
              </h6>
              <h6 style={{ textAlign: "center", color: "black" }}>
                Are you sure to Proceed
              </h6>
            </div>

            <div className="UDApopup1tbtn">
              <div className="UDApopupbutton1-container paymentgatewaypopup">
                <button onClick={() => handleContinue()} className="udpbtn1">
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
    </>
  );
};

export default DeleteAcccountPopup2;
