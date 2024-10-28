import React, { useEffect, useState } from "react";
import "../../Pages/Services/Webdevelopment/Website/Services.css";
import { useDispatch, useSelector } from "react-redux";

// Function to fetch payment keywords
const fetchPayment = async (companyID) => {
  try {
    const response = await fetch(
      "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetKeywordDetails",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ companyID }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

function Listingkeyword({ companyID }) {
  const [paymentKeywords, setPaymentKeywords] = useState([]);
  const [status, setStatus] = useState("");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPaymentKeywords = async () => {
      const data = await fetchPayment(companyID);
      if (data && Array.isArray(data)) {
        // Extract the 'seoKeyword' from each object in the array
        const keywords = data.map((item) => item.seoKeyword);
        setPaymentKeywords(keywords);
      }
    };

    getPaymentKeywords();
  }, [companyID]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://apidev.myinteriormart.com/api/Keywordshowfromstatus/GetKeywordshow",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
           
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       setStatus(data.status);
  //     } catch (error) {
  //       console.error("Error fetching status:", error);
  //     }
  //   };
  //   fetchData();
  // }, [token]);

  return (
    <>
    
      <div className="listing-specialisat box_detail_cus keywordbox" >
        <h6>Keyword</h6>
        <ul className="listing-specialisat-list listingspecialisation">
          {paymentKeywords.map((keyword, index) => (
            <li key={index} style={{display:'flex'}}>
              <i className="icon-check-1"></i> 
              <p style={{marginBottom:'0px'}}>{keyword}</p>
              
            </li>
          ))}
        </ul>
      </div>
   
  </>
  );
}

export default Listingkeyword;
