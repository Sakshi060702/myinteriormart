import React from "react";
import "../FrontEnd/css/dropdown.css";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/authSlice";
import '../FrontEnd/css/RegistrationMV.css'

const Dropdown = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleProfileClick = () => {
    window.location.href = "/profile2";
    // Handle profile click action
  };

  const cityName = localStorage.getItem('cityname');
  const pathhome = `/${cityName}`;

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate(pathhome);
   };

  return (
    <div className="dropdown1" style={{width:'195px'}}>
      <ul style={{justifyContent:'left'}}>
        {/* <li onClick={handleProfileClick}>
          <i style={{ marginRight: "10px" }}></i>Profile
        </li> */}
        <li style={{marginRight:'60px',marginTop:'10px'}}>
          <Link to={`/Myactivity/${localStorage.getItem('cityname')}`} style={{color:'black'}}>
            <i className="fa fa-user" ></i> Dashboard
          </Link>
        </li>
        {/* <li>
          <Link to="/userpersonalinformation" style={{color:'black'}}>
          <i style={{ marginRight: "10px" }}></i>Personal Info
          </Link>
        
        </li> */}
        <li style={{marginRight:'84px',marginTop:'-8px'}} >
        <i className="fa fa-gear" style={{ marginRight: "10px" }}></i>Settings
        </li>
        <li style={{marginTop:'-8px' ,marginRight:'1px'}}>
        <i className="fa fa-key" style={{ marginRight: "10px" }}></i>Change Password
        </li>
        <li onClick={handleLogoutClick} style={{marginRight:'84px' ,marginTop:'-8px'}}>
          <i className="fa fa-sign-out" style={{ marginRight: "10px" }}></i>Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;