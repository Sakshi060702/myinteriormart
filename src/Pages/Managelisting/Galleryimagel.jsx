import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usericon from "../../FrontEnd/img/user1 (3).jpg";
import "../../FrontEnd/css/Mangelisting.css";
import { useSelector, useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";

function Galleryimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");
 

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setImageTitle(event.target.value);
  };

  useEffect(() => {
    const fetchGalleryImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetGalleryImageDetailslisting",
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
        console.log(data);
        setImageURL(data.imagepath); // Assuming data contains image URL and title
        setImageTitleFromAPI(data.imagetitle); // Set the image title from API
        
       
      } catch (error) {
        console.error(error);
      }
    };
    // if (token) {
      
    // }
    fetchGalleryImage();
  // }, [token, dispatch]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile && imageTitle) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("imageTitle", imageTitle);

      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/ImageUpload/UploadGalleryImage",
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
        console.log(result);
        console.log("Gallery Image Token", token); // Log the result for debugging purposes
        alert("Gallery Image Uploded Successfully");
        setImageURL(result.imageUrl);

        

        // You can handle the result here if needed, e.g., show a success message
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      alert("Please select a file and enter a title");
    }
  };

  return (
    <>
      <div className="row imageSection" id="logo_section">
        <div className="col-12">
          <div className="row mt-5 justify-content-center">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">
                  Select Gallery Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  Gallery Image Title <span className="text-danger">*</span>
                </label>
                <input
                  className="form-control form-control-sm file-input2"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Image Title"
                  value={imageTitle}
                  onChange={handleTitleChange}
                />
              </div>
              <button
                className="btn_1"
                style={{ backgroundColor: "#E55923", marginTop: "10px" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
          <hr style={{ marginTop: "32px" }}></hr>
          <div className="row">
            <div className="col-md-12">
              <h2 style={{textAlign:'center'}}>Gallery Images</h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-3 col-lg-2 col-6 mb-5">
              <div className="upload_img_sec">
              {console.log(imageURL)}
                <img
                  className="upload_images"
                  src={imageURL ? `https://apidev.myinteriormart.com${imageURL}` : ""}
                  alt="Gallery Image"
                 
                />
              </div>
              <div className="img_title text-center">
              {imageTitleFromAPI}
              </div>
            </div>
          </div>

          {/* <div className="mt-3">
                  <label>Gallery Image</label>
                  <img
                    src={imageURL?.imagepath ? imageURL.imagepath:usericon}
                    alt="Gallery Image"
                    style={{ maxWidth: "50%", height: "auto" }}
                  />
                </div> */}
        </div>
      </div>
    </>
  );
}

export default withAuthh(Galleryimagel);
