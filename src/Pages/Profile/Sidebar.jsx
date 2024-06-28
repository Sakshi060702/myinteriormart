import React, { useState,useCallback } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


import profile from '../../FrontEnd/img/icon/edit.png';
import address from '../../FrontEnd/img/icon/map.png';
import enquiry from '../../FrontEnd/img/icon/enquiry.png';
import bookmark from '../../FrontEnd/img/icon/bookmark.png';
import like from '../../FrontEnd/img/icon/like.png';
import subscribe from '../../FrontEnd/img/icon/subscribe.png';
import review from '../../FrontEnd/img/icon/review.png';
import chat from '../../FrontEnd/img/icon/chat.png';
import suggestion from '../../FrontEnd/img/icon/suggestion.png';
import complaint from '../../FrontEnd/img/icon/Complaint.png';
import password from '../../FrontEnd/img/icon/password.png';

import user from '../../FrontEnd/img/listing-img.jpeg'

import { useDropzone } from 'react-dropzone';

const Sidebar = () => {
  // State to manage the active menu item
  const [activeMenuItem, setActiveMenuItem] = useState('Edit Profile');
  const [showProfileForm, setShowProfileForm] = useState(false);

  // Function to handle click on menu items
  const handleMenuItemClick = (menuItem) => {
    setActiveMenuItem(menuItem);
    if (menuItem === 'Edit Profile') {
      setShowProfileForm(true);
    } else {
      setShowProfileForm(false);
    }
  };

 

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male'); // Default value

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted!');
  };

 const [activeMenuItemaddress, setActiveMenuItemaddress] = useState('Address');
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Function to handle click on menu items
  const handleMenuItemaddressClick = (menuItem) => {
    setActiveMenuItemaddress(menuItem);
    if (menuItem === 'Address') {
      setShowAddressForm(true);
    } else {
      setShowAddressForm(false);
    }
  };

   const [activeBookmark, setActiveBookmark] = useState('Bookmark');
  const [showBookmark, setShowBookmark] = useState(false);

  // Function to handle click on menu items
  const handleMenuBookmarkClick = (menuItem) => {
    setActiveBookmark(menuItem);
    // Check if the clicked menu item is 'Bookmark' to show the bookmark content
    setShowBookmark(menuItem === 'Bookmark');
  };


   const [activeEnquiry, setActiveEnquiry] = useState('Enquiry');
  const [showEnquiry, setShowEnquiry] = useState(false);

  // Function to handle click on menu items
  const handleMenuEnquiryClick = (menuItem) => {
    setActiveEnquiry(menuItem);
    // Check if the clicked menu item is 'Bookmark' to show the bookmark content
    setShowEnquiry(menuItem === 'Enquiry');
  };


  const [activeChat, setActiveChat] = useState('Chat');
  const [showChat, setShowChat] = useState(false);

  // Function to handle click on menu items
  const handleMenuChatClick = (menuItem) => {
    setActiveChat(menuItem);
    // Check if the clicked menu item is 'Bookmark' to show the bookmark content
    setShowChat(menuItem === 'Chat');
  };

  const [activeSuggestion, setActiveSuggestion] = useState('Suggestion');
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Function to handle click on menu items
  const handleMenuSuggestionClick = (menuItem) => {
    setActiveSuggestion(menuItem);
    // Check if the clicked menu item is 'Bookmark' to show the bookmark content
    setShowSuggestion(menuItem === 'Suggestion');
  };

  const [activeComplaint, setActiveComplaint] = useState('Complaint');
  const [showComplaint, setShowComplaint] = useState(false);

  // Function to handle click on menu items
  const handleMenuComplaintClick = (menuItem) => {
    setActiveComplaint(menuItem);
    // Check if the clicked menu item is 'Bookmark' to show the bookmark content
    setShowComplaint(menuItem === 'Complaint');
  };


  const [activePassword, setActivePassword] = useState('Change Password');
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle click on menu items
  const handleMenuPasswordClick = (menuItem) => {
    setActivePassword(menuItem);
    // Check if the clicked menu item is 'Bookmark' to show the bookmark content
    setShowPassword(menuItem === 'Change Password');
  };


