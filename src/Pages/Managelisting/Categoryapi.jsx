import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Categoryapi() {
  const [firstCategories, setFirstCategories] = useState([]);
  const [secondCategories, setSecondCategories] = useState([]);
  const [thirdCategories, setThirdCategories] = useState([]);
  const [fourthCategories, setFourthCategories] = useState([]);
  const [fifthCategories, setFifthCategories] = useState([]);
  const [sixthCategories, setSixthCategories] = useState([]);
  const [selectedFirstCategory, setSelectedFirstCategory] = useState("");
  const [selectedSecondCategory, setSelectedSecondCategory] = useState("");
  const [selectedThirdCategory, setSelectedThirdCategory] = useState("");
  const [selectedFourthCategory, setSelectedFourthCategory] = useState("");
  const [selectedFifthCategory, setSelectedFifthCategory] = useState("");
  const [selectedSixthCategory, setSelectedSixthCategory] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/CategoryAllFromDropdown/GetAllCategoriesfromFirstandSecond",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              FirstCategoryID: setSelectedFirstCategory, // Replace with your desired ID
              SecondCategoryID: setSelectedSecondCategory, // Replace with your desired ID
              ThirdCategoryID: "",
              FourthCategoryID: "",
              FifthCategoryID: "",
              SixthCategoryID: "",
            }),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const { allCategories } = data;

        if (allCategories && allCategories.length > 0) {
          setFirstCategories(allCategories);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run effect only once

  const handleFirstCategoryChange = (e) => {
    const selectedFirstCategoryID = e.target.value;
    setSelectedFirstCategory(selectedFirstCategoryID); // Update state
    const selectedFirstCategory = firstCategories.find(
      (category) =>
        category.firstCategoryID === parseInt(selectedFirstCategoryID)
    );
    if (selectedFirstCategory) {
      setSecondCategories(selectedFirstCategory.secondCategories); // Update second categories
      setSelectedSecondCategory(""); // Clear second category selection
      setThirdCategories([]);
      setFourthCategories([]);
      setFifthCategories([]);
      setSixthCategories([]);
    }
  };

  const handleSecondCategoryChange = (e) => {
    const selectedSecondCategoryID = e.target.value;
    setSelectedSecondCategory(selectedSecondCategoryID); // Update state
    const selectedSecondCategory = secondCategories.find(
      (category) =>
        category.secondCategoryId === parseInt(selectedSecondCategoryID)
    );
    if (selectedSecondCategory) {
      setThirdCategories(selectedSecondCategory.thirdCategories || []); // Update third categories
      setFourthCategories(selectedSecondCategory.fourthCategories || []);
      setFifthCategories(selectedSecondCategory.fifthCategories || []);
      setSixthCategories(selectedSecondCategory.sixthCategories || []);
    }
  };

  const handleCheckboxChange = (
    e,
    setSelectedCategories,
    selectedCategories
  ) => {
    const value = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const thirdCategoryIDs =
      selectedThirdCategory.length > 0 ? selectedThirdCategory.join(",") : "";
    const fourthCategoryIDs =
      selectedFourthCategory.length > 0 ? selectedFourthCategory.join(",") : "";
    const fifthCategoryIDs =
      selectedFifthCategory.length > 0 ? selectedFifthCategory.join(",") : "";
    const sixthCategoryIDs =
      selectedSixthCategory.length > 0 ? selectedSixthCategory.join(",") : "";

    console.log("Third Category IDs:", thirdCategoryIDs);
    console.log("Fourth Category IDs:", fourthCategoryIDs);
    console.log("Fifth Category IDs:", fifthCategoryIDs);
    console.log("Sixth Category IDs:", sixthCategoryIDs);

    const selectedData = {
      FirstCategoryID: selectedFirstCategory,
      SecondCategoryID: selectedSecondCategory,
      ThirdCategoryID: thirdCategoryIDs,
      FourthCategoryID: fourthCategoryIDs,
      FifthCategoryID: fifthCategoryIDs,
      SixthCategoryID: sixthCategoryIDs,
    };

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/CategoryAllFromDropdown/GetAllCategoriesfromFirstandSecond",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedData),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data saved successfully:", data);
      alert("Data saved successfully");
      navigate("/specialisationl"); // Redirect to the next page
    } catch (error) {
      console.error("Error saving categories:", error);
    }
  };

  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Add Category Details</h4>
              <p className="add-lidting-title-from">
                Add Listing / Add Category Details
                <span>
                  <Link className="back_btn mx-3" to="/communicationl">
                    Back
                  </Link>
                </span>
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="fcategory">First Category </label>
                    <br></br>
                    <select
                      className="wide add_bottom_10 fcategory selectdrp"
                      value={selectedFirstCategory}
                      onChange={handleFirstCategoryChange}
                    >
                      <option value="">Select First Category</option>
                      {firstCategories.map((category) => (
                        <option
                          key={category.firstCategoryID}
                          value={category.firstCategoryID}
                        >
                          {category.firstCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="scategory">Second Category </label>
                    <br></br>
                    <select
                      className="wide add_bottom_10 scategory selectdrp"
                      value={selectedSecondCategory}
                      onChange={handleSecondCategoryChange}
                    >
                      <option value="">Select Second Category</option>
                      {secondCategories.map((category) => (
                        <option
                          key={category.secondCategoryId}
                          value={category.secondCategoryId}
                        >
                          {category.secondCategoryName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 add_bottom_15">
                    <button
                      className="btn btn-primary"
                      style={{ backgroundColor: "#fb830d" }}
                    >
                      Select All
                    </button>
                  </div>
                </div>

                <div className="row">
                  {thirdCategories.length > 0 &&
                    thirdCategories.map((category) => (
                      <div className="col-md-3" key={category.thirdCategoryId}>
                        <div className="clearfix add_bottom_15">
                          <div className="checkboxes float-left">
                            <label
                              htmlFor={`thirdCategory-${category.thirdCategoryId}`}
                            >
                              <input
                                type="checkbox"
                                id={`thirdCategory-${category.thirdCategoryId}`}
                                value={category.thirdCategoryId}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    e,
                                    setSelectedThirdCategory,
                                    selectedThirdCategory
                                  )
                                }
                              />
                              {category.thirdCategoryName}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row">
                  {fourthCategories.length > 0 &&
                    fourthCategories.map((category) => (
                      <div className="col-md-3" key={category.fourthCategoryId}>
                        <div className="clearfix add_bottom_15">
                          <div className="checkboxes float-left">
                            <label
                              htmlFor={`fourthCategory-${category.fourthCategoryId}`}
                            >
                              <input
                                type="checkbox"
                                id={`fourthCategory-${category.fourthCategoryId}`}
                                value={category.fourthCategoryId}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    e,
                                    setSelectedFourthCategory,
                                    selectedFourthCategory
                                  )
                                }
                              />
                              {category.fourthCategoryName}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="row">
                  {fifthCategories.length > 0 &&
                    fifthCategories.map((category) => (
                      <div className="col-md-3" key={category.fifthCategoryId}>
                        <div className="clearfix add_bottom_15">
                          <div className="checkboxes float-left">
                            <label
                              htmlFor={`fifthCategory-${category.fifthCategoryId}`}
                            >
                              <input
                                type="checkbox"
                                id={`fifthCategory-${category.fifthCategoryId}`}
                                value={category.fifthCategoryId}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    e,
                                    setSelectedFifthCategory,
                                    selectedFifthCategory
                                  )
                                }
                              />
                              {category.fifthCategoryName}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="row">
                  {sixthCategories.length > 0 &&
                    sixthCategories.map((category) => (
                      <div className="col-md-3" key={category.sixthCategoryId}>
                        <div className="clearfix add_bottom_15">
                          <div className="checkboxes float-left">
                            <label
                              htmlFor={`sixthCategory-${category.sixthCategoryId}`}
                            >
                              <input
                                type="checkbox"
                                id={`sixthCategory-${category.sixthCategoryId}`}
                                value={category.sixthCategoryId}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    e,
                                    setSelectedSixthCategory,
                                    selectedSixthCategory
                                  )
                                }
                              />
                              {category.sixthCategoryName}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="text-left col-12 mt-3">
                  <button type="submit" className="btn_1">
                    Save & Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categoryapi;
