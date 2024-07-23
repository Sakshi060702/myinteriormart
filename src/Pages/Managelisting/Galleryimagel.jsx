import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../FrontEnd/css/Mangelisting.css'
import { useSelector } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"

function Galleryimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");

  const token=useSelector((state)=>state.auth.token);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setImageTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile && imageTitle) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("imageTitle", imageTitle);

      try {
        const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadGalleryImage", {
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
        console.log(result); 
        console.log("Gallery Image Token",token);// Log the result for debugging purposes
        alert("Gallery Image Uploded Successfully")
        
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
      </div>
    </div>
  </>
  );
}

export default withAuthh(Galleryimagel);
