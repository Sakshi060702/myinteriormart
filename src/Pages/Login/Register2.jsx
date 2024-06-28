import React, { useState } from 'react';

function Register2() {
    const [formData, setFormData] = useState({
        userType: '',
        email: '',
        number: '',
        password: '',
        confirmPassword: '',
        businesscategory:'',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

       

        try {
            const response = await fetch('https://otp.myinteriormart.com/api/Register/RegisterPanel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization":"c4NjY4NTMyMTMiLCJhdWQiOiIxOTg0OTkz"
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log(result);
            alert("Registration successful");

        } catch (error) {
            console.error('Error:', error);
            alert("Registration failed");
        }
    };

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
                                                    name="userType"
                                                    value="business"
                                                    checked={formData.userType === 'business'}
                                                    onChange={handleChange}
                                                />
                                                
                                                <label className="form-check-label">Business</label>
                                            </div>
                                            <div className="form-check user_type">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="userType"
                                                    value="consumer"
                                                    checked={formData.userType === 'consumer'}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label">Consumer</label>
                                            </div>
                                        </div>

                                        <div className="form-group mb-4">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="email"
                                                placeholder="Email / Mobile Number"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="number"
                                                name="number"
                                                placeholder="Mobile no."
                                                value={formData.number}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="password"
                                                placeholder="PIN"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="password"
                                                className="form-control"
                                                name="confirmPassword"
                                                placeholder="Confirm PIN"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                name="businesscategory"
                                                placeholder="BusinessCategory"
                                                value={formData.businesscategory}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        
                                       <button type="submit" className="btn_1 full-width mb-4">Register</button>
                                        <p>Already have an account! <a href="/login">Sign In</a></p>
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

export default Register2;
