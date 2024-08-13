import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Certificate = () => {
  const [imageURL, setImageURL] = useState(null);
  const [error, setError] = useState("");
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchGalleryImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetCertificationImageDetailslisting",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await response.json();
        setImageURL(data.imagepath); // Assuming data contains image URL and title
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
    }
    fetchGalleryImage();
  }, []);

  return (
    <div className="labournakaclient-container">
      <div className="labournakaclient-item">
        <div className="cleints_img_sec">
          <img
            className="upload_images"
            src={imageURL ? `https://apidev.myinteriormart.com${imageURL}` : ""}
            alt="Certificate Image"
            style={{paddingTop:'10px'}}
          />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
