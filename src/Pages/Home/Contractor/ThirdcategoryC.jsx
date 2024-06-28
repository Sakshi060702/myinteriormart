import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import { Link } from "react-router-dom";

function ThirdcategoryC() {
  const { secondCategoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchThirdCategories();
  }, [secondCategoryId]);

  const fetchThirdCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      console.log("Fetched Data:", data);

      // Log secondCategoryId to check its value
      console.log("secondCategoryId:", secondCategoryId);

      const category = data.contractors.find(
        (cat) => String(cat.secondCategoryID) === String(secondCategoryId)
      );
      console.log("Selected Category:", category);
      setSelectedCategory(category);
      setSubCategories(category ? category.thirdCategories : []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <div className="container margin_80_55">
      <div className="main_title_2">
        <span>
          <em></em>
        </span>
        <h2>Popular Categories</h2>
      </div>
      <div className="row justify-content-center categories-list">
        {selectedCategory && (
          <ul className="subcategories-list d-flex justify-content-center flex-wrap">
            {subCategories.map((subCategory) => (
              <li
                key={subCategory.thirdCategoryID}
                className={`col-lg-3 col-6 d-flex justify-content-center`}
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
                      alt="contractor"
                      className="img-fluid image imgstyle"
                    />
                  </span>
                  <Link
                    to={`/website`}
                    title={subCategory.name}
                    className="Linkstyle" >
                    {subCategory.name}
                  </Link>
                  {subCategory.fourthCategories &&
                    subCategory.fourthCategories.length > 0 && (
                      <Link
                        to={`/Fourthcategoriesc/${subCategory.thirdCategoryID}`}
                        title={subCategory.name}
                        style={{ color: "#fe900d" }}>
                        View More ...
                      </Link>
                    )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ThirdcategoryC;
