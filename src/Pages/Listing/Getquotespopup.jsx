import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Popupalert from "../Popupalert";

const Getquotespopup = ({ isOpen, companyID, onClose }) => {
  const [formData, setFormData] = useState({
    enquiryTitle: "",
    message: "",
  });
  const token = useSelector((state) => state.auth.token);

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/UserProfile/GetUserProfile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          fullName: `${data.name} ${data.lastName}`,
          email: data.email,
          mobileNumber: data.phone,
        }));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen, token]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      formData['companyID']= companyID;
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/CreateEnquiry/CreateEnquiry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setSuccessMessage("Enquiry Sent Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        onClose();
      }, 2000);
      // Handle success (e.g., show a success message or close the popup)
      onClose();
    } catch (error) {
      console.error("Error submitting the form:", error);
      setErrorMessage("Failed to Send Enquiry. Please try again later.");
      setSuccessMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <>
      <style>
        {`
          .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          .popup-content {
          position:relative;
            background: white;
            padding: 20px;
            border-radius: 5px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
            .close-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: transparent;
            border: none;
            font-size: 1.2rem;
            cursor: pointer;
          }
            .textarea1{
            width:460px;
            }
             @media (max-width: 576px) {
            .form-group label {
              font-size: 0.9rem;
            }
            .form-group input, .form-group textarea {
              font-size: 0.9rem;
            }
            .btn {
              font-size: 0.9rem;
              padding: 10px;
            }
           .popup-overlay {
            position: fixed;
           
            right: 5px;
           
          }
            .textarea1{
            width:0px;
            }
          }
             
        `}
      </style>
      <div className="popup-overlay" onClick={onClose}>
        <div className="popup-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            X
          </button>
          <h6>Enquiry Now</h6>
          
          <hr></hr>
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* <div className="col-md-6">
                <div className="form-group">
                    <label>Full Name</label>
                    <input className="form-control" type="text"
                    name="fullName" placeholder="Full Name"  value={formData.fullName}
                    onChange={handleChange}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <label>Mobile Number</label>
                    <input className="form-control"  type="number"
                    name="mobileNumber" maxLength={10} placeholder="Mobile Number" value={formData.mobileNumber}
                    onChange={handleChange}/>
                </div>
            </div> */}
              <div className="col-md-12">
                <div className="form-group">
                  <label>Enquiry Title</label>
                  <input
                    className="form-control"
                    type="text"
                    name="enquiryTitle"
                    placeholder="Enquiry Title"
                    value={formData.enquiryTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="form-group">
                    <label>Email</label>
                    <input className="form-control" type="email"
                    name="email" placeholder="Email"  value={formData.email}
                    onChange={handleChange}/>
                </div>
            </div> */}
              <div className="col-md-12">
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    className="form-control textarea1"
                    type="text"
                    name="message"
                    placeholder="Message"
                    style={{  height: "100px" }}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button
                className="btn btn-primary w-100"
                style={{ backgroundColor: "orange" }}
              >
                Submit
              </button>
            </div>
          </form>
          {showPopup && (
            <Popupalert
              message={successMessage || errorMessage}
              type={successMessage ? "success" : "error"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Getquotespopup;
