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
  const navigate = useNavigate();

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
        if (
          item.category &&
          !item.companyName &&
          !item.keyword &&
          !item.localityName &&
          !item.mobileNumber &&
          !item.gstNumber
        ) {
          return item.category.toLowerCase().includes(term.toLowerCase());
        }
        // If other fields are available, apply existing conditions
        return (
          (item.companyName && item.companyName.toLowerCase().includes(term)) ||
          (item.keyword && item.keyword.toLowerCase().includes(term)) ||
          (item.category && item.category.toLowerCase().includes(term)) ||
          (item.localityName &&
            item.localityName.toLowerCase().includes(term)) ||
          (item.mobilenumber &&
            item.mobilenumber.toLowerCase().includes(term)) || // this gst and mobile if we remove then not affect on serch
          (item.gstnumber && item.gstnumber.toLowerCase().includes(term))
        );
      })
      .map((item) => {
        // Adjust display text based on the filtered item
        let displayText =
          item.category &&
          !item.companyName &&
          !item.keyword &&
          !item.localityName
            ? item.category
            : item.keyword &&
              item.keyword.toLowerCase().includes(term.toLowerCase())
            ? item.keyword :
            item.mobilenumber && item.mobilenumber.toLowerCase().includes(term.toLowerCase()) // Check if mobilenumber matches the term
            ? item.mobilenumber 
            : item.companyName || ""; // Default to category if no keyword and company name

        return {
          displayText,
        };
      });

    setFilteredResults(filtered);
  };

  const handleSearchNavigate = () => {
    const matchResult = filteredResults.find(
      (result) =>
        (result.companyName &&
          result.companyName.toLowerCase() ===
            searchTerm.toLocaleLowerCase()) ||
        (result.keyword &&
          result.keyword.toLowerCase() === searchTerm.toLocaleLowerCase()) ||
        (result.category &&
          result.category.toLowerCase() === searchTerm.toLowerCase())
    );
    if (matchResult) {
      let redirectionUrl = "";
       if (
        matchResult.category &&
        !matchResult.companyName &&
        !matchResult.keyword
      ) {
        redirectionUrl = `/All/Search/${matchResult.category
          .replace(/\s+/g, "-")
          .toLowerCase()}/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(
          matchResult.keyword
        )}&secatEncyt=${encodeURIComponent(
          encrypt(parseInt(matchResult.categoryId))
        )}`;
      }
      else if (
        matchResult.keyword &&
        searchTerm.toLowerCase() === matchResult.keyword.toLowerCase()
      ) {
        redirectionUrl = `/All/Search/${matchResult.category
          .replace(/\s+/g, "-")
          .toLowerCase()}/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(
          matchResult.keyword
        )}&secatEncyt=${encodeURIComponent(
          encrypt(parseInt(matchResult.categoryId))
        )}`;
      } 

      else  {
        const companyName = matchResult.companyName || "unknown";
  const categoryName = matchResult.category || "general";
        redirectionUrl = `/company/${companyName
          .replace(/\s+/g, "-")
          .toLowerCase()}/${categoryName
          .replace(/\s+/g, "-")
          .toLowerCase()}/locality/in-${localStorage.getItem(
          "cityname"
        )}?listingEncyt=${encodeURIComponent(
          encrypt(parseInt(matchResult.listingId))
        )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
          encrypt(parseInt(matchResult.categoryId))
        )}`;
      } 
    
      if (redirectionUrl) {
        navigate(redirectionUrl);
      }
      console.log(' Redirect URL:', redirectionUrl);
    }
  };

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setTimeout(() => setShowDropdown(false), 100);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchNavigate();
    }
  };

  // const fetchKeywordData = async (keyword) => {
  //   const cityName = localStorage.getItem("cityname") || "mumbai"; // Default city name
  
  //   try {
  //     const response = await fetch(
  //       `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListingByKeyword?cityName=${cityName}&Keywords=${keyword}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  
  //     const data = await response.json();
  //     return data; // Return API response
  //   } catch (error) {
  //     console.error("Error fetching keyword data:", error);
  //     return null;
  //   }
  // };
  

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
                  onKeyDown={(e) => handleKeyPress(e)}
                />
                <button
                  type="submit"
                  className="searchButton"
                  onClick={handleSearchNavigate}
                >
                  <i className="fa fa-search"></i>
                </button>
              </div>

              {showDropdown && filteredResults.length > 0 && (
                <div className="dropdownsearchbar" ref={dropdownRef}>
                  {filteredResults.map((result, index) => {
                    const displayText =
                      result.category &&
                      !result.companyName &&
                      !result.keyword &&
                      !result.localityName
                        ? result.category
                        : result.keyword &&
                          result.keyword
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        ? `${result.keyword}${result.category ? ` - ${result.category}` : ""}`
                        : result.companyName ?`${result.companyName}${result.localityName ? ` - ${result.localityName}` : ""}`:"";

                    console.log(displayText); // Log the display text

                    let redirectionUrl = "";

                    if (
                      result.category &&
                      searchTerm.toLowerCase() === result.category.toLowerCase()
                    ) {
                      redirectionUrl = `/All/Search/${result.category
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/in-${localStorage.getItem(
                        "cityname"
                      )}?secatEncyt=${encodeURIComponent(
                        encrypt(parseInt(result.categoryId))
                      )}`;
                    } else if (
                      result.keyword &&
                      searchTerm.toLowerCase() === result.keyword.toLowerCase()
                    ) {
                      redirectionUrl = `/All/Search/${result.category
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/in-${localStorage.getItem(
                        "cityname"
                      )}?searchkey=${encodeURIComponent(
                        result.keyword
                      )}&secatEncyt=${encodeURIComponent(
                        encrypt(parseInt(result.categoryId))
                      )}`;
                    } else {
                      const companyName = result.companyName || "unknown";
                      const categoryName = result.category || "general";
                      redirectionUrl = `/company/${companyName
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/${categoryName
                        .replace(/\s+/g, "-")
                        .toLowerCase()}/locality/in-${localStorage.getItem(
                        "cityname"
                      )}?listingEncyt=${encodeURIComponent(
                        encrypt(parseInt(result.listingId))
                      )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
                        encrypt(parseInt(result.categoryId))
                      )}`;
                    }
                    console.log("Final Redirect URL:", redirectionUrl);

                    return (
                      <div key={index} className="dropdownItemsearchbar">
                        <NavLink to={redirectionUrl}>
                          {/* <div>
                <strong>{displayText}</strong>
              </div> */}
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