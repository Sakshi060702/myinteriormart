import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import mobileImage from '../../FrontEnd/img/icon/mobile.png'; 
import '../../FrontEnd/css/Receiveotp2.css';

function Receiveotpemail() {
    const location = useLocation();
    const { otp, email } = location.state || { otp: '', email: '' }; 
    const [otpValues, setOtpValues] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const newOtpValues = [...otpValues];
        newOtpValues[index] = e.target.value;
        setOtpValues(newOtpValues);

        // Move focus to next input if value is entered
        if (e.target.value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        const otp = otpValues.join(''); // Combine OTP values into a single string
        try {
            const response = await fetch('https://apidev.myinteriormart.com/api/SignIn/VerifyOtpEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV",
                },
                body: JSON.stringify({ otp, email }),
            });

            const data = await response.json();
            console.log(data); // Log the response data
            
            if (response.ok) {
                console.log('Hello');
                if (data) {
                    navigate(`/register?email=${encodeURIComponent(email)}`); // Redirect to the register page on success
                } else {
                    setError('Invalid OTP. Please try again.');
                }
            } else {
                setError('Failed to verify OTP. Please try again later.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="container-fluid sign_up_container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog" style={{ maxWidth: '500px' }}>
                        <div className="step first">
                            <div>
                                <div>
                                    <h2 className="text-center pt-3" style={{ whiteSpace: 'nowrap' }}>Verify Your Email</h2>
                                </div>
                                <div className="row justify-content-center">
                                    <h5>Get Connected to Verified Sellers</h5>
                                </div>
                            </div>
                            <div className="tab-content checkout">
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group mr-2">
                                            <p>Enter 4 digit One Time Password (OTP) sent to your {email}</p>
                                        </div>
                                        <div className="form-group mb-4 d-flex align-items-center">
                                            <div style={{ marginTop: '-20px' }}>
                                                <img src={mobileImage} alt="Mobile Icon" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
                                            </div>
                                            <div className="otp-input-container">
                                                {otpValues.map((value, index) => (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        id={`otp-${index}`}
                                                        value={value}
                                                        onChange={(e) => handleChange(e, index)}
                                                        maxLength="1"
                                                        className="otp-input"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        {error && <div className="form-group"><p style={{ color: 'red' }}>{error}</p></div>}
                                        <div className="form-group mr-2 align-self-stretch">
                                            <button type="submit" className="btn_1 full-width mb-4 input" style={{ height: '50px' }}>Submit</button>
                                        </div>
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

export default Receiveotpemail;
