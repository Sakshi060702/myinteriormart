import React, { useState, useEffect } from "react";
import profileImage from "../../FrontEnd/img/icon/profile.png";
import { useSelector } from "react-redux";

function Review1({ listingID }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchListingDetails();
  }, [listingID]);

  const fetchListingDetails = async () => {
    try {
      console.log(listingID);

      const response = await fetch(
        `https://apidev.myinteriormart.com/api/BindAllReviews/UserReviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            companyID: parseInt(listingID)
          })
        }
      );
      const data = await response.json();
      console.log("API Data:", data);

      if ( data.length > 0) {
        setCompanyDetails({ listingID }); 
        setReviews(data);
        console.log(listingID);
      } else {
        console.error(`No reviews found for company with listingID ${listingID}.`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Ratings/CreateOrUpdateRating`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ratings: rating,
            comment: reviewText,
            companyID: companyDetails.listingID
          })
        }
      );
      if (response.ok) {
        // Re-fetch the listing details to get the updated reviews
        await fetchListingDetails();
        setIsReviewFormOpen(false);
        setRating(0);
        setReviewText("");
        console.log(response);
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <div className="company-listing-tab">
        <div className="step">
          <div className="tab-content checkout">
            <div
              className="tab-pane fade show active"
              id="reviews"
              role="tabpanel"
              aria-labelledby="reviews"
            >
              <div className="review-form mb-3">
                <div className="d-flex justify-content-between align-items-center ">
                  <div className="Count_review">
                    {companyDetails && (
                      <div className="review-form mb-3">
                        <div className="d-flex justify-content-between  ">
                          <div className="Count_review">
                            {companyDetails.ratingCount} Count Reviews, 100%
                            genuine ratings from My Interior Mart users
                          </div>
                          <span className="desk_mrg">
                            <a
                              className="btn btn-link"
                              onClick={() =>
                                setIsReviewFormOpen(!isReviewFormOpen)
                              }
                              aria-expanded={
                                isReviewFormOpen ? "true" : "false"
                              }
                              aria-controls="WriteReview"
                              style={{ color: "orange" }}
                            >
                              <i className="icon-pencil"></i> Write Review
                            </a>
                          </span>
                        </div>
                      </div>
                    )}
                    {isReviewFormOpen && (
                      <div className="write-review-form">
                        <h6>Leave a Review</h6>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group col-md-6">
                            <div className="stars">
                              {Array(5)
                                .fill()
                                .map((_, i) => (
                                  <i
                                    key={i}
                                    className={`icon_star ${i < rating ? "active" : ""}`}
                                    style={{ color: i < rating ? "orange" : "gray" }}
                                    onClick={() => handleRatingChange(i + 1)}
                                  ></i>
                                ))}
                            </div>
                          </div>
                          <div className="form-group col-md-12">
                            <label htmlFor="review_text">Your Review</label>
                            <textarea
                              name="review_text"
                              id="review_text"
                              className="form-control"
                              style={{ height: "130px" }}
                              value={reviewText}
                              onChange={handleReviewTextChange}
                            ></textarea>
                          </div>
                          <div className="form-group col-md-12">
                            <input
                              type="submit"
                              value="Submit"
                              className="btn_1"
                              id="submit-review"
                            />
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="col-md-12 col-lg-12 review-user">
                    <div className="row">
                      <div className="col-lg-12">
                        <hr />
                        <div className="row" style={{ fontSize: "16px" }}>
                          {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                              <div key={index} className="col-lg-12 mb-3">
                                <div className="review-box">
                                  <div className="d-flex">
                                    <div className="col-lg-2 col-3 text-center">
                                      <div className="review_img_sec">
                                        <img
                                          src={`https://apidev.myinteriormart.com${review.imageUrl}`}
                                          alt={review.userName}
                                          style={{ width: "50px", height: "50px" }}
                                        />
                                      </div>
                                     
                                    </div>
                                    <div className="col-lg-10 col-9 pl-lg-0">
                                      <div className="cat-star">
                                        {Array(review.ratings)
                                          .fill()
                                          .map((_, i) => (
                                            <i
                                              key={i}
                                              className="icon_star active"
                                              style={{ color: "orange" }}
                                            />
                                          ))}
                                        <span>
                                          <b>{review.userName}</b>&nbsp;-&nbsp;&nbsp;
                                          <b>{review.date}</b>
                                        </span>
                                      </div>
                                      <p>{review.comment}</p>
                                    </div>
                                  </div>
                                  {review.ratingReplyMessage && (
                                    <div className="owner_reply">
                                      <span>
                                        <strong>Reply from Owner</strong>
                                      </span>
                                      <p className="m-0">{review.ratingReplyMessage}</p>
                                    </div>
                                  )}
                                </div>
                                <hr />
                              </div>
                            ))
                          ) : (
                            <p>No reviews available.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review1;
