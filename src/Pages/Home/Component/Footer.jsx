import React from "react";


const FooterLink = ({ href, text }) => (
  <li><a href={href}>{text}</a></li>
);

const SocialIcon = ({ iconClass, href }) => (
  <li><a href={href}><i className={iconClass}></i></a></li>
);

function Footer(){
    return(
        <>
        <footer>
        <div className="container">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-6">
            <div className="footer-link">
              <ul className="links">
                <FooterLink href="index.html" text="Home" />
                <FooterLink href="about-us.html" text="About Us" />
                <FooterLink href="contact-us.html" text="Contact Us" />
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="footer-link">
              <ul className="links">
                <FooterLink href="buy.html" text="Buy" />
                <FooterLink href="buy.html" text="Buy" />
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="footer-link">
              <ul className="links">
                <FooterLink href="sell.html" text="Sell" />
                <FooterLink href="sell.html" text="Sell" />
              </ul>
            </div>
          </div>
         
          
          
        </div>
        <hr style={{ margin: 0 }} />
        <div className="row">
          <div className="col-lg-8 col-12 block-center-footer">
            <ul id="additional_links">
              <li><a href="termsandconditions.html">Terms and conditions</a></li>
              <li><a href="privacy-policy.html">Privacy</a></li>
              <li><a target="_blank" href="http://peaceinfotech.com/">© PeaceInfotech Services Pvt. Ltd</a></li>
            </ul>
          </div>
          <div className="col-lg-4 col-12 block-center-footer">
            <div className="follow_us">
              <ul>
                <SocialIcon iconClass="ti-facebook" href="#0" />
                <SocialIcon iconClass="ti-twitter-alt" href="#0" />
                <SocialIcon iconClass="ti-google" href="#0" />
                <SocialIcon iconClass="ti-pinterest" href="#0" />
                <SocialIcon iconClass="ti-instagram" href="#0" />
              </ul>
            </div>
          </div>
        </div>
      </div>

        </footer>

        
        </>
    )
}
export default Footer;