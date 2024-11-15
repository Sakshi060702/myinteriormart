import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { NavLink } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../../../FrontEnd/css/Serchbar.css";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [data, setData] = useState([]); // State to store fetched data
  const [filteredResults, setFilteredResults] = useState([]);
  const encryptionKey = "myinterriorMart@SECRETKEY";
  const navigate=useNavigate();

 

  
  
  const decrypt = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const encrypt = (text) => {
    return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
  };

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

  useEffect(() => {
    const debouncedFetch = debounce(fetchResults, 300);
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    setFilteredResults(results);
  }, [results]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    
    // Filter results by checking if the search term is included in any of the fields
    const filtered = results
      .filter((item) => {
        // If only category is available and others are null, show the category
        if (item.category && !item.companyName && !item.keyword && !item.localityName && !item.mobileNumber && !item.gstNumber) {
          return item.category.toLowerCase().includes(term.toLowerCase());
        }
        // If other fields are available, apply existing conditions
        return (
          (item.companyName && item.companyName.toLowerCase().includes(term)) ||
          (item.keyword && item.keyword.toLowerCase().includes(term)) ||
          (item.category && item.category.toLowerCase().includes(term)) ||
          (item.localityName && item.localityName.toLowerCase().includes(term)) ||
          (item.mobileNumber && item.mobileNumber.toLowerCase().includes(term)) || // this gst and mobile if we remove then not affect on serch
          (item.gstNumber && item.gstNumber.toLowerCase().includes(term))
        );
      })
      .map((item) => {
        // Adjust display text based on the filtered item
        let displayText = item.category && !item.companyName && !item.keyword && !item.localityName
          ? item.category
          : (item.keyword && item.keyword.toLowerCase().includes(term.toLowerCase()) 
            ? item.keyword 
            : item.companyName||''); // Default to category if no keyword and company name
            
        return {
          displayText,
        };
      });
  
    setFilteredResults(filtered);
  };

  const handleSearchNavigate = () => {
    // Find the matching result from filteredResults based on the searchTerm
    const matchResult = filteredResults.find(
      (result) =>
        (result.companyName && result.companyName.toLowerCase() === searchTerm.toLowerCase()) ||
        (result.keyword && result.keyword.toLowerCase() === searchTerm.toLowerCase()) ||
        (result.category && result.category.toLowerCase() === searchTerm.toLowerCase())
    );
  
    if (matchResult) {
      let redirectionUrl = "";
  
      // Check which field is matched and construct the URL accordingly
      if (matchResult.companyName) {
        redirectionUrl = `/company/${matchResult.companyName
          .replace(/\s+/g, "-")
          .toLowerCase()}/${matchResult.category.replace(/\s+/g, "-").toLowerCase()}/locality/in-${localStorage.getItem(
          "cityname"
        )}?listingEncyt=${encodeURIComponent(encrypt(parseInt(matchResult.listingId)))}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
          encrypt(parseInt(matchResult.categoryId))
        )}`;
      } else if (matchResult.keyword) {
        redirectionUrl = `/All/Search/${matchResult.category
          .replace(/\s+/g, "-")
          .toLowerCase()}/in-${localStorage.getItem("cityname")}?searchkey=${encodeURIComponent(
          matchResult.keyword
        )}&secatEncyt=${encodeURIComponent(encrypt(parseInt(matchResult.categoryId)))}`;
      } else if (matchResult.category) {
        redirectionUrl = `/All/Search/${matchResult.category
          .replace(/\s+/g, "-")
          .toLowerCase()}/in-${localStorage.getItem("cityname")}?secatEncyt=${encodeURIComponent(
          encrypt(parseInt(matchResult.categoryId))
        )}`;
      }
  
      // Navigate to the constructed URL
      if (redirectionUrl) {
        navigate(redirectionUrl);
      }
    }
  };
  
  
  
  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setTimeout(() => setShowDropdown(false), 100);
    }
  };

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
                  onChange={handleSearch}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={handleBlur}
                />
                <button type="submit" className="searchButton" onClick={handleSearchNavigate}>
                  <i className="fa fa-search"></i>
                </button>
              </div>

              {showDropdown && filteredResults.length > 0 && (
  <div className="dropdownsearchbar" ref={dropdownRef}>
   
   {filteredResults.map((result, index) => {
  // Determine the display text
  const displayText = result.companyName
    ? result.companyName
    : result.keyword
    ? result.keyword
    : result.category;

  // Construct the redirection URL based on available fields
  let redirectionUrl = "";

  if (result.companyName) {
    redirectionUrl = `/company/${result.companyName
      .replace(/\s+/g, "-")
      .toLowerCase()}/${result.category.replace(/\s+/g, "-").toLowerCase()}/locality/in-${localStorage.getItem(
      "cityname"
    )}?listingEncyt=${encodeURIComponent(encrypt(parseInt(result.listingId)))}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
      encrypt(parseInt(result.categoryId))
    )}`;
  } else if (result.keyword) {
    redirectionUrl = `/All/Search/${result.category
      .replace(/\s+/g, "-")
      .toLowerCase()}/in-${localStorage.getItem("cityname")}?searchkey=${encodeURIComponent(result.keyword)}&secatEncyt=${encodeURIComponent(
      encrypt(parseInt(result.categoryId))
    )}`;
  } else if (result.category) {
    redirectionUrl = `/All/Search/${result.category
      .replace(/\s+/g, "-")
      .toLowerCase()}/in-${localStorage.getItem("cityname")}?secatEncyt=${encodeURIComponent(encrypt(parseInt(result.categoryId)))}`;
  }

  return (
    <div key={index} className="dropdownItemsearchbar">
      <NavLink to={redirectionUrl}>
        <h6 className="serchtitle">{displayText}</h6>
      </NavLink>
    </div>
  );
})}

    
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
