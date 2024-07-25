import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usericon from "../../FrontEnd/img/icon/user1.png";
import "../../FrontEnd/css/Mangelisting.css";
import { useSelector,useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";

function Uploadimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const dispatch=useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/ImageUpload/UploadLogoImage",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result); // Log the result for debugging purposes
        console.log("Logo image token", token);
        alert("Logo Image Uploded Successfully");
       
        // You can handle the result here if needed, e.g., show a success message
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      alert("Please select a file and enter a title");
    }
  };

  useEffect(() => {
    const fetchLogoImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetLogoimageDetailslisting",
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
        setImageURL(data); // Assuming data contains image URL and title
        
        
       
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchLogoImage();
    }
  }, [token, dispatch]);

  return (
    <>
      <div className="row imageSection" id="logo_section">
        <div className="col-12">
          <div className="row mt-5 justify-content-center">
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">
                  Select Logo Image <span className="text-danger">*</span>
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                />
                {/* <button type="submit">Upload</button> */}

                <button
                  className="btn_1"
                  style={{ backgroundColor: "#E55923", marginTop: "10px" }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              </div>
              </div>

              <hr style={{ marginTop: "32px" }}></hr>
          <div className="row">
            <div className="col-md-12">
              <h2 style={{textAlign:'center'}}>Logo</h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-3 col-lg-2 col-6 mb-5">
              <div className="upload_img_sec">
                <img
                  className="upload_images"
                  src={imageURL?.imagepath ? imageURL.imagepath : usericon}
                  alt="Gallery Image"
                 
                />
              </div>
              <div className="img_title text-center">
              
              </div>
            </div>
          </div>

           
          
        </div>
      </div>
    </>
  );
}

export default withAuthh(Uploadimagel);
