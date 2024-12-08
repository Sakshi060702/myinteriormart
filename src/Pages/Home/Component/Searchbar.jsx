import React, { useState, useEffect, useRef } from "react";
import { debounce, filter } from "lodash";
import { NavLink } from "react-router-dom";
import CryptoJS from "crypto-js";
import "../../../FrontEnd/css/Serchbar.css";
import { useNavigate } from "react-router-dom";
import { combineSlices } from "@reduxjs/toolkit";

function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [data, setData] = useState([]); // State to store fetched data
  const [filteredResults, setFilteredResults] = useState([]);
  const encryptionKey = "myinterriorMart@SECRETKEY";
  const navigate = useNavigate();
  const [combinedResults, setCombinedResults] = useState([]);
  const [phoneData, setPhoneData] = useState([]);
  const [specilisationResult, setSpecialisationResult] = useState([]);
  const [ownerNameResult, setOwnerNameResult] = useState([]);

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
    setPhoneData([]);
    setSpecialisationResult([]);
    setOwnerNameResult([]);
    setResults([]);
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
        console.log("jabardast", data.hasOwnProperty("specializationMatches"));
        console.log(
          "OwnernameProperty",
          data.hasOwnProperty("ownernameMatches")
        );
        if (data.hasOwnProperty("specializationMatches")) {
          if (data.specializationMatches) {
            const filteredSpecialisation =
              data.specializationMatches &&
              data.specializationMatches.length > 0
                ? data.specializationMatches
                    .map((match) => match.specialization) // Extract specializations
                    .filter(
                      (specialization) =>
                        specialization &&
                        specialization
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) // Match term
                    )
                : [];
            setSpecialisationResult([...filteredSpecialisation]);
          }
        } else {
          if (Array.isArray(data)) {
            setPhoneData(data);
          }
        }
        //console.log('owner');

        if (data.hasOwnProperty("ownernameMatches")) {
          if (data.ownernameMatches) {
            const filteredOwnername = data.ownernameMatches
              .map((match) => {
                // Extract owner names and prefixes
                const ownerNames = match.ownername.split(","); 
                const prefixes = match.listings[0]?.ownerPrefix.split(",") || []; 
                const companyname=match.listings[0]?.companyName ||[];
        
                // Combine each name with its prefix
                const combinedNames = ownerNames.map((owner, index) => {
                  const prefix = prefixes[index] || ""; 
                  return `${prefix.trim()} ${owner.trim()} `.trim(); // Combine prefix and name
                })
                .join(',');
        
                return `${combinedNames}(${companyname})`; // Return combined names
              });
              console.log('owner',filteredOwnername)
        
            // Update state with combined names
            setOwnerNameResult(filteredOwnername);
          }
        }
        
        
        

        console.log("data this", data);
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
    console.log("Hi this is special", filteredResults);

    const cate = results.matchedCategory
      ? [results.matchedCategory.category]
      : [];
    const key = results.keywords || [];
    const comp = results.companyNameMatches || [];
    const spe = results.specializationMatches || [];
    const own = results.ownernameMatches || [];

    console.log("cate", cate);
    console.log("key", key);
    console.log("comp", comp);
    console.log("spe", spe);
    console.log("own", own);

    const uniqueResults = Array.from(
      new Set([
        ...phoneData,
        ...combinedResults,
        ...specilisationResult,
        ...ownerNameResult,

        ...cate,
        ...key.map((keyitem) => keyitem.keyword),
        ...comp.map((compitem) => compitem.companyName),
        ...spe.map((spitem) => spitem.specialization),
        // ...own.map((ownItem) => ownItem.ownername),
      ])
    );

    setFilteredResults(uniqueResults);
    console.log("uniqueResults", uniqueResults);

    // setFilteredResults([
    //   ...phoneData,
    //   ...combinedResults,
    //   ...specilisationResult,

    //   ...cate,
    //   ...key.map((keyitem)=>keyitem.keyword),
    //   ...comp.map((compitem)=>compitem.companyName),
    //   ...spe.map((spitem)=>spitem.specialization)

    // ]);
    console.log("fResult", filteredResults);
    // console.log("result", results);
    console.log("specilisation", results.specializationMatches);
    console.log("keywords", results.keywords);
    if (results.keywords && results.keywords.length > 0) {
      // Loop through each keyword and log it
      results.keywords.forEach((keywordItem) => {
        console.log("single keyword", keywordItem.keyword); // Access and log each keyword
      });
    } else {
      console.log("No keywords available"); // If no keywords exist
    }
  }, [results]);

  useEffect(() => {
    if (searchTerm.trim().length > 0 && filteredResults.length > 0) {
      console.log("sResult", filteredResults);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchTerm, filteredResults]);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    console.log("res", results);

    // if (!term) {
    //   setFilteredResults([]);
    //   setShowDropdown(false);
    //   return;
    // }

    // if (term.length > 0 && filteredResults.length > 0) {
    //   setShowDropdown(true);
    // } else {
    //   setShowDropdown(false);
    // }

    console.log("r", results);
    console.log("Type of results:", typeof results);
    console.log("Is results an array?", Array.isArray(results));

    // if (!Array.isArray(results)) {
    //     console.error("Expected results to be an array but got:", results);
    //     return;n
    // }

    const filteredItems = results.items
      ? results.items.filter((item) => {
          return (
            (item.companyName &&
              item.companyName.toLowerCase().includes(term.toLowerCase())) ||
            (item.localityName &&
              item.localityName.toLowerCase().includes(term.toLowerCase())) ||
            (item.mobilenumber &&
              item.mobilenumber.toLowerCase().includes(term.toLowerCase())) ||
            (item.gstnumber &&
              item.gstnumber.toLowerCase().includes(term.toLowerCase())) ||
            (item.ownername &&
              item.ownername.toLowerCase().includes(term.toLowerCase()))
          );
        })
      : [];

    // console.log("nice", filteredItems);

    const filteredCategories =
      results.matchedCategory && results.matchedCategory.category
        ? [results.matchedCategory.category].filter((category) =>
            category.toLowerCase().includes(term.toLowerCase())
          )
        : [];

    const finalFilteredCategories = Array.from(filteredCategories);

    console.log("filteredCategories", filteredCategories);
    console.log("finalFilteredCategories", finalFilteredCategories);

    // console.log("results.keywords:", results.keywords);
    const filteredKeywords = results.keywords
      ? results.keywords
          .filter(
            (keywordItem) =>
              keywordItem.keyword &&
              keywordItem.keyword.toLowerCase().includes(term.toLowerCase())
          )
          .map((keywordItem) => keywordItem.keyword)
      : [];

    const finalFilteredKeywords = Array.from(filteredKeywords);

    console.log("Filtered Keywords:", filteredKeywords);
    console.log("type of kkeywod", typeof filteredKeywords);
    console.log("keyword type", typeof filteredKeywords);
    console.log("finalFilteredKeywords", finalFilteredKeywords);
    console.log(
      "Type of finalFilteredKeywords:",
      Array.isArray(filteredKeywords) ? "Array" : "Not Array"
    );

    const filteredCompanyname =
      results.companyNameMatches && results.companyNameMatches.length > 0
        ? results.companyNameMatches
            .map((match) => match.companyName) // Extract company names
            .filter(
              (companyName) =>
                companyName &&
                companyName.toLowerCase().includes(term.toLowerCase())
            )
        : [];

    const finalFilteredCompanyname = Array.from(filteredCompanyname);
    console.log("finalFilteredCompanyname", finalFilteredCompanyname);

    console.log("filteredCompanyname", filteredCompanyname);

    //ownername
    // const filteredOwnername = results.ownernameMatches
    // ? results.ownernameMatches
    //     .filter(
    //       (keywordItem) =>
    //         keywordItem.ownername &&
    //         keywordItem.ownername.toLowerCase().includes(term.toLowerCase())
    //     )
    //     .map((keywordItem) => keywordItem.ownername)
    // : [];

    // console.log('ownernameMatches',results.ownernameMatches)
    // console.log("Filtered filteredSpecilisation:", filteredOwnername);
    // console.log("type of filteredSpecilisation", typeof filteredOwnername);

    // const finalFilteredOwnername = Array.from(filteredOwnername);
    // console.log('finalFilteredSpecilisation',finalFilteredOwnername);

    //specialisation
    // const filteredSpecialisation = results.specializationMatches
    //   ? results.specializationMatches
    //       .filter(
    //         (spItem) =>
    //           spItem.specialization &&
    //         spItem.specialization.toLowerCase().includes(term.toLowerCase())
    //       )
    //       .map((spItem) => spItem.specialization)
    //   : [];

    // //setSpecialisationResult(filteredSpecialisation);
    // const finalFilteredspecilisation = Array.from(filteredSpecialisation);
    // console.log("filteredSpecialisation", filteredSpecialisation);
    // console.log("finalFilteredspecilisation", finalFilteredspecilisation);

    // const filteredCategories = results
    //       ?.filter(item => {
    //           console.log("Checking item:", item);  // Log each item to inspect structure
    //           return item.matchedCategory && item.matchedCategory.category &&
    //               item.matchedCategory.category.toLowerCase().includes(term);
    //       })
    //       .map(item => item.matchedCategory.category) || [];

    // console.log('filteredcategory',filteredCategories)

    const combinedResults = [
      ...filteredItems,
      ...finalFilteredCategories,
      ...finalFilteredKeywords,
      ...finalFilteredCompanyname,
      // ...filteredSpecialisation
    ];

    setFilteredResults([...combinedResults, ...specilisationResult]);
    setCombinedResults(combinedResults);

    console.log("combinedResults", combinedResults);

    const hasResults =
      filteredItems.length > 0 ||
      finalFilteredCategories.length > 0 ||
      finalFilteredKeywords.length > 0 ||
      finalFilteredCompanyname.length > 0;

    console.log("hasResults", hasResults);

    // Show dropdown if there are any matching results
    if (hasResults.length > 0) {
      setShowDropdown(true);
    } else {
      setTimeout(() => setShowDropdown(false), 300); // Delay to prevent flickering
    }
  };

  const handleSearchNavigate = () => {
    const cleanedSearchTerm = searchTerm.replace(/near by/gi, "").trim();
    console.log("cleanedSearchTerm", cleanedSearchTerm);

    const words = cleanedSearchTerm.split(" ");

    const Separatelocality = words.pop();
    const Separatekeyword = words.join(" ");
    console.log("keyword", Separatekeyword);
    console.log("locality", Separatelocality);

    const matchResult = filteredResults.find(
      (result) =>
        (result.companyName &&
          result.companyName.toLowerCase() === searchTerm.toLowerCase()) ||
        (result.keyword &&
          result.keyword.toLowerCase() === searchTerm.toLowerCase()) ||
        (result.matchedCategory?.category &&
          result.matchedCategory.category.toLowerCase() ===
            searchTerm.toLowerCase()) ||
        (result.ownername &&
          result.ownername.toLowerCase() === searchTerm.toLowerCase()) ||
        (result.mobilenumber &&
          result.mobilenumber.toLowerCase() === searchTerm.toLowerCase()) ||
        (result.gstnumber &&
          result.gstnumber.toLowerCase() === searchTerm.toLowerCase()) ||
        Separatekeyword.toLowerCase().includes(
          result.keyword?.toLowerCase() || ""
        ) ||
        Separatelocality.toLowerCase().includes(
          result.localityName?.toLowerCase() || ""
        ) ||
        Separatelocality.toLowerCase().includes(
          result.companyName?.toLowerCase() || ""
        )
    );

    if (matchResult) {
      let redirectionUrl = "";
      if (
        matchResult.matchedCategory &&
        matchResult.matchedCategory?.category &&
        matchResult.matchedCategory.category.toLowerCase() ===
          searchTerm.toLowerCase()
      ) {
        console.log("matchedCategory:", matchResult.matchedCategory);
        console.log("category:", matchResult.matchedCategory.category);

        redirectionUrl = `/All/Search/${matchResult.matchedCategory.category
          .replace(/\s+/g, "-")
          .toLowerCase()}/in-${localStorage.getItem(
          "cityname"
        )}?secatEncyt=${encodeURIComponent(
          encrypt(parseInt(matchResult.matchedCategory.categoryId))
        )}`;
      } else if (
        matchResult.keyword &&
        searchTerm.toLowerCase() === matchResult.keyword.toLowerCase()
      ) {
        redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(matchResult.keyword)}`;
      } else if (
        matchResult.ownername &&
        searchTerm.toLowerCase() === matchResult.ownername.toLowerCase()
      ) {
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
      } else if (
        matchResult.mobilenumber &&
        searchTerm.toLowerCase() === matchResult.mobilenumber.toLowerCase()
      ) {
        const companyName = matchResult.companyName || "unknown";
        const categoryName = matchResult.category || "general";
        redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(matchResult.mobilenumber)}`;
      } else if (
        matchResult.companyName &&
        searchTerm.toLowerCase() === matchResult.companyName.toLowerCase()
      ) {
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
      } else if (
        matchResult.gstnumber &&
        searchTerm.toLowerCase() === matchResult.gstnumber.toLowerCase()
      ) {
        const companyName = matchResult.companyName || "unknown";
        const categoryName = matchResult.category || "general";
        redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(matchResult.gstnumber)}`;
      } else if (matchResult.keyword && matchResult.localityName) {
        redirectionUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(matchResult.keyword)}`;
      } else {
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
      setTimeout(() => setShowDropdown(false), 200);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchNavigate();
    }
  };

  const handleFocus = () => {
    setShowDropdown(true);
  };

  const handleRedireNavigate = (result, selectedKeyword) => {
    const allResult = results;
    console.log("All results:", allResult);

    console.log("selectedkwyword", selectedKeyword.props.children);

    //category
    const matchedCategory = allResult.matchedCategory || {};
    console.log("Navigating", matchedCategory);

    //keyword
    const keywords = allResult.keywords || [];
    console.log("matchKeyword", keywords);

    const matchKeyword = keywords.find(
      (keyItem) => keyItem.keyword === selectedKeyword.props.children
    );
    console.log("matchKey", matchKeyword);

    //companyname
    const companyname = allResult.companyNameMatches || [];
    console.log("companyname", companyname);

    const matchCompanyName = companyname.find(
      (item) =>
        item.companyName.trim().toLowerCase() ===
        selectedKeyword.props.children.trim().toLowerCase()
    );

    //  const companyNames=companyname.map((item)=>item.companyName);
    //  console.log('Extracted company Name',companyNames);

    // const firstCompanyName=companyNames.length>0?companyNames[0]:null;
    // console.log('First company Name',firstCompanyName);

    // const matchCompanyName=firstCompanyName===selectedKeyword.props.children
    // console.log('matchCompanyName',matchCompanyName);

    console.log("matchCompanyName", matchCompanyName);

    //specilization
    const specilisation = allResult.specializationMatches || [];
    console.log("specilisation", specilisation);

    const matchSpecilisation = specilisation.find(
      (speItem) => speItem.specialization === selectedKeyword.props.children
    );
    console.log("matchSpecilisation", matchSpecilisation);

   //mobile number
    // const mobileNo=allResult.map((MobileNoItem)=>MobileNoItem.mobilenumber);
    // console.log('mobileNo',mobileNo);

    // const Mno=mobileNo[0];
    // console.log('MNO',Mno);

    // console.log('typed no',selectedKeyword.props.children);
    // const matchMobileNo=Mno===selectedKeyword.props.ch


    

    if (matchKeyword) {
      const keyName = matchKeyword.keyword;
      console.log("hii");
      console.log("keyname", keyName);
      if (keyName) {
        const targetUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(keyName)}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    } else if (matchCompanyName) {
      const CompName = matchCompanyName.companyName;
      const CompId = matchCompanyName.listingId;
      const CompCat = matchCompanyName.category;
      const CompLocality = matchCompanyName.localityName;
      const CompcategoryId = matchCompanyName.categoryId;

      console.log("compName", CompName);
      console.log("CompId", CompId);
      console.log("CompCat", CompCat);
      console.log("CompLocality", CompLocality);
      console.log("CompcategoryId", CompcategoryId);

      const targeturl = `/company/${CompName.replace(
        /\s+/g,
        "-"
      ).toLowerCase()}/${CompCat.replace(
        /\s+/g,
        "-"
      ).toLowerCase()}/${CompLocality.replace(
        /\s+/g,
        "-"
      ).toLowerCase()}/in-${localStorage.getItem(
        "cityname"
      )}?listingEncyt=${encodeURIComponent(
        encrypt(parseInt(CompId))
      )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
        encrypt(parseInt(CompcategoryId))
      )}`;

      console.log("targeturl", targeturl);
      navigate(targeturl);
    } else if (matchSpecilisation) {
      const keyName = matchSpecilisation.specialization;
      console.log("hii");
      console.log("keyname", keyName);
      if (keyName) {
        const targetUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(keyName)}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    } else if (matchedCategory) {
      // console.log('hello')
      const catName = matchedCategory.category; // Get category name
      const catId = matchedCategory.categoryId; // Get category ID
      if (catName && catId) {
        const targetUrl = `/All/Search/${catName
          .replace(/\s+/g, "-")
          .toLowerCase()}/in-${localStorage.getItem(
          "cityname"
        )}?secatEncyt=${encodeURIComponent(encrypt(parseInt(catId)))}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    } else {
      console.error("Url not found");
    }
  };

  //   const handleRedirect = (result) => {
  //     console.log('serResult', result);

  //     if (
  //       result.matchedCategory &&
  //       result.matchedCategory?.category &&
  //       result.matchedCategory.category.toLowerCase() ===
  //         searchTerm.toLowerCase()
  //     ) {
  //       console.log("matchedCategory:", result.matchedCategory);
  //       console.log("category:", result.matchedCategory.category);

  //       return  `/All/Search/${result.matchedCategory.category
  //         .replace(/\s+/g, "-")
  //         .toLowerCase()}/in-${localStorage.getItem(
  //         "cityname"
  //       )}?secatEncyt=${encodeURIComponent(
  //         encrypt(parseInt(result.matchedCategory.categoryId))
  //       )}`;
  //     }

  //     else if (result.keywords && result.keywords.length > 0) {
  //       const matchedKeyword = result.keywords.find(keyword =>
  //           keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  //       );
  //       console.log('hii')

  //       if (matchedKeyword) {

  //           // Redirect to the All/Search page for the keyword match
  //           console.log('Keyword match:', matchedKeyword.keyword);
  //           // console.log('listing',matchedKeyword.listings[0])
  //           // matchedKeyword.listings.forEach(listing=>{
  //           //   console.log('Listing:', listing);
  //           // })
  //           return `/All/Listing/in-${localStorage.getItem(
  //           "cityname"
  //         )}?searchkey=${encodeURIComponent(matchedKeyword.keyword)}`;
  //       }
  //   } else if (
  //     result.companyNameMatches &&
  //     result.companyNameMatches.length > 0
  // ) {
  //     // Redirect to company URL if companyNameMatches exists and is clicked
  //     const matchedCompany = result.companyNameMatches.find(company =>
  //         company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  // console.log('matchedCompany',matchedCompany);
  //     if (matchedCompany) {
  //         console.log("Company match:", matchedCompany.companyName);
  //         console.log("category match:", matchedCompany.category);
  //         console.log("listingId match:", matchedCompany.listingId);

  //         return `/company/${matchedCompany.companyName
  //             .replace(/\s+/g, "-")
  //             .toLowerCase()}/${matchedCompany.category
  //             .replace(/\s+/g, "-")
  //             .toLowerCase()}/locality/in-${localStorage.getItem(
  //             "cityname"
  //         )}?listingEncyt=${encodeURIComponent(
  //             encrypt(parseInt(matchedCompany.listingId))
  //         )}`;
  //     }
  // }
  //   else if (
  //         result.mobilenumber &&
  //         searchTerm.toLowerCase() === result.mobilenumber.toLowerCase()
  //     ) {
  //         console.log('mobileCompany', result.companyName);

  //         const companyName = result.companyName || "unknown";
  //         const categoryName = result.category || "general";

  //         return `/company/${companyName
  //             .replace(/\s+/g, "-")
  //             .toLowerCase()}/${categoryName
  //             .replace(/\s+/g, "-")
  //             .toLowerCase()}/locality/in-${localStorage.getItem(
  //             "cityname"
  //         )}?listingEncyt=${encodeURIComponent(
  //             encrypt(parseInt(result.listingId))
  //         )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
  //             encrypt(parseInt(result.categoryId))
  //         )}`;
  //     } else {
  //         const companyName = result.companyName || "unknown";
  //        // console.log('comp', companyName);

  //         const categoryName = result.category || "general";
  //         console.log('categoryName', categoryName);

  //         return `/company/${companyName
  //             .replace(/\s+/g, "-")
  //             .toLowerCase()}/${categoryName
  //             .replace(/\s+/g, "-")
  //             .toLowerCase()}/locality/in-${localStorage.getItem(
  //             "cityname"
  //         )}?listingEncyt=${encodeURIComponent(
  //             encrypt(parseInt(result.listingId))
  //         )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
  //             encrypt(parseInt(result.categoryId))
  //         )}`;
  //     }
  // };

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
                  onFocus={handleFocus}
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
                <>
                  {console.log("Filtered Results:", filteredResults)}
                  {console.log("Filtered Results:", typeof filteredResults)}
                  {console.log(
                    "Type of f result:",
                    Array.isArray(filteredResults) ? "Array" : "Not Array"
                  )}

                  <div className="dropdownsearchbar" ref={dropdownRef}>
                    {filteredResults.map((result, index) => {
                      console.log("InnerFilter", filteredResults);
                      const isCategory = result.category && result.categoryId;
                      const isKeywordListing =
                        result.listingId && result.companyName;
                      console.log("isCategory", isCategory);
                      console.log("isKeywordListing", isKeywordListing);
                      console.log("innerResult", result);
                      const keywordMatch = searchTerm
                        .toLowerCase()
                        .includes(result.keyword?.toLowerCase());
                      const localityMatch = searchTerm
                        .toLowerCase()
                        .includes(result.localityName?.toLowerCase());
                      const cityNameMatch = searchTerm
                        .toLowerCase()
                        .includes(result.cityName?.toLowerCase());

                      console.log(
                        "Keyword Match:",
                        keywordMatch,
                        "Locality Match:",
                        localityMatch
                      );
                      const isKeyword = typeof result === "string"; // Check if it's a keyword (string)
                      console.log("DISPLAYresult", result);
                      const displayText = isKeyword ? (
                        <span>{result}</span> // Display keyword directly
                      ) : (
                        <>
                          {result.mobilenumber &&
                          result.mobilenumber
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ? (
                            <>
                              <span>{result.companyName}</span>
                              <br />
                              <span className="serchbarTitle">
                                {result.mobilenumber}
                              </span>
                            </>
                          ) : result.gstnumber &&
                            result.gstnumber
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ? (
                            <>
                              <span>{result.companyName}</span>
                              <br />
                              <span className="serchbarTitle">
                                {result.gstnumber}
                              </span>
                            </>
                          ) : result.ownername &&
                            result.ownername
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) ? (
                            <>
                              <span>{result.companyName}</span>
                              <br />
                              <span className="serchbarTitle">
                                {result.ownername}
                              </span>
                            </>
                          ) : keywordMatch || localityMatch || cityNameMatch ? (
                            <>
                              <span>{result.companyName}</span>
                              <span>{localityMatch}</span>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      );

                      // console.log(displayText); // Log the display text

                      // let redirectionUrl = "";

                      // if (
                      //   result.matchedCategory &&
                      //   result.matchedCategory.category
                      // ) {
                      //   redirectionUrl = `/All/Search/${result.matchedCategory.category
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}/in-${localStorage.getItem(
                      //     "cityname"
                      //   )}?secatEncyt=${encodeURIComponent(
                      //     encrypt(parseInt(result.matchedCategory.categoryId))
                      //   )}`;
                      // } else if (
                      //   result.companyNameMatches &&
                      //   result.companyNameMatches.companyName
                      // ) {
                      //   console.log(
                      //     "companyname",
                      //     result.companyNameMatches &&
                      //       result.companyNameMatches.companyName
                      //   );
                      //   const companyName =
                      //     result.companyNameMatches.companyName || "unknown";
                      //   const categoryName =
                      //     result.companyNameMatches.category || "general";
                      //   redirectionUrl = `/company/${companyName
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}/${categoryName
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}/locality/in-${localStorage.getItem(
                      //     "cityname"
                      //   )}?listingEncyt=${encodeURIComponent(
                      //     encrypt(parseInt(result.companyNameMatches.listingId))
                      //   )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
                      //     encrypt(
                      //       parseInt(result.companyNameMatches.categoryId)
                      //     )
                      //   )}`;
                      // } else if (
                      //   result.mobilenumber &&
                      //   searchTerm.toLowerCase() ===
                      //     result.mobilenumber.toLowerCase()
                      // ) {
                      //   const companyName = result.companyName || "unknown";
                      //   const categoryName = result.category || "general";
                      //   redirectionUrl = `/company/${companyName
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}/${categoryName
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}/locality/in-${localStorage.getItem(
                      //     "cityname"
                      //   )}?listingEncyt=${encodeURIComponent(
                      //     encrypt(parseInt(result.listingId))
                      //   )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
                      //     encrypt(parseInt(result.categoryId))
                      //   )}`;
                      // } else {
                      //   console.log(
                      //     "companyname",
                      //     result.companyNameMatches &&
                      //       result.companyNameMatches.companyName
                      //   );

                      //   const companyName = result.companyName || "unknown";
                      //   const categoryName = result.category || "general";
                      //   redirectionUrl = `/company/${companyName
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}/${categoryName
                      //     .replace(/\s+/g, "-")
                      //     .toLowerCase()}/locality/in-${localStorage.getItem(
                      //     "cityname"
                      //   )}?listingEncyt=${encodeURIComponent(
                      //     encrypt(parseInt(result.listingId))
                      //   )}&page=${currentPage}&itemperpage=${itemsPerPage}&secondCategoryId=${encodeURIComponent(
                      //     encrypt(parseInt(result.categoryId))
                      //   )}`;
                      // }
                      // console.log("Final Redirect URL:", redirectionUrl);
                      //const redirectionUrl = handleRedirect(result);

                      return (
                        <div
                          key={index}
                          className="dropdownItemsearchbar"
                          onClick={() =>
                            handleRedireNavigate(result, displayText)
                          }
                        >
                          <h6 className="serchtitle">{displayText}</h6>
                          {/* <NavLink to={handleRedirect(result)} >
  <h6 className="serchtitle">{displayText}</h6>
</NavLink> */}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
