import React, { useState } from 'react';
import '../../FrontEnd/css/dropdown.css'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../../FrontEnd/css/Register.css";
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/authSlice';


function Login() {

    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const {mobile,password}=location.state ||{mobile :'',password:''};
    const[userId,setuserId]=useState('');
    const[userMobile,setuserMobile]=useState('');
    const[userPassword,setuserPassword]=useState('');
    const[error,setError]=useState('');
    const [success, setSuccess] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [rememberMe, setRememberMe] = useState(false);



    
    const handleMobileChange=(e)=>{
        setuserMobile(e.target.value);
    }
    const handlePasswordChange=(e)=>{
         setuserPassword(e.target.value);
    }

    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');
          setSuccess(''); 

        try{
            const response=await fetch('https://apidev.myinteriormart.com/api/Auth/Login',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    
                    
                
                },
                body:JSON.stringify({emailOrMobile:userMobile,password:userPassword,rememberMe:rememberMe})
            });
            const data=await response.json();
            console.log(data);

            if(response.ok){
              const tokenExpiry = new Date().getTime() + 30 * 60 * 1000;
                dispatch(loginSuccess({token:data.token,user:data.user,tokenExpiry:tokenExpiry}));
                console.log("Login Successful");
                 setSuccess('Login Successful');
                 navigate('/');
                 
            }
             else {
                setError('Login unsuccessful');
            }
        }
        catch(error){
            setError('Login unsuccessful');
        }
        
    }

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
                      <div className="form-group mb-4">
                        <div className="icon-wrapper">
                          <i className="icon_mail_alt"></i>
                        </div>
                        <input
                          className="form-control"
                          type="text"
                          name="mobile"
                          placeholder="Email/Mobile Number"
                          value={userMobile}
                          onChange={handleMobileChange}
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
                          style={{ paddingRight: "2.5rem" }} // Add padding to the right to make space for the icon
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          value={userPassword}
                          onChange={handlePasswordChange}
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

                      <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                          <label className="container_check">
                            Remember Me
                            <input type="checkbox"
                            checked={rememberMe} 
                            onChange={(e)=>setRememberMe(e.target.checked)}/>
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <Link
                        className="forgetpassword"
                        to="/Forgetpassword"
                        style={{ color: "Orange", textDecoration: "none" }}
                        onMouseOver={(e) => (e.target.style.color = "Black")}
                        onMouseOut={(e) => (e.target.style.color = "Orange")}
                      >
                        Forgot Password
                      </Link>

                      <button type="submit" className="btn_1 full-width mb-4">
                        Log In
                      </button>
                      {success && (
                        <div className="alert alert-success">{success}</div>
                      )}
                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}

                      <p>
                        You don't have an account !
                        <Link
                          to="/register"
                          style={{ color: "Orange", textDecoration: "none" }}
                          onMouseOver={(e) => (e.target.style.color = "Black")}
                          onMouseOut={(e) => (e.target.style.color = "Orange")}
                        >
                          Sign up
                        </Link>
                      </p>
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

export default Login;
