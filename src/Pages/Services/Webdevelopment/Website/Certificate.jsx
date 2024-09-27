import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Certificate = (companyID) => {
  const [imageURLs, setImageURLs] = useState([]); // Array to store multiple image URLs
  const [error, setError] = useState("");
 

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/AlldetailsparticularListingbind/GetCertificateImage",
          {
            method: "POST", // Use POST method
            headers: {
              "Content-Type": "application/json",
              
            },
            body: JSON.stringify({ companyID }), 
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }

        const data = await response.json();
        
        // Assuming 'data.imagepath' contains an array of image URLs
        if (data && data.imagepath) {
          setImageURLs(data.imagepath.map((img) => ({ url: img }))); // Set array of images
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images");
      }
    };

    
      fetchGalleryImages(); // Fetch images only when token is available
    
  }, [ companyID]); // Dependency array

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
                style={{ paddingTop: '10px', margin: '10px' }} // Add some margin between images
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
