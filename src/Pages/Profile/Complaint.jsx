import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";
import { validateName } from "../Validation";
import Popupalert from "../Popupalert";

function Complaint() {
  const [File, setSelectedFile] = useState(null);
  const [Title, setImageTitle] = useState("");
  const [Description, setImageDescription] = useState("");

  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTitleChange = (event) => {
    setImageTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setImageDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();


    const TitleError = validateName(Title);
    const DescriptionError = validateName(Description);

    if (TitleError||DescriptionError) {
      setError({
        Title: TitleError,
        Description:DescriptionError,
       
      });
      return;
    }

    if (File && Title && Description) {
      const formData = new FormData();
      formData.append("File", File);
      formData.append("Title", Title);
      formData.append("Description", Description);

      try {
        const response = await fetch(
          "https://apidev.myinteriormart.com/api/Complaint/AddComplaint",
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
        console.log(result);
        console.log("Complaint Token", token); // Log the result for debugging purposes
        setSuccessMessage("Complaint uploded Succeessfully");
        setErrorMessage("");
        setShowPopup(true);
  
        setTimeout(() => {
          setShowPopup(false);
         
        }, 2000);

        // You can handle the result here if needed, e.g., show a success message
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      setErrorMessage(
        "Failed to Save Complaint details. Please try again later."
      );
      setSuccessMessage(""); // Clear any existing success message
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>Complaint</h5>
          <form className="icon-form-group" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-12">
                <label>Title<span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  type="text"
                  name="qualification"
                  value={Title}
                  onChange={handleTitleChange}
                />
                {error.Title && (
                      <div className="text-danger">{error.Title}</div>
                    )}
              </div>
              <div className="form-group col-12">
                <label>Complaint Description<span className="text-danger">*</span></label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={Description}
                  onChange={handleDescriptionChange}
                  style={{ height: "100px" }}
                ></textarea>
                {error.Description && (
                      <div className="text-danger">{error.Description}</div>
                    )}
              </div>
              <div className="form-group col-12">
                <label style={{marginLeft:'5px'}}> File<span className="text-danger">*</span></label>
                <br></br>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="form-control file-upload"
                  style={{marginLeft:'5px'}}
                   required
                  
                />
              </div>

              <div className="text-center col-12 mt-3">
              <button
                 className="btn btn-primary w-100"
                 style={{ backgroundColor: "#fb830d", marginTop: "10px" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
              </div>
            </div>
            {showPopup && (
                  <Popupalert
                    message={successMessage || errorMessage}
                    type={successMessage ? "success" : "error"}
                    onClose={handleClosePopup}
                  />
                )}
          </form>
        </div>
      </div>
    </>
  );
}
export default Complaint;
