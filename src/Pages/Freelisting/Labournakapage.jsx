import React from "react";
import { Link ,useParams} from "react-router-dom";
import companyimg from '../../FrontEnd/img/banner/offfice.png';
import communicationimg from '../../FrontEnd/img/banner/communication.png';
import addressimg from '../../FrontEnd/img/banner/address.png';
import categoryimg from '../../FrontEnd/img/banner/category.png';
import specialisationimg from '../../FrontEnd/img/banner/specialities.png';
import workinghoursimg from '../../FrontEnd/img/banner/workin-hour.png';
import paymentmodeimg from '../../FrontEnd/img/banner/payment.png';
import uploadimg from '../../FrontEnd/img/share.png';
import sociallinkimg from '../../FrontEnd/img/banner/links.png';
import seoimg from '../../FrontEnd/img/banner/SEO.png';

import '../../FrontEnd/css/Mangelisting.css'





function Labournakapage(){
  // const {listingId} = useParams();
    return(
        <>
         <div className="tab" style={{ display: 'block' }}>
            <h4>Manage Listing</h4>

            <div className="row">
                {/* First row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to={`/addcompanyl`} className="link-large"><img src={companyimg} className="managelistingimg"/>Company Details</Link></div>
                      <div className="link-box" ><Link to={`/communicationl`}  className="link-large"><img src={communicationimg} className="managelistingimg"/>Communication</Link></div>
                      <div className="link-box"> <Link to="/addressl" className="link-large"><img src={addressimg} className="managelistingimg"/>Address</Link></div>
                        
                        
                       
                    </div>
                </div>

                {/* Second row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"> <Link to="/Categoryapi" className="link-large"><img src={categoryimg} className="managelistingimg"/>Categories</Link></div>
                      <div className="link-box"><Link to="/specialisationl" className="link-large"><img src={specialisationimg} className="managelistingimg"/>Specialisations</Link></div>
                      <div className="link-box"> <Link to="/workinghoursl" className="link-large"><img src={workinghoursimg} className="managelistingimg"/>Working Hours</Link></div>
                       
                        
                       
                    </div>
                </div>

                {/* Third row */}
                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to="/paymentmodel" className="link-large"><img src={paymentmodeimg} className="managelistingimg"/>Payment Modes</Link></div>
                      <div className="link-box"><Link to="/Imagesl" className="link-large"><img src={uploadimg} className="managelistingimg"/>Upload Images</Link></div>
                      <div className="link-box"><Link to="/Sociallinkl" className="link-large"><img src={sociallinkimg} className="managelistingimg"/>Add Social Links</Link></div>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <div className="link-group">
                      <div className="link-box"><Link to="/Keywordl" className="link-large"><img src={seoimg} className="managelistingimg"/>SEO Keywords</Link></div>
                    </div>
                </div>
            </div>
        </div>                                       
        </>
    )
}
export default Labournakapage;