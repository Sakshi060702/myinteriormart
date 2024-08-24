import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";

function FifthCategory() {
  const { fourthCategoryId } = useParams();
  const [fifthCategories, setFifthCategories] = useState([]);
  const [selectedFourthCategory, setSelectedFourthCategory] = useState(null);

  useEffect(() => {
    fetchFifthCategories();
  }, [fourthCategoryId]);

  const fetchFifthCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();
      console.log("Fetched data:", data);

      // Assuming data has a structure like { services: [...] }
      if (data && data.services && Array.isArray(data.services)) {
        let foundFourthCategory = null;

        // Find the correct fourthCategory based on fourthCategoryId
        data.services.forEach((service) => {
          service.thirdCategories.forEach((thirdCategory) => {
            thirdCategory.fourthCategories.forEach((fourthCategory) => {
              if (fourthCategory.fourthCategoryID === fourthCategoryId) {
                foundFourthCategory = fourthCategory;
              }
            });
          });
        });

        // console.log("Selected Fifth Category:", foundFourthCategory);
        setSelectedFourthCategory(foundFourthCategory);
        setFifthCategories(
          foundFourthCategory ? foundFourthCategory.fifthCategories : []
        );
      } else {
        console.error("Unexpected data format or missing services array", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
          {fifthCategories.map((fifthCategory) => (
            <li
              key={fifthCategory.fifthCategoryID}
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
                  // to={"/website"}
                  to={`/listing/${fifthCategory.fourthCategoryID}`}
                  title={fifthCategory.name}
                  className="Linkstyle"
                >
                  {fifthCategory.name}
                </Link>

                {fifthCategory.sixthCategories &&
                  fifthCategory.sixthCategories.length > 0 && (
                    <Link
                      to={`/sixthcategories/${fifthCategory.fifthCategoryID}`}
                      title={fifthCategory.name}
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

export default FifthCategory;
