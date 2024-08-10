import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../FrontEnd/css/dropdown.css";
import "../FrontEnd/css/Notification.css";

const Notification = ({ toggleNotificationMenu }) => {
  const token = useSelector((state) => state.auth.token);
  const [notification, setNotification] = useState([]);

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
      } catch (error) {
        console.error("Error fetching Notification:", error);
      }
    };
    fetchNotification();
  }, [token]);

  return (
    <div className="notification1" >
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
                      <div className="notification-list" style={{display:'flex'}}>
                        <div className="notification-image">
                          {notification.profileImage ? (
                            <img
                              src={`https://apidev.myinteriormart.com${notification.profileImage}`}
                              alt={`${notification.companyName} profile`}
                            />
                          ) : (
                            <img alt="default" />
                          )}
                        </div>
                        <div className="notification-content">
                          <span className="visit-date">
                            {notification.visitDate}
                          </span>
                          <p className="description">
                            <span className="user-name">
                              <strong>{notification.userName}</strong>
                            </span>
                            <span className="activity-text">
                              {notification.activityText}
                            </span>
                          </p>
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
  );
};

export default Notification;
