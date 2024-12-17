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
  const[ksResult,setKSResult]=useState([]);

  const[selectedIndex,setSelectedIndex]=useState(-1);
  const inputRef=useRef(null);
  const[highlightItem,setHightlightItem]=useState(null);
  const[tempInputValue,setTempInputValue]=useState('');

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
    setKSResult([]);
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

                const inputName=searchTerm.toLowerCase();
                // Extract owner names and prefixes
                const ownerNames = match.ownername.split(","); 
                const prefixes = match.listings[0]?.ownerPrefix.split(",") || []; 
                const lastName=match.listings[0]?.ownerLastname.split(",")||[];
                const companyname=match.listings[0]?.companyName ||[];
        
                // Combine each name with its prefix
                const combinedNames = ownerNames.map((owner, index) => {
                  const prefix = prefixes[index] || ""; 
                  const lastN=lastName[index]||'';
                  return `${prefix.trim()} ${owner.trim()} ${lastN.trim()} `.trim(); // Combine prefix and name
                })
                .filter((fullName)=>fullName.toLowerCase().includes(inputName))
                .join(',');
        
                return `${companyname} \n ${combinedNames}`; // Return combined names
              });
              console.log('owner',filteredOwnername)
        
            // Update state with combined names
            setOwnerNameResult(filteredOwnername);
          }
        }

        //keyword and specilisation with location

        if (data.hasOwnProperty("allspecializationandKeyword")) {
          if (data.allspecializationandKeyword) {
            const filteredKS =
              data.allspecializationandKeyword &&
              data.allspecializationandKeyword.length > 0
                ? data.allspecializationandKeyword
                    .map((match) => match.allspecialiazationkeyword) // Extract specializations
                    .filter(
                      (allspecialiazationkeyword) =>
                        allspecialiazationkeyword &&
                      allspecialiazationkeyword
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase()) // Match term
                    )
                : [];
            setKSResult([...filteredKS]);
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
    const ksp=results.allspecializationandKeyword||[];

    console.log("cate", cate);
    console.log("key", key);
    console.log("comp", comp);
    console.log("spe", spe);
    console.log("own", own);
    console.log('ksp',ksp)

    const uniqueResults = Array.from(
      new Set([
        ...phoneData,
        ...combinedResults,
        ...specilisationResult,
        ...ownerNameResult,
        ...ksResult,

        ...cate,
        ...key.map((keyitem) => keyitem.keyword),
        // ...comp.map((compitem) => compitem.companyName),
        ...spe.map((spitem) => spitem.specialization),
        // ...own.map((ownItem) => ownItem.ownername),
      ])
    );

    console.log("uniqueResults", uniqueResults);
    const limitResults=uniqueResults.slice(0,8);
    console.log('limitResults',limitResults);

    const companyResults=Array.from(
      new Set(
        comp.map((compitem) => compitem.companyName)
      )
    )
    console.log('companyResults',companyResults);
    

    // const LimitCompanyResult=companyResults.slice(0,2);
   
    let finalFilteredResults;

if (companyResults.length === 0) {
  // If companyResults is empty, show the first 10 results from uniqueResults
  finalFilteredResults = uniqueResults.slice(0, 10);
  console.log('finalFilteredResults (no companies)', finalFilteredResults);
} else {
  // If companyResults is not empty, combine first 8 uniqueResults with first 2 company names
  const LimitCompanyResult = companyResults.slice(0, 2);
  console.log('LimitCompanyResult', LimitCompanyResult);

  finalFilteredResults = Array.from(new Set([...limitResults, ...LimitCompanyResult]));
  console.log('finalFilteredResults (with companies)', finalFilteredResults);
}
    
    setFilteredResults(finalFilteredResults);
    // setFilteredResults(uniqueResults);
    

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
    if (typeof searchTerm === "string" && searchTerm.trim().length > 0 && filteredResults.length > 0) {
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
    setSelectedIndex(-1);

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

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleSearchNavigate();
  //   }
  // };

  const handleKeyPress=(e)=>{
    if(e.key==='ArrowDown'){
      setSelectedIndex((prevIndex) =>
        prevIndex < filteredResults.length - 1 ? prevIndex + 1 : 0
      );
    }
    else if(e.key==='ArrowUp'){
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredResults.length - 1
      );
    }
    else if(e.key==='Enter'){
      if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
        const selectedItem = filteredResults[selectedIndex];
        handleEnter(selectedItem);
console.log('Selected Item',selectedItem);

        // Update the input box correctly
        if (typeof selectedItem === 'string') {
          console.log('Original String:', selectedItem);
          const cleanedItem = selectedItem.split(' Mr')[0]?.trim(); // Extract company name before 'Mr'
          console.log('Cleaned String:', cleanedItem);
          setHightlightItem(cleanedItem);
        } else if (selectedItem.companyName && selectedItem.mobilenumber) {
          setHightlightItem(selectedItem.companyName);
        } else if(selectedItem.ownernameMatches){
          console.log('Brave');
          const ownerListing=selectedItem.ownernameMatches[0]?.listings||[];
          if(ownerListing.length>0 && ownerListing[0].companyName){
            setHightlightItem(ownerListing[0].companyName);
          }
          else{
            setHightlightItem('')
          }

        }
        else if (selectedItem.mobilenumber) {
          setHightlightItem(selectedItem.mobilenumber);
        } else {
          setHightlightItem('');
        }
        setShowDropdown(false);
      }
    }
  }

  const handleFocus = () => {
    setShowDropdown(true);
  };

  useEffect(() => {
    if (selectedIndex >= 0 && filteredResults[selectedIndex]) {
      // Update the input field to show the highlighted item
      // setHightlightItem(filteredResults[selectedIndex]);
      const selectItem=filteredResults[selectedIndex];
      if (typeof selectItem === 'string') {
        console.log('Original String:', selectItem);
        const cleanedItem = selectItem.split(' Mr')[0]?.trim(); // Extract company name before 'Mr'
        console.log('Cleaned String:', cleanedItem);
        setHightlightItem(cleanedItem);
      }
      else if(selectItem.companyName){
        setHightlightItem(selectItem.companyName)
      }
      else if(selectItem.mobilenumber){
        setHightlightItem(selectItem.mobilenumber)
      }
      else{
        setHightlightItem('');
      }
    }
  }, [selectedIndex,filteredResults]);

  const handleEnter=(result)=>{
    const allResult = results;
    console.log("All results Enter:", allResult);
    //console.log("Type of allResult Enter:", Array.isArray(allResult)); 
    console.log('HighlitedItem',highlightItem.companyName);

    // const EnterKey= highlightItem.toLowerCase();
    // console.log("EnterKey", EnterKey);

    let EnterKey='';
    if(typeof highlightItem==='string'){
      EnterKey= highlightItem.toLowerCase();
      console.log('1stEnterkey',EnterKey)
    }
    else if(highlightItem && highlightItem.companyName){
      EnterKey = highlightItem.companyName.toLowerCase();
      console.log('2stEnterkey',EnterKey)
    }
    else{
      console.error('Unhandled hightlight type',highlightItem);
    }

    //For Keyword Enter Funtionality
    const keywordsE = allResult.keywords || [];
    console.log("matchKeywordE", keywordsE);
    console.log("Type of allResult Enter:", Array.isArray(keywordsE)); 

    // const FullKeywordE=String(EnterKey);
    

    const BaseKeywordE=EnterKey.split(/\s+in\s+/)[0].trim() ||'';
    console.log('BaseKeyword',BaseKeywordE);

    const matchKeywordE = keywordsE.find(
      (keyItem) => keyItem.keyword.toLowerCase() === EnterKey
    );
    console.log("matchKeyE", matchKeywordE);

    //For Category Enter Funtionaltiy
    const matchedCategoryE = allResult.matchedCategory || {};
    console.log("Navigating", matchedCategoryE);

    //For Companyname Enter Funionality
    const companynameE = allResult.companyNameMatches || [];
    console.log("companyname", companynameE);

    const matchCompanyNameE = companynameE.find(
      (item) =>
        item.companyName.trim().toLowerCase() ===
        EnterKey
    
    );
    console.log("matchCompanyName", matchCompanyNameE);
    
    //For ownname Enter Funtionality
    const ownerNameE=allResult.ownernameMatches||[];
    console.log('ownernameE',ownerNameE);
    const fetchMatchedCompanyName = (EnterKey) => {
      // Loop through each owner in ownernameMatches
      for (const owner of ownerNameE) {
        if (owner.listings && Array.isArray(owner.listings)) {
          // Loop through each listing to match companyName dynamically with EnterKey
          const matchCompany = owner.listings.find(
            (listing) =>
              listing.companyName.trim().toLowerCase() === EnterKey.trim().toLowerCase()
          );
    
          if (matchCompany) {
            console.log("Matched Company:", matchCompany.companyName);
            return {
              ownername: owner.ownername,
              listings: owner.listings, // Return the full owner object with listings
            };
          }
        }
      }
      return null; // Return null if no match is found
    };
    // Example Usage: Pass the dynamic value of EnterKey
    
    const matchedOwnerCompanyName = fetchMatchedCompanyName(EnterKey);
    console.log('Final Matched Company:', matchedOwnerCompanyName);

    

    //For Mobile No Enter Funtionality
    const compMobArray=Array.isArray(allResult)?allResult:[];
    console.log('compMobArray',compMobArray);
    const CompanyMobile=compMobArray.find((item)=>item.companyName.trim().toLowerCase()===EnterKey)
    console.log('CompanyMobile',CompanyMobile);

    //For Specilisation Enter Funtionality
    const specilisationE = allResult.specializationMatches || [];
    console.log("specilisationE", specilisationE);
    console.log("Type of allResult Enter:", Array.isArray(specilisationE)); 

    // const FullKeywordE=String(EnterKey);
  
    const BaseSpecilisationE=EnterKey.split(/\s+in\s+/)[0].trim() ||'';
    console.log('BaseSpecilisationE',BaseSpecilisationE);

    const BasespE=BaseSpecilisationE.replace(/^\S+\s+/, "").trim();
    console.log('BasespE',BasespE);

    const matchSpecilisationE = specilisationE.find(
      (spItem) => spItem.specialization.toLowerCase() === EnterKey
    );
    console.log("matchSpecilisationE", matchSpecilisationE);

    //For Typed Keyword locality Enter funtionality
    const keywordspeE = allResult.allspecializationandKeyword || [];
    console.log("matchKeywordE", keywordspeE);

    const FullKeywordSpE=EnterKey;
    console.log('FullKeywordSpE',FullKeywordSpE);

    const BaseKeywordSpE=FullKeywordSpE.split(/\s+in\s+/)[0].trim();
    console.log('BaseKeywordSpE',BaseKeywordSpE);

    const words = BaseKeywordSpE.split(' ');
    const refindKeywordspE = words.slice(-2).join(' ').trim();
    console.log('refindKeywordspE:', refindKeywordspE);

    const matchKeywordSpE = keywordspeE.find(
      (keyItem) => keyItem.allspecialiazationkeyword.toLowerCase() ===EnterKey
    );
    console.log("matchKeySpE", matchKeywordSpE);



    if(matchKeywordE){
      const keyName = matchKeywordE.keyword;
      console.log("hii");
      console.log("keyname", keyName);
      if (keyName) {
        const targetUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(BaseKeywordE)}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    }
    else if(matchSpecilisationE){
      const keyName = matchSpecilisationE.specialization;
       console.log("hii");
       console.log("keyname", keyName);
      if (keyName) {
        const targetUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(BasespE)}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    }
    else if (matchCompanyNameE) {
      const CompName = matchCompanyNameE.companyName;
      const CompId = matchCompanyNameE.listingId;
      const CompCat = matchCompanyNameE.category;
      const CompLocality = matchCompanyNameE.localityName;
      const CompcategoryId = matchCompanyNameE.categoryId;

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
    }
    else if(CompanyMobile){
      const CompName = CompanyMobile.companyName;
      const CompId = CompanyMobile.listingId;
      const CompCat = CompanyMobile.category;
      const CompLocality = CompanyMobile.localityName;
      const CompcategoryId = CompanyMobile.categoryId;

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

    }

    else if(matchedOwnerCompanyName){
      matchedOwnerCompanyName.listings.forEach((ownerDetails)=>{
        const CompName = ownerDetails.companyName;
        const CompId = ownerDetails.listingId;
        const CompCat = ownerDetails.category;
        const CompLocality = ownerDetails.localityName;
        const CompcategoryId = ownerDetails.categoryId;
  
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
  
      })
      
    }
    else if(matchKeywordSpE){
      const keyName = matchKeywordSpE.allspecialiazationkeyword;
      // console.log("hii");
      console.log("keyname", keyName);
     if (keyName) {
       const targetUrl = `/All/Listing/in-${localStorage.getItem(
         "cityname"
       )}?searchkey=${encodeURIComponent(refindKeywordspE)}`;
       console.log("nav", targetUrl);
       navigate(targetUrl);
     }
    }
    else if (matchedCategoryE) {
      // console.log('hello')
      const catName = matchedCategoryE.category; // Get category name
      const catId = matchedCategoryE.categoryId; // Get category ID
      if (catName && catId) {
        const targetUrl = `/All/Search/${catName
          .replace(/\s+/g, "-")
          .toLowerCase()}/in-${localStorage.getItem(
          "cityname"
        )}?secatEncyt=${encodeURIComponent(encrypt(parseInt(catId)))}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    }
    else{
      console.error('Url not found')
    }
  }

  const handleRedireNavigate = (result, selectedKeyword,event) => {

    const clickedElement = event.target; // The exact element that was clicked
  const clickedText = clickedElement.textContent.trim(); // Extract text content

  console.log('clickedElement',clickedElement);
  console.log('clickedText',clickedText);

    const allResult = results;
    console.log("All results:", allResult);
    console.log("Type of allResult:", Array.isArray(allResult)); 

    console.log("selectedkwyword", selectedKeyword.props.children);

    //category
    const matchedCategory = allResult.matchedCategory || {};
    console.log("Navigating", matchedCategory);

    //keyword
    const keywords = allResult.keywords || [];
    console.log("matchKeyword", keywords);

    const FullKeyword= clickedText;
    const BaseKeyword=FullKeyword.split(/\s+in\s+/)[0].trim() ||'';
    console.log('BaseKeyword',BaseKeyword);

    const matchKeyword = keywords.find(
      (keyItem) => keyItem.keyword === BaseKeyword
    );
    console.log("matchKey", matchKeyword);
    // console.log('SelectedKEY',selectedKeyword.props.children);
    

    //companyname
    const companyname = allResult.companyNameMatches || [];
    console.log("companyname", companyname);

    const matchCompanyName = companyname.find(
      (item) =>
        item.companyName.trim().toLowerCase() ===
        clickedText.toLowerCase()
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

    const FullSpecilisation=clickedText
    console.log('FullSpecilisation',FullSpecilisation);

    const Basespecilisation=FullSpecilisation.split(/\s+in\s+/)[0].trim();
    console.log('Basespecilisation',Basespecilisation)

    const Basesp=Basespecilisation.replace(/^\S+\s+/, "").trim();
    console.log('Basesp',Basesp);

    const matchSpecilisation = specilisation.find(
      (speItem) => speItem.specialization ===clickedText
    );
    console.log("matchSpecilisation", matchSpecilisation);

   //mobile number
    //  const mobileNo=allResult.map((MobileNoItem)=>MobileNoItem.mobilenumber);
    //  console.log('mobileNo',mobileNo);

    // const Mno=mobileNo[0];
    // console.log('MNO',Mno);

    console.log('typed no',selectedKeyword.props.children);
    // const matchMobileNo=Mno===selectedKeyword.props.ch

    //ownername
    const ownerName=allResult.ownernameMatches||[];
    console.log('ownerName',ownerName);

    const SelectedOwner=String(selectedKeyword.props.children)
    console.log('Selected Owner name',SelectedOwner);

    
    const ChildrenOwner=selectedKeyword.props.children;
    console.log('ChildrenOwner',ChildrenOwner);

    const childrenOwnerArray = React.Children.toArray(ChildrenOwner);
    console.log("childrenOwnerArray", childrenOwnerArray);

       //Helper funtion
       const extractCompanyName = (childrenOwnerArray) => {
        // Target the specific index or property where the owner name is expected
        if (childrenOwnerArray[1] && childrenOwnerArray[1].props && childrenOwnerArray[1].props.children) {
          const children = childrenOwnerArray[1].props.children;
      
          if (Array.isArray(children)) {
            for (const nestedChild of children) {
              if (
                nestedChild.props &&
                nestedChild.props.className === "second-line" && // Check for specific className
                typeof nestedChild.props.children === "string"
              ) {
                return nestedChild.props.children.trim();
              }
            }
          }
        }
      
        return null; // Return null if no match is found
      };
      
  
  const extractedName = extractCompanyName(childrenOwnerArray);
  console.log("Extracted Name:", extractedName);

  const prossedOwnername=extractedName 
  ? extractedName.replace(/\(.*\)/, "").trim() 
  : "";
  console.log('prossedOwnername',prossedOwnername);

  const Pownername=prossedOwnername.replace(/Mr\s+/g, "").trim();
  console.log('Pownername',Pownername);

  const firstOwnerName=Pownername.split(' ')[0];
  console.log('firstname',firstOwnerName);



    //this spilt code when ownername first then companyname..................... 
    // const prossedOwnername=SelectedOwner.replace(/\(.*\)/, "").trim();
    // console.log('prossedOwnername',prossedOwnername);

    // const Pownername=prossedOwnername.replace(/Mr\s+/g, "").trim();
    // console.log('Pownername',Pownername);

    // const firstName=Pownername.split(' ')[0];
    // console.log('firstname',firstName);


    //this spilit code when companyname first and then ownername.............
    // const match=SelectedOwner.match(/M(r|rs)\s+(\w+)/i);
    // const firstName=match?match[2]:'';
    // console.log('Extracted owner name',firstName);

    // const matchOwnername = ownerName.find(
    //   (ownItem) => ownItem.ownername.split(',').some((name)=>name.trim()===extractCompanyName) 
    // );

    // const matchOwnername = ownerName.find((ownItem) => {
    //   const companyNames = ownItem.listings.map((listing) => listing.companyName.trim().toLowerCase());
    //   console.log('companyNamesOwner:', companyNames); // Check if this array is correct
    
    //   console.log('Extracted Name:', String(extractCompanyName).trim().toLowerCase()); // Log extracted name for debugging
    
    //   return companyNames.some((name) => name === String(extractCompanyName).trim().toLowerCase());
    //   console.log('CompName',companyNames.some((name) => name))
    // });
    
    // console.log('matchOwnername', matchOwnername); // Check the final result
    

    
    const matchOwnername = ownerName.find(
      (ownItem) => ownItem.ownername.split(',').some((name)=>name.trim()===firstOwnerName) 
    );
    console.log('matchOwnername',matchOwnername);


  
//mobile number

    const childrenObject = selectedKeyword.props.children;
    console.log('childrenObject',childrenObject);

    const childrenArray=React.Children.toArray(childrenObject);
    console.log('childrenArray',childrenArray);

    const childAtIndex2 = childrenArray[0]; 
    console.log('Child at Index 2:', childAtIndex2);
    
    let ExtractedMobileNo=null;
    
    if (
      typeof childAtIndex2 === "object" && // Ensure it's an object
      childAtIndex2.props && // Ensure it has props
      Array.isArray(childAtIndex2.props.children) && // Ensure children is an array
      typeof childAtIndex2.props.children[2] === "object" && // Ensure the third element exists and is an object
      childAtIndex2.props.children[2].props && // Ensure it has props
      typeof childAtIndex2.props.children[2].props.children === "string" // Ensure props.children is a string
  ) {
       ExtractedMobileNo = childAtIndex2.props.children[2].props.children.trim(); // Extract and trim the mobile number
      console.log("Extracted Mobile Number:", ExtractedMobileNo);
      console.log("Type of ExtractedMobileNo:", typeof ExtractedMobileNo);
  } else {
      console.log("Mobile number not found or invalid structure.");
  }

const resultsArray = Array.isArray(allResult) ? allResult : [];
console.log("Validated resultsArray:", resultsArray);

  
  let matchMobilenumber = false;
  let selectedItem=null;
  resultsArray.forEach((item) => {
    const ApiMobileNo = item?.mobilenumber || '';
    console.log('Api mobile Number:', ApiMobileNo);
    if (ApiMobileNo === ExtractedMobileNo) {
      matchMobilenumber = true;
      selectedItem=item;
    }
  });
   console.log('matchMobilenumber',matchMobilenumber);
   console.log('selectedItem',selectedItem);

//   allResult.forEach((item, index) => {
//     console.log(`Item ${index}:`, item);
//     console.log(`Comparing: ${item.mobilenumber} === ${ExtractedMobileNo}`);
// });
  // console.log('ApiMobileNo',ApiMobileNo);
  

  // console.log('mobileElement',mobileElement);

  // const SelectedMobile = mobileElement ? mobileElement.props.children.trim() : null;
  // console.log("SelectedMobile", SelectedMobile);

  //Gst number
  const childrenObjectGst = selectedKeyword.props.children;
    console.log('childrenObject',childrenObjectGst);

    const childrenArraygst=React.Children.toArray(childrenObject);
    console.log('childrenArraygst',childrenArraygst);

    const childAtIndex2gst = childrenArray[0]; 
    console.log('Child at Index 2:', childAtIndex2gst);
    
    let ExtractedGstNo=null;
    
    if (
      typeof childAtIndex2gst === "object" && // Ensure it's an object
      childAtIndex2gst.props && // Ensure it has props
      Array.isArray(childAtIndex2gst.props.children) && // Ensure children is an array
      typeof childAtIndex2gst.props.children[2] === "object" && // Ensure the third element exists and is an object
      childAtIndex2gst.props.children[2].props && // Ensure it has props
      typeof childAtIndex2gst.props.children[2].props.children === "string" // Ensure props.children is a string
  ) {
       ExtractedGstNo = childAtIndex2gst.props.children[2].props.children.trim(); // Extract and trim the mobile number
      console.log("Extracted Gst Number:", ExtractedGstNo);
      console.log("Type of Extracted gst:", typeof ExtractedGstNo);
  } else {
      console.log("Mobile number not found or invalid structure.");
  }

  
  const ApiGstNo = allResult?.[0]?.gstnumber || '';

   console.log('Api gst Number',ApiGstNo);
   const matchGstnumber=ApiGstNo===ExtractedGstNo;
   console.log('matchGstnumber',matchGstnumber);

   //keyword and location

    const keywordspe = allResult.allspecializationandKeyword || [];
    console.log("matchKeyword", keywordspe);

    const FullKeywordSp=clickedText

    const BaseKeywordSp=FullKeywordSp.split(/\s+in\s+/)[0].trim();
    console.log('BaseKeywordSp',BaseKeywordSp);

    const words = BaseKeywordSp.split(' ');
    const refindKeywordsp = words.slice(-2).join(' ').trim();
    console.log('refindKeywordsp:', refindKeywordsp);

    const matchKeywordSp = keywordspe.find(
      (keyItem) => keyItem.allspecialiazationkeyword ===clickedText
    );
    console.log("matchKeySp", matchKeywordSp);

    //specilisation,keyword,location

    // const specilisationkeyloc = allResult.allspecializationandKeyword || [];
    // console.log("specilisationkeyloc", specilisationkeyloc);

    // console.log('Selected SKL',selectedKeyword.props.children)
    // const FullSpecilisationlocation=String(selectedKeyword.props.children);
    // console.log('FullSpecilisationlocation',FullSpecilisationlocation);

    // const Basespecilisationlocation = FullSpecilisationlocation.split('in')[0].trim();
    // console.log('Basespecilisationlocation',Basespecilisationlocation)

    // const Basesplocation=Basespecilisationlocation.replace(/^\S+\s+/, "").trim();
    // console.log('Basesplocation',Basesplocation);

    // const matchSpecilisationlocation = specilisationkeyloc.find(
    //   (speItem) => speItem.allspecialiazationkeyword ===String(selectedKeyword.props.children)
    // );
    // console.log("matchSpecilisation", matchSpecilisationlocation);

    

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
      console.log('base',Basesp)
      if (keyName) {
        const targetUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(Basesp)}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    } 
    else if(matchOwnername){
      matchOwnername.listings.forEach((OwnerCompany)=>{
        const CompName = OwnerCompany.companyName;
        const CompId = OwnerCompany.listingId;
        const CompCat = OwnerCompany.category;
        const CompLocality = OwnerCompany.localityName;
        const CompcategoryId = OwnerCompany.categoryId;
  
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
  
      
      })
      
      
    }
    else if(matchMobilenumber && selectedItem){

      // const mobile=Array.isArray(allResult)&& allResult.length>0?allResult.find((item)=>item.mobilenumber||''):null;
      // if(mobile){
      const CompName = selectedItem.companyName;
      const CompId = selectedItem.listingId;
      const CompCat = selectedItem.category;
      const CompLocality = selectedItem.localityName;
      const CompcategoryId = selectedItem.categoryId;

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

      

      
    }
    else if(matchGstnumber){

      const gstnumber=Array.isArray(allResult)&& allResult.length>0?allResult[0]:null;
      if(gstnumber){
        const CompName = gstnumber.companyName;
      const CompId = gstnumber.listingId;
      const CompCat = gstnumber.category;
      const CompLocality = gstnumber.localityName;
      const CompcategoryId = gstnumber.categoryId;

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

      }

      
    }
    else if (matchKeywordSp) {
      const keyName = matchKeywordSp.allspecialiazationkeyword;
      console.log("hii");
      console.log("keyname", keyName);
      console.log('refindKeywordsp',refindKeywordsp)
      if (keyName) {
        const targetUrl = `/All/Listing/in-${localStorage.getItem(
          "cityname"
        )}?searchkey=${encodeURIComponent(refindKeywordsp)}`;
        console.log("nav", targetUrl);
        navigate(targetUrl);
      }
    } 
    else if (matchedCategory) {
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
                  value={highlightItem||searchTerm}
                  onChange={handleSearch}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onKeyDown={(e) => handleKeyPress(e)}
                />
                <button
                  type="submit"
                  className="searchButton"
                  onClick={handleEnter}
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
                      const keywordMatch = String(searchTerm)
                        .toLowerCase()
                        .includes(result.keyword?.toLowerCase());
                      const localityMatch =String(searchTerm)
                        .toLowerCase()
                        .includes(result.localityName?.toLowerCase());
                      const cityNameMatch = String(searchTerm)
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
                        <span>
                          {result.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                              <span
                                className={index === 1 ? "second-line" : ""}
                              >
                                {line}
                              </span>
                              <br />
                            </React.Fragment>
                          ))}
                        </span>
 // Display keyword directly
                      ) : (
                        <>
                          {result.mobilenumber &&
                          result.mobilenumber
                            .toLowerCase()
                            .includes(String(searchTerm).toLowerCase()) ? (
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
                              .includes(String(searchTerm).toLowerCase()) ? (
                            <>
                              <span>{result.companyName}</span>
                              <br />
                              <span className="serchbarTitle">
                                {result.gstnumber}
                              </span>
                            </>
                          )  : keywordMatch || localityMatch || cityNameMatch ? (
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
                          className={`dropdownItemsearchbar ${index===selectedIndex?'highlighted':''}`}
                          onClick={(event) =>
                            handleRedireNavigate(result, displayText,event)
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


