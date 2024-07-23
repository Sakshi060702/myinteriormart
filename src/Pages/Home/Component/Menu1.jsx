import React, { useEffect, useRef, useState } from "react";
import logoSticky from "../../../FrontEnd/img/logo_sticky.svg";
import { NavLink } from "react-router-dom";
import notificationIcon from "../../../FrontEnd/img/icon/notification1.png";
import usericon from "../../../FrontEnd/img/icon/user1.png";
import Dropdown from "../../Dropdown";
import Notification from "../../Notification";
import "../../../FrontEnd/css/Header.css";
import { useSelector,useDispatch } from "react-redux";

function Menu1() {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const[userProfile,setUserProfile]=useState(null);

  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const toogleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const dropRef = useRef(null);

  const toggleNotificationMenu = () => {
    setShowNotificationMenu(!showNotificationMenu);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropRef.current && !dropRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notificationRef = useRef(null);
  const handleclickoutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotificationMenu(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleclickoutside);
    return () => {
      document.removeEventListener("mousedown", handleclickoutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('https://apidev.myinteriormart.com/api/UserProfile/GetUserProfile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        dispatch(setUserProfile(data)); // Dispatch the user profile data to Redux
      } catch (error) {
        console.error(error);
      }
    };

    if (token) {
      fetchUserProfile();
    }
  }, [token, dispatch]);



  return (
    <>
      <header className="header_in">
        <div className="container" style={{ background: "#fff" }}>
          <div className="row">
            <div className="col-lg-3 col-12">
              <div id="logo" className="logo">
                <NavLink to={"/"} title="index">
                  <img
                    src={logoSticky}
                    width="220"
                    alt="logo"
                    className="logo_sticky"
                  />
                </NavLink>
              </div>
            </div>
            <div className="col-lg-9 col-12 navitems">
              <ul className={`nav-links ${showMenu ? "active" : ""}`}>
                <li>
                  <span>
                    <NavLink
                      to="/categorylist"
                      onClick={closeMenu}
                      style={{ fontSize: "14px", color: "black" }}
                    >
                      Suggestion
                    </NavLink>
                  </span>
                </li>
                <li>
                  <NavLink
                    to="/layout"
                    className="btn_add listing-btn"
                    style={{ backgroundColor: "#fe900d", fontSize: "14px" }}
                    onClick={closeMenu}
                  >
                    Free Listing
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/signup2"
                    className="btn_add listing-btn"
                    style={{ backgroundColor: "#fe900d", fontSize: "14px" }}
                    onClick={closeMenu}
                  >
                    Signup
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/login"
                    className="btn_add listing-btn"
                    style={{ backgroundColor: "#fe900d", fontSize: "14px" }}
                    onClick={closeMenu}
                  >
                    Login
                  </NavLink>
                </li>
              </ul>
              <div
                className="notification-user"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div
                  className="dropdown notification"
                  ref={notificationRef}
                  style={{ marginLeft: "20px" }}
                >
                  <button
                    type="button"
                    onClick={toggleNotificationMenu}
                    style={{ background: "none", border: "none" }}
                  >
                    <img src={notificationIcon} alt="notification" />
                    {showNotificationMenu && <Notification />}
                  </button>
                </div>
                <div 
                id="profileid"
                  className="dropdown usericon"
                  ref={dropRef}
                  style={{ marginLeft: "20px", alignItems: "center" }}
                >
                  <button
                    className="usericon-btn dropdown-toggle"
                    type="button"
                    onClick={toggleDropdown}
                    style={{ background: "none", border: "none" }}
                  >
                    <img className="usericon-img" src={userProfile?.imgUrl ? userProfile.imgUrl : usericon} alt="user icon" />
                    {dropdownOpen && <Dropdown />}
                  </button>
                </div>
              </div>
              <div
                className="burger"
                onClick={toogleMenu}
                style={{ marginLeft: "30px" }}
              >
                <div className={`menu-icon ${showMenu ? "open" : ""}`}>
                  <div className="line line1"></div>
                  <div className="line line2"></div>
                  <div className="line line3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="layer"></div>
      </header>
    </>
  );
}

export default Menu1;
