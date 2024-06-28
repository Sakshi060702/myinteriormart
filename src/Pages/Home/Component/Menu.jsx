import React,{useEffect, useRef, useState} from 'react';
import logoSticky from '../../../FrontEnd/img/logo_sticky.svg';
import { NavLink } from 'react-router-dom';
import notificationIcon from '../../../FrontEnd/img/icon/notification1.png';
import usericon from '../../../FrontEnd/img/icon/user1.png'
import Dropdown from '../../Dropdown';
import Notification from '../../Notification';



function Menu() {

  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const toggleNotificationMenu = () => {
    setShowNotificationMenu(!showNotificationMenu);
  };
   
   const [dropdownOpen, setDropdownOpen] = useState(false);

   const dropRef=useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };


  const handleClickOutside=(event)=>{
   if(dropRef.current && !dropRef.current.contains(event.target)){
      setDropdownOpen(false);
   }
  };
  useEffect(()=>{
   document.addEventListener('mousedown',handleClickOutside);
   return()=>{
      document.removeEventListener('mousedown',handleClickOutside);
   };
  },[]);


  

//   const notificationRef=useRef(null);
//   const handleclickoutside=(event)=>{
//    if(notificationRef.current && !notificationRef.current.contains(event.target)){
//       setShowNotificationMenu(false);
//    }
//   };
//   useEffect(()=>{
//    document.addEventListener('mousedown',handleClickOutside);
//    return()=>{
//       document.removeEventListener('mousedown',handleClickOutside);
//    };
//   },[]);
  
 



  
   return (
    <>
    
      <header className="header_in">
         <div className="container">
            <div className="row">
               <div className="col-lg-3 col-12">
                  <div id="logo">
                     <NavLink to={'/'} title="index">
                        <img src={logoSticky} width="220" alt="logo" className="logo_sticky" />
                     </NavLink>
                  </div>
               </div>
               <div className="col-lg-9 col-12">
                  <ul id="top_menu">
                     <li>
                        <NavLink to="/layout" id="hide_in_mobile" className="btn_add listing-btn">Free Listing</NavLink>
                     </li>
                     {/* <li>
                        <NavLink to='/register' id="hide_in_mobile" className="btn_add listing-btn">Register</NavLink>
                     </li> */}
                     <li>
                        <NavLink to='/signup2' id="hide_in_mobile" className="btn_add listing-btn">Signup</NavLink>
                     </li>
                     <li>
                        <NavLink to='/login' id="hide_in_mobile" className="btn_add listing-btn">Login</NavLink>
                     </li>

                     <li>
                        <div className="dropdown notification" >
                           {/* <a className=" dropdown-toggle notification" type="button" id="notification"
                              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                 <img src={notificationIcon} alt='notification'/>
                              
                           </a> */}
                           <button type="button" onClick={toggleNotificationMenu}>
                               <img src={notificationIcon} onClick={toggleNotificationMenu} />
                               {/* <i className={`fa fa-chevron-${dropdownOpen ? 'up' : 'down'}`} /> */}
                               {showNotificationMenu && <Notification />}
                           </button>
                           <div className="dropdown-menu notification-menu" aria-labelledby="notification">
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                 <h6 className="m-0">Notifications</h6>
                                 <a href="notifications.html" style={{ fontSize: '12px', color: '#fe900d' }}>View All</a>
                              </div>
                              <div className="notify_body">
                                 <div className="notification-list">
                                    <span className="small float-right text-muted">11:21 AM June 04 2021</span>
                                    <span className="nitify_dot"></span>
                                    <div className="notify_heading">
                                       Listing
                                    </div>
                                    <p className="notify_txt">
                                       This is an automated server response message. All systems are online.
                                    </p>
                                 </div>
                                 {/* Additional notification-list items */}
                              </div>
                           </div>
                        </div>
                     </li>
                    <li>
      <div className="dropdown usericon" ref={dropRef}>
        <button className="usericon-btn dropdown-toggle" type="button" onClick={toggleDropdown}>
          <img src={usericon} onClick={toggleDropdown} />
         {/* <i className={`fa fa-chevron-${dropdownOpen ? 'up' : 'down'}`} /> */}
          {dropdownOpen && <Dropdown />}
        </button>
        
      </div>
    </li>
                  </ul>
                  <a href="#menu" className="btn_mobile">
                     <div className="hamburger hamburger--spin" id="hamburger">
                        <div className="hamburger-box">
                           <div className="hamburger-inner">
                              
                              
                           </div>
                        </div>
                     </div>
                  </a>
                  <nav id="menu" className="main-menu">
                     <ul>
                        <li><span><NavLink to="/categorylist">Suggestion</NavLink></span></li>
                     </ul>
                  </nav>
               </div>
            </div>
         </div>
         <div className="layer"></div>
      </header>
      </>
   );
}

export default Menu;