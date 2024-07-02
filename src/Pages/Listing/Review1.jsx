import React, { useState, useEffect } from "react";
import profileImage from "../../FrontEnd/img/icon/profile.png";

function Review1({ listingId }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    fetchListingDetails();
  }, [listingId]);
  
    const fetchListingDetails = async () => {
      try {
        const response = await fetch(
          `https://apidev.myinteriormart.com/api/Listings/GetCategoriesListing`
        );
        const data = await response.json();
        console.log("API Data:", data); 
        const company = data.find(
          (listing) => listing.listingId.toString() === listingId
        );
        console.log("Company Data:", company); 
        if (company) {
          setCompanyDetails(company);
        } else {
          console.error(`Company with listingId ${listingId} not found.`);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform submission logic here
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
              {companyDetails && (
                <div className="review-form">
                  <span className="company-rating">
                    <span>{companyDetails.ratingAverage}</span>
                    <div className="cat_star">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`icon_star ${
                            i < companyDetails.ratingAverage ? "active" : ""
                          }`}
                        ></i>
                      ))}
                    </div>
                    <span>{companyDetails.ratingCount} Ratings</span>
                  </span>
                  <span className="desk_mrg">
                    <a
                      className="btn btn-link"
                      onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                      aria-expanded={isReviewFormOpen ? "true" : "false"}
                      aria-controls="WriteReview"
                      style={{ color: "orange" }}
                    >
                      <i className="icon-pencil"></i> Write Review
                    </a>
                  </span>
                </div>
              )}

              {isReviewFormOpen && (
                <div className="write-review-form">
                  <h6>Leave a Review</h6>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group col-md-6">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`icon_star ${
                              i < rating ? "active" : ""
                            }`}
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

<div className="reviews-list">
                {companyDetails && companyDetails.reviews && companyDetails.reviews.length > 0 ? (
                  companyDetails.reviews.map((review, index) => (
                    <div key={index} className="review">
                      <div className="review-header">
                        <img
                          src={review.userImage || profileImage}
                          alt={review.userName}
                          className="review-user-image"
                        />
                        <div className="review-user-details">
                          <h5>{review.userName}</h5>
                          <div className="review-rating">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`icon_star ${
                                  i < review.ratings ? "active" : ""
                                }`}
                              ></i>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="review-body">
                        <p>{review.comment}</p>
                        <span className="review-date">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No reviews available.</p>
                )}
              </div>
            </div>
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );
}

export default Review1;
