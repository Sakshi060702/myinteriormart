import React, { useState } from 'react';
import '../../FrontEnd/css/dropdown.css';
import { useNavigate } from 'react-router-dom';

function Signup1() {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [inputType, setInputType] = useState('email');
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const countries = [
        { code: '+91', name: '+91 India', phoneCode: '91' },
        { code: '+98', name: '+98 United States', phoneCode: '98' },
        { code: '+65', name: '+65 Canada', phoneCode: '65' },
        { code: '+97', name: '+97 United Kingdom', phoneCode: '97' },
        // Add more countries as needed
    ];

    // const handleCountryChange = (e) => {
    //     const countryCode = e.target.value;
    //     setSelectedCountry(countryCode);

    //     if (countryCode === '+91') {
    //         setInputType('tel');
    //     } else {
    //         setInputType('email');
    //     }
    // };

    const handleInputChange = (e) => {
        setInputValue({...inputValue,[e.target.name]: e.target.value});
        console.log(inputValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

         const { countryCode, mobile, email } = inputValue;
        const payload = {
            countryCode: countryCode,
            mobile: mobile,
            email: email,
        };

        try {
            const response = await fetch('https://api.myinteriormart.com/api/SignIn/SendOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
                },
                body: JSON.stringify(inputValue),
            });
            console.log(response);

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                navigate('/receiveotp2', { state: { otp: data.otp, mobile: inputValue.mobile } });
                console.log('OTP sent successfully', data);
            } else {
                console.error('Server Error:', data);
                setError(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setError('An error occurred while sending OTP. Please try again later.');
        }
    };

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
                                        <div className="form-group mr-2">
                                            <select name="countryCode" className="form-control" onChange={handleInputChange}>
                                                <option value="">Select Country</option>
                                                {countries.map((country, index) => (
                                                    <option key={index} value={country.code}>{country.name}</option>
                                                ))}

                                            </select>
                                        </div>
                                        <div className="form-group mb-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="mobile"
                                                // name={inputType === 'tel' ? 'mobile' : 'email'}
                                                placeholder="mobile"
                                                
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                         {/* <div>
                                            <input
                                                className="form-control"
                                                type="email"
                                                name="email"
                                                // name={inputType === 'tel' ? 'mobile' : 'email'}
                                                placeholder="email"
                                                // style={{ display: 'none' }}

                                                
                                            
                                                onChange={handleInputChange}
                                            />
                                        </div> */}
                                        {error && <div className="alert alert-danger">{error}</div>}
                                        <button type="submit" className="btn_1 full-width mb-4">Send OTP</button>
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

export default Signup1;

