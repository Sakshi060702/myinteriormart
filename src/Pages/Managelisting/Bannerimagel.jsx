import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import usericon from "../../FrontEnd/img/Banner 690 x 120.png";
import { useSelector,useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Popupalert from "../Popupalert";
import { validateImageFile ,validateName} from "../Validation";
import useAuthCheck from "../../Hooks/useAuthCheck";
import '../../FrontEnd/css/RegistrationMV.css'
import { useRef } from "react";


function Bannerimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");

  const [imageDetails, setImageDetails] = useState([]);
  const[listingid,setListingId]=useState([]);
 

  const token=useSelector((state)=>state.auth.token);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");
  const[error,setError]=useState("");
  const isAuthenticated = useAuthCheck();
  const fileRef=useRef(null);

  const navigate=useNavigate();

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
        setListingId(data.listingid);
        setImageURL(data.imagepath); // Assuming data contains image URL and title
        setImageTitleFromAPI(data.imagetitle); // Set the image title from API
        setImageDetails([data]);
        
       
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated) {
      fetchBannerImage();
    }
    
  }, [token]);


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
        "https://apidev.myinteriormart.com/api/DeleteImages/BannerDeleteImage",
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
    const validationName=validateName(imageTitle);

    if (validationError||validationName) {
      setError({ imageFile: validationError,
        imagetitle:validationName
       });
      return;
    }

    
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
       
        setImageURL(result.imageUrl);

    //     setSuccessMessage("Banner Image Uploded Successfully");
    //   setErrorMessage("");
    //   setShowPopup(true);

    //   setTimeout(() => {
    //   setShowPopup(false);
     
    // }, 2000);
        // You can handle the result here if needed, e.g., show a success message


        setSelectedFile(null);
        setImageTitle("");
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
                  Select Banner Image <span className="text-danger">*</span>
                </label>
                <form >
                  <input
                    type="file"
                    onChange={handleFileChange}
                     className="file-input"
                     ref={fileRef}
                  />
                  {error.imageFile && (
                      <div className="text-danger">{error.imageFile}</div>
                    )}

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
                  {error.imagetitle && (
                      <div className="text-danger">{error.imagetitle}</div>
                    )}
              </div>
             
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
                  src={imageURL? `https://apidev.myinteriormart.com${imageURL}` : usericon}
                  alt="Banner Image"
                 
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
              {imageTitleFromAPI}
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

export default withAuthh(Bannerimagel);
