import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";

function Keywordl() {
  const [keyword, setKeyword] = useState(""); // State to hold current keyword input
  const [addedKeywords, setAddedKeywords] = useState([]); // State to hold added keywords
  const [selectedKeywords, setSelectedKeywords] = useState([]);

  useEffect(() => {
    fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Action: "fetch", // Specify the action needed (fetch, add, remove, etc.)
        Keyword: "" // Adjust as needed based on API requirements
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Assuming your API returns an array of keywords directly in the response data
      const fetchedKeywords = data.keywords.map(keyword => keyword.seoKeyword);
      setSelectedKeywords(fetchedKeywords); // Set previously selected keywords
    })
    .catch(error => {
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "add",
          keyword: keyword
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log("Response status:", response.status); // Debugging: log response status
        
        // Assuming the response is not JSON but a simple success message
        console.log("Keyword added successfully");
        setAddedKeywords([...addedKeywords, keyword]);
        setKeyword(""); // Clear the input field after adding
      })
      .catch(error => {
        console.error("Error adding keyword:", error);
        // Handle error appropriately
      });
    }
  };
  
  
  // Function to handle removing a keyword
  const removeKeyword = (keywordToRemove) => {
    fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "remove",
        keyword: keywordToRemove
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log("Keyword removed:", keywordToRemove);

  
      // Update addedKeywords state by filtering out the removed keyword
      const updatedKeywords = addedKeywords.filter(kw => kw !== keywordToRemove);
      setAddedKeywords(updatedKeywords);
    })
    .catch(error => {
      console.error("Error removing keyword:", error);
      // Handle error if needed
    });
  };
  
  // Function to handle saving added keywords
  const saveKeywords = () => {
    fetch("https://apidev.myinteriormart.com/api/Keywords/ManageKeywords", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "save",
        keyword: "" // Assuming this saves all added keywords in one go
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Keywords saved successfully:", data);
      // Reset added keywords state after saving if needed
      setAddedKeywords([]);
    })
    .catch(error => {
      console.error("Error saving keywords:", error);
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
                  <Link className="back_btn mx-3" to="/addcompanyl">
                    Back
                  </Link>
                </span>
              </p>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="name">Keywords </label>
                  <div className="input-group">
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Enter Keyword"
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={addKeyword}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                {/* Display added keywords */}
                <div className="col-md-6">
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
                </div>
                <br></br>
                <div className="form-group col-md-12" style={{ marginBottom: '15px' }}>
      <label>Selected Keywords:</label>
      <div>
        {selectedKeywords.map((kw, index) => (
          <span key={index} style={{ display: 'inline-block', backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '5px 10px', marginRight: '5px' }}>
            {kw}
            <button style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', marginLeft: '5px' }} onClick={() => removeKeyword(kw)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </span>
        ))}
        {addedKeywords.map((kw, index) => (
          <span key={index} style={{ display: 'inline-block', backgroundColor: '#f0f0f0', border: '1px solid #ccc', padding: '5px 10px', marginRight: '5px' }}>
            {kw}
            <button style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', marginLeft: '5px' }} onClick={() => removeKeyword(kw)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </span>
        ))}
      </div>
    </div>
                <div className="text-left col-12 mt-3">
                  <Link to="/addressl" className="btn_1" onClick={saveKeywords}>
                    Save & Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Keywordl;
