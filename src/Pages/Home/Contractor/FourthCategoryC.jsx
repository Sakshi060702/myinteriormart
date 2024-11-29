import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import CryptoJS from "crypto-js";

const encryptionKey = 'myinterriorMart@SECRETKEY';

const encrypt = (text) => {
  
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};


const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};


function FourthCategoryC() {
  // const { thirdCategoryId } = useParams();
  const [fourthCategories, setFourthCategories] = useState([]);
  const [selectedFourthCategory, setSelectedFourthCategory] = useState(null);
  const {subcategoryName,secondCategoryName } = useParams();
  const [searchParams] = useSearchParams();

  const listingId_enc = searchParams.get("secatEncyt");
const thirdCategoryId = decrypt(decodeURIComponent(listingId_enc));
console.log(thirdCategoryId);
console.log("listingid",thirdCategoryId)
console.log(decrypt(listingId_enc))

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

      if (data && Array.isArray(data.contractors)) {
        let subcategory = null;
        data.contractors.forEach((category) => {
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
    <>
    <Helmet>
      <title>{subcategoryName?`${subcategoryName}|Myinteriormart`:'Myinteriormart'}</title>
    </Helmet>
    <div className="container margin_80_55 servicecontainer">
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
                  // to={"/website"}
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
                      .toLowerCase()}/${subcategoryName}/${secondCategoryName}/Contractor/in-${localStorage.getItem('cityname')}?thcatEncyt=${encodeURIComponent(encrypt(parseInt(fourthCategory.fourthCategoryID)))}`}
                  title={fourthCategory.name}
                      style={{ color: "ornage" }}
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
    </>
  );
}
export default FourthCategoryC;
