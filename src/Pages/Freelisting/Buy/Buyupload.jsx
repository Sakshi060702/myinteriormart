import React,{useState} from "react";
import { Link } from "react-router-dom";

function Buyupload()
{
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

    <div className="tab1" style={{ display: 'block' }}>
  
    <h4>Upload Images</h4>
     <p className="add-lidting-title-from"></p>

    <div className="row">
        <div className="form-group col-md-4">
            <form onSubmit={handleSubmitfile}>
        <input type="file" onChange={handleFileChange} />
        {/* <button type="submit">Upload</button> */}
      </form>
        </div>
        
        <div className="text-left col-12 mt-3">
            <Link to="/Productinfo" className="btn_1 mx-2">Back</Link>
            <Link to="/paymentmode" className="btn_1 ">Submit</Link>

        </div>
    </div>

        </div>
       
    )
}

export default Buyupload;