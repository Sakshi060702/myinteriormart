import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import usericon from "../../FrontEnd/img/dummyowner.jpg";
import "../../FrontEnd/css/Mangelisting.css";
import { useSelector,useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import Popupalert from "../Popupalert";
import { validateImageFile } from "../Validation";
import useAuthCheck from "../../Hooks/useAuthCheck";
import '../../FrontEnd/css/RegistrationMV.css'
import { useRef } from "react";
import imageCompression from "browser-image-compression";

function Uploadimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const dispatch=useDispatch();

  const [imageDetails, setImageDetails] = useState([]);
  const[listingid,setListingId]=useState([]);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const isAuthenticated = useAuthCheck();
  const[error,setError]=useState("");

  const fileRef=useRef(null);

  const navigate=useNavigate();

  const handleFileChange = async(event) => {
    // setSelectedFile(event.target.files[0]);
    const file=event.target.files[0];
    const fileSizeInKB=file.size/1024;
    if (fileSizeInKB <= 100) {
      console.log(`File size of image is less than or equal to 100 KB: ${fileSizeInKB.toFixed(2)} KB. Skipping compression.`);
      setSelectedFile(file);
      return; 
    }

    //compress image file
    const option={
      maxSizeMB: 0.1,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };
    try{
      const compressedFile = await imageCompression(file, option);
      console.log("Original file size:", file.size / 1024, "KB");
      console.log("Compressed file size:", compressedFile.size / 1024, "KB");

      const newcompressedFile=new File(
        [compressedFile],
        file.name,
        {type:compressedFile.type}
      );
      console.log('newcompressedfile',newcompressedFile);
      setSelectedFile(newcompressedFile);
    }
    catch(error){
      console.error("Image compression error:", error);
      setErrorMessage("Image compression failed. Please try a different image.");
    }
  };

  const handleDeleteImage = async (imageUrl) => {
    const remainingImagePath = imageDetails
      .filter((img) => img.imagepath !== imageUrl) // Filter out the image to delete
      .map((img) => img.imagepath);

    const deletePayload = {
      ListingID: listingid, // Replace with your actual listing ID
      ImagePaths: remainingImagePath.length > 0 ? remainingImagePath[0] : "",
    };

    try {
      const deleteResponse = await fetch(
        "https://apidev.myinteriormart.com/api/DeleteImages/LogoDeleteImage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deletePayload),
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the image");
      }

      // Update image state after deletion
      setImageDetails((prevDetails) =>
        prevDetails.filter((img) => img.imagepath !== imageUrl)
      );
      setImageURL(null); // Remove the deleted image from display
      setImageTitleFromAPI(""); // Clear the title
      // setSuccessMessage("Image deleted successfully.");
      // setShowPopup(true);

    } catch (error) {
      console.error("Error deleting image:", error);
      // setErrorMessage("Failed to delete image. Please try again later.");
      // setShowPopup(true);
    }
  };
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError({});
    const validationError = validateImageFile(selectedFile);

    if (validationError) {
      setError({
        imageFile: validationError,
       
      });
      return;
    }


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
       
        setImageURL(result.imageUrl);

    //   setSuccessMessage("Logo Image Uploded Successfully");
    //   setErrorMessage("");
    //   setShowPopup(true);

    //   setTimeout(() => {
    //   setShowPopup(false);
     
    // }, 2000);
       
        // You can handle the result here if needed, e.g., show a success message

        setSelectedFile(null);
       
        if(fileRef.current){
         fileRef.current.value="";
        }
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
        setImageURL(data.imagepath); // Assuming data contains image URL and title
        console.log(data);
        setListingId(data.listingid);
        setImageDetails([data]);
        
       // View image size in KB for a single image
      // if (data.imagepath) {
      //   try {
      //     const imageresponse = await fetch(data.imagepath);
      //     const blob = await imageresponse.blob();
      //     const sizeInKB = (blob.size / 1024).toFixed(2);
      //     console.log(`Image URL: ${data.imagepath} Size: ${sizeInKB} KB`);
      //   } catch (error) {
      //     console.error(`Failed to fetch image size for ${data.imagepath}:`, error);
      //   }
      // }
      } catch (error) {
        console.error(error);
      }
    };
    if(isAuthenticated){
      fetchLogoImage();
    }
   
   
  }, [token]);

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
                <label for="name">
                  Select Company Logo Image <span className="text-danger">*</span>
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                  ref={fileRef}
                />
                {error.imageFile && (
                      <div className="text-danger">{error.imageFiles}</div>
                    )}
                {/* <button type="submit">Upload</button> */}

                
              </div>
              </div>
              </div>

              <hr style={{ marginTop: "32px" }}></hr>
          <div className="row">
            <div className="col-md-12">
              <h2 style={{textAlign:'center'}}>Company Logo</h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-3 col-lg-2 col-6 mb-5">
              <div className="upload_img_sec">
              {/* {console.log(imageURL)}
              {console.log(imageURL?.imageUrl)} */}
                <img
                  className="upload_images"
                  src={imageURL? `https://apidev.myinteriormart.com${imageURL}` : usericon  }
                  alt="Logo Image"

                />
                <button
                    className="btn btn-danger position-absolute"
                    onClick={() => handleDeleteImage(imageURL)}
                    style={{
                      top: "-14px",
                      right: "-11px",
                      backgroundColor: "red",
                      border: "none",
                      cursor: "pointer",
                      height: "33px",
                      borderRadius: "50%",
                    }}
                  >
                    &times;
                  </button>
                 
              </div>
              <div className="img_title text-center">
              
              </div>
            </div>
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

export default withAuthh(Uploadimagel);
