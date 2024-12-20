import React, { useState, useEffect } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Profileimg from "../../FrontEnd/img/userman1.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import { useNavigate } from "react-router-dom";
import Popupalert from "../Popupalert";
import { validateImageFile, validateName } from "../Validation";
import useAuthCheck from "../../Hooks/useAuthCheck";

function Editprofile() {
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectGender, setSelectGender] = useState("Select Gender");
  const [profileImage, setProfileImage] = useState(Profileimg); // Default image
  const [imgText, setImgText] = useState("");
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [isVendor, setIsVendor] = useState(true);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isAuthenticated = useAuthCheck();

  useEffect(() => {
    if (isAuthenticated) {
      fetch(
        "https://apidev.myinteriormart.com/api/UserProfile/GetUserProfile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setFullName(data.name);
          setLastName(data.lastName);
          setMobileNumber(data.phone);
          setEmail(data.email);
          setSelectGender(data.gender);
          setImgText(data.imgText);
          setProfileImage(
            data.imgUrl
              ? `https://apidev.myinteriormart.com${data.imgUrl}`
              : Profileimg
          ); // Update profile image
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
          setLoading(false);
        });
    }
    // Fetch user profile data when component mounts
  }, [token]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    // Use FileReader to preview the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({});
    const validationError = validateImageFile(file);
    const firstnameError = validateName(fullName);
    const lastnameError = validateName(lastName);

    if (validationError || firstnameError || lastnameError) {
      setError({
        imageFile: validationError,
        firstname: firstnameError,
        lastname: lastnameError,
      });
      return;
    }

    const formData = new FormData();
    formData.append("FirstName", fullName);
    formData.append("LastName", lastName);
    formData.append("Gender", selectGender);
    formData.append("File", file);
    formData.append("IsVendor", isVendor);

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/UserNewProfile/CreateOrUpdateProfile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Profile updated successfully:", data);

      setProfileImage(
        data.userprofile.imageUrl
          ? `https://apidev.myinteriormart.com${data.userprofile.imageUrl}`
          : Profileimg
      );

      setSuccessMessage("Edit Profile Details Saved  Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/userpersonalinformation");
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Error in updating profile. Please try again later.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  };

  const handleSelect = (eventKey) => {
    setSelectGender(eventKey);
  };
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div
      className="tab-pane fade show active"
      id="v-pills-profile"
      role="tabpanel"
      aria-labelledby="v-pills-profile-tab"
    >
      <div className="add-review">
        <h5>Edit Profile</h5>
        <form className="icon-form-group" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="profile_col_1">
                <div className="profile-section">
                  <label className="-label" htmlFor="file">
                    <span>
                      <i className="fas fa-camera"></i>
                    </span>
                    <span>Change Image</span>
                  </label>
                  <input id="file" type="file" onChange={handleFileChange} />
                  {error.imageFile && (
                    <div className="text-danger">{error.imageFile}</div>
                  )}
                  <img
                    className="profile_img"
                    src={profileImage}
                    id="output"
                    alt="Profile"
                  />
                </div>
                <h6 className="profile_customer_name text-center">{imgText}</h6>
              </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
                <div className="custom-select-form">
                  <label htmlFor="gender">Title:</label>
                  <DropdownButton
                    id="dropdown-basic-button"
                    className="custom-dropdown"
                    title={selectGender}
                    onSelect={handleSelect}
                    variant="light"
                  >
                    <Dropdown.Item
                      eventKey="Mr"
                      style={{ transition: "background-color 0.3s" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "orange")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      Mr
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="Mrs"
                      style={{ transition: "background-color 0.3s" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "orange")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      Mrs
                    </Dropdown.Item>
                    {/* <Dropdown.Item
                      eventKey="Other"
                      style={{ transition: "background-color 0.3s" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "orange")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "white")
                      }
                    >
                      Other
                    </Dropdown.Item> */}
                  </DropdownButton>
                </div>
              </div>
              <div className="form-group">
                <label>
                  First Name<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <i className="ti-user" style={{ left: "10px" }}></i>
                {error.firstname && (
                  <div className="text-danger">{error.firstname}</div>
                )}
              </div>
              <div className="form-group">
                <label>
                  Last Name<span className="text-danger">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <i className="ti-user" style={{ left: "10px" }}></i>
                {error.lastname && (
                  <div className="text-danger">{error.lastname}</div>
                )}
              </div>

              
            </div>
            <div className="form-group col-md-6">
              <label>Mobile Number</label>
              <input
                className="form-control"
                type="text"
                name="number"
                value={mobileNumber}
                readOnly
              />
              <i className="icon_phone" style={{ top: "30px" }}></i>
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={email}
                readOnly
              />
              <i className="icon_mail_alt" style={{ top: "30px" }}></i>
            </div>
            <div className="text-center col-12 mt-3">
              <input
                type="submit"
                value="Submit"
                className="btn_1 full-width"
              />
            </div>
          </div>
          {showPopup && (
            <Popupalert
              message={successMessage || errorMessage}
              type={successMessage ? "success" : "error"}
              onClose={handleClosePopup}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default withAuthh(Editprofile);
