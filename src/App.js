import Home from "./Pages/Home/Home";
import { Route,Routes } from "react-router-dom";
import Labournaka from "./Pages/Tab/Labournaka";


// import Banner from "./Pages/Home/Component/Banner";
// import Footer from "./Pages/Home/Component/Footer";
import Menu from "./Pages/Home/Component/Menu";
import Buy from "./Pages/Tab/Buy";
import Job from "./Pages/Tab/Job";
import Foot from "./Pages/Home/Component/Foot";
import Aboutus from "./Pages/Aboutus";
import Contact from "./Pages/Contact";
//services link
import LegalAdvisory from "./Pages/Services/Pages/LegalAdvisory";
import Gardening from "./Pages/Services/Pages/Gardening";
import Packersmovers from "./Pages/Services/Pages/Packersmovers";
import Tankclening from "./Pages/Services/Pages/Tankclening";
import Solarpanel from "./Pages/Services/Pages/Solarpanel";
import Metalbending from "./Pages/Services/Pages/Metalbending";
import Computerisedcutting from "./Pages/Services/Pages/Computerisedcutting";
import Art from "./Pages/Services/Pages/Art";
import Packging from "./Pages/Services/Pages/Packaging";
import Printing from "./Pages/Services/Pages/Printing";
import Netting from "./Pages/Services/Pages/Netting";
import Engineer from "./Pages/Services/Pages/Engineer";
import Surveyours from "./Pages/Services/Pages/Surveyors";
import Consultants from "./Pages/Services/Pages/Consultants";
import Leafing from "./Pages/Services/Pages/Leafing";
import Courier from "./Pages/Services/Pages/Courier";
import Tours from "./Pages/Services/Pages/Tours";
import Polishcoating from "./Pages/Services/Pages/Polishcoating";
import Watersuppliers from "./Pages/Services/Pages/Watersuppliers";
import Advertising from "./Pages/Services/Pages/Advertising";
import Transport from "./Pages/Services/Pages/Transport";
import Housekeeping from "./Pages/Services/Pages/Housekeeping";
import Pestcontrol from "./Pages/Services/Pages/Pestcontrol";
import Realestate from "./Pages/Services/Pages/Realestate";
import Automation from "./Pages/Services/Pages/Automation";
import Webdevelopment from "./Pages/Services/Pages/Webdevlopment";
import Security from "./Pages/Services/Pages/Security";

//Contractors
import Ductingsystem from "./Pages/Contractors/Pages/Ductingsytem";
import Aluminium from "./Pages/Contractors/Pages/Aluminium";
import  Msfabrication from "./Pages/Contractors/Pages/Msfabrication";
import Corecutting from "./Pages/Contractors/Pages/Corecutting";
// import Falsefighting from "./Pages/Contractors/Pages/Falseflooring";
import Glassfabrication from "./Pages/Contractors/Pages/Glassfabrication";
import Decor from "./Pages/Contractors/Pages/Decor";
import Scaffolding from "./Pages/Contractors/Pages/Scaffolding";
import Stonepolishing from "./Pages/Contractors/Pages/Stonepolishing";
import Developers from "./Pages/Contractors/Pages/Developers";
import Cleaning from "./Pages/Contractors/Pages/Cleaning";
import Demolition from "./Pages/Contractors/Pages/Demilition";
import Waterprofing from "./Pages/Contractors/Pages/Waterprofing";
import Carpenters from "./Pages/Contractors/Pages/Carpenters";
import Paint from "./Pages/Contractors/Pages/Paint";
import Steelfabrication from "./Pages/Contractors/Pages/Steelfabrication";
import Ceilingpartition from "./Pages/Contractors/Pages/Ceilingpartition";
import Airconditioning from "./Pages/Contractors/Pages/Airconditioning";
import Firefighting from "./Pages/Contractors/Pages/Firefighting";
import Electrical from "./Pages/Contractors/Pages/Electrical";
import Plumbers from "./Pages/Contractors/Pages/Plumbers";
import Civil from "./Pages/Contractors/Pages/Civil";
import Interior from "./Pages/Contractors/Pages/Interior";
import Construction from "./Pages/Contractors/Pages/Construction";
import Falseflooring from "./Pages/Contractors/Pages/Falseflooring";


