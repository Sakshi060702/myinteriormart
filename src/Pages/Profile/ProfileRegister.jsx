import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";

function ProfileRegister() {
  const [mobileNumber, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const token = useSelector((state) => state.auth.token);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
      alert("Data saved Successfully")
      // Reset form fields after successful submission
      setMobile("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
                <label>Mobile Number</label>
                <input
                  className="form-control"
                  type="text"
                  name="number"
                  value={mobileNumber}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <i className="icon_phone" style={{ left: "20px" }}></i>
              </div>
              <div className="form-group col-6">
                <label>
                  Email &nbsp;{" "}
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
              </div>

              <div className="text-center col-12 mt-3">
                <input
                  type="submit"
                  value="Submit"
                  className="btn_1 full-width"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default ProfileRegister;
