import React,{useState} from "react";

function Complaint(){
    
    const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted!');
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmitfile = (event) => {
    event.preventDefault();
    // Here you can handle the file submission, e.g., send it to a server
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Example: send formData using fetch or Axios
    }
  };
    return(
        <>
                      <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Complaint</h5>
                  <form className="icon-form-group" onSubmit={handleSubmit}>
      <div className="row">
        
       
         <div className="form-group col-12">
              <label>Title</label>
              <input className="form-control" type="text" name="qualification" />
            </div>
            <div className="form-group col-12">
              <label>Complaint Description</label>
              <textarea className="form-control" id="address" name="address" style={{ height: '100px' }}></textarea>
            </div>
               <div className="form-group">
       <label>Upload File</label>
      <form onSubmit={handleSubmitfile}>
        <input type="file" onChange={handleFileChange} />
        {/* <button type="submit">Upload</button> */}
      </form>
    </div>
            
            <div className="text-center col-12 mt-3">
              <input type="submit" value="Submit" className="btn_1 full-width" />
            </div>
       
      </div>
    </form>
                </div>
              </div>
        </>
    )
}
export default Complaint;