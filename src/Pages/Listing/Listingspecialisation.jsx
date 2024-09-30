import React, { useEffect, useState } from "react";
import "../../Pages/Services/Webdevelopment/Website/Services.css";

// Function to fetch specialisations
const fetchSpecialisations = async (companyID) => {
  try {
    const response = await fetch("https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetSpecialization", {
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

function Listingspecialisation({companyID}) {
  const [specialisations, setSpecialisations] = useState([]);

  useEffect(() => {
    const getSpecialisations = async () => {
      const data = await fetchSpecialisations(companyID);
      if (data) {
        const filteredSpecialisations = Object.keys(data).filter(key => data[key] === true);
        setSpecialisations(filteredSpecialisations);
      }
    };

    getSpecialisations();
  }, []);

  return (
    <div className="listing-specialisat box_detail_cus">
      <h6>Specialisation</h6>
      <ul className="listing-specialisat-list listingspecialisation">
        {specialisations.map((item, index) => (
          <li key={index}>
            <i className="icon-check-1"></i> {item.replace(/([A-Z])/g, ' $1').trim()} {/* Convert camelCase to readable text */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listingspecialisation;
