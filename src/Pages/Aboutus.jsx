import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";

import founderimg from "../FrontEnd/img/founder.jpg";

function Aboutus() {
  //  const { cityName } = useParams();
   const [cityName,setCityName]=useState(null);

  

   useEffect(() => {
   
    const city_name=localStorage.getItem('cityname');

   

    if(city_name){
      setCityName(city_name)
    }
  }, []);
  return (
    <>
    {/* <h6>{cityName}</h6> */}
      <div class="container mt-4 mb-4">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="card-shadow about_card">
              <h2 className="about_heading">About Us</h2>
              <p className="about_us_text">
                <span className="about_span">My Interior Mart</span> is a
                India's 1st{" "}
                <b className="text-dark">
                  Construction & Interior industry Search Engine
                </b>
                . We generate sales leads for our customers. We are a Trade
                Portal with an online platform for buyers, sellers and
                businesses through which they communicate as well as conduct the
                operations of their business instantly. We provide tools through
                which businesses can showcase their products and services in an
                effective manner. Our registered members have access to all the
                present business opportuni- ties where they cann view company
                profiles, buy as well as sell bids submitted and view all the
                listed products and services.
              </p>
              <h2 className="about_heading">Founder</h2>
              <div className="row align-items-center mb-4 aboutus">
                <div className="col-md-3 mb-3">
                  <div className="founder_img_sec">
                    <img src={founderimg} alt="image" />
                  </div>
                </div>
                <div className="col-md-9 mb-3">
                  <h5 className="about_heading m-0">Habib Humza Al-Hamed</h5>
                  <p>
                    Founder & Managing Director @{" "}
                    <span className="about_span">My Interior Mart.</span>
                  </p>

                  <p className="about_us_text">
                    A Turnkey Interior Contractor by profession, with more than
                    17 years of experience in Interior Industry. He is founder
                    of myInterior Mart and founded it on September, 2017. He is
                    expert in executing construction and turnkey interior
                    projects.
                  </p>
                </div>
              </div>

              <div className="row align-items-center bg_img">
                <div className="col-md-6">
                  <h2 className="about_heading">Vision</h2>
                  <ul className="abou_ul mb-5">
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        To become #1 Construction & Interior Search Engine
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        To be know by every businessman in India & Globe.
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        To Build and Construction its own Data Center.
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        To Generate Employment Opportunities.
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        To Make Business for Our Customers and Users.
                      </p>
                    </li>
                  </ul>

                  <h2 className="about_heading">Mission</h2>
                  <ul className="abou_ul mb-5">
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        To Provide Business for Customers.
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        When Your Business Succeeds, We Succeed.
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        Generate Fresh Leads for Customers.
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-left mx-3 mb-1">
                        To Provide Business Related Information.
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="col-md-6">
                  <h2 className="about_heading text-md-right text-sm-left">
                    Our Values
                  </h2>
                  <ul className="abou_ul_right mb-5">
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Client Partnership
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Consistent Quality Service{" "}
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Listen to Others For Understanding
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Assume Positive Intent
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Show Respect For All
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Two Way Communications
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Responsive To Change
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Supportive Teamwork
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Participative Problem Solving
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Pride in Achievement
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Supplier Success
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Balanced Business Performance
                      </p>
                    </li>
                    <li>
                      <p className="about_us_text text-md-right text-sm-left mx-3 mb-1">
                        Involvement of All
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Aboutus;
