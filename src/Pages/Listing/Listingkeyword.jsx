import React, { useEffect, useState } from "react";
import "../../Pages/Services/Webdevelopment/Website/Services.css";

// Function to fetch payment keywords
const fetchPayment = async (companyID) => {
  try {
    const response = await fetch("https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetKeywordDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyID }),
    });
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

  useEffect(() => {
    const getPaymentKeywords = async () => {
      const data = await fetchPayment(companyID);
      if (data && Array.isArray(data)) {
        // Extract the 'seoKeyword' from each object in the array
        const keywords = data.map(item => item.seoKeyword);
        setPaymentKeywords(keywords);
      }
    };

    getPaymentKeywords();
  }, [companyID]);

  return (
    <div className="listing-specialisat box_detail_cus">
      <h6>Services</h6>
      <ul className="listing-specialisat-list">
        {paymentKeywords.map((keyword, index) => (
          <li key={index}>
            <i className="icon-check-1"></i> {keyword} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listingkeyword;
