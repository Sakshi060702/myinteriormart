import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withAuthh from "../../../Hoc/withAuthh";

function MySubscribe() {
  const token = useSelector((state) => state.auth.token);
  const [subscribes, setSubscribes] = useState([]);

  useEffect(() => {
    const fetchSubscribe = async () => {
      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/MyActivity/MyActivityAllMySubscribe", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSubscribes(data.subscribes);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchSubscribe();
  }, [token]);

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Subscribe</h4>
              <p className="add-lidting-title-from">
                Dashboard / Subscribe
                <span>
                <Link  to={`/Myactivity/${localStorage.getItem('cityname')}`} className="back_btn mx-3">Back</Link>
                </span>
              </p>
              <div className="list_general like-listing">
                <ul>
                  {subscribes.length === 0 ? (
                    <li>No Subscribe available</li>
                  ) : (
                    subscribes.map((subscribe, index) => (
                      <li key={index} style={{ display: "flex" }}>
                        <div className="image" style={{ height: '70px', width: '70px', marginLeft: '10px', marginBottom: '20px' }}>
                          {subscribe.profileImage ? (
                            <img src={`https://apidev.myinteriormart.com${subscribe.profileImage}` } alt={`${subscribe.companyName} profile`} style={{
                              height: '100%',
                              width: '100%',
                              borderRadius: '50%',
                              objectFit: 'cover',
                            }} />
                          ) : (
                            <img />
                          )}
                        </div>
                        <div>
                          <span className="visit-date">{subscribe.visitDate}</span>
                          <p className="description">
                            <i className="fa fa-bookmark" style={{ color: 'orange', fontSize: '23px' }}></i>
                            <span><strong style={{ fontSize: '18px' }}> "{subscribe.userName}" </strong> Subscribed Your </span>
                            listing : "{subscribe.companyName}"
                          </p>
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
}

export default MySubscribe;
