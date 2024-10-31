import React from "react";
import "../FrontEnd/css/dropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import "../FrontEnd/css/RegistrationMV.css";

const Dropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    window.location.href = "/profile2";
    // Handle profile click action
  };

  const cityName = localStorage.getItem("cityname");
  const pathhome = `/`;

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate(pathhome);
  };

  return (
    <div className="dropdown1 profiledrp">
      <ul id="dropdown_logged_in_menu" style={{ justifyContent: "left" }}>
        {/* <li onClick={handleProfileClick}>
          <i style={{ marginRight: "10px" }}></i>Profile
        </li> */}
        <li style={{ marginRight: "60px", marginTop: "10px" }}>
          <Link
            className="droplink"
            to={`/Myactivity`}
            style={{ color: "black" }}
          >
            <i className="fa fa-user" style={{ color: "orange" }}></i> Dashboard
          </Link>
        </li>
        {/* <li>
          <Link to="/userpersonalinformation" style={{color:'black'}}>
          <i style={{ marginRight: "10px" }}></i>Personal Info
          </Link>
        
        </li> */}
        <li className="droplink drpsetting">
          <i
            className="fa fa-gear"
            style={{ marginRight: "10px", color: "orange" }}
          ></i>
          Settings
        </li>
        <li
          style={{ marginTop: "-8px", marginRight: "1px" }}
          className="droplink"
        >
          <i
            className="fa fa-key"
            style={{ marginRight: "10px", color: "orange" }}
          ></i>
          Change Password
        </li>
        <li onClick={handleLogoutClick} className="droplink drpsetting">
          <i
            className="fa fa-sign-out"
            style={{ marginRight: "10px", color: "orange" }}
          ></i>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
