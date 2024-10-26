import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../FrontEnd/css/dropdown.css";
import "../FrontEnd/css/Notification.css";
import useAuthCheck from "../Hooks/useAuthCheck";
import "../FrontEnd/css/RegistrationMV.css";
import notificationimg from "../FrontEnd/img/userman1.png";

const Notification = ({ setHasNotifications }) => {
  const token = useSelector((state) => state.auth.token);
  const [notification, setNotification] = useState([]);

  const isAuthenticated = useAuthCheck();

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/Notification/BailIconnotification",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              // Add any other headers you might need here
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setNotification(data.notification);

        setHasNotifications(data.notification.length > 0);
      } catch (error) {
        console.error("Error fetching Notification:", error);
      }
    };
    if (isAuthenticated) {
      fetchNotification();
    }
  }, [token, setHasNotifications]);

  return (
    <>
      <div
        className="notification1 notificationdekstoppage"
        style={{ marginTop: "16px" }}
      >
        <div>
          <div className="notificationheader">
            <h5>Notification</h5>
            {/* <a onClick={toggleNotificationMenu}>View All</a>  */}
          </div>
          <div className="notify_body">
            <div>
              <div className="list_general like-listing">
                <ul>
                  {notification.length === 0 ? (
                    <li>No notifications available</li>
                  ) : (
                    notification.map((notification, index) => (
                      <li key={index} className="notification-item">
                        <div
                          className="notification-list"
                          style={{ display: "flex" }}
                        >
                          <div className="notification-image">
                            <div>
                              {notification.profileImage ? (
                                <img
                                  src={`https://apidev.myinteriormart.com${notification.profileImage}`}
                                  alt={`${notification.companyName} profile`}
                                  style={{
                                    height: "34px",
                                    width: "34px",
                                    margin: "3px 0px 0px -19px",
                                    position: "absolute",
                                    borderRadius: "50%",
                                  }}
                                />
                              ) : (
                                <img
                                  alt="default"
                                  style={{
                                    height: "48px",
                                    width: "48px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="notification-content">
                            {/* <div className="notificationcontent">
                              <span
                                className="visit-date"
                                style={{
                                  textAlign: "right",
                                  margin: "2px 1px -4px 2px",
                                }}
                              >
                                {notification.visitDate}
                              </span>
                            </div> */}
                            <div>
                              <p
                                className="description"
                                style={{
                                  marginRight: "0px",
                                  marginTop: "4px",
                                }}
                              >
                                <span
                                  className="activity-text"
                                  style={{
                                    paddingLeft: "-10px",
                                    paddingRight: "6px",
                                  }}
                                >
                                  {notification.gender}
                                  {/* <strong style={{fontSize:'13px',paddingLeft:'11px'}}>{notification.userName}</strong> */}
                                </span>

                                <span
                                  className="activity-text"
                                  style={{
                                    paddingLeft: "-27px",
                                    paddingRight: "72px",
                                  }}
                                >
                                  {notification.userName}

                                  {/* <strong style={{fontSize:'13px',paddingLeft:'11px'}}>{notification.userName}</strong> */}
                                </span>
                                {/* <span
                                className="visit-date"
                                style={{
                                  textAlign: "right",
                                  margin: "2px 1px -4px 2px",
                                }}
                              >
                                {notification.visitDate}
                              </span> */}
                                <br></br>

                                {/* {notification.activityText === 'Review' && notification.reviewComment && (
                  <span className="activity-text"> {notification.reviewComment}</span>
                )} */}

                                {["Bookmarked", "Liked", "Subscribed"].includes(
                                  notification.activityText
                                ) && (
                                  <div>
                                    <span className="activity-text">
                                      {notification.activityText}
                                    </span>
                                    <span className="activity-text">
                                      {" "}
                                      Your Listing {notification.companyName}
                                    </span>
                                  </div>
                                )}

                                {["Review", "Enquiry"].includes(
                                  notification.activityText
                                ) && (
                                  <span className="activity-text" style={{marginLeft:'4px',paddingRight:'75px'}}>
                                    {" "}
                                    {notification.activityText === "Review" &&
                                      notification.reviewComment}
                                    {notification.activityText === "Enquiry" &&
                                      notification.enquiryComment}
                                  </span>
                                )}
                              </p>
                            </div>
                            {/* <div>
                              <div
                                style={{
                                  marginLeft: "-28px",
                                  marginTop: "16px",
                                }}
                              >
                                {["Bookmarked", "Liked", "Subscribed"].includes(
                                  notification.activityText
                                ) && (
                                  <>
                                    <span className="activity-text">
                                      {notification.activityText}
                                    </span>
                                    <span className="activity-text">
                                      {" "}
                                      Your Listing {notification.companyName}
                                    </span>
                                  </>
                                )}
                              </div>

                              <div
                                style={{
                                  marginLeft: "-55px",
                                  marginTop: "16px",
                                }}
                              >
                                {["Review", "Enquiry"].includes(
                                  notification.activityText
                                ) && (
                                  <span className="activity-text">
                                    {" "}
                                    {notification.activityText === "Review" &&
                                      notification.reviewComment}
                                    {notification.activityText === "Enquiry" &&
                                      notification.enquiryComment}
                                  </span>
                                )}
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* for mobile view  */}

      <div className="notification1 notificationmobilepage">
        <div>
          <div className="notificationheader">
            <h5>Notifications</h5>
            {/* <a onClick={toggleNotificationMenu}>View All</a>  */}
          </div>
          <div className="notify_body">
            <div>
              <div className="list_general like-listing">
                <ul>
                  {notification.length === 0 ? (
                    <li>No notifications available</li>
                  ) : (
                    notification.map((notification, index) => (
                      <li key={index} className="notification-item">
                        <div
                          style={{
                            backgroundColor: "#f3f2f2",
                            position: "relative",
                            marginBottom: "5px",
                            padding: "9px 72px 23px 15px",
                          }}
                        >
                          {/* <div className="notification-image">
                          <div>
                          {notification.profileImage ? (
                            <img
                              src={`https://apidev.myinteriormart.com${notification.profileImage}`}
                              alt={`${notification.companyName} profile`}
                              style={{ height: '63px',width: '45px',margin:'0px 0px 0px -26px',position:'absolute'}}
                            />
                          ) : (
                            <img alt="default" style={{height: '48px', width: '48px', objectFit: 'cover'}} />
                          )}
                          </div>
                          
                        </div> */}
                          <div className="notification-content ">
                            <div className="notificationcontent">
                              <span
                                className="visit-date"
                                style={{
                                  textAlign: "right",
                                  margin: "-1px -110px 0px 24px",
                                }}
                              >
                                {notification.visitDate}
                              </span>
                            </div>
                            <div>
                              <p
                                className="description notificationp"
                                style={{
                                  marginRight: "206px",
                                  marginTop: "-14px",
                                }}
                              >
                                {/* <span style={{height:'12px',width:'12px',backgroundColor:'orange',borderRadius:'50%',position:'absolute',left:'8px',top:'19px'}}></span> */}
                                <div>
                                  {notification.profileImage ? (
                                    <img
                                      src={`https://apidev.myinteriormart.com${notification.profileImage}`}
                                      alt={`${notification.companyName} profile`}
                                      style={{
                                        height: "36px",
                                        width: "39px",
                                        margin: "0px 0px 0px -26px",
                                        position: "absolute",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={notificationimg}
                                      alt="default"
                                      style={{
                                        height: "36px",
                                        width: "39px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}
                                </div>
                                <span className="user-name notificationusername">
                                  <strong
                                    style={{
                                      fontSize: "13px",
                                      paddingLeft: "20px",
                                      color: "orange",
                                    }}
                                  >
                                    {notification.userName}
                                  </strong>
                                </span>
                              </p>
                              <p style={{ marginBottom: "6px" }}>
                                <span
                                  className="activity-text"
                                  style={{ float: "left" }}
                                >
                                  <i
                                    className="fa fa-bookmark"
                                    style={{
                                      color: "orange",
                                      fontSize: "16px",
                                      marginRight: "5px",
                                    }}
                                  ></i>
                                  {notification.activityText}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
