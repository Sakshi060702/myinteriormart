import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";

function SixthCategory() {
  const { fifthCategoryId } = useParams();
  const [sixthCategories, setSixthCategories] = useState([]);

  useEffect(() => {
    fetchSixthCategories();
  }, [fifthCategoryId]);

  const fetchSixthCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();

      // Assuming data has a structure similar to what you've shown
      if (data && data.services && Array.isArray(data.services)) {
        let foundSixthCategories = [];

        // Find the correct fifth category based on fifthCategoryId
        data.services.forEach((service) => {
          service.thirdCategories.forEach((thirdCategory) => {
            thirdCategory.fourthCategories.forEach((fourthCategory) => {
              fourthCategory.fifthCategories.forEach((fifthCategory) => {
                if (fifthCategory.fifthCategoryID === fifthCategoryId) {
                  foundSixthCategories = fifthCategory.sixthCategories;
                }
              });
            });
          });
        });

        setSixthCategories(foundSixthCategories);
      } else {
        console.error("Unexpected data format or missing services array", data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
          <ul className="subcategories-list">
            {sixthCategories.map((sixthCategory) => (
              <li
                key={sixthCategory.sixthCategoryID}
                className={`col-lg-${
                  sixthCategories.length === 2 ? "6" : "4"
                } col-6`}
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
                    to={`/listing/${sixthCategory.fifthCategoryID}`}
                    title={sixthCategory.name}
                    className="Linkstyle"
                  >
                    {sixthCategory.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SixthCategory;
