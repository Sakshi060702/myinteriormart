import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import Foot from "../Component/Foot";

import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import { Helmet } from "react-helmet";

const encryptionKey = "myinterriorMart@SECRETKEY";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const SubCategoryList = () => {
  const { categoryName } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams] = useSearchParams();

  const listingId_enc = searchParams.get("fircatEncyt");
  const secondCategoryId = decrypt(decodeURIComponent(listingId_enc));
  console.log(secondCategoryId);
  console.log("listingid", secondCategoryId);
  console.log(decrypt(listingId_enc));
  console.log('selectedcategory',selectedCategory);

  console.log('hello');
  useEffect(() => {
    fetchSubCategories();
  }, [secondCategoryId]);

  const fetchSubCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      console.log("Fetched Data:", data);
      const category = data.services.find(
        (cat) => String(cat.secondCategoryID) === String(secondCategoryId)
      );
      console.log("Selected Category:", category);
      console.log("category", setSelectedCategory(category));
      console.log(
        "category2",
        setSubCategories(category ? category.thirdCategories : [])
      );

      setSelectedCategory(category);
      setSubCategories(category ? category.thirdCategories : []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  return (
    <>
    <Helmet>
    <title>
    {selectedCategory ? `${selectedCategory.name} | Myinteriormart` : "Loading... | Myinteriormart"}
  </title>
    </Helmet>
    <div>
      <div className="container margin_80_55 servicecontainer">
        <div className="main_title_2">
          <span>
            <em></em>
          </span>
          <h2>Popular Categories</h2>
          
        </div>
        <div className="row categories-list">
  {selectedCategory && (
    <ul className="subcategories-list d-flex flex-wrap">
      {subCategories.map((subCategory, index) => {
        const categoriesPerRow = 4;
        const totalCategories = subCategories.length;

       
        const isFirstRow = index < categoriesPerRow;
        
        const remainingCategories = totalCategories % categoriesPerRow;
        const isLastRow = totalCategories > categoriesPerRow && index >= Math.floor(totalCategories / categoriesPerRow) * categoriesPerRow;

        
        let justifyContentClass;
        if (isFirstRow && totalCategories <= categoriesPerRow) {
          justifyContentClass = "center"; 
        } else if (isLastRow && remainingCategories !== 0 && remainingCategories < categoriesPerRow) {
          justifyContentClass = "start"; 
        } else {
          justifyContentClass = "center"; 
        }

        return (
          <li
            key={subCategory.thirdCategoryID}
            className={`col-lg-3 col-6 d-flex justify-content-${justifyContentClass}`}
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
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "orange",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "35%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                ></div>
              </span>

              <Link
                to={`/All/${subCategory.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${selectedCategory.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/in-${localStorage.getItem("cityname")}?secatEncyt=${encodeURIComponent(
                  encrypt(parseInt(subCategory.secondCategoryID))
                )}`}
                title={subCategory.name}
                className="Linkstyle categorylink"
              >
                {subCategory.name}
              </Link>

              {subCategory.fourthCategories && subCategory.fourthCategories.length > 0 && (
                <Link
                  to={`/${subCategory.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/${selectedCategory.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/Services/in-${localStorage.getItem("cityname")}?secatEncyt=${encodeURIComponent(
                    encrypt(parseInt(subCategory.thirdCategoryID))
                  )}`}
                  title={subCategory.name}
                  style={{ color: "orange" }}
                >
                  more ...
                </Link>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  )}
</div>
      
      </div>
      {/* <div className="sticky-footer">
        <Foot />
      </div> */}
    </div>
    </>
  );
};

export default SubCategoryList;
