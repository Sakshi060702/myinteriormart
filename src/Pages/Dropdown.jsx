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
          <Link to="/labournakapage" style={{color:'black'}}>
            <i style={{ marginRight: "10px"}}></i> My Profile
          </Link>
        </li>
        <li>
          <Link to="/userpersonalinformation" style={{color:'black'}}>
          <i style={{ marginRight: "10px" }}></i>Personal Info
          </Link>
        
        </li>
        <li>
        <i style={{ marginRight: "10px" }}></i>Settings
        </li>
        <li>
        <i style={{ marginRight: "10px" }}></i>Change Password
        </li>
        <li onClick={handleLogoutClick}>
          <i style={{ marginRight: "10px" }}></i>Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;