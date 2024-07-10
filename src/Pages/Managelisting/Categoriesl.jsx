import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const apiUrl =
  "https://apidev.myinteriormart.com/api/CategoryAllFromDropdown/GetAllCategoriesfromFirstandSecond";

function Categoriesl() {
  const [categories, setCategories] = useState([]);
  const [firstCategory, setFirstCategory] = useState("");
  const [secondCategories, setSecondCategories] = useState([]);
  const [secondCategory, setSecondCategory] = useState("");
  const [thirdCategories, setThirdCategories] = useState([]);
  const [fourthCategories, setFourthCategories] = useState([]);
  const [fifthCategories, setFifthCategories] = useState([]);
  const [sixthCategories, setSixthCategories] = useState([]);

  const navigate = useNavigate();

  const fetchData = (type, parentID = null) => {
    const body = { type, parentID };

    return fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(`Data fetched for ${type}:`, data);
        return data;
      })
      .catch((error) => {
        console.error(`Error fetching ${type}:`, error);
        return null;
      });
  };

  useEffect(() => {
    fetchData("firstCategory").then((data) => {
      if (data) setCategories(data.allCategories);
    });
  }, []);

  const handleFirstCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setFirstCategory(selectedCategoryId);

    const selectedCategory = categories.find(
      (category) => category.firstCategoryID === parseInt(selectedCategoryId)
    );

    setSecondCategories(
      selectedCategory ? selectedCategory.secondCategories : []
    );
    setSecondCategory("");
    setThirdCategories([]);
    setFourthCategories([]);
    setFifthCategories([]);
    setSixthCategories([]);
  };

  const handleSecondCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSecondCategory(selectedCategoryId);

    const selectedSecondCategory = secondCategories.find(
      (category) => category.secondCategoryId === parseInt(selectedCategoryId)
    );

    setThirdCategories(
      selectedSecondCategory ? selectedSecondCategory.thirdCategories : []
    );
    setFourthCategories(
      selectedSecondCategory ? selectedSecondCategory.fourthCategories : []
    );
    setFifthCategories(
      selectedSecondCategory ? selectedSecondCategory.fifthCategories : []
    );
    setSixthCategories(
      selectedSecondCategory ? selectedSecondCategory.sixthCategories : []
    );
  };

  const handleCheckboxChange = (
    categoryList,
    setCategoryList,
    categoryId,
    categoryType
  ) => {
    const updatedCategories = categoryList.map((category) =>
      category[categoryType] === categoryId
        ? { ...category, isSelected: !category.isSelected }
        : category
    );
    setCategoryList(updatedCategories);
  };

  const handleThirdCategoryChange = (e, thirdCategoryId) => {
    handleCheckboxChange(
      thirdCategories,
      setThirdCategories,
      thirdCategoryId,
      "thirdCategoryId"
    );
  };

  const handleFourthCategoryChange = (e, fourthCategoryId) => {
    handleCheckboxChange(
      fourthCategories,
      setFourthCategories,
      fourthCategoryId,
      "fourthCategoryId"
    );
  };

  const handleFifthCategoryChange = (e, fifthCategoryId) => {
    handleCheckboxChange(
      fifthCategories,
      setFifthCategories,
      fifthCategoryId,
      "fifthCategoryId"
    );
  };

  const handleSixthCategoryChange = (e, sixthCategoryId) => {
    handleCheckboxChange(
      sixthCategories,
      setSixthCategories,
      sixthCategoryId,
      "sixthCategoryId"
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCategories = {
      firstCategoryID: parseInt(firstCategory),
      secondCategoryID: parseInt(secondCategory),
      thirdCategoryID: thirdCategories
        .filter((cat) => cat.isSelected)
        .map((cat) => parseInt(cat.thirdCategoryId))
        .join(","), // Convert array to comma-separated string
      fourthCategoryID: fourthCategories
        .filter((cat) => cat.isSelected)
        .map((cat) => parseInt(cat.fourthCategoryId))
        .join(","),
      fifthCategoryID: fifthCategories
        .filter((cat) => cat.isSelected)
        .map((cat) => parseInt(cat.fifthCategoryId))
        .join(","),
      sixthCategoryID: sixthCategories
        .filter((cat) => cat.isSelected)
        .map((cat) => parseInt(cat.sixthCategoryId))
        .join(","),
    };
    console.log("Payload being sent:", JSON.stringify(selectedCategories));

    const queryParams = new URLSearchParams(selectedCategories).toString();

    try {
      // const response = await fetch(`${apiUrl}?${queryParams}`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded',
      //   },

      // });

      const response = await fetch(
        `https://apidev.myinteriormart.com/api/CategoryAllFromDropdown/GetAllCategoriesfromFirstandSecond?${{...queryParams}}` ,{
          method:"POST",
          headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
               },
        }
          
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);

        // Verify the response data matches the sent data
        // const isEqual =
        //   data.category.firstCategoryID == selectedCategories.firstCategoryID &&
        //   data.category.secondCategoryID ==
        //     selectedCategories.secondCategoryID &&
        //   data.category.thirdCategoryID == selectedCategories.thirdCategoryID &&
        //   data.category.fourthCategoryID ==
        //     selectedCategories.fourthCategoryID &&
        //   data.category.fifthCategoryID == selectedCategories.fifthCategoryID &&
        //   data.category.sixthCategoryID == selectedCategories.sixthCategoryID;
        // console.log(isEqual);

        if (data) {
          console.log("The response data matches the sent data.");
          navigate("/specialisationl");
        } else {
          console.error("Mismatch between sent data and response data.");
          console.log("Sent Data:", selectedCategories);
          console.log("Received Data:", data.category);
          alert("There was an error saving the categories");
        }
      } else {
        alert(
          "There was an error saving the categories. Status: " + response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error handling the categories");
    }
  };
  return (
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
                <div className="col-md-12 add_bottom_15">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#fb830d" }}
                  >
                    Select All
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="fcategory">
                    First Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    value={firstCategory}
                    onChange={handleFirstCategoryChange}
                  >
                    <option value="">Select First Category</option>
                    {categories.map((category) => (
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
                  <label htmlFor="scategory">
                    Second Category <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="scategory"
                    value={secondCategory}
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
                {thirdCategories.length > 0 &&
                  thirdCategories.map((category) => (
                    <div className="col-md-3" key={category.thirdCategoryId}>
                      <div className="clearfix add_bottom_15">
                        <div className="checkboxes float-left">
                          <label className="container_check version_2">
                            {category.thirdCategoryName}
                            <input
                              type="checkbox"
                              checked={category.isSelected || false}
                              onChange={(e) =>
                                handleThirdCategoryChange(
                                  e,
                                  category.thirdCategoryId
                                )
                              }
                            />
                            <span className="checkmark"></span>
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
                          <label className="container_check version_2">
                            {category.fourthCategoryName}
                            <input
                              type="checkbox"
                              checked={category.isSelected || false}
                              onChange={(e) =>
                                handleFourthCategoryChange(
                                  e,
                                  category.fourthCategoryId
                                )
                              }
                            />
                            <span className="checkmark"></span>
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
                          <label className="container_check version_2">
                            {category.fifthCategoryName}
                            <input
                              type="checkbox"
                              checked={category.isSelected || false}
                              onChange={(e) =>
                                handleFifthCategoryChange(
                                  e,
                                  category.fifthCategoryId
                                )
                              }
                            />
                            <span className="checkmark"></span>
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
                          <label className="container_check version_2">
                            {category.sixthCategoryName}
                            <input
                              type="checkbox"
                              checked={category.isSelected || false}
                              onChange={(e) =>
                                handleSixthCategoryChange(
                                  e,
                                  category.sixthCategoryId
                                )
                              }
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#fb830d" }}
                  >
                    Save & Continue
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categoriesl;
