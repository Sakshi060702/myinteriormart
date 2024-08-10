import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import usericon from "../../../FrontEnd/img/user1 (3).jpg";
import "../../../FrontEnd/css/Mangelisting.css";
import { useSelector, useDispatch } from "react-redux";
import withAuthh from "../../../Hoc/withAuthh";
import Popupalert from "../../Popupalert";
import { validateGalleryFile } from "../../Validation";


function Addgallery() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");
  const [imageDetails, setImageDetails] = useState([]);
 

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const[error,setError]=useState("");

  const handleFileChange = (event) => {
    setSelectedFile(Array.from(event.target.files));
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
        console.log("Get response", data);
        console.log(data instanceof Object);
        if (data instanceof Object) {
          console.log(data);
          console.log();
          setImageDetails(data.imagepath.map((img)=> ({ url: img, title: data.imagetitle })));
        
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGalleryImage();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();


    setError({});
    const validationError = validateGalleryFile(selectedFile);

    if (validationError) {
      setError({ imageFile: validationError });
      return;
    }


    if (selectedFile.length > 0 && imageTitle) {
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("file", file);
      });

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
        console.log("Post response", result);

        if (result instanceof Object) {
          setImageDetails(result.imageUrls.map((img)=> ({ url: img, title: result.imageTitle })));
          // setImageDetails((prevDetails) =>
          //   prevDetails.concat(result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })))
          // );
          // console.log("Updated imageDetails", result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })));
        }
        // console.log(setImageDetails);

        setSuccessMessage("Gallery Image Uploaded Successfully");
        setErrorMessage("");
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 2000);

      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setErrorMessage("Failed to Upload Image. Please try again later.");
        setSuccessMessage(""); // Clear any existing success message
        setShowPopup(true);
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
                  Select Gallery Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                   multiple
                  accept="image/*"
                />
                {error.imageFile && (
                      <div className="text-danger">{error.imageFile}</div>
                    )}
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
            {console.log(imageDetails)}
            {imageDetails.map((image, index) => (
              <div className="col-md-3 col-lg-2 col-6 mb-5" key={index}>
                <div className="upload_img_sec">
                  
                  <img
                    className="upload_images"
                    src={image.url ? `https://apidev.myinteriormart.com${image.url}` : ""}
                    alt="Gallery Image"
                  />
                </div>
                
                
                <div className="img_title text-center">{image.title}</div>
              </div>
            ))}
         
          </div>

          {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
          />
          )}

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

export default Addgallery;
