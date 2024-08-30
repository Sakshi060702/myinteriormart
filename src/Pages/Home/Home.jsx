import React,{useEffect, useState} from "react";
import Menu from "./Component/Menu";
import { useParams,useNavigate } from "react-router-dom";
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
import '../../FrontEnd/css/RegistrationMV.css'

import Citypopup from "../Citypopup";




function Home(){

    const [showpopup,setShowpopup]=useState(false);
    const { cityName } = useParams();
    const navigate=useNavigate();
    useEffect(()=>{
        const selectedCity=localStorage.getItem("cityname");
        if(!selectedCity){
            setShowpopup(true);

            // const timer=setTimeout(() => {
            //     setShowpopup(false)
            // }, 3000);
    
            // return()=>{clearTimeout(timer);}
        }else if(!cityName){
            navigate(`/${selectedCity}`,{replace:true});
        }
      
    },[]);

    const handleClosePopup = () => {
        setShowpopup(false);
      };

    

    return(
        <>
       <div id="page">
        
        <Searchbar></Searchbar>
        <main id='home_main'>
            <div className="container">
          
                {/* <Banner></Banner> */}
               <Services1></Services1>
               <Contractor1/>
                 <Dealer1/>


                {/* <Dealer/> */}
                
            </div>
        </main>
       
      
       </div>
       <Enquiry></Enquiry>
       {showpopup && <Citypopup onClose={handleClosePopup} />}
        </>
    )
}
export default Home;