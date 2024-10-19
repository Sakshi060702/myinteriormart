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
    }
 catch (error) {
    console.error("Error in fetching search results", error);
  }
}
    else if(searchTerm){

        //New api to search based on keyword and near by
        const searchPattern = /(near by|near me|near|at|in)/i;
        const match = searchTerm.match(searchPattern);
        if (match) {
          const location = searchTerm.split(match[0])[1].trim();
          const query = searchTerm.split(match[0])[0].trim();

          const [locality, city] = location.split(",").map((s) => s.trim());

          setNearByLocation(locality || " ");
          setNearCity(city || locality);
          setKewywordQuery(query);

          const KeywordResponse = await fetch(
            `https://apidev.myinteriormart.com/api/KeywordFromCompanySearch/SearchCompany?searchQuery=${query} near by ${location}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const newApiData = await KeywordResponse.json();
          setResults((prevResults) => [...prevResults, ...newApiData]);
          console.log("newApiData", newApiData);
        }
    }
    else if(searchTerm){
        //Free seach api Implementation
        const lowercaseSearchParameter = searchTerm.toLowerCase();
        let paramName;

        const validMobileNumber = /^\d{10}$/.test(searchTerm);
        const validGST =
          /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/i.test(
            searchTerm
          );
        //  const validOwnerName= /^[a-zA-Z\s]{3,}$/.test(searchTerm);

        // Define specific keywords for free search based on parameter names
        if (lowercaseSearchParameter.includes("gstnumber") || validGST) {
          paramName = "gstNumber";
        } else if (
          lowercaseSearchParameter.includes("mobilenumber") ||
          validMobileNumber
        ) {
          paramName = "mobileNumber";
        } else if (lowercaseSearchParameter.includes("ownername")) {
          paramName = "ownerName";
        } else if (lowercaseSearchParameter.includes("address")) {
          paramName = "address";
        }

        // Only execute the third API if a matching parameter name is found
        if (paramName) {
          console.log("Using search parameter:", paramName);
          setParameterName(paramName);

          const freeSearchResponse = await fetch(
            `https://apidev.myinteriormart.com/api/FreeSearch/FreeSearch?${paramName}=${encodeURIComponent(
              searchTerm
            )}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const freeresponse = await freeSearchResponse.json();
          setResults((prevResults) => [...prevResults, ...freeresponse]);
          console.log("freeSearchData", freeresponse);
        }
    }else{
        setResults([]);
      setShowDropdown(false);
    }
      
    
  };