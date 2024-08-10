import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";

function Changepassword() {
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = useSelector((state) => state.auth.token);

  const [showPassword, setshowPassword] = useState("false");
  const [successMessage, setSuccessMessage] = useState("");
  const [oldpasswordVisible, setOldPasswordVisible] = useState(false);
  const [newpasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleOldPasswordChange = (e) => {
    setoldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleOldPasswordVisibility1 = () => {
    setOldPasswordVisible(!oldpasswordVisible);
  };

  const toggleNewPasswordVisibility1 = () => {
    setNewPasswordVisible(!newpasswordVisible);
  };

  const toggleConfirmPasswordVisibility1 = () => {
    setConfirmPasswordVisible(!confirmpasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/ForgotPassword/ForgotPassword",
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
      alert("Data saved Successfully");
      // Reset form fields after successful submission
      setoldPassword("");
      setNewPassword("");
      setConfirmPassword("");
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
          <h5>Change Password</h5>
          <form className="icon-form-group" onSubmit={handleSubmit}>
            <div className="row">
              <div
                className="form-group col-12"
                style={{ position: "relative", marginBottom: "1rem" }}
              >
                <label>Old Password</label>

                <input
                  className="form-control"
                  type={oldpasswordVisible ? "text" : "password"}
                  name="old_password"
                  placeholder="Old Pin"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
                <i class="icon_lock_alt"></i>
                <i
                  onClick={toggleOldPasswordVisibility1}
                  className={`fa ${
                    oldpasswordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                  style={{
                    position: "absolute",
                    top: "69%",
                    left: "780px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "orange",
                    fontSize: "20px",
                  }}
                  aria-hidden="true"
                ></i>
              </div>
              <div
                className="form-group col-12"
                style={{ position: "relative", marginBottom: "1rem" }}
              >
                <label>New Password</label>

                <input
                  type={newpasswordVisible ? "text" : "password"}
                  className="form-control"
                  name="newpassword"
                  placeholder="New Pin"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
                <i class="icon_lock_alt"></i>
                <i
                  onClick={toggleNewPasswordVisibility1}
                  className={`fa ${
                    newpasswordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                  style={{
                    position: "absolute",
                    top: "69%",
                    left: "780px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "orange",
                    fontSize: "20px",
                  }}
                  aria-hidden="true"
                ></i>
              </div>
              <div
                className="form-group col-12"
                style={{ position: "relative", marginBottom: "1rem" }}
              >
                <label>Confirm New Password</label>
                <input
                  className="form-control"
                  type={confirmpasswordVisible ? "text" : "password"}
                  name="confirm_new_password"
                  placeholder="Confirm New Pin"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <i class="icon_lock_alt"></i>
                <i
                  onClick={toggleConfirmPasswordVisibility1}
                  className={`fa ${
                    confirmpasswordVisible ? "fa-eye" : "fa-eye-slash"
                  }`}
                  style={{
                    position: "absolute",
                    top: "69%",
                    left: "780px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "orange",
                    fontSize: "20px",
                  }}
                  aria-hidden="true"
                ></i>
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
export default Changepassword;
