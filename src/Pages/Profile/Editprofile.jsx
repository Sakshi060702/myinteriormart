import React, { useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Profileimg from "../../FrontEnd/img/Asset.png";

function Editprofile() {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectGender, setSelectGender] = useState('Select Gender');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted!');
  };

  const handleSelect = (eventKey) => {
    setSelectGender(eventKey);
  };

  return (
    <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
      <div className="add-review">
        <h5>Edit Profile</h5>
        <form className="icon-form-group" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="profile_col_1">
                <div className="profile-section">
                  <label className="-label" htmlFor="file">
                    <span><i className="fas fa-camera"></i></span>
                    <span>Change Image</span>
                  </label>
                  <input id="file" type="file" onChange={(event) => console.log(event.target.files[0])} />
                  <img className="profile_img" src={Profileimg} id="output" alt="Profile" />
                </div>
                <h6 className="profile_customer_name text-center">Name Goes Here</h6>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Full Name</label>
                <input className="form-control" type="text" name="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <i className="ti-user" style={{ left: '10px' }}></i>
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input className="form-control" type="text" name="number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
                <i className="icon_phone" style={{ left: '10px' }}></i>
              </div>
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input type="email" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <i className="icon_mail_alt" style={{ top: '30px' }}></i>
            </div>
            <div className="form-group col-md-6">
              <div className="custom-select-form">
                <label htmlFor="gender"> Gender:</label>
                <DropdownButton id="dropdown-basic-button" className="custom-dropdown" title={selectGender} onSelect={handleSelect} variant="light">
                  <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                  <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                  <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
            <div className="text-center col-12 mt-3">
              <input type="submit" value="Submit" className="btn_1 full-width" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Editprofile;
