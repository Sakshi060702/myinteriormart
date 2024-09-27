import React from "react";
import leftImage from "../../FrontEnd/img/left.jpeg";

function SelectCategory(){
    return(
        <>
        <div className="tab-pane fade active show" id="v-pills-category" role="tabpanel" aria-labelledby="v-pills-category-tab">
      <h5>Post your free ad</h5>
      <div className="row py-5 selectcategoryblock">
        <div className="col-md-12 d-flex justify-content-center selectcategory">
          <div className="select_category_sec d-flex align-items-center">
            <div className="select_category_img_sec">
               <img src={leftImage} alt="img" className="select_category_img" />
            </div>
            <div className="select_category_info text-center">
              <h5>
                Select the appropriate category to post your ad
              </h5>
              <p>
                Not Sure? Give us a missed call @1234567890 and we will help you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
        </>
    )
}
export default SelectCategory;