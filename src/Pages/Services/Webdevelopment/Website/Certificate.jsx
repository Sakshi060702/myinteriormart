import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Certificate = (companyID) => {
  const [imageURLs, setImageURLs] = useState([]); 
  const [error, setError] = useState("");
  const { listingId } = useParams();
//  console.log('companyid',companyID.listingID)
 const company_idFetch = {companyID: companyID.listingID.companyID};
//  console.log('company_idFetch',company_idFetch)


  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetCertificateImage",
          {
            method: "POST", 
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify(company_idFetch), 
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        
       
        if (data && data.imagepath) {
          setImageURLs(data.imagepath.map((img) => ({ url: img }))); 
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images");
      }
    };

    if(companyID)
    {
      fetchGalleryImages(); 
    }
      
    
  }, [ companyID]); 

  return (
    <div className="labournakaclient-container">
      <div className="labournakaclient-item">
        <div className="cleints_img_sec">
          {imageURLs.length > 0 ? (
            imageURLs.map((image, index) => (
              <img
                key={index}
                className="upload_images"
                src={`https://apidev.myinteriormart.com${image.url}`}
                alt={`Certificate ${index + 1}`}
                style={{ paddingTop: '10px', margin: '10px',height:'100px',width:'100px' }} 
              />
            ))
          ) : (
            <p>No images found</p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default Certificate;
