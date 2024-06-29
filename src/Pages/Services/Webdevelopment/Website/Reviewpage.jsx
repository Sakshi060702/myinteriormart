import React, { useState } from 'react';
// import profileImage from '../../FrontEnd/img/icon/profile.png';
import profileImage from '../../../../FrontEnd/img/icon/profile.png';


function Reviewpage() {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here
  };

  return (
    <>
      <div className="company-listing-tab">
        <div className="step">
          <div className="tab-content checkout">
            <div className="tab-pane fade show active" id="reviews" role="tabpanel" aria-labelledby="reviews">
              <div className="review-form">
                <span className="company-rating">
                  <span>4.0</span>
                  <div className="cat_star">
                    <i class="icon_star active"></i>
                        <i className="icon_star active"></i>
                        <i className="icon_star active"></i>
                        <i className="icon_star active"></i>
                        <i classname="icon_star"></i>
                  </div>
                  <span>20 Ratings</span>
                </span>
                <span className="desk_mrg">
                  <a className="btn btn-link" onClick={() => setIsReviewFormOpen(!isReviewFormOpen)} aria-expanded={isReviewFormOpen ? "true" : "false"} aria-controls="WriteReview" style={{color:'orange'}}>
                    <i className="icon-pencil"></i> Write Review
                  </a>
                </span>
              </div>

              
              {isReviewFormOpen && (
                <div className="write-review-form">
                  <h6>Leave a Review</h6>
                  <form onSubmit={handleSubmit}>
                    {/* Rating stars */}
                    <div className="form-group col-md-6">
                      <div className="stars">
                       <i class="icon_star active"></i>
                        <i className="icon_star active"></i>
                        <i className="icon_star active"></i>
                        <i className="icon_star active"></i>
                        <i classname="icon_star"></i>
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <label htmlFor="review_text">Your Review</label>
                      <textarea name="review_text" id="review_text" className="form-control" style={{ height: "130px" }} value={reviewText} onChange={handleReviewTextChange}></textarea>
                    </div>
                    <div className="form-group col-md-12">
                      <input type="submit" value="Submit" className="btn_1" id="submit-review" />
                    </div>
                  </form>
                </div>
              )}

              
            </div>
          </div>
<hr></hr>
      <div className="col-md-12 col-lg-12 review-user">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-2 col-3 text-center">
              <div className="review_img_sec">
                <img src={profileImage} className="rounded-circle img-thumbnail" alt="Profile" />
              </div>
            </div>
            <div className="col-lg-10 col-9 pl-lg-0">
              <div className="cat_star">
                <i className="icon_star active"></i>
                <i className="icon_star active"></i>
                <i className="icon_star active"></i>
                <i className="icon_star active"></i>
                <span><strong>Shaikh </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 months ago</span>
              </div>
              <p className="m-0">Very good company. afafasdf aasf asdfsadf adsfadfadf <a href="#0">view more...</a></p>

              <div className="owner_reply">
                <span><strong>Reply from Owner</strong> </span>
                <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. <a href="#0">view more...</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr></hr>
    <div className="col-md-12 col-lg-12 review-user">
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-2 col-3 text-center">
              <div className="review_img_sec">
                <img src={profileImage} className="rounded-circle img-thumbnail" alt="Profile" />
              </div>
            </div>
            <div className="col-lg-10 col-9 pl-lg-0">
              <div className="cat_star">
                <i className="icon_star active"></i>
                <i className="icon_star active"></i>
                <i className="icon_star active"></i>
                <i className="icon_star active"></i>
                <span><strong>Shaikh </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2 months ago</span>
              </div>
              <p className="m-0">Very good company. afafasdf aasf asdfsadf adsfadfadf <a href="#0">view more...</a></p>

              <div className="owner_reply">
                <span><strong>Reply from Owner</strong> </span>
                <p className="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. <a href="#0">view more...</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr></hr>
        </div>
      </div>
    </>
  )
}

export default Reviewpage;