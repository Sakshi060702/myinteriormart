import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Freelisting/Businesslisting/Businesslisting.css";
import "../../FrontEnd/css/Mangelisting.css";
import nextarrowimg from "../../FrontEnd/img/arrow-next.png";
import previousarrowimg from "../../FrontEnd/img/arrow-previous.png";
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"

function Keywordl() {
  const [keyword, setKeyword] = useState(""); // State to hold current keyword input
  const [addedKeywords, setAddedKeywords] = useState([]); // State to hold added keywords
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const token=useSelector((state)=>state.auth.token);

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
        console.log(data);
        console.log("Keyword removed:", keywordToRemove);

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
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        action: "save",
        keyword: "", // Assuming this saves all added keywords in one go
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Keywords saved successfully:", data);
        console.log("Keyword token",token);
        alert("Keywords saved successfully!");
        setSelectedKeywords([...selectedKeywords, ...addedKeywords]);
        // Reset added keywords state after saving if needed
        setAddedKeywords([]);
      })
      .catch((error) => {
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
                  <Link className="back_btn mx-3" to="/labournakapage">
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
                  {showPopup && (
                    <div className="popup" style={{textAlign:'center',fontSize:'18px'}}>
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
                  <Link to="/Sociallinkl" className="pull-right mr-2"><img src={previousarrowimg} style={{height:'30px'}}/></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withAuthh(Keywordl);
