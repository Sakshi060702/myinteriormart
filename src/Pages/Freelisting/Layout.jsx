import React from 'react';
import { Link } from 'react-router-dom';
import businessimg from "../../FrontEnd/img/business-listing.jpeg";
import labourimg from "../../FrontEnd/img/labour-naka.jpeg";
import buyimg from "../../FrontEnd/img/buy.jpeg";
import sellimg from "../../FrontEnd/img/sell.jpeg";
import jobimg from "../../FrontEnd/img/job.jpeg";
import { Dropdown } from "react-bootstrap";


function Layout({ children }) {
  return (
    <main>
      <div className="container margin_60_35">
        <div className="row">
          <div className="col-lg-3" id="desktop_view">
            <div
              className="nav profile-side-menu flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <Link to="/selectcategory">Select Category</Link>
              <Link to="/addcompany">
                {" "}
                <img
                  src={businessimg}
                  alt="Business Listing"
                  style={{ height: "45px" }}
                />{" "}
                Business Listing
              </Link>
              {/* <Link to="/Personalinformation">
                {" "}
                <img
                  src={labourimg}
                  alt="Labour naka"
                  style={{ height: "60px" }}
                />{" "}
                Labour Naka
              </Link>
              <Link to="/Productdetails">
                {" "}
                <img
                  src={buyimg}
                  alt="Buy"
                  style={{ height: "60px" }}
                /> Buy{" "}
              </Link>
              <Link to="/jobpage">
                {" "}
                <img src={sellimg} alt="Sell" style={{ height: "60px" }} /> Sell
              </Link>
              <Link to="/jobpage">
                {" "}
                <img src={jobimg} alt="Job" style={{ height: "60px" }} /> Job
              </Link> */}
            </div>
          </div>
          <div className="col-lg-3 mb-5 selectoption" id="mob_view">
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-warning"
                id="dropdown-basic"
                style={{ width: "100%" }}
              >
                Select Options
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ width: "93%" }}>
                <Dropdown.Item as={Link} to="/selectcategory">
                  Select Category
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/addcompany">
                  <img
                    src={businessimg}
                    alt="Business Listing"
                    style={{ height: "45px" }}
                  />
                  Business Listing
                </Dropdown.Item>
                {/* <Dropdown.Item as={Link} to="/Personalinformation">
                  <img
                    src={labourimg}
                    alt="Labour Naka"
                    style={{ height: "60px" }}
                  />
                  Labour Naka
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/Productdetails">
                  <img
                    src={buyimg}
                    alt="Business Listing"
                    style={{ height: "60px" }}
                  />
                  Buy
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/jobpage">
                  <img src={sellimg} alt="Sell" style={{ height: "60px" }} />
                  Sell
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/jobpage">
                  <img src={jobimg} alt="Job" style={{ height: "60px" }} />
                  Job
                </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="col-lg-9 px_remove" id="create_listing">
            <div
              className="tab-content profile-sidebar-content"
              id="v-pills-tabContent"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Layout;