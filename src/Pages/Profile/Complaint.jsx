import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import withAuthh from "../../Hoc/withAuthh";

function Complaint() {
  const [File, setSelectedFile] = useState(null);
  const [Title, setImageTitle] = useState("");
  const [Description, setImageDescription] = useState("");

  

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
        alert("Complaint Uploded Successfully");

        // You can handle the result here if needed, e.g., show a success message
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    } else {
      alert("Please select a file and enter a title");
    }
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
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="qualification"
                  value={Title}
                  onChange={handleTitleChange}
                />
              </div>
              <div className="form-group col-12">
                <label>Complaint Description</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={Description}
                  onChange={handleDescriptionChange}
                  style={{ height: "100px" }}
                ></textarea>
              </div>
              <div className="form-group">
                <label > File</label>
                <br></br>
                <input
                  type="file"
                  onChange={handleFileChange}
                   className="form-control"
                  
                />
              </div>

              <div className="text-center col-12 mt-3">
              <button
                className="btn_1"
                style={{ backgroundColor: "#E55923", marginTop: "10px" }}
                onClick={handleSubmit}
              >
                Submit
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Complaint;

