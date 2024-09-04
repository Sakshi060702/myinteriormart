import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import { validateEmail,validateMobile } from "../Validation";
import Popupalert from "../Popupalert";

function ProfileRegister() {
  const [mobileNumber, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");



  const handleSubmit = async (event) => {
    event.preventDefault();

    const mobileError = validateMobile(mobileNumber);
    const emailError = validateEmail(email);

    if (mobileError||emailError) {
      setError({
        mobile: mobileError,
        email:emailError,
       
      });
      return;
    }

    const data = {
      mobileNumber,
      email,
    };

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/EditRegister/EditProfileRegister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setSuccessMessage("Data Save Succeessfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
       
      },  2000);
      // Reset form fields after successful submission
      setMobile("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "Failed to Save  details. Please try again later."
      );
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
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
              <div className="form-group col-6">
                <label>Mobile Number<span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  type="text"
                  name="number"
                  value={mobileNumber}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <i className="icon_phone" style={{ left: "20px" }}></i>

                {error.mobile && (
                      <div className="text-danger">{error.mobile}</div>
                    )}
              </div>
              <div className="form-group col-6">
                <label>
                  Email<span className="text-danger">*</span> &nbsp;{" "}
                  <a
                    href="#verify_email"
                    title="Verify Email"
                    id="enquiry-in"
                    className="text-success verify_email"
                  >
                    Verify Email
                  </a>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <i className="icon_mail_alt" style={{ top: "30px" }}></i>
                {error.email && (
                      <div className="text-danger">{error.email}</div>
                    )}
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
    </>
  );
}
export default ProfileRegister;
