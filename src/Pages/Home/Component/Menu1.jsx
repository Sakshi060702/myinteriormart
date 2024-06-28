import React, { useEffect, useRef, useState } from "react";
import logoSticky from "../../../FrontEnd/img/logo_sticky.svg";
import { NavLink } from "react-router-dom";
import notificationIcon from "../../../FrontEnd/img/icon/notification1.png";
import usericon from "../../../FrontEnd/img/icon/user1.png";
import Dropdown from "../../Dropdown";
import Notification from "../../Notification";
import "../../../FrontEnd/css/Header.css";

function Menu1() {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
                    <img src={usericon} alt="user icon" />
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
