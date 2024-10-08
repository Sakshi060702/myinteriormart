import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../../FrontEnd/css/Service.css";
import { useSearchParams } from "react-router-dom";
import CryptoJS from "crypto-js";

const encryptionKey = "myinterriorMart@SECRETKEY";

const encrypt = (text) => {
  return CryptoJS.AES.encrypt(JSON.stringify(text), encryptionKey).toString();
};

const decrypt = (ciphertext) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

function ThirdCategoryD() {
  // const { secondCategoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchParams] = useSearchParams();

  const listingId_enc = searchParams.get("fircatEncyt");
  const secondCategoryId = decrypt(decodeURIComponent(listingId_enc));
  useEffect(() => {
    fetchThirdCategories();
  }, [secondCategoryId]);

  const fetchThirdCategories = async () => {
    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Category/GetCategories"
      );
      const data = await response.json();
      console.log("Fetched Data :", data);

      console.log("secondCategoryId", secondCategoryId);

      const category = data.dealers.find(
        (cat) => String(cat.secondCategoryID) === String(secondCategoryId)
      );
      console.log("Selected Category", category);
      setSelectedCategory(category);
      setSubCategories(category ? category.thirdCategories : []);
    } catch (error) {
      console.error("Error fetching subcategories :", error);
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [secondCategoryId]);

  return (
    <div className="container margin_80_55 servicecontainer" >
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
                      .toLowerCase()}/in-${localStorage.getItem(
                      "cityname"
                    )}?secatEncyt=${encodeURIComponent(
                      encrypt(parseInt(subCategory.secondCategoryID))
                    )}`}
                    className=" Linkstyle categorylink"
                  >
                    {subCategory.name}
                  </Link>
                  {subCategory.fourthCategories &&
                    subCategory.fourthCategories.length > 0 && (
                      <Link
                        to={`/Dealer/Category/${subCategory.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/${selectedCategory.name
                          .replace(/\s+/g, "-")
                          .toLowerCase()}/in-${localStorage.getItem(
                          "cityname"
                        )}?secatEncyt=${encodeURIComponent(
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
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default ThirdCategoryD;
