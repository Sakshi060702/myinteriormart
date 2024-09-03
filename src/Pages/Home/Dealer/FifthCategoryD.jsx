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


function FifthCategoryD() {
  const { fourthCategoryName ,subcategoryName,secondCategoryName} = useParams();
  const [fifthCategories, setFifthCategories] = useState([]);
  const [selectedFourthCategory, setSelectedFourthCategory] = useState(null);

  const [searchParams] = useSearchParams();
  const listingId_enc = searchParams.get("thcatEncyt");
  const fourthCategoryId  = decrypt(decodeURIComponent(listingId_enc));

  useEffect(() => {
    fetchFifthCategories();
  }, [fourthCategoryId]);

  const fetchFifthCategories = async () => {
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Category/GetCategories`
      );
      const data = await response.json();
      console.log("Fetched Data :", data);

      if (data && data.dealers && Array.isArray(data.dealers)) {
        let foundFourthCategory = null;

        data.dealers.forEach((service) => {
          service.thirdCategories.forEach((thirdCategory) => {
            thirdCategory.fourthCategories.forEach((fourthCategory) => {
              if (fourthCategory.fourthCategoryID === fourthCategoryId)
                foundFourthCategory = fourthCategory;
            });
          });
        });
        console.log("Selected Fifth Category :", foundFourthCategory);
        setSelectedFourthCategory(foundFourthCategory);
        setFifthCategories(
          foundFourthCategory ? foundFourthCategory.fifthCategories : []
        );
      } else {
        console.error("Unexpected data format", data);
      }
    } catch (error) {
      console.error("Error fetching data :", error);
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
  <div
    style={{
      width: "15px",
      height: "15px",
      backgroundColor: "orange",
      borderRadius: "50%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}
  ></div>
</span>
                <Link
                  // to={"/website"}
                  to={`/All/${fifthCategory.name
                    .replace(/\s+/g, "-").toLowerCase()}/${fourthCategoryName}/${subcategoryName}/${secondCategoryName}/in-${localStorage.getItem('cityname')}?secatEncyt=${encodeURIComponent(encrypt(parseInt(fifthCategory.secondCategoryID)))}`}

                  title={fifthCategory.name}
                  className="Linkstyle"
                >
                  {fifthCategory.name}
                </Link>

                {fifthCategory.sixthCategories &&
                  fifthCategory.sixthCategories.length > 0 && (
                    <Link
                    to={`/Dealer/Category/${fifthCategory.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}/${fourthCategoryName}/${subcategoryName}/${secondCategoryName}/in-${localStorage.getItem('cityname')}?fcatEncyt=${encodeURIComponent(encrypt(parseInt(fifthCategory.fifthCategoryID)))}`}
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
export default FifthCategoryD;
