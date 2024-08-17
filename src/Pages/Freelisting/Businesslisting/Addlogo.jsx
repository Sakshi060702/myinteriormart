import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../../../FrontEnd/css/Mangelisting.css";
import usericon from "../../../FrontEnd/img/dummyowner.jpg";
import withAuthh from "../../../Hoc/withAuthh";
import Popupalert from "../../Popupalert";
import { validateImageFile } from "../../Validation";
import useAuthCheck from "../../../Hooks/useAuthCheck";
import { toBeEmptyDOMElement } from "@testing-library/jest-dom/matchers";


function Addlogo() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const[successMessage,setSuccessMessage]=useState("");

  const isAuthenticated = useAuthCheck();

  const[error,setError]=useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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

        setSuccessMessage("Logo Image Uploded Successfully");
      setErrorMessage("");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        
      }, 2000); 
       
        // You can handle the result here if needed, e.g., show a success message
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        setErrorMessage("Failed to upload logo. Please try again later.");
    setSuccessMessage(""); // Clear any existing success message
    setShowPopup(true);
      }
    } else {
      setErrorMessage("Please Select File or Title.");
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
        
        
       
      } catch (error) {
        console.error(error);
      }
    };
    if(isAuthenticated){
      fetchLogoImage();
    }
   
    
  }, [token]);

  return (
    <>
      <div className="row imageSection" id="logo_section">
        <div className="col-12">
          <div className="row mt-5 justify-content-center">
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">
                  Select Logo Image <span className="text-danger">*</span>
                </label>

                <input
                  type="file"
                  onChange={handleFileChange}
                  className="file-input"
                />
                 {error.imageFile && (
                      <div className="text-danger">{error.imageFile}</div>
                    )}
                {/* <button type="submit">Upload</button> */}

                
              </div>
              </div>
              </div>

              <hr style={{ marginTop: "32px" }}></hr>
          <div className="row">
            <div className="col-md-12">
              <h2 style={{textAlign:'center'}}>Logo</h2>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-3 col-lg-2 col-6 mb-5">
              <div className="upload_img_sec">
              {/* {console.log(imageURL)}
              {console.log(imageURL?.imageUrl)} */}
                <img
                  className="upload_images"
                  src={imageURL? `https://apidev.myinteriormart.com${imageURL}` :usericon }
                  alt="Logo Image"

                />
              </div>
              <div className="img_title text-center">
              
              </div>
            </div>
          </div>
          <div style={{paddingLeft:'349px'}}>
          <button
                  className="btn_1"
                  style={{ backgroundColor: "#E55923", marginTop: "10px" }}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
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

export default Addlogo;