const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitfile = (event) => {
    event.preventDefault();
    // Here you can handle the file submission, e.g., send it to a server
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Example: send formData using fetch or Axios
    }
  };



   const [selectedGender, setSelectedGender] = useState('');
   const options=[
    {label:"Male", value:1},
    {label:"Female",value:2},
    
   ]

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };


  return (
    <main>
      <div className='container margin_60_35'>
        <div className='row'>
          <div className="col-lg-3" id="desktop_view">
      <div className="nav profile-side-menu flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
         <a
                className={`nav-link ${activeMenuItem === 'Edit Profile' ? 'active' : ''}`}
                onClick={() => handleMenuItemClick('Edit Profile')}
                href="#v-pills-address"
                role="tab"
                aria-controls="v-pills-address"
                aria-selected={activeMenuItem === 'Edit Profile'}
              >
                <img className="listing_icons" src={profile} alt="icon" />
                Edit Profile
              </a>
        <a
          className={`nav-link ${activeMenuItemaddress === 'Address' ? 'active' : ''}`}
          onClick={() => handleMenuItemaddressClick('Address')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeMenuItemaddress === 'Address'}
        >
          <img className="listing_icons" src={address} alt="icon" />
          Address
        </a>

        <a
          className={`nav-link ${activeEnquiry === 'Enquiry' ? 'active' : ''}`}
          onClick={() => handleMenuEnquiryClick('Enquiry')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeEnquiry === 'Enquiry'}
        >
          <img className="listing_icons" src={enquiry} alt="icon" />
          Enquiry
        </a>

        <a
  className={`nav-link ${activeBookmark === 'Bookmark' ? 'active' : ''}`}
  onClick={() => handleMenuBookmarkClick('Bookmark')}
  href="#v-pills-bookmark" // Update to the correct id for the bookmark content
  role="tab"
  aria-controls="v-pills-bookmark" // Update to the correct id for the bookmark content
  aria-selected={activeBookmark === 'Bookmark'}
>
  <img className="listing_icons" src={bookmark} alt="icon" />
  Bookmark
</a>

        <a
          className={`nav-link ${activeMenuItem === 'Like' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Like')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeMenuItem === 'Like'}
        >
          <img className="listing_icons" src={like} alt="icon" />
          Like
        </a>

        <a
          className={`nav-link ${activeMenuItem === 'Subscribe' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Subscribe')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeMenuItem === 'Subscribe'}
        >
          <img className="listing_icons" src={subscribe} alt="icon" />
          Subscribe
        </a>

         <a
          className={`nav-link ${activeMenuItem === 'Review' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Review')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeMenuItem === 'Review'}
        >
          <img className="listing_icons" src={subscribe} alt="icon" />
          Review
        </a>
         <a
          className={`nav-link ${activeChat === 'Chat' ? 'active' : ''}`}
          onClick={() => handleMenuChatClick('Chat')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeChat === 'Chat'}
        >
          <img className="listing_icons" src={chat} alt="icon" />
          Chat
        </a>
         <a
          className={`nav-link ${activeSuggestion === 'Suggestion' ? 'active' : ''}`}
          onClick={() => handleMenuSuggestionClick('Suggestion')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeSuggestion === 'Suggestion'}
        >
          <img className="listing_icons" src={suggestion} alt="icon" />
          Suggestion
        </a>
         <a
          className={`nav-link ${activeComplaint === 'Complaint' ? 'active' : ''}`}
          onClick={() => handleMenuComplaintClick('Complaint')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activeComplaint === 'Complaint'}
        >
          <img className="listing_icons" src={complaint} alt="icon" />
          Complaint
        </a>
         <a
          className={`nav-link ${activePassword === 'Change Password' ? 'active' : ''}`}
          onClick={() => handleMenuPasswordClick('Change Password')}
          href="#v-pills-address"
          role="tab"
          aria-controls="v-pills-address"
          aria-selected={activePassword === 'Change Password'}
        >
          <img className="listing_icons" src={password} alt="icon" />
          Change Password
        </a>
        {/* Add more menu items as needed */}
      </div>
    </div>


    <div className="col-lg-9">
      <div className='tab-content profile-sidebar-content' id="v-pills-tabContent">
            {showProfileForm && (
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
              <img className="profile_img" src="FrontEnd/img/Asset 33.png" id="output" alt="Profile" />
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
       <DropdownButton id="dropdown-basic-button" title="Select Gender" style={{ backgroundColor: 'white !important' }}>
      <Dropdown.Item href="#/action-1">Male</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Female</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Other</Dropdown.Item>
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
            )}



            {showAddressForm && (
              <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Edit Address</h5>
                  <form className="icon-form-group" onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-12">
              <label>D.O.B</label>
              <input className="form-control" type="date" name="dob" />
              <i className="icon_date"></i>
            </div>
        <div className="form-group col-12">
              <div className="custom-select-form">
                <label>Marital Status</label>
<DropdownButton id="dropdown-basic-button" title="Select Marrital status" style={{ backgroundColor: 'white !important' }}>
      <Dropdown.Item href="#/action-1">Single</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Married</Dropdown.Item>
    </DropdownButton>
              </div>
            </div>
         <div className="form-group col-12">
              <label>Qualification</label>
              <input className="form-control" type="text" name="qualification" />
            </div>
            <div className="form-group col-12">
              <label>Permanent Address</label>
              <textarea className="form-control" id="address" name="address" style={{ height: '100px' }}></textarea>
            </div>
             <div className="form-group col-6">
              <div className="custom-select-form">
                <label>State</label>
               <DropdownButton id="dropdown-basic-button" title="Select State" style={{ backgroundColor: 'white !important' }}>
      <Dropdown.Item href="#/action-1">Mumbai</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Gujarat</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Other</Dropdown.Item>
    </DropdownButton>
              </div>
            </div>
            <div className="form-group col-6">
              <label>City</label>
              <input className="form-control" type="text" name="city" />
            </div>
             <div className="form-group col-6">
              <label>Pin Code</label>
              <input className="form-control" type="number" max="6" name="pinCode" />
            </div>
            <div className="text-center col-12 mt-3">
              <input type="submit" value="Submit" className="btn_1 full-width" />
            </div>
       
      </div>
    </form>
                </div>
              </div>
            )}

            {showBookmark && (
              <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Bookmark</h5>
                  <div className='list_general'>
                    <div class="li">
													     <figure className="circular-image"><img src={user} alt=""/></figure> 
													<small>Web Development</small>
													<h4>Creative Concept interior contractor Pvt. Ltd.</h4>
													<p>Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro
														detracto disputando reformidans at, ex vel suas eripuit. Vel alii
														zril maiorum ex, mea id sale eirmod epicurei. Sit te possit
														senserit, eam alia veritus maluisset ei, id cibo vocent ocurreret
														per....</p>
													<p><a href="Individual-listing.html" class="btn_1 gray"><i
																class="fa fa-fw fa-eye"></i> View item</a></p>
													<ul class="buttons">
														<li><a href="#0" class="btn_1 gray delete wishlist_close"><i
																	class="fa fa-fw fa-times-circle-o"></i> Cancel</a></li>
													</ul>
												</div>
                  </div>
                 
                </div>
              </div>
            )}


            {showEnquiry && (
              <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Enquiry</h5>
                  <div className='list_general'>
                    <div class="li">
													   
													<a href="#">
												<div class="strip map_view px-4 py-3" >
													<div class="enquiry_date">
														02-08-2023
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Full Name <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">John Smith</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Mobile Number <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">+91 9876543210</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Email Id <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">smith@gmail.com</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Enquiry Title <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">Interior Base Enquiry</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Message<span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">
																Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore placeat, vel
																quaerat praesentium totam, 
															</div>
														</div>
													</div>
												</div>
											</a>
											<a href="#">
												<div class="strip map_view px-4 py-3">
													<div class="enquiry_date">
														02-08-2023
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Full Name <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">John Smith</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Mobile Number <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">+91 9876543210</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Email Id <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">smith@gmail.com</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Enquiry Title <span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">Interior Base Enquiry</div>
														</div>
													</div>
													<div class="row align-items-center">
														<div class="col-md-3 col-4">
															<div class="enquiry_list_heading">Message<span>:</span></div>
														</div>
														<div class="col-md-9 col-8">
															<div class="enquiry_list_txt">
																Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore placeat, vel
																quaerat praesentium totam, 
															</div>
														</div>
													</div>
												</div>
											</a>
												</div>
                  </div>
                 
                </div>
              </div>
            )}

            {showChat && (
              <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                 
                  <div className='list_general'>
                    <div class="li">
													   
													<div class="col-lg-12 mb-space-remove">
											<a href="#chat" title="Send Enquiry" id="enquiry-in">
												<div class="strip map_view px-4 py-3">
													<div class="enquiry_date">
														02-08-2023
													</div>
													<div class="row align-items-center py-3">
														<div class="col-md-2 col-4">
															<div class="chat_img_sec">
																{/* <img src="FrontEnd/img/furniture-design.jpg" alt="image"> */}
															</div>
														</div>
														<div class="col-md-8 col-8">
															<div class="chat_heading">John Smith</div>
															<div class="chat_text">
																Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
																voluptate magnam assumenda repudiandae!
															</div>
														</div>
													</div>
												</div>
											</a>

                      <a href="#chat" title="Send Enquiry" id="enquiry-in">
												<div class="strip map_view px-4 py-3">
													<div class="enquiry_date">
														02-08-2023
													</div>
													<div class="row align-items-center py-3">
														<div class="col-md-2 col-4">
															<div class="chat_img_sec">
																{/* <img src="FrontEnd/img/furniture-design.jpg" alt="image"> */}
															</div>
														</div>
														<div class="col-md-8 col-8">
															<div class="chat_heading">John Smith</div>
															<div class="chat_text">
																Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum
																voluptate magnam assumenda repudiandae!
															</div>
														</div>
													</div>
												</div>
											</a>
											</div>
												</div>
                  </div>
                 
                </div>
              </div>
            )}

            {showSuggestion && (
              <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Suggestion</h5>
                  <form className="icon-form-group" onSubmit={handleSubmit}>
      <div className="row">
        
       
         <div className="form-group col-12">
              <label>Title</label>
              <input className="form-control" type="text" name="qualification" />
            </div>
            <div className="form-group col-12">
              <label>Description</label>
              <textarea className="form-control" id="address" name="address" style={{ height: '100px' }}></textarea>
            </div>
             
            
            <div className="text-center col-12 mt-3">
              <input type="submit" value="Submit" className="btn_1 full-width" />
            </div>
       
      </div>
    </form>
                </div>
              </div>
            )}



            {showComplaint && (
              <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Complaint</h5>
                  <form className="icon-form-group" onSubmit={handleSubmit}>
      <div className="row">
        
       
         <div className="form-group col-12">
              <label>Title</label>
              <input className="form-control" type="text" name="qualification" />
            </div>
            <div className="form-group col-12">
              <label>Complaint Description</label>
              <textarea className="form-control" id="address" name="address" style={{ height: '100px' }}></textarea>
            </div>
               <div className="form-group">
       <label>Upload File</label>
      <form onSubmit={handleSubmitfile}>
        <input type="file" onChange={handleFileChange} />
        {/* <button type="submit">Upload</button> */}
      </form>
    </div>
            
            <div className="text-center col-12 mt-3">
              <input type="submit" value="Submit" className="btn_1 full-width" />
            </div>
       
      </div>
    </form>
                </div>
              </div>
            )}


            {showPassword && (
              <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Change Password</h5>
                  <form className="icon-form-group" onSubmit={handleSubmit}>
      <div className="row">
        
       
         <div className="form-group col-12">
              <label>Old Password</label>
              <input className="form-control" type="password" name="old_password" />
              <i class="icon_lock_alt"></i>
            </div>
            <div className="form-group col-12">
              <label>New Password</label>
              <input className="form-control" type="password" name="new_password" />
              <i class="icon_lock_alt"></i>
            </div>
            <div className="form-group col-12">
              <label>Confirm New Password</label>
              <input className="form-control" type="password" name="confirm_new_password" />
              <i class="icon_lock_alt"></i>
            </div>
             
            
            <div className="text-center col-12 mt-3">
              <input type="submit" value="Submit" className="btn_1 full-width" />
            </div>
       
      </div>
    </form>
                </div>
              </div>
            )}


            </div>
          </div>



        </div>
      </div>
    </main>
    
  );
};

export default Sidebar;