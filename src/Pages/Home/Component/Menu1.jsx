import React, { useEffect, useRef, useState } from "react";
import logoSticky from "../../../FrontEnd/img/logo_sticky.svg";
import { NavLink } from "react-router-dom";
import notificationIcon from "../../../FrontEnd/img/icon/icon (17).png";
import usericon from "../../../FrontEnd/img/icon (16).png";
import Dropdown from "../../Dropdown";
import Notification from "../../Notification";
import "../../../FrontEnd/css/Header.css";
import { useSelector, useDispatch } from "react-redux";
import useAuthCheck from "../../../Hooks/useAuthCheck";
import "../../../FrontEnd/css/RegistrationMV.css";

function Menu1() {
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const [hasNotifications, setHasNotifications] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[dropOpen,setDrpOpen]=useState(false);
  const dropdownOpenClass = "";
  const [showMenu, setShowMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const [imageURL, setImageURL] = useState(null);

  const [status, setStatus] = useState("");

  const [logoSticky, setLogoSticky] = useState("");

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
      }, 60000);
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
    const parent_node = event.target.parentElement.parentElement;
    const parent_id = parent_node.id;
    if(parent_id == "dropdown_logged_in_menu"){
      return;

    }
    if (dropRef.current && !dropRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };


  const toggleDropdownmobile = () => {
    setDrpOpen(!dropOpen);
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

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
          setImageURL(data.imagepath);
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
        console.log(data);
        setStatus(data.status);

        const listingId = data.listingId;
        console.log("listingid", listingId);

        if (listingId) {
          // const response_n = await fetch(
          //   "https://apidev.myinteriormart.com/api/ClaimedListings/Claimedlisting",
          //   {
          //     method: "POST",
          //     headers: {
          //       "Content-Type": "application/json",
          //       Authorization: `Bearer ${token}`,
          //     },
          //     body: JSON.stringify({
          //       CompanyId: listingId,
          //     }),
          //   }
          // );

          const response_n = await fetch(
            "https://apidev.myinteriormart.com/api/ClaimedListings/ClaimedUpdateListing",
            {
              method: "GET",
              headers: {
                // "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              
            }
          );
          const data_n = await response_n.json();
          console.log(data_n);
        }

        /** Start new api integration with listingID from response */
        // const response_n = await fetch(
        //   "https://apidev.myinteriormart.com/api/ClaimedListings/Claimedlisting",
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //       Authorization: `Bearer ${token}`,
        //     },
        //     body: {
        //       CompanyId: data.listingId
        //     }
        //   }
        // );
        // const data_n = await response_n.json();
        // console.log(data_n)

        /** End */
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/PortalSetting/GetPortalSetting`
        );
        const data = await response.json();
        const logopath = data.portalSettings[0].logopath;
        setLogoSticky(`https://admin.myinteriormart.com${logopath}`);
      } catch (error) {
        console.error("Error fetching banner images:", error);
      }
    };
    fetchLogo();
  }, []);

  return (
    <>
      <header className="header_in">
        <div className="container" style={{ background: "#fff" }}>
          <div className="row">
            <div className="col-lg-3 col-12">
              <div id="logo" className="logo">
                <NavLink
                  to={`/in-${localStorage.getItem("cityname")}`}
                  title="index"
                >
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
              <div style={{marginRight:'24px'}}>
                {!isAuthenticated && (
                  <NavLink
                    to={`/signup2/in-${localStorage.getItem("cityname")}`}
                    className="listing-btn buttonlogin freelistingbtn mobile-freelisting mobilefreelistingbtn freelistingmargin"

                    // onClick={closeMenu}
                  >
                    Free Listing
                  </NavLink>
                )}
              </div>
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
                    <li style={{ marginLeft: "13px" }}>
                      <NavLink
                        to={`/Usersuggestion/in-${localStorage.getItem(
                          "cityname"
                        )}`}
                        className=" listing-btn buttonlogin suggestionstyle"
                        style={{
                          fontSize: "14px",
                          marginRight: "12px",
                        }}
                        // onClick={closeMenu}
                      >
                        Suggestion
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/signup2/in-${localStorage.getItem("cityname")}`}
                        className="btn_add listing-btn buttonlogin menu-freelisting freelistingmargin"
                        style={{
                          backgroundColor: "#fe900d",
                          fontSize: "14px",
                          marginRight: "12px",
                        }}
                        // onClick={closeMenu}
                      >
                        Free Listing
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to={`/signup2/in-${localStorage.getItem("cityname")}`}
                        className="listing-btn buttonlogin suggestionbtn"
                        style={{
                          fontSize: "14px",
                          marginRight: "12px",
                        }}
                        // onClick={closeMenu}
                      >
                        Signup
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/login/in-${localStorage.getItem("cityname")}`}
                        className=" listing-btn buttonlogin suggestionbtn "
                        style={{ fontSize: "14px" }}
                        // onClick={closeMenu}
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
                            style={{
                              marginLeft: "20px",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <button
                              className={`usericon-btn dropdown-toggle ${
                                dropdownOpen ? "buttonActive" : ""
                              }`}
                              type="button"
                              onClick={toggleDropdown}
                              style={{
                                background: "none",
                                border: "none",
                                position: "relative",
                                padding: "0 25px 0 0",
                              }}
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
                                    top: "31px",
                                    right: "-2px",
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
                                  to={`/selectcategory/in-${localStorage.getItem(
                                    "cityname"
                                  )}`}
                                  className="btn_add listing-btn menu-freelisting"
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
                            className="dropdown notification menu-freelisting"
                            ref={notificationRef}
                            style={{ marginLeft: "20px" }}
                          >
                            <button
                              type="button "
                              onClick={toggleNotificationMenu}
                              className="notification-img"
                            >
                              <img src={notificationIcon} alt="notification"  />
                              {hasNotifications && (
                                <span className="notificationdot"
                                 
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
                              className={`usericon-btn profileimgp dropdown-toggle ${
                                dropdownOpen ? "buttonActive" : ""
                              }`}
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
                                    top: "33px",
                                    right: "25px",
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

                    {/* usertype none */}
                    {userType === "" && (
                      <>
                        {/* <div>
                          {status !== 1 && (
                            <ul>
                              <li>
                                <NavLink
                                  to={`/selectcategory/in-${localStorage.getItem(
                                    "cityname"
                                  )}`}
                                  className="btn_add listing-btn menu-freelisting"
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
                        </div> */}
                        <div
                          className="notification-user"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <div
                            className="dropdown notification menu-freelisting"
                            ref={notificationRef}
                            style={{ marginLeft: "20px" }}
                          >
                            <button
                              type="button "
                              onClick={toggleNotificationMenu}
                              className="notification-img"
                            >
                              <img src={notificationIcon} alt="notification"  />
                              {hasNotifications && (
                                <span className="notificationdot"
                                 
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
                              className={`usericon-btn profileimgp dropdown-toggle ${
                                dropdownOpen ? "buttonActive" : ""
                              }`}
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
                                    top: "33px",
                                    right: "25px",
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



              {/* for mobile view */}
             
              {userType === "Business" && (
                <>
                  <div>
                    {status !== 1 && (
                      <NavLink
                        to={`/selectcategory/in-${localStorage.getItem(
                          "cityname"
                        )}`}
                        className=" listing-btn mobile-freelisting freelistingbtn mobilefreelistingbtn freelistingmargin"
                      >
                        Free Listing
                      </NavLink>
                    )}
                  </div>
                  <div
                    className="notification-user listing-btn mobile-freelisting"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <div
                      className="dropdown notification notificationm"
                      ref={notificationRef}
                      
                    >
                      <button
                        type="button "
                        onClick={toggleNotificationMenu}
                        className="notification-img"
                      >
                        <img src={notificationIcon} alt="notification" />
                        {hasNotifications && (
                          <span
                            className="notificationdot"
                          ></span>
                        )}
                        {showNotificationMenu && (
                          <Notification
                            setHasNotifications={setHasNotifications}
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div
                    id="profileid"
                    className="dropdown usericon listing-btn mobile-freelisting profileimgm"
                    ref={dropRef}
                  
                  >
                    <button
                      className={`usericon-btn profileimgp dropdown-toggle ${
                        dropOpen ? "buttonActive" : ""
                      }`}
                      type="button"
                      onClick={toggleDropdownmobile}
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
                            top: "33px",
                            right: "0px",
                            width: "12px",
                            height: "12px",
                            backgroundColor: "green",
                            borderRadius: "50%",
                            border: "1px solid green",
                          }}
                        />
                      )}
                      {isAuthenticated && dropOpen && <Dropdown />}
                    </button>
                  </div>
                </>
              )}


{userType === "Consumer" && (
                <>
                  
                  
                  <div
                    id="profileid"
                    className="dropdown usericon listing-btn mobile-freelisting profileimgm"
                    ref={dropRef}
                  
                  >
                    <button
                      className={`usericon-btn profileimgp dropdown-toggle ${
                        dropOpen ? "buttonActive" : ""
                      }`}
                      type="button"
                      onClick={toggleDropdownmobile}
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
                            top: "33px",
                            right: "0px",
                            width: "12px",
                            height: "12px",
                            backgroundColor: "green",
                            borderRadius: "50%",
                            border: "1px solid green",
                          }}
                        />
                      )}
                      {isAuthenticated && dropOpen && <Dropdown />}
                    </button>
                  </div>
                </>
              )}






              {userType !== "Business" && userType !=='Consumer'&& (
                <>
                  
                  <div
                    id="profileid"
                    className="dropdown usericon listing-btn mobile-freelisting profileimgm"
                    ref={dropRef}
                  
                  >
                    <button
                      className={`usericon-btn profileimgp dropdown-toggle ${
                        dropdownOpen ? "buttonActive" : ""
                      }`}
                      type="button"
                      onClick={toogleMenu}
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
                            top: "33px",
                            right: "0px",
                            width: "12px",
                            height: "12px",
                            backgroundColor: "green",
                            borderRadius: "50%",
                            border: "1px solid green",
                          }}
                        />
                      )}
                      {isAuthenticated && dropOpen && <Dropdown />}
                    </button>
                  </div>
                </>
              )}
              {/* <div
                className="burger"
                onClick={toogleMenu}
                style={{ marginLeft: "30px" }}
              >
                <div className={`arrow-icon ${showMenu ? "open" : ""}`}>
                  <span className="arrow" style={{display:'inline-block',letterSpacing:'5px',fontWeight:'bold'}}>&#9662;</span>
        </div>
                <div className={`menu-icon ${showMenu ? "open" : ""}`}>
                  <div className="line line1"></div>
                  <div className="line line2"></div>
                  <div className="line line3"></div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="layer"></div>
      </header>
    </>
  );
}

export default Menu1;