//Dealers
import Blinds from "./Pages/Dealers/Pages/Blinds";
import Awning from "./Pages/Dealers/Pages/Awning";
import Elevator from "./Pages/Dealers/Pages/Elevator";
import Falseceiling from "./Pages/Dealers/Pages/Falseceiling";
// import Plywood from "./Pages/Dealers/Pages/Plywoods";
import Signage from "./Pages/Dealers/Pages/Signage";
import Wallpaper from "./Pages/Dealers/Pages/Wallpaper";
import Ledscreen from "./Pages/Dealers/Pages/Ledscreen";
import Hardware from "./Pages/Dealers/Pages/Hardware";
import Nets from "./Pages/Dealers/Pages/Nets";
import Plywoods from "./Pages/Dealers/Pages/Plywoods";
import Acrylic from "./Pages/Dealers/Pages/Acrylicsheet";
import Tile from "./Pages/Dealers/Pages/Tile";
import Electricalproducts from "./Pages/Dealers/Pages/Electricalproducts";
import Screw from "./Pages/Dealers/Pages/Screw";
import Adhesive from "./Pages/Dealers/Pages/Adhesive";
// import Packgings from "./Pages/Dealers/Pages/Packaging";
import Tools from "./Pages/Dealers/Pages/Tools";
import Tensilestructure from "./Pages/Dealers/Pages/Tensilestructure";
import Weightingmachine from "./Pages/Dealers/Pages/Weightingmachine";
import Kitchenequipment from "./Pages/Dealers/Pages/Kitchenequipemt";
import Waterpurifier from "./Pages/Dealers/Pages/Waterpurifier";
import Gift from "./Pages/Dealers/Pages/Gift";
import Waterheater from "./Pages/Dealers/Pages/Waterheater";
import Stationary from "./Pages/Dealers/Pages/Stationary";
import Pack from "./Pages/Dealers/Pages/Pack";
import Canopy from "./Pages/Dealers/Pages/Canopy";
import Airconditionars from "./Pages/Dealers/Pages/Airconditionars";
import Portablecabin from "./Pages/Dealers/Pages/Portablecabin";



//Inner pages services 
//web development
import Website from "./Pages/Services/Webdevelopment/Website";
import CreativeconeptDetails from "./Pages/Services/Webdevelopment/Website/CreativeconceptDetails";
import Details from "./Pages/Services/Webdevelopment/Website/Details";

//login page
import Register from "./Pages/Login/Register";
// import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
// import Signupp from "./Pages/Login/Signup1";
import Requestotp from "./Pages/Login/Requestotp";
import Receiveotp from "./Pages/Login/Receiveotp";
import Signup1 from "./Pages/Login/Signup1";
import Forgetpassword from "./Pages/Login/Forgetpassword";
import ForgetpasswordVerifyotp from "./Pages/Login/ForgetpasswordVerifyOtp";


import Sidebar from "./Pages/Profile/Sidebar";
import Profile from "./Pages/Profile/Profile";
import Freelisting from "./Pages/Freelisting/Freelisting";
import Busineslisting from "./Pages/Freelisting/Businesslisting/Businesslisting";
import Addcommunication from "./Pages/Freelisting/Businesslisting/Addcommunication";
import Address from "./Pages/Freelisting/Businesslisting/Addaddress";
import Addcategory from "./Pages/Freelisting/Businesslisting/Addcategory";
import Addspecialisation from "./Pages/Freelisting/Businesslisting/Addspecialisation";
import Addworkinghours from "./Pages/Freelisting/Businesslisting/Addworkinghours";
import Addpayment from "./Pages/Freelisting/Businesslisting/Addpayment";
import Addcompany from "./Pages/Freelisting/Businesslisting/Addcompany";

