import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "../FrontEnd/css/dropdown.css";
import "../FrontEnd/css/Notification.css";
import useAuthCheck from "../Hooks/useAuthCheck";

const Notification = ({ toggleNotificationMenu }) => {
  const token = useSelector((state) => state.auth.token);
  const [notification, setNotification] = useState([]);

  const isAuthenticated=useAuthCheck();

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
    if(isAuthenticated){
      fetchNotification();
    }
   
  }, [token]);

  return (
    <div className="notification1" style={{left:'-132px',width: '329px'}}>
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
                      <div className="notification-list" style={{display:'flex', width:'263px' ,padding: '10px 0px 10px 4px'}}>
                        
                        <div className="notification-image">
                          <div>
                          {notification.profileImage ? (
                            <img
                              src={`https://apidev.myinteriormart.com${notification.profileImage}`}
                              alt={`${notification.companyName} profile`}
                              style={{ height: '83px', objectFit: 'cover',width: '72px',borderRadius:'53px',margin:'0px 0px 14px -26px',position:'absolute'}}
                            />
                          ) : (
                            <img alt="default" style={{height: '48px', width: '48px', objectFit: 'cover'}} />
                          )}
                          </div>
                          
                        </div>
                        <div className="notification-content">
                          <div style={{marginRight:'-4px', marginLeft:'-21px'}}>
                          <span className="visit-date" style={{textAlign:'right', margin:'10px 36px 0px 0px'}}>
                            {notification.visitDate}
                          </span>
                          </div>
                          <div>
                          <p className="description">
                            <span className="user-name">
                              <strong style={{fontSize:'23px'}}>{notification.userName}</strong>
                            </span>
                            <br></br>
                            <span className="activity-text" style={{padding:'8px 33px 0px 40px'}}>
                            <i className="fa fa-bookmark" style={{color:'orange' ,fontSize:'16px' , marginRight:'5px'}}></i> 
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
  );
};

export default Notification;
