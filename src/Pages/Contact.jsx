import React from "react";
import contactImage from "../FrontEnd/img/ContactUs.jpeg";
import locationImage from "../FrontEnd/img/location-pin.png";
import phoneImage from "../FrontEnd/img/phone.png";
import megaphoneImage from "../FrontEnd/img/megaphone.png";

function Contact() {
  return (
    <>
      <main style={{ backgroundColor: "white" }}>
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-7 mb-3">
              <div className="contact_form">
                <form>
                  <div className="row">
                    <h3 className="font-weight-bold text-dark mx-3 mb-4">
                      Get In Touch
                    </h3>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number"
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          minLength="10"
                          maxLength="10"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Message"
                        ></textarea>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn_1 py-2 px-3 mx-3"
                      id="submit-contact"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-md-5 d-flex justify-content-center mb-3">
              <div className="contact_us_img_sec">
                <img
                  src={contactImage}
                  style={{ width: "100%", height: "100%" }}
                  alt="image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-5" id="location_contact">
          <div className="container">
            <div className="row justify-content-center px-4">
              <div className="col-md-4 mobile_m">
                <div className="contact_card">
                  <div className="contact_img_sec">
                    <img
                      src={locationImage}
                      className="contact_img"
                      alt="Address"
                    />
                  </div>
                  <div className="contact_heading">Address</div>
                  <div className="contact_text">
                  Perl Residence Office No.12, opp. Wadia School, D.N.Nagar, Andheri West, Mumbai, Maharashtra 400053
                  </div>
                </div>
              </div>
              <div className="col-md-4 mobile_m">
                <div className="contact_card">
                  <div className="contact_img_sec">
                    <img
                      src={phoneImage}
                      className="contact_img"
                      alt="Mobile"
                    />
                  </div>
                  <div className="contact_heading">Helpline</div>
                  <div className="contact_text">
                    <a href="tel:+919876543210">+91 7700995500</a>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mobile_m">
                <div className="contact_card">
                  <div className="contact_img_sec" style={{ width: "20%" }}>
                    <img
                      src={megaphoneImage}
                      className="contact_img"
                      alt="email"
                    />
                  </div>
                  <div className="contact_heading" style={{ marginTop: "7px" }}>
                    Advertisement
                  </div>
                  <div className="contact_text">
                    <a href="tel:+919876543210">+91 7700994015</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default Contact;
