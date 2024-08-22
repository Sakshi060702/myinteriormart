import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import editprofile from "../../FrontEnd/img/icon/edit.png";
import addressimg from "../../FrontEnd/img/icon/map.png";
import enquiryimg from "../../FrontEnd/img/icon/enquiry.png";
import bookmarkimg from "../../FrontEnd/img/icon/bookmark.png";
import likeimg from "../../FrontEnd/img/icon/like.png";
import subscribeimg from "../../FrontEnd/img/icon/subscribe.png";
import reviewimg from "../../FrontEnd/img/icon/review.png";
import chatimg from "../../FrontEnd/img/icon/chat.png";
import suggestionimg from "../../FrontEnd/img/icon/suggestion.png";
import complaintimg from "../../FrontEnd/img/icon/Complaint.png";
import changepassimg from "../../FrontEnd/img/icon/password.png";
import registerimg from "../../FrontEnd/img/icon/register.png";
import dashbordimg from "../../FrontEnd/img/Dashboard.png";
import managlistingimg from "../../FrontEnd/img/icon/manage.png";
import myactivityimg from "../../FrontEnd/img/myActivity.png";
import listingicon from "../../FrontEnd/img/business-listing.jpeg";
import { Dropdown } from "react-bootstrap";

function Profile2({ children }) {
  const [status, setStatus] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.auth.userType);

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
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchData();
  }, [token]);
  return (
    <main>
      <div className="container margin_60_35">
        <div className="row">
          <div className="col-lg-3" id="desktop_view">
            <div
              className="nav profile-side-menu flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              
              
              {userType === "Consumer" && (
                <>
                  
                  <Link to="/Myactivity">
                    {" "}
                    <img
                      src={myactivityimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    My Activity
                  </Link>
                  <Link to="/editprofile">
                    {" "}
                    <img
                      src={editprofile}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Edit Profile
                  </Link>

                  <Link to="/userpersonalinformation">
                    {" "}
                    <img
                      src={addressimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Personal Info
                  </Link>

                  <Link to="/complaint">
                    {" "}
                    <img
                      src={complaintimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Complaint
                  </Link>
                  <Link to="/suggestion">
                    {" "}
                    <img
                      src={suggestionimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Suggestion
                  </Link>
                  <Link to="/chat">
                    {" "}
                    <img
                      src={chatimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Chat
                  </Link>
                  
                  <Link to="/changepassword">
                    {" "}
                    <img
                      src={changepassimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Change Pin
                  </Link>
                </>
              )}

              {userType === "Business" && (
                <>
                  <Link to="/dashboard">
                    {" "}
                    <img
                      src={dashbordimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Dashboard
                  </Link>
                  <Link to="/Myactivity">
                    {" "}
                    <img
                      src={myactivityimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    My Activity
                  </Link>
                  {status=== 1 && (
                    <><Link to="/labournakapage">
                    <img
                      src={managlistingimg}
                      alt="Manage Listing"
                      style={{ height: "60px" }}
                    />
                    Manage Listing
                  </Link>
                  <Link to="/enquiry">
                    <img
                      src={enquiryimg}
                      alt="Enquiry"
                      style={{ height: "60px" }}
                    />
                    Enquiry
                  </Link></>
                  )}
                  
                  <Link to="/complaint">
                    {" "}
                    <img
                      src={complaintimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Complaint
                  </Link>
                  <Link to="/suggestion">
                    {" "}
                    <img
                      src={suggestionimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Suggestion
                  </Link>
                  <Link to="/chat">
                    {" "}
                    <img
                      src={chatimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Chat
                  </Link>
                  <Link to="/ProfileRegister">
                    {" "}
                    <img
                      src={registerimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Register
                  </Link>

                  <Link to="/changepassword">
                    {" "}
                    <img
                      src={changepassimg}
                      alt="Edit Profile"
                      style={{ height: "60px" }}
                    />
                    Change Pin
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="col-lg-3 mb-5" id="mob_view">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-warning"
                id="dropdown-basic"
                style={{ width: "96%" }}
              >
                Select Options
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "93%" }}>
                {userType === "Consumer" &&(
                  <>
                   <Dropdown.Item as={Link} to="/Myactivity">
                  <img
                    src={myactivityimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 My Activity
                </Dropdown.Item>
                   <Dropdown.Item as={Link} to="/editprofile">
                  <img
                    src={editprofile}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Edit Profile
                </Dropdown.Item>
                
                <Dropdown.Item as={Link} to="/userpersonalinformation">
                  <img
                    src={addressimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Personal Info
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/complaint">
                  <img
                    src={complaintimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Complaint
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/suggestion">
                  <img
                    src={suggestionimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                  Suggestion
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/chat">
                  <img
                    src={chatimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 Chat
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/changepassword">
                  <img
                    src={changepassimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 Change Pin
                </Dropdown.Item>
                

                  </>
                )}
                {userType === "Business" &&(
                  <>
                  <Dropdown.Item as={Link} to="/dashboard">
                  <img
                    src={dashbordimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 Dashboard
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/Myactivity">
                  <img
                    src={myactivityimg}
                    alt="Edit Profile"
                    style={{ height: "60px" }}
                  />
                 My Activity
                </Dropdown.Item>
                {status === 1 && (
                  <>
                    <Dropdown.Item as={Link} to="/labournakapage">
                      <img
                        src={listingicon}
                        alt="Edit Profile"
                        style={{ height: "60px" }}
                      />
                      Manage Listing
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/enquiry">
                      <img
                        src={enquiryimg}
                        alt="Enquiry"
                        style={{ height: "60px" }}
                      />
                      Enquiry
                    </Dropdown.Item>
                  </>
                )}

                <Dropdown.Item as={Link} to="/complaint">
                  <img
                    src={complaintimg}
                    alt="Address"
                    style={{ height: "60px" }}
                  />
                 Complaint
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/suggestion">
                  <img
                    src={suggestionimg}
                    alt="Bookmark"
                    style={{ height: "60px" }}
                  />
                 Suggestion
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to="/like">
                  <img src={likeimg} alt="Like" style={{ height: "60px" }} />
                  Like
                </Dropdown.Item> */}
                <Dropdown.Item as={Link} to="/chat">
                  <img
                    src={chatimg}
                    alt="Subscribe"
                    style={{ height: "60px" }}
                  />
                 Chat
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/ProfileRegister">
                  <img
                    src={registerimg}
                    alt="Review"
                    style={{ height: "60px" }}
                  />
                  Register
                </Dropdown.Item>
               
               
                <Dropdown.Item as={Link} to="/changepassword">
                  <img
                    src={changepassimg}
                    alt="Change Password"
                    style={{ height: "60px" }}
                  />
                  Change Pin
                </Dropdown.Item>
                  </>
                )}
                
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="col-lg-9 px_remove" id="create_listing">
            <div
              className="tab-content profile-sidebar-content"
              id="v-pills-tabContent"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile2;
