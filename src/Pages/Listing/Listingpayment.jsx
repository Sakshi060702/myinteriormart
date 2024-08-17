import React, { useEffect, useState } from "react";
import "../../Pages/Services/Webdevelopment/Website/Services.css";

// Function to fetch specialisations
const fetchPayment = async (companyID) => {
  try {
    const response = await fetch("https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetPaymentDetails", {
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
    return null;
  }
};

function Listingpayment({companyID}) {
  const [payment, setPayment] = useState([]);

  useEffect(() => {
    const getPayment = async () => {
      const data = await fetchPayment(companyID);
      if (data) {
        const filteredSpecialisations = Object.keys(data).filter(key => data[key] === true);
        setPayment(filteredSpecialisations);
      }
    };

    getPayment();
  }, []);

  return (
    <div className="listing-specialisat box_detail_cus">
      <h6>Payment</h6>
      <ul className="listing-specialisat-list">
        {payment.map((item, index) => (
          <li key={index}>
            <i className="icon-check-1"></i> {item.replace(/([A-Z])/g, ' $1').trim()} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listingpayment;
