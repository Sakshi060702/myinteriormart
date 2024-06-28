import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";

function FourthCategoryD() {
  const { thirdCategoryId } = useParams();
  const [fourthCategories, setFourthCategories] = useState([]);
  const [selectedFourthCategory, setSelectedFourthCategory] = useState(null);

  useEffect(() => {
    fetchFourthCategories();
  }, [thirdCategoryId]);

  const fetchFourthCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();
      console.log("Fetched Fourth Categories Data :", data);

      if (data && Array.isArray(data.dealers)) {
        let subcategory = null;
        data.dealers.forEach((category) => {
          category.thirdCategories.forEach((thirdCategory) => {
            if (String(thirdCategory.thirdCategoryID) === thirdCategoryId) {
              subcategory = thirdCategory;
            }
          });
        });
        console.log("Selected Category :", subcategory);

        setSelectedFourthCategory(subcategory);
        setFourthCategories(subcategory ? subcategory.fourthCategories : []);
      } else {
        console.error("Unexpected data format :", data);
      }
    } catch (error) {
      console.error("Error fetching fourth categories", error);
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
        <ul className="subcategories-list d-flex justify-content-center flex-wrap">
          {fourthCategories.map((fourthCategory) => (
            <li
              key={fourthCategory.fourthCategoryID}
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
                  to={"/website"}
                  title={fourthCategory.name}
                  className="Linkstyle"
                >
                  {fourthCategory.name}
                </Link>

                {fourthCategory.fifthCategories &&
                  fourthCategory.fifthCategories.length > 0 && (
                    <Link
                      to={`/Fifthcategoriesd/${fourthCategory.fourthCategoryID}`}
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
  );
}
export default FourthCategoryD;
