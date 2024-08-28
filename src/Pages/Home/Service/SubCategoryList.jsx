import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";

import { Link } from "react-router-dom";

const SubCategoryList = () => {
  const { secondCategoryId,categoryName } = useParams(); 
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchSubCategories();
  }, [categoryName]);

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      // console.log("Fetched Data:", data);
      const category = data.services.find(
        (cat) => cat.name.replace(/\s+/g, "-").toLowerCase() === categoryName
      );
      // console.log("Selected Category:", category);
      if(category){
        setSelectedCategory(category);
        setSubCategories(category ? category.thirdCategories : []);
      }
      else{
        console.error("There is not category");
      }
    
    } catch (error) {
      console.error("Error fetching subcategories:", error);
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
          {selectedCategory && (
            <ul className="subcategories-list d-flex justify-content-center flex-wrap">
              {subCategories.map((subCategory, index) => (
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
                        alt="service"
                        className="img-fluid image imgstyle"
                      />
                    </span>
                    <Link
                      to={`/All/${subCategory.name
                            .replace(/\s+/g, "-").toLowerCase()}/${selectedCategory.name
                              .replace(/\s+/g, "-")
                            .toLowerCase()}/in-${localStorage.getItem('cityname')}`}
                      title={subCategory.name}
                      className="Linkstyle"
                    >
                      {subCategory.name}
                    </Link>

                    {subCategory.fourthCategories &&
                      subCategory.fourthCategories.length > 0 && (
                        <Link
                          to={`/${subCategory.name
                            .replace(/\s+/g, "-").toLowerCase()}/${selectedCategory.name
                              .replace(/\s+/g, "-")
                            .toLowerCase()}/in-${localStorage.getItem('cityname')}`}
                          title={subCategory.name}
                          style={{ color: "#fe900d" }}
                        >
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
    </div>
  );
};

export default SubCategoryList;
