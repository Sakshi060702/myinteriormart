import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";
import "../../FrontEnd/css/Mangelisting.css";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Select from "react-select"; 
import Popupalert from "../Popupalert";

function Keywordl() {
  const [keyword, setKeyword] = useState(""); // State to hold current keyword input
  const [addedKeywords, setAddedKeywords] = useState([]); // State to hold added keywords
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [businessTypes, setBusinessTypes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allOptions, setAllOptions] = useState([]);

  const [error, setError] = useState("");

  
  const[successMessage,setSuccessMessage]=useState("");

  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    businessCategory: "",
  });

  const token=useSelector((state)=>state.auth.token);

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      const apiUrl =
        "https://apidev.myinteriormart.com/api/CompanyDetails/GetBussinessCategorys";

      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("API response error data:", errorData);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        const fetchedBusinessTypes = responseData.bussinessCategory;
        const fetchedOptions = fetchedBusinessTypes.map((type) => ({
          value: type,
          label: type,
        }));
        setBusinessTypes(fetchedBusinessTypes);
        setAllOptions(fetchedOptions); // Set the options for the Select component
      } catch (error) {
        // console.error("API error:", error);
        // alert("Failed to fetch business types. Please try again later.");
      }
    };

    fetchBusinessTypes();
  }, [token]);

  const filteredOptions = allOptions.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleAddNewOption = () => {
    if (
      inputValue &&
      !allOptions.some(
        (option) => option.label.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      const newOption = { label: inputValue, value: inputValue };
      setAllOptions((prevOptions) => [...prevOptions, newOption]);
      setInputValue(""); // Clear the input after adding
    }
  };

  const handleSelectChange = (selectedOption) => {
    // console.log(selectedOption);
    // console.log(keyword);
    // console.log(formData);
    // console.log(businessTypes,allOptions)

  // if (selectedKeywords.length >= 10) {
  //     setError("You can only add up to 10 keywords.");
  //     return;
  //   }


    setFormData((prevFormData) => ({
      ...prevFormData,
      businessCategory: selectedOption ? selectedOption.value : "",
    }));

    // console.log(businessTypes.indexOf(selectedOption.value) > -1); //true
    // console.log(selectedOption.value in businessTypes);
    if(businessTypes.indexOf(selectedOption.value) > -1){
      

      setErrorMessage("Keyword Alredy Exist.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }else{
      setKeyword(selectedOption.value);

      // setErrorMessage("Keyword Added Successfully.");
      // setShowPopup(true);
      // setTimeout(() => setShowPopup(false), 2000);
    }
    // setKeyword(selectedOption.value);
  };



  useEffect(() => {
    fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        Action: "fetch", // Specify the action needed (fetch, add, remove, etc.)
        Keyword: "", // Adjust as needed based on API requirements
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Assuming your API returns an array of keywords directly in the response data
        const fetchedKeywords = data.keywords.map(
          (keyword) => keyword.seoKeyword
        );
        setSelectedKeywords(fetchedKeywords); // Set previously selected keywords
      })
      .catch((error) => {
        // console.error("Error fetching keywords:", error);
        // Handle error appropriately
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to handle adding a keyword
  const addKeyword = () => {

   if ((selectedKeywords.length + addedKeywords.length) > 9) {
      setError("You can only add up to 10 keywords.");
      setErrorMessage("You can only add up to 10 keywords");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 2000);
      return;
    }

    // console.log("BRAVOOO");
    // console.log(addedKeywords);
    // console.log(selectedKeywords);
    // console.log(selectedKeywords.length + addedKeywords.length);
    if (keyword.trim() !== "") {
      fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          action: "add",
          keyword: keyword,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text();
          }
        })
        .then((data) => {
          if (typeof data === "string") {
            if (data.includes("Keyword already exists")) {
              setErrorMessage("Keyword already exists");
              setShowPopup(true);
              setTimeout(() => setShowPopup(false), 4000);
            } else {
              // console.log("Keyword added successfully");
              setAddedKeywords([...addedKeywords, keyword]);
              setKeyword("");
              setErrorMessage("");
             
            }
          } else if (data.success) {
            // console.log("Keyword added successfully");
            setAddedKeywords([...addedKeywords, keyword]);
            setKeyword("");
            setErrorMessage("");
          } else {
            setErrorMessage(data.message || "Keyword already exists");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 4000);
          }
        })
        .catch((error) => {
          // console.error("Error adding keyword:", error);
          setErrorMessage("Keyword already exists");
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 4000);
        });
    }
  };

  // Function to handle removing a keyword
  const removeKeyword = (keywordToRemove) => {
    fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "remove",
        keyword: keywordToRemove,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        // console.log(data);
        // console.log("Keyword removed:", keywordToRemove);

        // Update addedKeywords state by filtering out the removed keyword
        const updatedKeywords = addedKeywords.filter(
          (kw) => kw !== keywordToRemove
        );
        setAddedKeywords(updatedKeywords);

        const updatedSelectedKeywords=selectedKeywords.filter(
          (kw)=>kw!==keywordToRemove
        );
        setSelectedKeywords(updatedSelectedKeywords);
      })
      .catch((error) => {
        // console.error("Error removing keyword:", error);
      
      });
  };

  // Function to handle saving added keywords
  const saveKeywords = () => {
    fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "save",
        keyword: "", // Assuming this saves all added keywords in one go
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Keywords saved successfully:", data);
        // console.log("Keyword token",token);
        setSuccessMessage("Seo Keyword Details Saved Successfully");
        setErrorMessage("");
        setShowPopup(true);
  
        setTimeout(() => {
        setShowPopup(false);
         navigate("/");
      }, 2000);
        setSelectedKeywords([...selectedKeywords, ...addedKeywords]);
        // Reset added keywords state after saving if needed
        setAddedKeywords([]);
      })
      .catch((error) => {
        console.error("Error saving keywords:", error);
        setErrorMessage("Failed to save Seo Keyword details. Please try again later.");
        setSuccessMessage(""); // Clear any existing success message
        setTimeout(()=>{
          setShowPopup(true);

        },2000)
       
        // Handle error if needed
      });
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Keywords</h4>
              <p className="add-lidting-title-from">
                Add Listing / Keywords
                <span>
                  <Link className="back_btn mx-3" to="/labournakapage">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Keywords <span className="text-danger">*</span></label>
                  <div className="input-group">
                  <Select
                      options={filteredOptions}
                      onInputChange={(keyword) => setInputValue(keyword)}
                      onChange={handleSelectChange} // Handle the select change
                      placeholder="Enter keyword "
                      required
                      noOptionsMessage={() => (
                        <div
                          onClick={handleAddNewOption}
                          style={{ cursor: "pointer", color: "blue" }}
                        >
                          {inputValue ? ` ${inputValue}` : "Type to search"}
                        </div>
                      )}
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          width: "250px",
                          height: "50px",
                        }),
                      }}
                      value={allOptions.find(
                        (option) => option.value === formData.businessCategory
                      )} // Set the selected value
                    />
                    <div className="input-group-append">
                      <button
                        className=" plus-button"
                        type="button"
                        onClick={addKeyword}
                        style={{marginLeft:"10px",
                          
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* {showPopup && (
                    <div className="popup" style={{textAlign:'center',fontSize:'18px'}}>
                      {errorMessage}
                    </div>
                  )} */}
                </div>
                {/* Display added keywords */}
                {/* <div className="col-md-6">
                  <label>Added Keywords:</label>
                  <ul>
                    {addedKeywords.map((kw, index) => (
                      <li key={index}>
                        {kw}
                        <button
                          className="btn btn-sm btn-danger ml-2"
                          onClick={() => removeKeyword(kw)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div> */}
                <br></br>
                <div
                  className="form-group col-md-12"
                  style={{ marginBottom: "15px" }}
                >
                  <label>Selected Keywords:</label>
                  <div>
                    {selectedKeywords.map((kw, index) => (
                      <span
                        key={index}
                        className="keyword-badge"
                      >
                        {kw}
                        <button
                          className="keyword-remove-btn"
                          onClick={() => removeKeyword(kw)}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                      </span>
                    ))}
                    {addedKeywords.map((kw, index) => (
                      <span
                        key={index}
                        className="keyword-badge"
                      >
                        {kw}
                        <button
                          className="keyword-remove-btn"
                          onClick={() => removeKeyword(kw)}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                      </span>
                    ))}
                  </div>
</div>
                <div className="text-left col-12 mt-3">
                  <button className="btn_1" onClick={saveKeywords}>
                    Save & Continue
                  </button>
                  <Link to="/Sociallinkl" className="pull-center mr-2"><img src={previousarrowimg} style={{height:'30px',marginRight:'25px'}}/></Link>
                </div>
              </div>

              {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
          />
          )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthh(Keywordl);
