import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";

const FourthCategory = () => {
  const { thirdCategoryId,subcategoryName,secondCategoryName } = useParams();
  const [fourthCategories, setFourthCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  useEffect(() => {
    fetchFourthCategories();
  }, [thirdCategoryId,subcategoryName,secondCategoryName]);

  const fetchFourthCategories = async () => {
    try {
      // Adjust API endpoint as per your backend structure
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();
      // console.log("Fetched Fourth Categories Data:", data);

      // Check the structure of `data` and access the array of categories
      const category = data.services.find(
        (cat) => cat.name.replace(/\s+/g, "-").toLowerCase() === secondCategoryName
      );
      const subCategory = category?.thirdCategories.find(
        (sub) => sub.name.replace(/\s+/g, "-").toLowerCase() === subcategoryName
      );
      if (subCategory) {
        setFourthCategories(subCategory.fourthCategories || []);
      } else {
        console.error("Subcategory not found");
      }
    } catch (error) {
      console.error("Error fetching fourth categories:", error);
    }
  };

  const getLGColClass = (numItems) => {
    switch (numItems) {
      case 1:
        return "12"; // Full width for single item
      case 2:
        return "6"; // 2 items per row
      case 3:
        return "4"; // 3 items per row
      case 4:
        return "3"; // 4 items per row
      default:
        return "3"; // Default to 3 items per row if more than 4 
    }
  };

  return (
    <div>
      <div className="container margin_80_55">
        <div className="main_title_2">
          <span>
            <em></em>
          </span>
          <h2>Popular Categories</h2>
        </div>
        <div className="row justify-content-center categories-list">
          
          <ul
            className={`subcategories-list d-flex justify-content-${
              fourthCategories.length < 4 ? "center" : "start"
            } flex-wrap`}
          >
            {fourthCategories.map((fourthCategory) => (
              <li
                key={fourthCategory.fourthCategoryID}
                className={`col-lg-${getLGColClass(
                  FourthCategory.length
                )} col-6 d-flex justify-content-center`}
              >
                <div className="item">
                  <span
                    className="icon"
                    style={{
                      display: "inline-block",
                      width: "40px",
                      height: "40px",
                      overflow: "hidden",
                      position: "relative",
                      marginRight: "10px",
                    }}
                  >
                    <img
                      src={`/img/circle-right-arrow.svg`}
                      alt="service"
                      className="img-fluid image imgstyle"
                    />
                  </span>
                  <Link
                      to={`/All/${fourthCategory.name
                            .replace(/\s+/g, "-").toLowerCase()}/${subcategoryName}/${secondCategoryName}/in-${localStorage.getItem('cityname')}`}
                      title={fourthCategory.name}
                      className="Linkstyle"
                    >
                    {fourthCategory.name}
                  </Link>

                  {fourthCategory.fifthCategories &&
                    fourthCategory.fifthCategories.length > 0 && (
                      <Link
                        to={`/${fourthCategory.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/${subcategoryName}/${secondCategoryName}/in-${localStorage.getItem('cityname')}`}
                        title={fourthCategory.name}
                        style={{ color: "#fe900d" }}
                      >
                        View More ...
                      </Link>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FourthCategory;
