import React, { useState } from "react";
import { useSearchParams, useParams, Link,useNavigate } from "react-router-dom";
import "../Pages/Freelisting/Businesslisting/Businesslisting.css";
import "../FrontEnd/css/Citypopup.css";
import mumbaiimag from "../FrontEnd/img/icon/mumbai.avif";
import hydimg from "../FrontEnd/img/icon/hyd.png";
import delhi from "../FrontEnd/img/icon/delhi.avif";
import ahmd from "../FrontEnd/img/icon/ahd.avif";
import chennai from "../FrontEnd/img/icon/chen.avif";
import pune from "../FrontEnd/img/icon/pune.png";
import ben from "../FrontEnd/img/icon/bengluru.png";
import kolkata from "../FrontEnd/img/icon/kolk.avif";

const cities = [
  { name: "Mumbai" },
  { name: "Hyderabad" },
  { name: "Delhi" },
  { name: "Bengaluru" },
  { name: "Ahmedabad" },
  { name: "Pune" },
  { name: "Kolkata" },
];

const Citypopup = ({}) => {
    // const [searchParams] = useSearchParams();
    // const loc_lat = searchParams.get("loc_lat");
    // const loc_lon = searchParams.get("loc_lon");
    // console.log(loc_lat,loc_lon);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const [currentCity,setCurrentCity]=useState(null);
  const navigate=useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const exactMatch = cities.find(
        (city) => city.name.toLowerCase() === query.toLowerCase()
      );
      setFilteredCities(exactMatch ? [exactMatch] : []);
    } else {
      setFilteredCities([]);
    }
  };

  // const handleCitySelect = (cityName) => {
  //   navigate(`/${cityName.toLowerCase()}`);
  // };    
  
  const handleCitySelect1 = (cityName,pageName="") => {
    console.log("pagename",pageName)
    const formattedCityName = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    localStorage.setItem("cityname",formattedCityName);

    if (pageName) {
      navigate(`/${pageName}/${formattedCityName}`);
    } else {
      navigate(`/${formattedCityName}`);
    }
   

  };
  

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        window.location.href = `/contact?lat=${latitude}&lng=${longitude}`;

        localStorage.setItem("latitude",latitude);
        localStorage.setItem("longitude",longitude);

        
        // console.log("latitude", latitude);
        // console.log("longitude", longitude);
      });
    } else {
      console.log("Error");
    }
  };

  return (
    <div className="popupcity">
      <div className="popupcity-overlay">
        <div className="popupcity-content">
          <div style={{ paddingBottom: "20px", textAlign: "center" }}>
            <div style={{ paddingTop: "32px", paddingBottom: "0px" }}>
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="searchButton">
                  <i className="fa fa-search"></i>
                </button>
              </div>

              {filteredCities.length > 0 && (
                <ul className="city-dropdown">
                  {filteredCities.map((city, index) => (
                    <li
                      key={index}
                      className="city-option"
                      onClick={() => handleCitySelect1(city.name)}
                    >
                      {city.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <i
              class="fa fa-map-marker"
              aria-hidden="true"
              style={{ marginRight: "5px" }}
            ></i>

            <button className="get-location-button" onClick={handleGetLocation}>
              Get My Location
            </button>
            <hr />
            <div></div>
            <div>
              <div style={{ textAlign: "center" }}>
                <h4>Popular cities</h4>
              </div>
              <div
                className="image-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <div className="city-wrapper">
                  <div className="city-icon">
                    <button onClick={()=>handleCitySelect1("Mumbai")}>
                    <img
                      src={mumbaiimag}
                      alt="Mumbai"
                      style={{ margin: "0 10px" }}
                    />
                    <br></br>
                    <h6>Mumbai</h6>
                    </button>
                    
                  </div>
                  <div className="city-sub-options ">
                    <div><button onClick={()=>handleCitySelect1("Mumbai:Central & South")}>Mumbai:Central & South</button></div>
                    <div>Mumbai:Western</div>
                    <div>Navi Mumbai</div>
                    <div>Thane</div>
                    <div>Kalyan</div>
                  </div>
                </div>
                <div>
                <button onClick={()=>handleCitySelect1("Hyderabad")}>
                  {" "}
                  <img
                    src={hydimg}
                    alt="Hyderabad"
                    style={{ margin: "0 10px" }}
                  />
                  <br></br>
                  <h6>Hyderabad</h6>
                  </button>
                </div>
                <div className="city-wrapper">
                  <div className="city-icon">
                  <button onClick={()=>handleCitySelect1("Delhi")}>
                    <img
                      src={delhi}
                      alt="Mumbai"
                      style={{ margin: "0 10px" }}
                    />
                    <br></br>
                    <h6>Delhi</h6>
                    </button>
                  </div>
                  <div className="city-sub-options ">
                    <div>Noida</div>
                    <div>Gurugram</div>
                    <div>Delhi</div>
                    <div>Ghaziabad</div>
                    <div>Faridabad</div>
                  </div>
                </div>
                <div>
                <button onClick={()=>handleCitySelect1("Bengaluru")}>
                  <img src={ben} alt="Bengaluru" style={{ margin: "0 10px" }} />
                  <br></br>
                  <h6>Bengaluru</h6>
                  </button>
                </div>
                <div>
                <button onClick={()=>handleCitySelect1("Ahmedabad")}>
                  <img src={ahmd} alt="Mumbai" style={{ margin: "0 10px" }} />
                  <br></br>
                  <h6>Ahmedabad</h6>
                  </button>
                </div>
                <div>
                  {" "}
                  <button onClick={()=>handleCitySelect1("Pune")}>
                  <img
                    src={pune}
                    alt="Hyderabad"
                    style={{ margin: "0 10px" }}
                  />
                  <br></br>
                  <h6>Pune</h6>
                  </button>
                </div>
                <div>
                <button onClick={()=>handleCitySelect1("Chennai")}>
                  <img src={chennai} alt="Delhi" style={{ margin: "0 10px" }} />
                  <br></br>
                  <h6>Chennai</h6>
                  </button>
                </div>
                <div>
                <button onClick={()=>handleCitySelect1("Kolkata")}>
                  <img
                    src={kolkata}
                    alt="Bengaluru"
                    style={{ margin: "0 10px" }}
                  />
                  <br></br>
                  <h6>Kolkata</h6>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citypopup;
