import React, { useEffect, useRef, useState } from "react";
import logoSticky from "../../../FrontEnd/img/logo_sticky.svg";
import { NavLink } from "react-router-dom";
import notificationIcon from "../../../FrontEnd/img/icon/notification1.png";
import usericon from "../../../FrontEnd/img/dummyowner.jpg";
import Dropdown from "../../Dropdown";
import Notification from "../../Notification";
import "../../../FrontEnd/css/Header.css";
import { useSelector, useDispatch } from "react-redux";
import useAuthCheck from "../../../Hooks/useAuthCheck"; 

function Menu1() {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const [hasNotifications, setHasNotifications] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [imageURL, setImageURL] = useState(null);

  const [status, setStatus] = useState("");

  const isAuthenticated = useAuthCheck();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.userType);

  // console.log(token);
  const toogleMenu = () => {
    setShowMenu(!showMenu);

   
    if (!showMenu) {
      setTimeout(() => {
        setShowMenu(false);
      }, 4000);
    }
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
    const fetchNotifications = async () => {
      if (isAuthenticated) {
        try {
          const response = await fetch(
            "https://apidev.myinteriormart.com/api/Notification/BailIconnotification",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setHasNotifications(data.notification.length > 0);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
  }, [isAuthenticated, token]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/UserProfile/GetUserProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        dispatch(setUserProfile(data)); // Dispatch the user profile data to Redux
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (isAuthenticated && userType === "Business") {
      const fetchLogoImage = async () => {
        try {
          const response = await fetch(
            "https://apidev.myinteriormart.com/api/BinddetailsListing/GetLogoimageDetailslisting",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch logo image");
          }
          const data = await response.json();
          setImageURL(data.imagepath); // Assuming data contains image URL
        } catch (error) {
          console.error(error);
        }
      };

      fetchLogoImage();
    }
  }, [token, userType]);

  useEffect(() => {
    const fetchData = async () => {
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
        // console.log(data);
        setStatus(data.status);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
  }, [token]);

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
                {/* <li>
                  <span>
                    <NavLink
                    to="/categorylist"
                    onClick={closeMenu}
                    style={{ fontSize: "14px", color: "black" }}
                  >
                    Suggestion
                  </NavLink>
                  </span>
                </li> */}

                {!isAuthenticated ? (
                  <>
                    <li>
                      <NavLink
                        to="/signup2"
                        className="btn_add listing-btn buttonlogin"
                        style={{
                          backgroundColor: "#fe900d",
                          fontSize: "14px",
                          marginRight: "12px",
                          
                          
                        }}
                        onClick={closeMenu}
                      >
                        Signup
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/login"
                        className="btn_add listing-btn buttonlogin "
                        style={{ backgroundColor: "#fe900d", fontSize: "14px" }}
                        onClick={closeMenu}
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    {userType === "Consumer" && (
                      <>
                        <div>
                          <ul>
                            <li>
                              {/* <NavLink
                                to="/addcompany"
                                className="btn_add listing-btn"
                                style={{
                                  backgroundColor: "#fe900d",
                                  fontSize: "14px",
                                }}
                                onClick={closeMenu}
                              >
                                Free Listing
                              </NavLink> */}
                            </li>
                          </ul>
                        </div>
                        <div
                          className="notification-user"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {/* <div
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
                          </div> */}
                          <div
                            id="profileid"
                            className="dropdown usericon"
                            ref={dropRef}
                            style={{ marginLeft: "20px", alignItems: "center" }}
                          >
                            <button
                               className={`usericon-btn dropdown-toggle ${dropdownOpen ? 'close' : ''}`}
                              type="button"
                              onClick={toggleDropdown}
                              style={{ background: "none", border: "none" }}
                            >
                              <img
                                className="usericon-img"
                                src={
                                  userProfile?.imgUrl
                                    ? `https://apidev.myinteriormart.com${userProfile.imgUrl}`
                                    : usericon
                                }
                                alt="user icon"
                              />
                              {isAuthenticated && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "0",
                                    right: "0",
                                    width: "12px",
                                    height: "12px",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    border: "1px solid green",
                                  }}
                                />
                              )}
                              {dropdownOpen && <Dropdown />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {userType === "Business" && (
                      <>
                        <div>
                          {status !== 1 && (
                            <ul>
                              <li>
                                <NavLink
                                  to="/addcompany"
                                  className="btn_add listing-btn"
                                  style={{
                                    backgroundColor: "#fe900d",
                                    fontSize: "14px",
                                  }}
                                  onClick={closeMenu}
                                >
                                  Free Listing
                                </NavLink>
                              </li>
                            </ul>
                          )}
                        </div>
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
                              type="button "
                              onClick={toggleNotificationMenu}
                              className="notification-img"
                            >
                              <img src={notificationIcon} alt="notification" />
                              {hasNotifications && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "0px",
                                    right: "0px",
                                    height: "12px",
                                    width: "12px",
                                    backgroundColor: "orange",
                                    borderRadius: "50%",
                                  }}
                                ></span>
                              )}
                              {showNotificationMenu && (
                                <Notification
                                  setHasNotifications={setHasNotifications}
                                />
                              )}
                            </button>
                          </div>
                          <div
                            id="profileid"
                            className="dropdown usericon"
                            ref={dropRef}
                            style={{
                              marginLeft: "20px",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <button
                              className="usericon-btn dropdown-toggle"
                              type="button"
                              onClick={toggleDropdown}
                              style={{
                                background: "none",
                                border: "none",
                                position: "relative",
                              }}
                            >
                              <img
                                className="usericon-img"
                                src={
                                  imageURL
                                    ? `https://apidev.myinteriormart.com${imageURL}`
                                    : usericon
                                }
                                alt="user icon"
                                
                              />
                            
                              {isAuthenticated && (
                                <span
                                  style={{
                                    position: "absolute",
                                    top: "0",
                                    right: "0",
                                    width: "12px",
                                    height: "12px",
                                    backgroundColor: "green",
                                    borderRadius: "50%",
                                    border: "1px solid green",
                                  }}
                                />
                              )}
                              {dropdownOpen && <Dropdown />}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </ul>
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
