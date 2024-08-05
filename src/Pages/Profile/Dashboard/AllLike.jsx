import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withAuthh from "../../../Hoc/withAuthh";

function AllLike() {

  
  const token = useSelector((state) => state.auth.token);
  const [likeDislike, setLikeDislike] = useState([]);

  useEffect(() => {
    // Fetch bookmarks from the API
    const fetchLikes = async () => {
      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/AllBookMark/GetUserAllMyLikes", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
            // Add any other headers you might need here
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLikeDislike(data.likeDislike);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchLikes();
  }, [token]);


  return (
    <>
    <div className="container my-5">
      <div className="row">
        <div className="col-md-12">
          <div className="profile-sidebar-content">
            <h4>Like</h4>
            <p className="add-lidting-title-from">
              Dashboard / Like
              <span>
              <Link to="/dashboard" className="back_btn mx-3">Back</Link>
              </span>
            </p>
            <div className="list_general like-listing">
            <ul>
              {likeDislike.length === 0 ? (
                <li>No Likes available</li>
              ) : (
                likeDislike.map((likeDislike, index) => (
                  <li key={index} style={{display:"flex"}}>
                    <div className="image" style={{height:'70px',width:'70px', marginLeft:'10px',marginBottom:'20px'}}>
                      {likeDislike.profileImage ? (
                        <img src={`https://apidev.myinteriormart.com${likeDislike.profileImage}`} alt={`${likeDislike.companyName} profile`} style={{
                          height: '100%',
                          width: '100%',
                          borderRadius: '50%',
                          objectFit: 'cover',
                        }} />
                      ) : (
                        <img/>
                      )}
                    </div>
                    <div>
                    <span className="visit-date">{likeDislike.visitDate}</span>
                    <p className="description">
                      <i className="fa fa-bookmark" style={{color:'orange' ,fontSize:'23px'}}></i> 
                      <span><strong style={{fontSize:'18px'}}>    "{likeDislike.userName}"  </strong>Liked Your </span>
                      listing : "{likeDislike.companyName}"
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

export default AllLike;
