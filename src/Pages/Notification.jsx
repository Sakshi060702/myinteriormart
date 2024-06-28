import React from "react";
import "../FrontEnd/css/dropdown.css";

const Notification = ({ toggleNotificationMenu }) => {
  return (
    <div className="notification">
      <div>
        <div className="notificationheader">
          <h5>Notification</h5>
          {/* <a onClick={toggleNotificationMenu}>View All</a>  */}
        </div>
        <div className="notify_body">
          <div className="notification-list">
            <span class="nitify_dot"></span>
            <div className="notify_heading notifyheader">Listing</div>
            <p className="notify_txt notifyinfo">
              This is an automated server response message. All systems are
              online.
            </p>
          </div>
          <div className="notification-list">
            <span class="nitify_dot"></span>
            <div className="notify_heading notifyheader">Listing</div>
            <p className="notify_txt notifyinfo">
              This is an automated server response message. All systems are
              online.
            </p>
          </div>
          <div className="notification-list">
            <span class="nitify_dot"></span>
            <div className="notify_heading notifyheader">Listing</div>
            <p className="notify_txt notifyinfo">
              This is an automated server response message. All systems are
              online.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
