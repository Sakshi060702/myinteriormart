import React from "react";
import "../FrontEnd/css/dropdown.css";
import { Link } from "react-router-dom";

const Dropdown = () => {
  const handleProfileClick = () => {
    window.location.href = "/profile2";
    // Handle profile click action
  };

  const handleLogoutClick = () => {
    // Handle logout click action
  };

  return (
    <div className="dropdown1">
      <ul>
        {/* <li onClick={handleProfileClick}>
          <i style={{ marginRight: "10px" }}></i>Profile
        </li> */}
        <li>
          <Link to="/labournakapage" style={{color:'black'}}>
            <i style={{ marginRight: "10px"}}></i>Profile
          </Link>
        </li>
        <li onClick={handleLogoutClick}>
          <i style={{ marginRight: "10px" }}></i>Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;