import React, { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import usericon from "../../FrontEnd/img/dummyowner.jpg";
import "../../FrontEnd/css/Mangelisting.css";
import { useSelector, useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import Popupalert from "../Popupalert";
import {
  validateImageFile,
  validateGalleryFile,
  validateName,
} from "../Validation";
import useAuthCheck from "../../Hooks/useAuthCheck";
import "../../FrontEnd/css/RegistrationMV.css";
import { useRef } from "react";
import imageCompression from "browser-image-compression";

function Galleryimagel() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTitle, setImageTitle] = useState("");
  const [imageDetails, setImageDetails] = useState([]);

  const [listingid, setListingId] = useState([]);

  const MAX_IMAGES = 20;
  const [remaingImages, setRemainingImages] = useState(MAX_IMAGES);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const isAuthenticated = useAuthCheck();

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate=useNavigate();

  const [error, setError] = useState("");

  const fileRef=useRef(null);

  const handleFileChange =async (event) => {
    const files = Array.from(event.target.files);

    const totalUplodedImages = imageDetails.length;
    const newTotalUplodedImages =
      totalUplodedImages + (files ? files.length : 0);

    if (newTotalUplodedImages > MAX_IMAGES) {
      const validFileCount = MAX_IMAGES - totalUplodedImages;
      const validFiles = files.slice(0, validFileCount);
      setSelectedFile(validFiles);
      setRemainingImages(0);
    } else {
      setSelectedFile(files);
      setRemainingImages(MAX_IMAGES - newTotalUplodedImages);
    }

    //compress image file
    const compressedFiles=await Promise.all(
      files.map(async(file)=>{
        const fileSizeInKB=file.size/1024;
        if(fileSizeInKB<=100){
          console.log(`File size of image less than 100kb:${fileSizeInKB.toFixed(2)}KB`)
          return file;
        }
        try{
          const option={
            maxSizeMB: 0.1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          };
          console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
          const compressedFile=await imageCompression(file,option);
        // console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
        console.log(`Compressed size: ${(compressedFile.size / 1024).toFixed(2)} KB`);

        const newCompressedFile=new File(
          [compressedFile],
          file.name,
          {type:compressedFile.type}
        );
        console.log('newcompressedFile',newCompressedFile);
          
          return newCompressedFile;
        }catch{
console.error('Error in compressing file',error);
return file;
        }
      })
    );
    setSelectedFile(compressedFiles);
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
          console.log('imagedata',data);
          console.log();

          setListingId(data.listingid);

          setImageDetails(
            data.imagepath.map((img, index) => ({
              url: img,
              title: data.imagetitle[index] || "No Title",
            }))
          );
          setRemainingImages(MAX_IMAGES - data.imagepath.length);
        }

        //view image size in kb
        // data.imagepath.forEach(async(img)=>{
        //   try{
        //     const imageresponse = await fetch(img);
        //     const blob = await imageresponse.blob();
        //     const sizeInKB = blob.size / 1024;
        //     const sizeInMB = sizeInKB / 1024;
        //     const size = sizeInMB >= 1 
        //       ? `${sizeInMB.toFixed(2)} MB` 
        //       : `${sizeInKB.toFixed(2)} KB`;
        //     console.log(`Image URL: ${img} Size: ${size}`);
        //   }
        //   catch{
        //     console.error(`Failed to fetch image size for ${img}:`, error);
        //   }
        // })
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated) {
      fetchGalleryImage();
    }
  }, [token]);

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
        "https://apidev.myinteriormart.com/api/DeleteImages/GalleryDeleteImages",
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
    const validationName = validateName(imageTitle);

    if (validationError || validationName) {
      setError({ imageFile: validationError, imagetitle: validationName });
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
          const imageUrls = Array.isArray(result.imageUrls)
            ? result.imageUrls
            : [];
          const imageTitles = Array.isArray(result.imageTitles)
            ? result.imageTitles
            : [];

          setImageDetails(
            imageUrls.map((img, index) => ({
              url: img,
              title: imageTitles[index] || "No Title", // Fallback if title is undefined
            }))
          );
          setRemainingImages(MAX_IMAGES - result.imageUrls.length);
          // setImageDetails((prevDetails) =>
          //   prevDetails.concat(result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })))
          // );
          // console.log("Updated imageDetails", result.map((image) => ({ url: image.imageUrls, title: image.imageTitle })));
        }
        // console.log(setImageDetails);

        // setSuccessMessage("Gallery Image Uploaded Successfully");
        // setErrorMessage("");
        // setShowPopup(true);

        // setTimeout(() => {
        //   setShowPopup(false);
        // }, 2000);

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
                <label htmlFor="name">
                  Select Gallery Image <span className="text-danger">*</span>
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                  multiple
                  accept="image/*"
                  ref={fileRef}
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
                  className="form-control form-control-sm file-input2 companyD"
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Image Title"
                  value={imageTitle}
                  onChange={handleTitleChange}
                  required
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
              <h2 style={{ textAlign: "center" }}>Gallery Images </h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            {console.log(imageDetails)}
            {imageDetails.length === 0 ||
            !imageDetails.some((img) => img.url) ? (
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
                      src={
                        image.url
                          ? `https://apidev.myinteriormart.com${image.url}`
                          : usericon
                      }
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
          <div className="uplodlogo">
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
          <div className="Gallerycount">
            <div className="text-danger">
              {remaingImages > 0
                ? `You can upload ${remaingImages} more image`
                : "Maximum 20 images reached"}
            </div>
            <div className="text-danger">Upload Maximum 20 Images</div>
          </div>

          {showPopup && (
            <Popupalert
              message={successMessage || errorMessage}
              type={successMessage ? "success" : "error"}
              onClose={handleClosePopup}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default withAuthh(Galleryimagel);
