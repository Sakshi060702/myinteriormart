import React from "react";

function Changepassword(){
    
    const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted!');
  };
    return(
        <>
                      <div className="tab-pane fade show active" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="add-review">
                  <h5>Change Password</h5>
                  <form className="icon-form-group" onSubmit={handleSubmit}>
      <div className="row">
        
       
         <div className="form-group col-12">
              <label>Old Password</label>
              <input className="form-control" type="password" name="old_password" />
              <i class="icon_lock_alt"></i>
            </div>
            <div className="form-group col-12">
              <label>New Password</label>
              <input className="form-control" type="password" name="new_password" />
              <i class="icon_lock_alt"></i>
            </div>
            <div className="form-group col-12">
              <label>Confirm New Password</label>
              <input className="form-control" type="password" name="confirm_new_password" />
              <i class="icon_lock_alt"></i>
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
export default Changepassword;