import Profile2 from "./Pages/Profile/Profile2";
import Editprofile from "./Pages/Profile/Editprofile";
import Address1 from "./Pages/Profile/Address1";
import Bookmark from "./Pages/Profile/Bookmark";
import Enquiry from "./Pages/Profile/Enquiry";
import Like from "./Pages/Profile/Like";
import Subscribe from "./Pages/Profile/Subscribe";
import Review from "./Pages/Profile/Review";
import Chat from "./Pages/Profile/Chat";
import Suggestion from "./Pages/Profile/Suggestion";
import Complaint from "./Pages/Profile/Complaint";
import Changepassword from "./Pages/Profile/Changepassword";





import Labournakapage from "./Pages/Freelisting/Labournakapage";
import Workingdetails from "./Pages/Freelisting/Labournakadetails/Workingdetails";
import Addaddressdetails from "./Pages/Freelisting/Labournakadetails/Addaddressdetails";
import Addcategorydetails from "./Pages/Freelisting/Labournakadetails/Addcategorydetails";
import Addspecialisationdetails from "./Pages/Freelisting/Labournakadetails/Addspecialisationdetails";
import Addpaymentmode from "./Pages/Freelisting/Labournakadetails/Addpaymentmode";
import Uploadimages from "./Pages/Freelisting/Labournakadetails/Uploadimages";
import Personalinfo from "./Pages/Freelisting/Labournakadetails/Personalinfo";

import Buypage from "./Pages/Freelisting/Buypage";
import Productinfo from "./Pages/Freelisting/Buy/Productinfo";
import Buyupload from "./Pages/Freelisting/Buy/Buyupload";
import Productdetails from "./Pages/Freelisting/Buy/Productdetails";


import LwriteReview from "./Pages/Tab/Lwritereview";

import Trial from "./Pages/Freelisting/Trial";
import Trialpage from "./Pages/Freelisting/Trialpage";
import Sell from "./Pages/Freelisting/Sell";
import Jobpage from "./Pages/Freelisting/Jobpage";
import Layout from "./Pages/Freelisting/Layout";
import SelectCategory from "./Pages/Freelisting/SelectCategory";

import Otp from "./Pages/Login/Otp";
import Signup2 from "./Pages/Login/Signup2";
import Receiveotp2 from "./Pages/Login/Receiveotp2";
import Register2 from "./Pages/Login/Register2";
import Receiveotpemail from "./Pages/Login/Receiveotpemail";
import Login from "./Pages/Login/Login";

import Services1 from "./Pages/Home/Service/Service1";
import CategoryList from "./Pages/Home/Service/CategoryList";
import ThirdCategoryList from "./Pages/Home/Service/ThirdCategoryList";
import SubCategoryList from "./Pages/Home/Service/SubCategoryList";
import FourthCategory from "./Pages/Home/Service/FourthCategory";
import FifthCategory from "./Pages/Home/Service/FifthCategory";
import SixthCategory from "./Pages/Home/Service/SixthCategory";

import Contractor1 from "./Pages/Home/Contractor/Contractor1";
import ThirdcategoryC from "./Pages/Home/Contractor/ThirdcategoryC";
import FourthCategoryC from "./Pages/Home/Contractor/FourthCategoryC";
import FifthCategoryC from "./Pages/Home/Contractor/FifthCategoryC";
import SixthCategoryC from "./Pages/Home/Contractor/SixthCategoryC";

import Dealer1 from "./Pages/Home/Dealer/Dealer1";
import ThirdCategoryD from "./Pages/Home/Dealer/ThirdCategoryD";
import FourthCategoryD from "./Pages/Home/Dealer/FourthCategoryD";
import FifthCategoryD from "./Pages/Home/Dealer/FifthCategoryD";
import SixthCategoryD from "./Pages/Home/Dealer/SixthCategoryD";

import Menu1 from "./Pages/Home/Component/Menu1";
import Listing from "./Pages/Listing/Listing";
import Listingdetails from "./Pages/Listing/Listingdetails";

