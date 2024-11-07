import React, { useState,useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import usericon from "../../FrontEnd/img/certificate.jpg";
import { useSelector,useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Popupalert from "../Popupalert";
import { validateImageFile,validateGalleryFile,validateName } from "../Validation";
import useAuthCheck from "../../Hooks/useAuthCheck";
import '../../FrontEnd/css/RegistrationMV.css'

function Certificationimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");
  const [imageDetails, setImageDetails] = useState([]);
 
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");
  const[error,setError]=useState("");

  const navigate=useNavigate();

  const [listingid, setListingId] = useState([]);

  const isAuthenticated = useAuthCheck();

  const MAX_IMAGES=20;
  const[remaingImages,setRemainingImages]=useState(MAX_IMAGES);


  const token=useSelector((state)=>state.auth.token);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const totalUplodedImages=imageDetails.length;
    const newTotalUplodedImages=totalUplodedImages+(files?files.length:0);

    if (newTotalUplodedImages > MAX_IMAGES) {
    
      const validFileCount = MAX_IMAGES - totalUplodedImages;
      const validFiles=files.slice(0, validFileCount);
      setSelectedFile(validFiles); 
      setRemainingImages(0);
    } else {
      setSelectedFile(files);
      setRemainingImages(MAX_IMAGES - newTotalUplodedImages);
    }
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
        console.log("Get response", data);
        console.log(data instanceof Object);
        if (data instanceof Object) {
          console.log(data);
          console.log();
          setListingId(data.listingid);
          setImageDetails(data.imagepath.map((img,index)=> ({ url: img, title: data.imagetitle[index]||"No Title" })));
          setRemainingImages(MAX_IMAGES - data.imagepath.length);
        
        }
      } catch (error) {
        console.error(error);
      }
    };
    if(isAuthenticated){
      fetchGalleryImage();
    }

 
  }, [token]);

  //To delete image
  const handleDeleteImage = async (imageUrl) => {
    const remainingImagePath = imageDetails
      .filter((img) => img.url !== imageUrl)
      .map((img) => img.url);

    const deletePayload = {
      ListingID: listingid,
      ImagePaths: remainingImagePath,
    };

    try {
      const delteResponse = await fetch(
        "https://apidev.myinteriormart.com/api/DeleteImages/CertificateDeleteImages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deletePayload),
        }
      );
      setImageDetails((prevDetails) =>
        prevDetails.filter((img) => img.url !== imageUrl)
      );
      setRemainingImages(MAX_IMAGES - remainingImagePath.length);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();


    setError({});
    const validationError = validateGalleryFile(selectedFile);
    const validationName=validateName(imageTitle);


    if (validationError||validationName) {
      setError({ imageFile: validationError,
        imagetitle:validationName
       });
      return;
    }


    if (selectedFile && imageTitle) {
      const formData = new FormData();
      selectedFile.forEach((file) => {
        formData.append("file", file);
      });
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
        // setImageURL(result.imageUrl);
        // setImageTitle("");
        // setSelectedFile(null);

        if (result instanceof Object) {
          const imageUrls = Array.isArray(result.imageUrls) ? result.imageUrls : [];
          const imageTitles = Array.isArray(result.imageTitles) ? result.imageTitles : [];

          
          setImageDetails(result.imageUrls.map((img,index)=> ({ url: img, title: imageTitles[index] || "No Title" })));
          setRemainingImages(MAX_IMAGES - result.imageUrls.length);
          // setImageDetails((prevDetails) =>
          //   prevDetails.concat(result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })))
          // );
          // console.log("Updated imageDetails", result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })));
        }
    //     setSuccessMessage("Certification Image Uploded Successfully");
    //   setErrorMessage("");
    //   setShowPopup(true);

    //   setTimeout(() => {
    //   setShowPopup(false);
     
    // }, 2000);
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

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleExitClick=()=>{
    navigate('/labournakapage')
  }

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
                {error.imagetitle && (
                      <div className="text-danger">{error.imagetitle}</div>
                    )}
                

              </div>
              
            </div>
          </div>
          <hr style={{ marginTop: "32px" }}></hr>
          <div className="row">
            <div className="col-md-12">
              <h2 style={{ textAlign: "center" }}>Certificate Images</h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            {console.log(imageDetails)}
            {imageDetails.length === 0 || !imageDetails.some(img => img.url) ? (
            <div className="col-md-3 col-lg-2 col-6 mb-5">
              <div className="upload_img_sec">
                <img
                  className="upload_images"
                  src={usericon}
                  alt="Default User Icon"
                />
              </div>
              
            </div>
          ) : (
            imageDetails.map((image, index) => (
              <div className="col-md-3 col-lg-2 col-6 mb-5" key={index}>
                <div className="upload_img_sec">
                  <img
                    className="upload_images"
                    src={image.url ? `https://apidev.myinteriormart.com${image.url}` : usericon}
                    alt="Gallery Image"
                  />
                  <button
                      className="btn btn-danger position-absolute top-0 right-0"
                      onClick={() => handleDeleteImage(image.url)}
                      style={{
                        position: "absolute",
                        top: "-14px",
                        right: "-11px",
                        backgroundColor: "red",
                        border: "none",
                        cursor: "pointer",
                        height:'33px',
                        borderRadius:'50%'
                      }}
                    >
                      &times;
                    </button>
                </div>
                <div className="img_title text-center">{image.title}</div>
              </div>
            ))
          )}
         
          </div>
          <div className='uplodlogo'>
          <button
                className="btn_1"
                style={{ backgroundColor: "#fb830d", marginTop: "10px",marginRight:'10px' }}
                onClick={handleSubmit}
              >
                Save & Continue
              </button>
              <button
                  className="btn_1"
                  style={{ backgroundColor: "#fb830d", marginTop: "10px" }}
                  onClick={handleExitClick}
                >
                  Exit
                </button>
          </div>
          <div className="text-danger Gallerycount">
            {remaingImages > 0 
              ? `You can upload ${remaingImages} more image`
              : "Maximum 20 images reached"}
          </div>
          {showPopup && (
            <Popupalert 
            message={successMessage || errorMessage} 
            type={successMessage ? 'success' : 'error'} 
            onClose={handleClosePopup}
          />
          )}
        </div>
      </div>
    </>
  );
}

export default withAuthh(Certificationimagel);
