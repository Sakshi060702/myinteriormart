import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { Link,NavLink } from "react-router-dom";
import "../../../FrontEnd/css/Serchbar.css";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
        try {
          const response = await fetch(
            `https://apidev.myinteriormart.com/api/SearchListings/search?searchText=${searchTerm}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          console.log(data); // Log the data to inspect its structure
          setResults(data);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error in fetching search results", error);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    };

    const debouncedFetch = debounce(fetchResults, 300);
    debouncedFetch();

    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm]);



  return (
    <div id="results">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="wrap">
              <div className="search">
                <input
                  type="text"
                  className="searchTerm"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                  onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Hide dropdown after a slight delay
                />
                <button type="submit" className="searchButton">
                  <i className="fa fa-search"></i>
                </button>
              </div>
              {showDropdown && results.length > 0 && (
  <div className="dropdownsearchbar">
    {results.map((result, index) => (
      <div key={index} className="dropdownItemsearchbar">
        <NavLink to={`/company/${result.listingId}`}>
          <h6 style={{ color: 'black' }}>
            {result.companyName} - {result.localityName}, {result.cityName}
          </h6>
        </NavLink>
        <p>{result.listingId}</p>
      </div>
    ))}
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
