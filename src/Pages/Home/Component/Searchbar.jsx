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
          (item.gstnumber && item.gstnumber.toLowerCase().includes(term))||
          (item.ownername && item.ownername.toLowerCase().includes(term))
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
            ? item.keyword
            : item.mobilenumber &&
              item.mobilenumber.toLowerCase().includes(term.toLowerCase()) // Check if mobilenumber matches the term
            ? item.mobilenumber
            : item.gstnumber &&
              item.gstnumber.toLowerCase().includes(term.toLowerCase())
            ? item.gstnumber
            :item.ownername && item.ownername.toLowerCase().includes(term.toLowerCase())?item.ownername
            : item.companyName || ""; // Default to category if no keyword and company name

        return {
          displayText,
        };
      });

    setFilteredResults(filtered);
  };

  const handleSearchNavigate = () => {
    const cleanedSearchTerm = searchTerm.replace(/near by/gi, "").trim();
    console.log('cleanedSearchTerm',cleanedSearchTerm)

    const words = cleanedSearchTerm.split(' ');

    const Separatelocality = words.pop();  
  const Separatekeyword = words.join(' ');
  console.log('keyword',Separatekeyword);
  console.log('locality',Separatelocality);


  const matchResult = filteredResults.find(
    (result) =>
      (result.companyName &&
        result.companyName.toLowerCase() === searchTerm.toLowerCase()) ||
      (result.keyword &&
        result.keyword.toLowerCase() === searchTerm.toLowerCase()) ||
      (result.category &&
        result.category.toLowerCase() === searchTerm.toLowerCase()) ||
      (result.ownername &&
        result.ownername.toLowerCase() === searchTerm.toLowerCase()) ||
      (result.mobilenumber &&
        result.mobilenumber.toLowerCase() === searchTerm.toLowerCase()) ||
      (result.gstnumber &&
        result.gstnumber.toLowerCase() === searchTerm.toLowerCase()) ||
      (Separatekeyword.toLowerCase().includes(result.keyword?.toLowerCase() || "") ||
        Separatelocality.toLowerCase().includes(result.localityName?.toLowerCase() || "") ||
        Separatelocality.toLowerCase().includes(result.companyName?.toLowerCase() || ""))
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
                      )}?secatEncyt=${encodeURIComponent(
                        encrypt(parseInt(matchResult.categoryId))
                      )}`;
      } else if (
        matchResult.keyword &&
        searchTerm.toLowerCase() === matchResult.keyword.toLowerCase()
      ) {
        redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(
          matchResult.keyword
        )}`;
      }
      else if(matchResult.ownername &&
        searchTerm.toLowerCase() === matchResult.ownername.toLowerCase()){
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
      else if(matchResult.mobilenumber &&
        searchTerm.toLowerCase() === matchResult.mobilenumber.toLowerCase()){
          const companyName = matchResult.companyName || "unknown";
          const categoryName = matchResult.category || "general";
          redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(
          matchResult.mobilenumber
        )}`;
      }
      else if(matchResult.companyName &&
        searchTerm.toLowerCase() === matchResult.companyName.toLowerCase()){
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
      else if(matchResult.gstnumber &&
        searchTerm.toLowerCase() === matchResult.gstnumber.toLowerCase()){
          const companyName = matchResult.companyName || "unknown";
          const categoryName = matchResult.category || "general";
          redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(
          matchResult.gstnumber
        )}`;
      }
      else if(  matchResult.keyword &&matchResult.localityName
        ){
        redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(
          matchResult.keyword
        )}`;
      }
     
       else {
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
       console.log(" Redirect URL:", redirectionUrl);
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
                    const displayText = (
                      <>
                        {result.category &&
                        !result.companyName &&
                        !result.keyword &&
                        !result.localityName ? (
                          <span>{result.category}</span>
                        ) : result.keyword &&
                          result.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                          <>
                            <span>{result.keyword}</span>
                            <br></br>
                            {result.category && <span className="serchbarTitle">{result.category}</span>}
                          </>
                        ) : result.mobilenumber &&
                          result.mobilenumber.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                          <>
                            <span>{result.companyName}</span>
                            <br></br>
                            <span className="serchbarTitle">{result.mobilenumber}</span>
                          </>
                        ) : result.gstnumber &&
                          result.gstnumber.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                          <>
                            <span>{result.companyName}</span>
                            <br></br>
                            <span className="serchbarTitle">{result.gstnumber}</span>
                          </>
                        ):result.ownername && result.ownername.toLowerCase().includes(searchTerm.toLowerCase())?(
                          <>
                           <span>{result.companyName}</span>
                            <br></br>
                            <span className="serchbarTitle">{result.ownername}</span>
                          </>
                        ) : result.companyName ? (
                          <>
                            <span>{result.companyName}</span>
                            <br></br>
                            {result.localityName && <span className="serchbarTitle">{`  ${result.localityName}`} - {result.keyword}</span>}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    );
                    
                    // console.log(displayText); // Log the display text

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
                    } else if (
                      result.mobilenumber &&
                      searchTerm.toLowerCase() ===
                        result.mobilenumber.toLowerCase()
                    ) {
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
                    // console.log("Final Redirect URL:", redirectionUrl);

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
