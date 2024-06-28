import React,{useState} from 'react';
import '../../FrontEnd/css/dropdown.css'
import { Link } from 'react-router-dom';


function Signup() {

     const [selectedCountry, setSelectedCountry] = useState('');
    const [inputType, setInputType] = useState('email');

    const countries = [
         { code: 'In', name: '+91 India',phoneCode:'91'},
        { code: 'US', name: '+98 United States',phoneCode: '98'},
        { code: 'CA', name: '+65 Canada',phoneCode: '65' },
        { code: 'UK', name: '+97 United Kingdom',phoneCode: '97' },
        // Add more countries as needed
    ];

    const handleCountrychange=(e)=>{
        const countryCode=e.target.value;
        setSelectedCountry(countryCode);

        if(countryCode=='In')
            {
                setInputType('tel');

            }
            else{
                setInputType('email');
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
                                   <form action="#" method="post">
                                    
                                        <div className="form-group mr-2">
                                            <select name="country" className="form-control" onChange={handleCountrychange}>
                                                <option value="">Select Country</option>
                                                {countries.map((country, index) => (
                                                    <option key={index} value={country.code}>{country.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group mb-4">
                                            <input className="form-control" type={inputType} name={inputType === 'tel' ? 'mobile' : 'email'} placeholder={inputType === 'tel' ? 'Mobile Number' : 'Email'} />
                                        </div>
                                         <Link to="/requestotp" className="btn_1 full-width mb-4">Send OTP</Link>
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

export default Signup;
