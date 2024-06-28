import React, { useState } from 'react';
import '../../FrontEnd/css/Register.css';

function Register() {
    const [vendorType, setVendorType] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage,setSuccessMessage]=useState('');
    const[businesscategory,setbusinesscategory]=useState('');
    const[passwordVisible,setPasswordVisible]=useState(false);
    const[confirmpasswordVisible,setConfirmPasswordVisible]=useState(false);
    

    const handleUserTypeChange = (e) => {
        setVendorType(e.target.value);
    };

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility=()=>{
        setConfirmPasswordVisible(!confirmpasswordVisible);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        const payload = {
            vendortype: vendorType,
            email: email,
            mobile: mobile,
            password: password,
            confirmPassword: confirmPassword
        };
        const payload1 = {
            vendortype: vendorType,
            email: email,
            mobile: mobile,
            password: password,
            confirmPassword: confirmPassword,
            businesscategory:businesscategory,
        };

        try {
            let response;
            if (vendorType.toLowerCase() === 'business') {
                response = await fetch('https://apidev.myinteriormart.com/api/Register/RegisterPanelBusiness', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'c4NjY4NTMyMTMiLCJhdWQiOiIxOTg0OTgH',
                    },
                    body: JSON.stringify(payload1),
                });
            } else {
                response = await fetch('https://apidev.myinteriormart.com/api/Register/RegisterPanel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'c4NjY4NTMyMTMiLCJhdWQiOiIxOTg0OTkz',
                    },
                    body: JSON.stringify(payload),
                });
            }

            const data = await response.json();

            if (response.ok) {
                console.log('User Registered successfully', data);
                setSuccessMessage('User Registered successfully');

            } else {
                console.error('Server Error:', data);
                setError(data.message || 'User Registration Failed');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setError('An error occurred while sending OTP. Please try again later.');
        }
    };

    const businessFields = (
        <div className="form-group">
            <select name="business-type" className="form-control">
                <option value="">Select Business Type</option>
                <option value="dealer">Dealer</option>
                <option value="service-provider">Service Provider</option>
                <option value="manufatures">Manufactures</option>
                <option value="rental">Rental</option>
                <option value="labour">Labour</option>
                <option value="contractor">Contractor</option>
                {/* Add more options as needed */}
            </select>
        </div>
    );

    return (
      <div className="container sign_up_container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog">
              <div className="step first">
                <h2 className="text-center pt-3">Register</h2>
                <div className="tab-content checkout">
                  <div>
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex justify-content-around mt-3">
                        <div className="form-check user_type">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="user-type"
                            value="Business"
                            onChange={handleUserTypeChange}
                          />
                          <label className="form-check-label">Business</label>
                        </div>
                        <div className="form-check user_type">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="user-type"
                            value="Consumer"
                            onChange={handleUserTypeChange}
                          />
                          <label className="form-check-label">Consumer</label>
                        </div>
                      </div>
                      {vendorType.toLowerCase() === "business" &&
                        businessFields}
                      <div className="form-group mb-4">
                        <div className="icon-wrapper">
                          <i className="icon_mail_alt"></i>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <div className="icon-wrapper">
                          <i className="icon_phone"></i>
                        </div>
                        <input
                          className="form-control"
                          type="number"
                          name="mobile"
                          placeholder="Mobile no."
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                        />
                      </div>
                      <div
                        className="form-group"
                        style={{ position: "relative", marginBottom: "1rem" }}
                      >
                        <div className="icon-wrapper">
                          <i className="icon_lock_alt"></i>
                        </div>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control"
                          style={{ paddingRight: "2.5rem" }}
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                          onClick={togglePasswordVisibility}
                          className={`fa ${
                            passwordVisible ? "fa-eye" : "fa-eye-slash"
                          }`}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "orange",
                            fontSize: "20px",
                          }}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <div
                        className="form-group"
                        style={{ position: "relative", marginBottom: "1rem" }}
                      >
                        <div className="icon-wrapper">
                          <i className="icon_lock_alt"></i>
                        </div>

                        <input
                          type={confirmpasswordVisible ? "text" : "password"}
                          className="form-control"
                          style={{ paddingRight: "2.5rem" }}
                          name="confirmPassword"
                          id="confirm-password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <i
                          onClick={toggleConfirmPasswordVisibility}
                          className={`fa ${
                            confirmpasswordVisible ? "fa-eye" : "fa-eye-slash"
                          }`}
                          style={{
                            position: "absolute",
                            top: "50%",
                            right: "10px",
                            transform: "translateY(-50%)",
                            cursor: "pointer",
                            color: "orange",
                            fontSize: "20px",
                          }}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <button type="submit" className="btn_1 full-width mb-4">
                        Register
                      </button>
                      <p>
                        Already have an account! <a href="/login">Sign In</a>
                      </p>
                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}
                      {successMessage && (
                        <div className="alert alert-success">
                          {successMessage}
                        </div>
                      )}
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

export default Register;
