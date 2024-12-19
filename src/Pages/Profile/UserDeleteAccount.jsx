import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import profileImg from "../../FrontEnd/img/icon/profile.png";
import PaymetGatewaypopup from "./PaymentGatewaypopup";
import DeleteAcccountPopup1 from "./DeleteAccountpopup1";

function UserDeleteAccount() {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className="tab-pane fade show active UDAmainDiv" >
        <div className="add-review">
          <div>
            <img className="UDAimg" src={profileImg}></img>
          </div>
          <div className="UDAhead">
            <h4 className="UDAheading">Delete User Account</h4>
          </div>
          <div>
            <button className="UserdeleteAccBtn" onClick={togglePopup}>
              Delete User Account
            </button>
          </div>
        </div>
      </div>
      <DeleteAcccountPopup1 isOpen={showPopup} onClose={togglePopup} />
    </>
  );
}

export default UserDeleteAccount;