import Listingc from "./Pages/Listing/Listingc";
import Listingdetailsc from "./Pages/Listing/Listingdetailsc";

import Listingd from "./Pages/Listing/Listingd";
import Listingdetailsd from "./Pages/Listing/Listingdetailsd";

import Webreviews from "./Pages/Services/Webdevelopment/Website/Webreviews";

import Addcompanyl from "./Pages/Managelisting/Addcompanyl";
import Addressl from "./Pages/Managelisting/Addressl";
import Communicationl from "./Pages/Managelisting/Communicationl";
import Categoriesl from "./Pages/Managelisting/Categoriesl";
import Specialisationl from "./Pages/Managelisting/Specialisationl";
import Paymentmodel from "./Pages/Managelisting/Paymentmodel";
import Workinghoursl from "./Pages/Managelisting/Workinghoursl";
import Uploadimagel from "./Pages/Managelisting/Uploadimagel";
import Sociallinkl from "./Pages/Managelisting/Sociallinkl";
import Keywordl from "./Pages/Managelisting/Keywordl";
import Imagesl from "./Pages/Managelisting/Imagesl";
import Galleryimagel from "./Pages/Managelisting/Galleryimagel";
import Managelistingl from "./Pages/Managelisting/Managelistingl";

import Categoryapi from "./Pages/Managelisting/Categoryapi";


