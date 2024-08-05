import React from "react";
import "../FrontEnd/css/dropdown.css";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";

const Dropdown = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleProfileClick = () => {
    window.location.href = "/profile2";
    // Handle profile click action
  };

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/");
   };

  return (
    <div className="dropdown1">
      <ul>
        {/* <li onClick={handleProfileClick}>
          <i style={{ marginRight: "10px" }}></i>Profile
        </li> */}
        <li>
          <Link to="/Myactivity" style={{color:'black'}}>
            <i className="fa fa-user" ></i> Dashboard
          </Link>
        </li>
        {/* <li>
          <Link to="/userpersonalinformation" style={{color:'black'}}>
          <i style={{ marginRight: "10px" }}></i>Personal Info
          </Link>
        
        </li> */}
        <li>
        <i className="fa fa-gear" style={{ marginRight: "10px" }}></i>Settings
        </li>
        <li>
        <i className="fa fa-key" style={{ marginRight: "10px" }}></i>Change Password
        </li>
        <li onClick={handleLogoutClick}>
          <i className="fa fa-sign-out" style={{ marginRight: "10px" }}></i>Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;