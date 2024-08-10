import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh";
import Popupalert from "../../Popupalert";
import { validateImageFile } from "../../Validation";

function Addcertification() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const[error,setError]=useState("");


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
        setImageTitleFromAPI(data.imagetitle); // Set the image title from API


      } catch (error) {
        console.error(error);
      }
    };
    fetchGalleryImage();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({});
    const validationError = validateImageFile(selectedFile);

    if (validationError) {
      setError({ imageFile: validationError });
      return;
    }


    if (selectedFile && imageTitle) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("imageTitle", imageTitle);

      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/ImageUpload/UploadCertificateImage",
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
        console.log(result.imageUrl); // Log the result for debugging purposes
        console.log("Certification Image token", token);
       

        // Update state with new image URL
        setImageURL(result.imageUrl);
        setImageTitle("");
        setSelectedFile(null);


        setSuccessMessage("Image Uploded Successfully");
        setErrorMessage("");
        setShowPopup(true);
  
        setTimeout(() => {
        setShowPopup(false);
       
      }, 2000);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      setErrorMessage("Please select File and Title.");
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
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
                  Select Certification Image <span className="text-danger">*</span>
                </label>
                <input type="file" onChange={handleFileChange} className="file-input" />
                {error.imageFile && (
                      <div className="text-danger">{error.imageFile}</div>
                    )}
              </div>
              <div className="form-group">
                <label htmlFor="name">
                  Certification Title<span className="text-danger">*</span>
                </label>
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
              <h2 style={{ textAlign: "center" }}>Certificate Images</h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-3 col-lg-2 col-6 mb-5">
              <div className="upload_img_sec">
                <img
                  className="upload_images"
                  src={imageURL ? `https://apidev.myinteriormart.com${imageURL}` : ""}
                  alt="Certification Image"
                />
              </div>
              <div className="img_title text-center">
                {imageTitleFromAPI}
              </div>
            </div>
          </div>
          {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
          />
          )}
        </div>
      </div>
    </>
  );
}

export default Addcertification;
