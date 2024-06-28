import React from "react";

function Enquiry(){
    return(
         <div id="enquiry-in-dialog" className="zoom-anim-dialog mfp-hide dialog-mfp">
      <div className="small-dialog-header">
        <h6>Enquiry Now</h6>
      </div>
      <h6>Get Information by SMS/Email</h6>
      <p>Enter the details below and click on SEND</p>
      <div className="step">
        <form action="#" method="post"> {/* Corrected 'from' to 'form' and 'post' to 'method' */}
          <div className="form-group">
            <input className="form-control" type="text" name="name" placeholder="Name" />
            <i className="ti-user"></i>
          </div>
          <div className="form-group">
            <input className="form-control" type="email" name="email" placeholder="Email" />
            <i className="icon_mail_alt"></i>
          </div>
          <div className="form-group">
            <input className="form-control" type="number" name="number" placeholder="Mobile no." />
            <i className="icon_phone"></i>
          </div>
          <div className="row no-gutters">
            <div className="col-md-12 form-group">
              <div className="custom-select-form">
                <select className="wide add_bottom_15" name="services" id="services">
                  <option value="" disabled selected hidden>Services</option>
                  <option value="Website Designers">Website Designers</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Ecommerce Website Services">Ecommerce Website Services</option>
                  <option value="Wordpress Developers">Wordpress Developers</option>
                </select>
              </div>
            </div>
          </div>
          <input type="submit" className="btn_1 full-width" value="Submit" />
        </form>
      </div>
    </div>
    )
}

export default Enquiry;