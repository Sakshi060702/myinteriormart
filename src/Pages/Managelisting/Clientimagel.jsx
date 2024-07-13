import React, { useState } from "react";
import { Link } from "react-router-dom";

function Clientimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");

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
        const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadClientImage", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log(result); // Log the result for debugging purposes
        alert("Client Image Uploded Successfully")
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
                  Select Client Logo Image <span className="text-danger">*</span>
                </label>
                <form>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      border: "2px solid grey",
                      height: "50px",
                      width: "500px",
                    }}
                  />

                  {/* <button type="submit">Upload</button> */}
                </form>
                
              </div>
              <div className="form-group">
              <label for="name">Certification Title<span className="text-danger">*</span></label>
              <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Client Logo Title"
                    value={imageTitle}
                onChange={handleTitleChange}
                  />
              </div>
              <button
              className="btn_1"
              style={{ backgroundColor: "orange", marginTop: "10px" }}
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

export default Clientimagel;
