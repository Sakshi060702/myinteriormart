import React from "react";

function AllReviews() {
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-12">
            <div className="profile-sidebar-content">
              <h4>Reviews</h4>
              <p className="add-lidting-title-from">
                Dashboard / Reviews
                <span>
                  <a className="back_btn mx-3">Back</a>
                </span>
              </p>
              <div className="list_general like-listing">
                <ul>
                  <li>
                    <div className="image">
                      <img alt=""/>
                    </div>
                    <span className="@classColor"></span>
                    <br></br>
                    <p className="description @classColor">
                      <i className="fa @classIcon @classColor"></i>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AllReviews;
