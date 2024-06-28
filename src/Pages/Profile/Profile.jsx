import React, { useState } from "react";


import Buttongroup from "./Buttongroup";
import Editprofile from "./Editprofile";
import Address from "./Address1";
import Enquiry from "./Enquiry";
import Bookmark from "./Bookmark";
import Like from "./Like";
import Subscribe from "./Subscribe";
import Review from "./Review";
import Chat from "./Chat";
import Suggestion from "./Suggestion";
import Complaint from "./Complaint";
import Changepassword from "./Changepassword";

import './Profile.css'


const buttons=[
    "Editprofile",
    "Address",
    "Enquiry",
    "Bookmark",
    "Like",
    "Subscribe",
    "Review",
    "Chat",
    "Suggestion",
    "Complaint",
    "Change Password"
]

const RenderComponent=({index})=>
    {
        switch(index){
            case 0:return <Editprofile/>
            break;
            case 1:return <Address/>
            break;
            case 2:return<Enquiry/>
            break;
            case 3:return<Bookmark/>
            break;
            case 4:return<Like/>
            break;
            case 5: return<Subscribe/>
            break;
            case 6:return<Review/>
            break;
            case 7:return<Chat/>
            break;
            case 8:return<Suggestion/>
            break;
            case 9:return <Complaint/>
            break;
            case 10:return<Changepassword/>
            break;
            default:
                break;
        }
    }

function Profile(){
    const[isSelected,setisSelected]=useState(0)
    return(

        <main>
			<div class="container margin_60_35">
				<div class="row">
					<div class="col-lg-3" id="desktop_view">
						<div class="nav profile-side-menu  flex-column nav-pills" id="v-pills-tab" role="tablist"
							aria-orientation="vertical">
                                <Buttongroup buttons={buttons} isSelected={isSelected} setisSelected={setisSelected}/>
                        </div>
                    </div> 
                          <div className="col-lg-9">
            <RenderComponent index={isSelected} />
          </div>
                </div>  
            </div>      
        </main>          
        
    )
}

export default Profile;