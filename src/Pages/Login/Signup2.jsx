import React, { useState } from "react";
import "../../FrontEnd/css/dropdown.css";
import "../../FrontEnd/css/Register.css";
import "../../FrontEnd/css/RegistrationMV.css"
import Flag from "react-world-flags";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

import { validateEmail, validateMobile } from "../Validation";

function Signup2() {
  const countries = [
    { value: "+91", label: "India", phoneCode: "91", flag: "IN" },
    { value: "+98", label: "United States", phoneCode: "98", flag: "US" },
    { value: "+65", label: "Canada", phoneCode: "65", flag: "CA" },
    { value: "+97", label: "United Kingdom", phoneCode: "97", flag: "GB" },
    {
      value: "+971",
      label: "United Arab Emirates",
      phoneCode: "971",
      flag: "AE",
    },
    { value: "+61", label: "Australia", phoneCode: "61", flag: "AU" },
    { value: "+93", label: "Afghanistan", phoneCode: "93", flag: "AF" },
    // Add more countries with their flag codes
  ];

  const defaultCountry = countries[0]; // Set the default country (India)

  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [inputValue, setInputValue] = useState({
    countryCode: defaultCountry.value,
  });
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setInputValue({ ...inputValue, countryCode: selectedOption.value });
    console.log(selectedOption); // Debugging line
  };

  const handleInputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setErrors({});

    const { countryCode, mobile, email } = inputValue;

    let mobileError = null;
    let emailError = null;

    if (selectedCountry.value === "+91") {
      mobileError = validateMobile(mobile);
    } else {
      emailError = validateEmail(email);
    }
    if (mobileError || emailError) {
      setError(mobileError || emailError);
      return; // Stop form submission if there are validation errors
    }

    const payload = {
      countryCode: countryCode,
      mobile: mobile,
      email: email,
    };

    try {
      let response;
      if (selectedCountry.value === "+91" && mobile) {
        response = await fetch(
          "https://apidev.myinteriormart.com/api/SignIn/SendOtp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
            },
            body: JSON.stringify(payload),
          }
        );
      } else if (email) {
        response = await fetch(
          "https://apidev.myinteriormart.com/api/SignIn/SendOtpEmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCe3",
            },
            body: JSON.stringify(payload),
          }
        );
      }

      const data = await response.json();

      const cityName = localStorage.getItem('cityname');
      const path = `/receiveotp2/in-${cityName}`;

      const pathemail= `/receiveotpemail/in-${cityName}`;

      if (response.ok) {
        if (mobile) {
          navigate(path, {
            state: { otp: data.otp, mobile: inputValue.mobile },
          });
        } else {
          navigate(pathemail, {
            state: { otp: data.otp, email: inputValue.email },
          });
        }
        console.log("OTP sent successfully", data);
      } else {
        console.error("Server Error:", data);
        setError(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setError("An error occurred while sending OTP. Please try again later.");
    }
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const formatOptionLabel = ({ label, value, flag }) => (
    <div className="country-option">
      <Flag
        code={flag}
        style={{ width: "24px", height: "16px", marginRight: "8px" }}
      />
      <span>
        {value} {label}
      </span>
    </div>
  );

  return (
    <div className="container sign_up_container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog">
            <div className="step first">
              <h2 className="text-center pt-3">Sign In</h2>
              <div className="tab-content checkout">
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group select-container mr-2">
                      <Select
                        options={countries}
                        onChange={handleCountryChange}
                        styles={customStyles}
                        formatOptionLabel={formatOptionLabel}
                        value={selectedCountry}
                      />
                    </div>
                    {selectedCountry && selectedCountry.value === "+91" && (
                      <div className="form-group mb-4">
                        <div className="icon-wrapper">
                          <i className="icon_phone"></i>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          name="mobile"
                          placeholder="Mobile"
                          onChange={handleInputChange}
                          maxLength={10}
                        />
                        {errors.mobile && (
                          <div className="text-danger">{errors.mobile}</div>
                        )}
                      </div>
                    )}
                    {selectedCountry && selectedCountry.value !== "+91" && (
                      <div className="form-group mb-4">
                        <div className="icon-wrapper" >
                          <i className="icon_mail_alt"></i>
                        </div>
                        <input
                          className="form-control"
                          type="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleInputChange}
                          required
                        />
                        {errors.email && (
                          <div className="text-danger">{errors.email}</div>
                        )}
                      </div>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn_1 full-width mb-4">
                      Send OTP
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup2;
