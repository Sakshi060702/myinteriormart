import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import usericon from "../../FrontEnd/img/dummyowner.jpg";
import { useSelector,useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh"
import Popupalert from "../Popupalert";
import { validateImageFile,validateName,validateGalleryFile } from "../Validation";
import '../../FrontEnd/css/RegistrationMV.css'


function Clientimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [imageTitleFromAPI, setImageTitleFromAPI] = useState("");
  const [imageDetails, setImageDetails] = useState([]);
 

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const[error,setError]=useState("");

  const MAX_IMAGES=50;
  const[remaingImages,setRemainingImages]=useState(MAX_IMAGES);




  const navigate=useNavigate();
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
          "https://apidev.myinteriormart.com/api/BinddetailsListing/GetClientImageDetailslisting",
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
        if (data instanceof Object) {
          console.log(data);
          console.log();
          setImageDetails(data.imagepath.map((img)=> ({ url: img, title: data.imagetitle })));
          setRemainingImages(MAX_IMAGES - data.imagepath.length);
        
        }
       
      } catch (error) {
        console.error(error);
      }
    };
    if (token) {
     
    }
    fetchGalleryImage();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();



    setError({});
    const validationError = validateGalleryFile(selectedFile);
    const validationName=validateName(imageTitle);

    if (validationError||validationName) {
      setError({ imageFile: validationError ,
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
        const response = await fetch("https://apidev.myinteriormart.com/api/ImageUpload/UploadClientImage", {
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
        console.log("Client Image Token",token)
        // alert("Client Image Uploded Successfully")
        if (result instanceof Object) {
          setImageDetails(result.imageUrls.map((img)=> ({ url: img, title: result.imageTitle })));
          setRemainingImages(MAX_IMAGES - result.imageUrls.length);
          // setImageDetails((prevDetails) =>
          //   prevDetails.concat(result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })))
          // );
          // console.log("Updated imageDetails", result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })));
        }
        

        const cityName = localStorage.getItem('cityname');
        const pathlisting = `/Sociallinkl/${cityName}`;
        navigate(pathlisting);

      //   setSuccessMessage("Image Uploded Successfully");
      //   setErrorMessage("");
      //   setShowPopup(true);
  
      //   setTimeout(() => {
      //   setShowPopup(false);
      //   navigate("/Sociallinkl");
      // }, 2000);
        // You can handle the result here if needed, e.g., show a success message
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
                  className="file-input"
                  multiple
                  accept="image/*"
                />
                   {error.imageFile && (
                      <div className="text-danger">{error.imageFile}</div>
                    )}

                  {/* <button type="submit">Upload</button> */}
                </form>
                
              </div>
              <div className="form-group">
              <label for="name">Company Name<span className="text-danger">*</span></label>
              <input
                     className="form-control form-control-sm file-input2"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Company Name"
                    value={imageTitle}
                onChange={handleTitleChange}
                requireds
               
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
              <h2 style={{textAlign:'center'}}>Client Logo Images</h2>
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
                </div>
                <div className="img_title text-center">{image.title}</div>
              </div>
            ))
          )}
         
          </div>
          <div className='uplodlogo'>
          <button
              className="btn_1"
              style={{ backgroundColor: "#fb830d", marginTop: "10px" }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <div className="text-danger">
            {remaingImages > 0 
              ? `You can upload ${remaingImages} more image`
              : "Maximum 50 images reached"}
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

export default withAuthh(Clientimagel);