function App() {
  return (
   
    <>

<Menu1/>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
   
   
      <Route path='/labor' element={<Labournaka/>}></Route>
      <Route path="/buy" element={<Buy/>}></Route>
      <Route path="/job" element={<Job/>}></Route>
      <Route path='/about' element={<Aboutus/>}></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>

      <Route path="/legaladvisory" element={<LegalAdvisory></LegalAdvisory>}/>
      <Route path="gardening" element={<Gardening/>}/>
      <Route path='packers' element={<Packersmovers/>}/>
      <Route path='/tankcleaning' element={<Tankclening/>}/>
      <Route path='/solarpanel' element={<Solarpanel/>}/>
      <Route path='/metalbending' element={<Metalbending/>}/>
      <Route path='/computerizedcutting' element={<Computerisedcutting/>}/>
      <Route path='/art' element={<Art/>}/>
      <Route path='/packging' element={<Packging/>}/>
      <Route path='/printing' element={<Printing/>}/>
      <Route path='/netting' element={<Netting/>}/>
      <Route path='/engineers' element={<Engineer/>}/>
      <Route path='/surveyours' element={<Surveyours/>}/>
      <Route path='/consultants' element={<Consultants/>}/>
      <Route path='/leafing' element={<Leafing/>}/>
      <Route path='/courier' element={<Courier/>}/>
      <Route path='/tours' element={<Tours/>}/>
      <Route path='/polishcoating' element={<Polishcoating/>}/>
      <Route path='/watersuppliers' element={<Watersuppliers/>}/>
      <Route path='/advertising' element={<Advertising/>}/>
      <Route path='/transport' element={<Transport/>}/>
      <Route path='/housekeeping' element={<Housekeeping/>}/>
      <Route path='/pestcontrol' element={<Pestcontrol/>}/>
      <Route path='/realestate' element={<Realestate/>}/>
      <Route path='/automation' element={<Automation/>}/>
      <Route path='/webdevlopment' element={<Webdevelopment/>}/>
      <Route path='/security' element={<Security/>}/>


      <Route path='/ductingsystem' element={<Ductingsystem/>}/>
      <Route path='/aluminium' element={<Aluminium/>}/>
      <Route path='/msfabrication' element={<Msfabrication/>}/>
      <Route path='/corecutting' element={<Corecutting/>}/>
      <Route path='/falseflooring' element={<Falseflooring/>}/>
      <Route path='/glassfabrication' element={<Glassfabrication/>}/>
      <Route path='/decor' element={<Decor/>}/>
      <Route path='/scaffolding' element={<Scaffolding/>}/>
      <Route path='/stonepolishing' element={<Stonepolishing/>}/>
      <Route path='/developer' element={<Developers/>}/>
      <Route path='/cleaning' element={<Cleaning/>}/>
      <Route path='/demolition' element={<Demolition/>}/>
      <Route path='/waterprofing' element={<Waterprofing/>}/>
      <Route path='/carpenters' element={<Carpenters/>}/>
      <Route path='/paint' element={<Paint/>}/>
      <Route path='/steelfabrication' element={<Steelfabrication/>}/>
      <Route path='/ceilingpartition' element={<Ceilingpartition/>}/>
      <Route path='/airconditioning' element={<Airconditioning/>}/>
      <Route path='/corecutting' element={<Corecutting/>}/>
      <Route path='/firefighting' element={<Firefighting/>}/>
      <Route path='/electrical' element={<Electrical/>}/>
      <Route path='/plumbers' element={<Plumbers/>}/>
      <Route path='/msfabrication' element={<Msfabrication/>}/>
      <Route path='/civil' element={<Civil/>}/>
      <Route path='/interior' element={<Interior/>}/>
      <Route path='/construction' element={<Construction/>}/>


      <Route path='/blinds' element={<Blinds/>}/>
      <Route path='/awning' element={<Awning/>}/>
      <Route path='/elevator' element={<Elevator/>}/>
      <Route path='/falseceiling' element={<Falseceiling/>}/>
      <Route path='/plywoods' element={<Plywoods/>}/>
      <Route path='/signage' element={<Signage/>}/>
      <Route path='/wallpaper' element={<Wallpaper/>}/>
      <Route path='/ledscreen' element={<Ledscreen/>}/>
      <Route path='/hardware' element={<Hardware/>}/>
      <Route path='/nets' element={<Nets/>}/>
      <Route path='/acrylic' element={<Acrylic/>}/>
      <Route path='/tile' element={<Tile/>}/>
      <Route path='/electricalproducts' element={<Electricalproducts/>}/>
      <Route path='/screw' element={<Screw/>}/>
      <Route path='/adhesive' element={<Adhesive/>}/>
      <Route path='/packging' element={<Packging/>}/>
      <Route path='/tools' element={<Tools/>}/>
      <Route path='/tensilestructure' element={<Tensilestructure/>}/>
      <Route path='/weightingmachine' element={<Weightingmachine/>}/>
      <Route path='/kitchenequipment' element={<Kitchenequipment/>}/>
      <Route path='/waterpurifier' element={<Waterpurifier/>}/>
      <Route path='/gift' element={<Gift/>}/>
      <Route path='/waterheater' element={<Waterheater/>}/>
      <Route path='/Stationary' element={<Stationary/>}/>
      <Route path='/pack' element={<Pack/>}/>
      <Route path='/canopy' element={<Canopy/>}/>
      <Route path='/airconditionars' element={<Airconditionars/>}/>
      <Route path='/portablecabin' element={<Portablecabin/>}/>
      

      <Route path='/website' element={<Website/>}/>
      <Route path='/creativeconceptdetails' element={<CreativeconeptDetails/>}/>
      <Route path='/details' element={<Details/>}/>

      <Route path='/register' element={<Register/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signup1' element={<Signup1/>}/>
{/* <Route path='/signup1' element={<Signupp/>}/> */}
      <Route path='/requestotp' element={<Requestotp/>}/>
      <Route path='/receiveotp' element={<Receiveotp/>}/>



      <Route path='/sidebar' element={<Sidebar/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/freelisting' element={<Freelisting/>}/>
      {/* <Route path='/Businesslisting' element={<Busineslisting/>}/>
      <Route path='/addCommunication' element={<Addcommunication/>}/>
      <Route path='/address' element={<Address/>}/>
      <Route path='/addcategory' element={<Addcategory/>}/>
      <Route path='/addspecialisation' element={<Addspecialisation/>}/>
      <Route path='/addworkinghours' element={<Addworkinghours/>}/>
      <Route path='/addpayment' element={<Addpayment/>}/>
      <Route path='/addcompany' element={<Addcompany/>}/> */}


      {/* <Route path='/labournakapage' element={<Labournakapage/>}/> */}
      {/* <Route path='/Workingdetails' element={<Workingdetails/>}/>
      <Route path='/Addaddressdetails' element={<Addaddressdetails/>}/>
      <Route path='/Categorydetails' element={<Addcategorydetails/>}/>
      <Route path='/Addspecialisationdetails' element={<Addspecialisationdetails/>}/>
      <Route path='/Uploadimg' element={<Uploadimages/>}/>
      <Route path='/paymentmode' element={<Addpaymentmode/>}/>
      <Route path='/Personalinformation' element={<Personalinfo/>}/> */}

      <Route path='/Buypage' element={<Buypage/>}/>
      {/* <Route path='/Productinfo' element={<Productinfo/>}/>
      <Route path='/Buyupload' element={<Buyupload/>}/>
       <Route path='/Productdetails' element={<Productdetails/>}/> */}

       <Route path='/LWritereview' element={<LwriteReview/>}/>

       <Route path='/layout' element={<Layout/>}/>
       <Route path='/trial' element={<Trial/>}/>
       {/* <Route path='/trialpage' element={<Trialpage/>}/>
       <Route path='/sell' element={<Sell/>}/>
       <Route path='/jobpage' element={<Jobpage/>}/> */}
         <Route
          path="/selectcategory" element={<Layout><SelectCategory /></Layout>
          }
        />
         <Route
          path="/trialpage" element={<Layout><Trialpage /></Layout>
          }
        />
        <Route
          path="/sell" element={<Layout><Sell /></Layout>
          }
        />
        <Route
          path="/jobpage" element={<Layout><Jobpage /></Layout>
          }
        />

        <Route
          path="/Businesslisting" element={<Layout><Busineslisting /></Layout>
          }
        />
<Route path="/addCommunication" element={<Layout><Addcommunication /></Layout>} />
<Route path="/address" element={<Layout><Address /></Layout>} />
<Route path="/addcategory" element={<Layout><Addcategory /></Layout>} />
<Route path="/addspecialisation" element={<Layout><Addspecialisation /></Layout>} />
<Route path="/addworkinghours" element={<Layout><Addworkinghours /></Layout>} />
<Route path="/addpayment" element={<Layout><Addpayment /></Layout>} />
<Route path="/addcompany" element={<Layout><Addcompany /></Layout>} />
<Route path="/Workingdetails" element={<Layout><Workingdetails/></Layout>} />

  <Route path="/Addaddressdetails" element={<Layout><Addaddressdetails/></Layout>} />
  <Route path="/Categorydetails" element={<Layout><Addcategorydetails/></Layout>} />
  <Route path="/Addspecialisationdetails" element={<Layout><Addspecialisationdetails/></Layout>} />
  <Route path="/Uploadimg" element={<Layout><Uploadimages/></Layout>} />
  <Route path="/paymentmode" element={<Layout><Addpaymentmode/></Layout>} />
  <Route path="/Personalinformation" element={<Layout><Personalinfo/></Layout>} />

  <Route path="/Productinfo" element={<Layout><Productinfo/></Layout>} />
  <Route path="/Buyupload" element={<Layout><Buyupload/></Layout>} />
  <Route path="/Productdetails" element={<Layout><Productdetails/></Layout>} />

  <Route path="/otp" element={<Otp></Otp>}/>
  <Route path="/signup2" element={<Signup2/>}/>
  <Route path="/receiveotp2" element={<Receiveotp2/>}/>
   <Route path="/receiveotpemail" element={<Receiveotpemail/>}/>
   <Route path="/register2" element={<Register2/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/Forgetpassword" element={<Forgetpassword/>}/>
  <Route path="/ForgetpasswordVerifyOtp" element={<ForgetpasswordVerifyotp/>}/>


<Route path="/profile2" element={<Profile2/>}/>
<Route path="/editprofile" element={<Profile2><Editprofile /></Profile2>} />
<Route path="/address1" element={<Profile2><Address1 /></Profile2>} />
<Route path="/enquiry" element={<Profile2><Enquiry /></Profile2>} />
<Route path="/bookmark" element={<Profile2><Bookmark /></Profile2>} />
<Route path="/like" element={<Profile2><Like /></Profile2>} />
<Route path="/subscribe" element={<Profile2><Subscribe /></Profile2>} />
<Route path="/review" element={<Profile2><Review /></Profile2>} />
<Route path="/chat" element={<Profile2><Chat /></Profile2>} />
<Route path="/suggestion" element={<Profile2><Suggestion /></Profile2>} />
<Route path="/complaint" element={<Profile2><Complaint /></Profile2>} />
<Route path="/changepassword" element={<Profile2><Changepassword /></Profile2>} />



  <Route exact path="/services1" element={<Services1/>} />
  <Route path="/subcategories/:secondCategoryId" element={<SubCategoryList/>} />
  <Route path="/fourthcategories/:thirdCategoryId" element={<FourthCategory/>} />
  <Route path="/fifthcategories/:fourthCategoryId" element={<FifthCategory/>} />
  <Route path="/sixthcategories/:fifthCategoryId" element={<SixthCategory/>} />

  <Route exact path="/contractor1" element={<Contractor1/>} />
  <Route path="/Thirdcategoriesc/:secondCategoryId" element={<ThirdcategoryC/>} />
   <Route path="/Fourthcategoriesc/:thirdCategoryId" element={<FourthCategoryC/>} />
   <Route path="/Fifthcategoriesc/:fourthCategoryId" element={<FifthCategoryC/>} />
  <Route path="/Sixthcategoriesc/:fifthCategoryId" element={<SixthCategoryC/>} />

<Route exact path="/Dealer" element={<Dealer1/>}/>
<Route path="/Thirdcategoriesd/:secondCategoryId" element={<ThirdCategoryD/>} />
<Route path="/Fourthcategoriesd/:thirdCategoryId" element={<FourthCategoryD/>} />
<Route path="/Fifthcategoriesd/:fourthCategoryId" element={<FifthCategoryD/>} />
  <Route path="/Sixthcategoriesd/:fifthCategoryId" element={<SixthCategoryD/>} />

<Route path="/listing/:secondCategoryId" element={<Listing/>}/>
<Route path="/company/:listingId" element={<Listingdetails/>}/>

<Route path="/listing/:secondCategoryId" element={<Listingc/>}/>
<Route path="/company/:listingId" element={<Listingdetailsc/>}/>

<Route path="/listing/:secondCategoryId" element={<Listingd/>}/>
<Route path="/listing/:secondCategoryId" element={<Listingdetailsd/>}/>

<Route path="/reviews/:listingId" element={<Webreviews/>}/>

<Route path="/Managelistingl" element={<Managelistingl/>}/>
<Route path="/addcompanyl" element={<Addcompanyl></Addcompanyl>}/>
<Route path="/addressl" element={<Addressl></Addressl>}/>
<Route path="/communicationl" element={<Communicationl/>}/>
<Route path="/categoryl" element={<Categoriesl/>}/>
<Route path="/specialisationl" element={<Specialisationl/>}/>
<Route path="/paymentmodel" element={<Paymentmodel/>}/>
<Route path="/workinghoursl" element={<Workinghoursl/>}/>
<Route path="/uploadimagel" element={<Uploadimagel/>}/>
<Route path="/Sociallinkl" element={<Sociallinkl/>}/>
<Route path="/Keywordl" element={<Keywordl/>}/>
<Route path="/Imagesl" element={<Imagesl/>}/>
<Route path="/Galleryimage" element={<Galleryimagel/>}/>

<Route path="/Categoryapi" element={<Categoryapi/>}/>

<Route path="/labournakapage" element={<Profile2><Labournakapage /></Profile2>} />









  



  <Route exact path="/ListingResults/:categoryUrl/tc" component={ThirdCategoryList}/>




    </Routes>
     <Foot/>
    </> 
  );
}

export default App;
