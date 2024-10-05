import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import { useSearchParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const encryptionKey = 'myinterriorMart@SECRETKEY';

const encrypt = (text) => {
  
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};


const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const FourthCategory = () => {
  const {subcategoryName,secondCategoryName } = useParams();
  const [fourthCategories, setFourthCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchParams] = useSearchParams();
 

const listingId_enc = searchParams.get("secatEncyt");
const thirdCategoryId = decrypt(decodeURIComponent(listingId_enc));
console.log(thirdCategoryId);
console.log("listingid",thirdCategoryId)
console.log(decrypt(listingId_enc))

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

      if (data && Array.isArray(data.services)) {
        let subcategory = null;
        data.services.forEach((category) => {
          category.thirdCategories.forEach((thirdCategory) => {
            if (String(thirdCategory.thirdCategoryID) === thirdCategoryId) {
              subcategory = thirdCategory;
            }
          });
        });
        console.log("Selected Category :", subcategory);

        setSelectedSubcategory(subcategory);
        setFourthCategories(subcategory ? subcategory.fourthCategories : []);
      } else {
        console.error("Unexpected data format :", data);
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
      <div className="container margin_80_55 servicecontainer" >
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
                      to={`/All/${fourthCategory.name
                            .replace(/\s+/g, "-").toLowerCase()}/${subcategoryName}/${secondCategoryName}/in-${localStorage.getItem('cityname')}?secatEncyt=${encodeURIComponent(encrypt(parseInt(fourthCategory.secondCategoryID)))}`}
                      title={fourthCategory.name}
                      className="Linkstyle categorylink"
                    >
                    {fourthCategory.name}
                  </Link>

                  {fourthCategory.fifthCategories &&
                    fourthCategory.fifthCategories.length > 0 && (
                      <Link
                        to={`/${fourthCategory.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/${subcategoryName}/${secondCategoryName}/in-${localStorage.getItem('cityname')}?thcatEncyt=${encodeURIComponent(encrypt(parseInt(fourthCategory.fourthCategoryID)))}`}
                        title={fourthCategory.name}
                        style={{ color: "orange" }}
                      >
                        more ...
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
