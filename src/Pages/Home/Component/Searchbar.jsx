import React, { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { Link, NavLink } from "react-router-dom";
import "../../../FrontEnd/css/Serchbar.css";
import { useParams } from "react-router-dom";
import CryptoJS from "crypto-js";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [searchType, setSearchType] = useState('');
  const { secondCategoryName,subcategoryName,secondCategoryId} = useParams();

  const encryptionKey = 'myinterriorMart@SECRETKEY';

const encrypt = (text) => {
  
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};


const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(100);
const [totalItems, setTotalItems] = useState(0);


const handleSearch = (searchTerm, type) => {
  setSearchType(type);
  setSearchTerm(searchTerm); // Trigger the search
};


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
          // console.log(data); // Log the data to inspect its structure
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)} // Show dropdown on focus
                  onBlur={handleBlur} // Use custom handleBlur function
                />
                <button type="submit" className="searchButton">
                  <i className="fa fa-search"></i>
                </button>
              </div>
              {showDropdown && results.length > 0 && (
                <div className="dropdownsearchbar" ref={dropdownRef}>
                  {results.map((result, index) => {
                    console.log(typeof result.listingId);
                    if(result.listingId == null && result.companyName == null && result.keyword==null){
                      return (
                        <div key={index} className="dropdownItemsearchbar">
                          <NavLink to={`/All/Search/${result.category.replace(/\s+/g, "-").toLowerCase()}/in-${localStorage.getItem('cityname')}?secatEncyt=${encodeURIComponent(encrypt(parseInt(result.categoryId)))}`}><h6>{result.category}</h6></NavLink>
                        </div>
                      )
                    }
                    else if(result.keyword != null && result.companyName != null){
                
                      // console.log(result.keyword);
                      // console.log(typeof result.keyword);
                      // console.log("keyword",result.keyword, result.keyword.startsWith(searchTerm)); //for keyword
                      // console.log("companyName",result.companyName, result.companyName.startsWith(searchTerm)); //for keyword
                      
                      if(result.keyword.toLowerCase().startsWith(searchTerm.toLowerCase())){
                        //if search is keyword
                        return (
                          <div key={index} className="dropdownItemsearchbar">
                            <NavLink to={`/All/Search/${result.category.replace(/\s+/g, "-").toLowerCase()}/in-${localStorage.getItem('cityname')}?searchkey=${encodeURIComponent(result.keyword)}&secatEncyt=${encodeURIComponent(encrypt(parseInt(result.categoryId)))}`}><h6>{result.keyword}</h6></NavLink>
                          </div>
                        )
                      }
                      
                      if(result.companyName.toLowerCase().startsWith(searchTerm.toLowerCase())){
                        //if search is company
                        return (
                          <div key={index} className="dropdownItemsearchbar">
                            <NavLink to={`/company/${result.companyName.replace(/\s+/g, "-").toLowerCase()}/${result.category.replace(/\s+/g, "-").toLowerCase()}/locality/in-${localStorage.getItem('cityname')}?listingEncyt=${encodeURIComponent(encrypt(parseInt(result.listingId)))}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(encrypt(parseInt(result.categoryId)))}`}
                            >
                              <h6>{result.companyName}</h6>
                            </NavLink>
                          </div>
                        );
                      }
                      
                      
                    }
                    else  {
                      return (
                        <div key={index} className="dropdownItemsearchbar">
                           <NavLink to={`/company/${result.companyName.replace(/\s+/g, "-").toLowerCase()}/${result.category.replace(/\s+/g, "-").toLowerCase()}/locality/in-${localStorage.getItem('cityname')}?listingEncyt=${encodeURIComponent(encrypt(parseInt(result.listingId)))}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(encrypt(parseInt(result.categoryId)))}`}
                            >
                            <h6>{result.companyName}</h6>
                          </NavLink>
                        </div>
                      );
                    }
      
                    }
                  )}
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
