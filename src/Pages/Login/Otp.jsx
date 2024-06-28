import React, { useState } from 'react';
import axios from 'axios';

const Otp = () => {
  const [countryCode, setCountryCode] = useState('');
  const [isMobileInput, setIsMobileInput] = useState(false); // State to track which input to show
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleCountryCodeChange = (selectedCountryCode) => {
    setCountryCode(selectedCountryCode);
    setIsMobileInput(selectedCountryCode === '+91'); // Show mobile input if +91 is selected
  };

  const handleSendOTP = () => {
    const requestData = {
      countryCode: countryCode,
      [isMobileInput ? 'mobile' : 'email']: isMobileInput ? mobileNumber : email
    };
    console.log("Hello");

    // Make API call
    axios.post('http://api.myinteriormart.com/api/SignIn/SendOtp', requestData)
      .then(response => {
        // Handle successful response, maybe show a success message
        console.log('OTP Sent successfully', response);
      })
      .catch(error => {
        // Handle error, maybe show an error message to the user
        console.error('Error sending OTP', error);
      });
  };

  return (
    <div>
      <select value={countryCode} onChange={e => handleCountryCodeChange(e.target.value)}>
        <option value="">Select Country Code</option>
        <option value="+91">+91</option>
        {/* Add other country codes as needed */}
      </select>
      {isMobileInput ? (
        <input
          type="text"
          value={mobileNumber}
          onChange={e => setMobileNumber(e.target.value)}
          placeholder="Enter Mobile Number"
        />
      ) : (
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
      )}
      <button onClick={handleSendOTP}>Send OTP</button>
    </div>
  );
};

export default Otp;