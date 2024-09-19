import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import withAuthh from "../../Hoc/withAuthh";
import { validateName } from "../../Validation";
import Popupalert from "../../Popupalert";


function Usersuggestion() {
  const [title, setTitle] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();


    const TitleError = validateName(title);
    const DescriptionError = validateName(suggestion);

    if (TitleError||DescriptionError) {
      setError({
        Title: TitleError,
        Description:DescriptionError,
       
      });
      return;
    }



    const data = {
      title,
      suggestion,
    };

    try {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/Suggestion/AddSuggestion",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      setSuccessMessage("Suggestion Sent Succeessfully");
        setErrorMessage("");
        setShowPopup(true);
  
        setTimeout(() => {
          setShowPopup(false);
         
        }, 2000);
      // Reset form fields after successful submission
      setTitle("");
      setSuggestion("");
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(
        "Failed to Save Suggestion details. Please try again later."
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
     <div className="row justify-content-center">
        <div className="col-md-6">
          <div id="sign-in-dialog" className="dialog-mfp zoom-anim-dialog">
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
        <h2 className="text-center pt-3">Suggestion</h2>
          <form className="icon-form-group" onSubmit={handleSubmit}>
            <div className="row">
              <div className="form-group col-12">
                <label>Title<span className="text-danger">*</span></label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {error.Title && (
                      <div className="text-danger">{error.Title}</div>
                    )}
              </div>
              <div className="form-group col-12">
                <label>Description<span className="text-danger">*</span></label>
                <textarea
                  className="form-control"
                  id="address"
                  name="suggestion"
                  style={{ height: "100px" }}
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                ></textarea>
                {error.Description && (
                      <div className="text-danger">{error.Description}</div>
                    )}
              </div>

              <div className="text-center col-12 mt-3">
                <input
                  type="submit"
                  value="Submit"
                  className="btn_1 full-width"
                />
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
      </div>
      </div>
      </div>
      
    </>
  );
}
export default Usersuggestion;
