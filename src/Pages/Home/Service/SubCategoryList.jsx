import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";

import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";

const encryptionKey = 'myinterriorMart@SECRETKEY';

const encrypt = (text) => {
  
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};


const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const SubCategoryList = () => {
  const {categoryName } = useParams(); 
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchParams] = useSearchParams();

const listingId_enc = searchParams.get("fircatEncyt");
const secondCategoryId = decrypt(decodeURIComponent(listingId_enc));
console.log(secondCategoryId);
console.log("listingid",secondCategoryId)
console.log(decrypt(listingId_enc));

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
       console.log("category",setSelectedCategory(category))
       console.log("category2", setSubCategories(category ? category.thirdCategories : []))
      
       setSelectedCategory(category);
       setSubCategories(category ? category.thirdCategories : []);
    
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
                        alt="service"
                        className="img-fluid image imgstyle"
                      />
                    </span>
                    <Link
                      to={`/All/${subCategory.name
                            .replace(/\s+/g, "-").toLowerCase()}/${selectedCategory.name
                              .replace(/\s+/g, "-")
                            .toLowerCase()}/in-${localStorage.getItem('cityname')}?secatEncyt=${encodeURIComponent(encrypt(parseInt(subCategory.secondCategoryID)))}`}
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
                            .toLowerCase()}/in-${localStorage.getItem('cityname')}?secatEncyt=${encodeURIComponent(encrypt(parseInt(subCategory.thirdCategoryID)))}`}
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
