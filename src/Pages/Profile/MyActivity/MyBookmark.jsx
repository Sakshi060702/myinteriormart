import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh";

function MyBookmark() {

  const token = useSelector((state) => state.auth.token);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Fetch bookmarks from the API
    const fetchBookmarks = async () => {
      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/MyActivity/MyActivityAllMyBookmarks", {
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
        setBookmarks(data.bookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [token]);


  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Bookmarks</h4>
              <p className="add-lidting-title-from">
                Dashboard / Bookmarks
                <span>
                  <a className="back_btn mx-3">Back</a>
                </span>
              </p>
              <div className="list_general like-listing">
              <ul>
                {bookmarks.length === 0 ? (
                  <li>No bookmarks available</li>
                ) : (
                  bookmarks.map((bookmark, index) => (
                    <li key={index} style={{display:"flex"}}>
                      <div className="image" style={{height:'70px',width:'70px', marginLeft:'10px',marginBottom:'20px'}}>
                        {bookmark.profileImage ? (
                          <img src={bookmark.profileImage} alt={`${bookmark.companyName} profile`} style={{
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
                      <span className="visit-date">{bookmark.visitDate}</span>
                      <p className="description">
                        <i className="fa fa-bookmark" style={{color:'orange' ,fontSize:'23px'}}></i> 
                        <span><strong style={{fontSize:'18px'}}>    "{bookmark.userName}"  </strong>Bookmarked Your </span>
                        listing : "{bookmark.companyName}"
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

export default MyBookmark;
