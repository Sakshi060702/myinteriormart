import React from "react";

function Suggestion(){
    
    const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted!');
  };
    return(
        <>
        <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Suggestion</h5>
                  <form className="icon-form-group" onSubmit={handleSubmit}>
      <div className="row">
        
       
         <div className="form-group col-12">
              <label>Title</label>
              <input className="form-control" type="text" name="qualification" />
            </div>
            <div className="form-group col-12">
              <label>Description</label>
              <textarea className="form-control" id="address" name="address" style={{ height: '100px' }}></textarea>
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
export default Suggestion;