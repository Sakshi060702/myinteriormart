import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Businesslisting/Businesslisting.css";
import "../../../FrontEnd/css/Mangelisting.css";
import nextarrowimg from "../../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../../FrontEnd/img/Backarrow.png";
import { useSelector } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh";
import Popupalert from "../../Popupalert";
import Select from "react-select";
import useAuthCheck from "../../../Hooks/useAuthCheck";

function Addseokeyword() {
  const [keyword, setKeyword] = useState(""); // State to hold current keyword input
  const [addedKeywords, setAddedKeywords] = useState([]); // State to hold added keywords
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [businessTypes, setBusinessTypes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [allOptions, setAllOptions] = useState([]);

  const isAuthenticated=useAuthCheck();

  const [formData, setFormData] = useState({
    businessCategory: "",
  });

  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

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
        console.error("API error:", error);
        alert("Failed to fetch business types. Please try again later.");
      }
    };

    if(isAuthenticated){ fetchBusinessTypes();}
   
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
    console.log(selectedOption);
    console.log(keyword);
    console.log(formData);
    console.log(businessTypes,allOptions)
    setFormData((prevFormData) => ({
      ...prevFormData,
      businessCategory: selectedOption ? selectedOption.value : "",
    }));

    console.log(businessTypes.indexOf(selectedOption.value) > -1); //true
    console.log(selectedOption.value in businessTypes);
    if(businessTypes.indexOf(selectedOption.value) > -1){
      
      console.log("IF BRAVIII");

      setErrorMessage("Keyword Alredy Exist.");
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }else{
      console.log("HERE ELSE BRAVIII");
      setKeyword(selectedOption.value);

      // setErrorMessage("Selected business category is not valid. Adding new keyword.");
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
        Authorization: `Bearer ${token}`,
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
        console.error("Error fetching keywords:", error);
        // Handle error appropriately
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to handle adding a keyword
  const addKeyword = () => {
    if (keyword.trim() !== "") {
      fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
              console.log("Keyword added successfully");
              setAddedKeywords([...addedKeywords, keyword]);
              setKeyword("");
              setErrorMessage("");
            }
          } else if (data.success) {
            console.log("Keyword added successfully");
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
          console.error("Error adding keyword:", error);
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
        Authorization: `Bearer ${token}`,
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
        console.log(data);
        console.log("Keyword removed:", keywordToRemove);

        // Update addedKeywords state by filtering out the removed keyword
        const updatedKeywords = addedKeywords.filter(
          (kw) => kw !== keywordToRemove
        );
        setAddedKeywords(updatedKeywords);

        const updatedSelectedKeywords = selectedKeywords.filter(
          (kw) => kw !== keywordToRemove
        );
        setSelectedKeywords(updatedSelectedKeywords);
      })
      .catch((error) => {
        console.error("Error removing keyword:", error);
        // Handle error if needed
      });
  };

  // Function to handle saving added keywords
  const saveKeywords = () => {
    fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "save",
        keyword: "", // Assuming this saves all added keywords in one go
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Keywords saved successfully:", data);
        console.log("Keyword token", token);

        setSelectedKeywords([...selectedKeywords, ...addedKeywords]);
        // Reset added keywords state after saving if needed
        setAddedKeywords([]);

        setSuccessMessage("Keyword Uploded  Successfully");
        setErrorMessage("");
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error saving keywords:", error);
        setErrorMessage("Failed Add Keyword Details. Please try again later.");
        setSuccessMessage(""); // Clear any existing success message
        setShowPopup(true);
        // Handle error if needed
      });
  };

  return (
    <>
      <div>
        <div>
          <div>
            <div>
              <h4>Keywords</h4>
              <p className="add-lidting-title-from">Add Listing / Keywords</p>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Keywords </label>
                  <div className="input-group">
                    <Select
                      options={filteredOptions}
                      onInputChange={(keyword) => setInputValue(keyword)}
                      onChange={handleSelectChange} // Handle the select change
                      placeholder="Enter keyword "
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
                        style={{ marginLeft: "10px" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {showPopup && (
                    <div
                      className="popup"
                      style={{ textAlign: "center", fontSize: "18px" }}
                    >
                      {errorMessage}
                    </div>
                  )}
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
                      <span key={index} className="keyword-badge">
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
                      <span key={index} className="keyword-badge">
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
                  <button
                    className="btn_1"
                    onClick={saveKeywords}
                    style={{ marginRight: "50px" }}
                  >
                    Save & Continue
                  </button>
                  <Link to="/Addsociallink" className="pull-right mr-2">
                    <img src={previousarrowimg} style={{ height: "30px" }} />
                  </Link>
                </div>
              </div>
            </div>
            {showPopup && (
              <Popupalert
                message={successMessage || errorMessage}
                type={successMessage ? "success" : "error"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthh(Addseokeyword);
