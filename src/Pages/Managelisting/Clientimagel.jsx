import React, { useState } from "react";
import { Link } from "react-router-dom";

function Clientimagel() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitfile = (event) => {
    event.preventDefault();
    // Here you can handle the file submission, e.g., send it to a server
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      // Example: send formData using fetch or Axios
    }
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
                <form onSubmit={handleSubmitfile}>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{
                      border: "2px solid grey",
                      height: "50px",
                      width: "500px",
                    }}
                  />

                  {/* <button type="submit">Upload</button> */}
                </form>
                
              </div>
              <div className="form-group">
              <label for="name">Certification Title<span className="text-danger">*</span></label>
              <input
                    className="form-control form-control-sm"
                    type="name"
                    name="website"
                    id="website"
                    placeholder="Client Logo Title"
                  />
              </div>
              <Link
                  className="btn_1 "
                  style={{ backgroundColor: "orange", marginTop: "10px" }}
                >
                  Submit
                </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Clientimagel;
