import React from "react";
import Menu from "./Component/Menu";

import '../../FrontEnd/css/reset.css'; // Import reset.css file
import '../../FrontEnd/css/bootstrap.min.css'; // Import bootstrap.min.css file
import '../../FrontEnd/css/style.css'; // Import style.css file
import '../../FrontEnd/css/vendors.css'; // Import vendors.css file
import '../../FrontEnd/css/select2.min.css'; // Import select2.min.css file
import '../../FrontEnd/css/custom.css'; // Import custom.css file
import '../../FrontEnd/admin_section/vendor/font-awesome/css/font-awesome.min.css';
import Searchbar from "./Component/Searchbar";
import Banner from "./Component/Banner";
import Enquiry from "./Component/Enquiry";
import Services1 from "./Service/Service1";
import Contractor1 from "./Contractor/Contractor1";
import Dealer1 from "./Dealer/Dealer1";

import Dealer from "./Component/Dealer";



function Home(){
    return(
        <>
       <div id="page">
        
        <Searchbar></Searchbar>
        <main id='home_main'>
            <div className="container">
                <Banner></Banner>
               <Services1></Services1>
               <Contractor1/>
                 <Dealer1/>


                {/* <Dealer/> */}
                
            </div>
        </main>
       
      
       </div>
       <Enquiry></Enquiry>
        
        </>
    )
}
export default Home;