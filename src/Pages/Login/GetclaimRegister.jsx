import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../FrontEnd/css/Register.css';
import '../../FrontEnd/css/Receiveotp2.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess,setUserType } from '../../Redux/authSlice';
import { validateEmail,validateMobile,validateEmailOptional } from '../Validation';
import "../../FrontEnd/css/RegistrationMV.css"

function GetclaimRegister() {
    const [vendorType, setVendorType] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [pin, setPin] = useState(['', '', '', '']); // Initialize pin state as an array
    const [confirmPin, setConfirmPin] = useState(['', '', '', '']); // Initialize confirmPin state as an array
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [businesscategory, setBusinessCategory] = useState('');
    const [pinVisible, setPinVisible] = useState(false);
    const [confirmPinVisible, setConfirmPinVisible] = useState(false);

    const [emailError, setEmailError] = useState("");

    const location = useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(() => {
        if (location.state) {
            const { mobile, email } = location.state;
            if (mobile) {
                setMobile(mobile);
            }
            if (email) {
                setEmail(email);
            }
        }
    }, [location.state]);

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (value && !emailRegex.test(value)) {
            setEmailError("Please enter a valid email address.");
        } else {
            setEmailError("");
        }
    };

    const handleUserTypeChange = (e) => {
        setVendorType(e.target.value);
    };

    const togglePinVisibility = () => {
        setPinVisible(!pinVisible);
    };

    const toggleConfirmPinVisibility = () => {
        setConfirmPinVisible(!confirmPinVisible);
    };

    const handlePinChange = (e, index) => {
        const { value } = e.target;

        // Check if the input value is a digit
        if (/^\d?$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Automatically focus on the next input box if there is a value and index < 3
            if (value && index < 3) {
                document.getElementById(`pin-${index + 1}`).focus();
            }
        }
    };

    const handleConfirmPinChange = (e, index) => {
        const { value } = e.target;

        // Check if the input value is a digit
        if (/^\d?$/.test(value)) {
            const newPin = [...confirmPin];
            newPin[index] = value;
            setConfirmPin(newPin);

            // Automatically focus on the next input box if there is a value and index < 3
            if (value && index < 3) {
                document.getElementById(`confirm-pin-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission

        setError('');


        // const emailError = validateEmailOptional(email);
        // const mobileError = validateMobile(mobile);

        // if ( mobileError ) {
        //     setError( mobileError);
        //     return;
        // }

        // Validate vendor type
   




        const payload = {
            // vendortype: vendorType,
            
            MobileorEmail: mobile,
            Password: pin.join(''), // Convert array to string
            Confirmpassword: confirmPin.join(''), // Convert array to string
        };

        // const payload1 = {
        //     vendortype: vendorType,
        //     email: email,
        //     mobile: mobile,
        //     password: pin.join(''), // Convert array to string
        //     confirmpassword: confirmPin.join(''), // Convert array to string
        //     businesscategory: businesscategory,
        // };

        try {
            const response=await fetch(
                "https://apidev.myinteriormart.com/api/SignIn/CalimRegisteration",
                {
                    method:"POST",
                    headers: {
                        "Content-Type": "application/json",
                      },
                      body:JSON.stringify(payload),
                }
            )

            const data = await response.json();
            console.log(data);

            const cityName = localStorage.getItem('cityname');
            const pathhome = `/in-${cityName}`;

            if (response.ok) {
                const tokenExpiry = new Date().getTime() + 1440 * 60 * 1000;
                console.log('User Registered successfully', data);
                localStorage.setItem("token_startTime", new Date().getTime());
                localStorage.setItem("token_endTime", new Date().getTime() + 1440 * 60 * 1000);

                
                localStorage.setItem('email',email);
                localStorage.setItem('mobile',mobile);
                

                dispatch(loginSuccess({token:data.token}))
                dispatch(setUserType(vendorType));
                setSuccessMessage('User Registered successfully');
                //  navigate('/');

                navigate(pathhome)
            } else {
                console.error('Server Error:', data);
                setError(data.message || 'User Registration Failed');
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
                            <h2 className="text-center pt-3">Register Get Claim</h2>
                            <div className="tab-content checkout">
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        
                                        
                                        <div className="form-group">
                                            <div className="icon-wrapper">
                                                <i className="icon_phone"></i>
                                            </div>
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="Mobile/Email"
                                                placeholder="Mobile no."
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                
                                            />
                                             {error.mobile && (
                                                    <div className="text-danger">{error.mobile}</div>
                                                )}
                                        </div>
                                        <div className="pin-group">
                                            <label htmlFor="pin">Enter PIN</label>
                                            <div className="pin-input-group">
                                                {[...Array(4)].map((_, index) => (
                                                    <input
                                                        key={index}
                                                        id={`pin-${index}`}
                                                        type={pinVisible ? "text" : "password"}
                                                        maxLength="1"
                                                        className="pin-input"
                                                        value={pin[index] || ''}
                                                        onChange={(e) => handlePinChange(e, index)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Backspace' && index > 0 && !pin[index]) {
                                                                const newPin = [...pin];
                                                                newPin[index - 1] = '';
                                                                setPin(newPin);
                                                                document.getElementById(`pin-${index - 1}`).focus();
                                                            }
                                                        }}
                                                        onFocus={(e) => e.target.select()}
                                                        required
                                                    />
                                                ))}
                                            </div>
                                            <i
                                                onClick={togglePinVisibility}
                                                className={`registereye fa ${pinVisible ? "fa-eye" : "fa-eye-slash"}`}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "10px",
                                                    transform: "translateY(-50%)",
                                                    cursor: "pointer",
                                                    color: "orange",
                                                    fontSize: "20px",
                                                   
                                                    marginTop: '20px'
                                                }}
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div className="pin-group">
                                            <label htmlFor="confirm-pin">Enter Confirm PIN</label>
                                            <div className="pin-input-group">
                                                {[...Array(4)].map((_, index) => (
                                                    <input
                                                        key={index}
                                                        id={`confirm-pin-${index}`}
                                                        type={confirmPinVisible ? "text" : "password"}
                                                        maxLength="1"
                                                        className="pin-input"
                                                        value={confirmPin[index] || ''}
                                                        onChange={(e) => handleConfirmPinChange(e, index)}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Backspace' && index > 0 && !confirmPin[index]) {
                                                                const newPin = [...confirmPin];
                                                                newPin[index - 1] = '';
                                                                setConfirmPin(newPin);
                                                                document.getElementById(`confirm-pin-${index - 1}`).focus();
                                                            }
                                                        }}
                                                        onFocus={(e) => e.target.select()}
                                                        required
                                                    />
                                                ))}
                                            </div>
                                            <i
                                                onClick={toggleConfirmPinVisibility}
                                                className={`registereye fa ${confirmPinVisible ? "fa-eye" : "fa-eye-slash"}`}
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "10px",
                                                    transform: "translateY(-50%)",
                                                    cursor: "pointer",
                                                    color: "orange",
                                                    fontSize: "20px",
                                                   
                                                    marginTop: '20px'
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
                                        {/* {error && <div className="alert alert-danger">{error}</div>} */}
                                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
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

export default GetclaimRegister;