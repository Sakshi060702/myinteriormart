import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import usericon from "../../../FrontEnd/img/home_section_1.jpg";
import { useSelector,useDispatch } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh"

function Addbanner() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");
 

  const token=useSelector((state)=>state.auth.token);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setImageTitle(event.target.value);
  };

  useEffect(() => {
    const fetchBannerImage = async () => {
      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetBannerImageDetailslisting",
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
        setImageTitleFromAPI(data.imagetitle); // Set the image title from API
        
       
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
      fetchBannerImage();
    }
  }, [token, dispatch]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile && imageTitle) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("imageTitle", imageTitle);

      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadBannerImage", {
          method: "POST",
          headers: {
            
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result); // Log the result for debugging purposes
        console.log("Banner image token",token);
        alert("Banner Image Uploded Successfully")
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
                <label for="name">
                  Select Banner Image <span className="text-danger">*</span>
                </label>
                <form >
                  <input
                    type="file"
                    onChange={handleFileChange}
                     className="file-input"
                  />

                  {/* <button type="submit">Upload</button> */}
                </form>
                
              </div>
              <div className="form-group">
              <label for="name">Banner Title Title<span className="text-danger">*</span></label>
              <input
                    className="form-control form-control-sm file-input2"
                    type="name"
                    name="website"
                    id="website"
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
              <h2 style={{textAlign:'center'}}>Banner Images</h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-12 col-lg-12 col-6 mb-5">
              <div className="upload_banner_img_sec">
                <img
                  className="upload_images"
                  src={imageURL?.imagepath ? `https://apidev.myinteriormart.com${imageURL.imagepath}` : ""}
                  alt="Banner Image"
                 
                />
              </div>
              <div className="img_title text-center">
              {imageTitleFromAPI}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addbanner;
