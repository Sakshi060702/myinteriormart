import React, { useState, useEffect } from "react";
import profileImage from "../../FrontEnd/img/icon/profile.png";
import { useSelector } from "react-redux";

function Review1({ listingID }) {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [companyDetails, setCompanyDetails] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentReply, setCurrentReply] = useState("");
  const [currentRatingId, setCurrentRatingId] = useState(null);


  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // useEffect(() => {
  //   fetchListingDetails();
  // }, [listingID]);

  // const fetchListingDetails = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://apidev.myinteriormart.com/api/BindAllReviews/UserReviews`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
            
  //         },
  //         body: JSON.stringify({
  //           companyID: listingID.companyID
  //         })
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("API Data:", data);

  //     if (data.length > 0) {
  //       setCompanyDetails({ listingID, ratingCount: data.length }); // Set ratingCount
  //       setReviews(data);
  //     } else {
  //       setCompanyDetails({ listingID, ratingCount: 0 }); // Set ratingCount to 0 if no reviews
  //       console.error(`No reviews found for company with listingID ${listingID}.`);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

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
            companyID: listingID.companyID
          })
        }
      );
      if (response.ok) {
        // Re-fetch the listing details to get the updated reviews
        await fetchReviews();
        setIsReviewFormOpen(false);
        setRating(0);
        setReviewText("");
      } else {
        console.error("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleEditClick = (ratingId, reply) => {
    if (currentRatingId === ratingId) {
      console.log("ratingid",ratingId);
      console.log("currentid",currentRatingId);
      
      setIsEditMode(false);
      setCurrentRatingId(null);
      setCurrentReply("");

     
      

      
    } else {
      // Otherwise, open the form for the clicked review
      console.log("rating",ratingId);
      console.log("reply",reply);
      setCurrentRatingId(ratingId);
      setCurrentReply(reply);
      setIsEditMode(true);
    }
  };

  const handleReplyChange = (event) => {
    setCurrentReply(event.target.value);
  };

  const handleReplySubmit = async (event) => {
    event.preventDefault();


    const currentReview = reviews.find(review => review.ratingId === currentRatingId);

    const replyId = currentReview && currentReview.ratingReply ? currentReview.ratingReply.id : 0;
    // Submit the edited reply to the API
    const response = await fetch(
      "https://apidev.myinteriormart.com/api/BindAllReviews/UserReviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
          
        },
        body: JSON.stringify({
          operation: "UpdateReviewReply",
          ratingReply: {
            id: replyId,
            ratingId: currentRatingId,
            reply: currentReply,
            companyID: listingID.companyID
          },
        }),
      }
    );

    if (response.ok) {
      // Update the reviews state with the new reply
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.ratingId === currentRatingId
            ? {
                ...review,
                ratingReply: { ...review.ratingReply, reply: currentReply },
              }
            : review
        )
      );
      console.log(currentRatingId);
      console.log(currentReply);
    
      setIsEditMode(true);
      setCurrentRatingId(null);
      setCurrentReply("");
    } else {
      console.error("Failed to update reply");
    }
  };

 
    const fetchReviews = async () => {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/BindAllReviews/GetUserAllReviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
           
          },
          body: JSON.stringify({
            operation: "GetReviews",
            ratingReply: { reply: "" },
            companyID: listingID.companyID
            
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("reply",data);
        console.log(data);
        setReviews(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    };

    useEffect(() => {
      fetchReviews();
    }, [listingID]);
 


  return (
    <>
      <div className="company-listing-tab ">
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
                  <div className="Count_review writereview">
                    <div className="review-form mb-3">
                      <div className="d-flex justify-content-between  ">
                        <div className="Count_review">
                          {/* {companyDetails && (
                            <span>
                              {companyDetails.ratingCount} Reviews, 100% genuine ratings from My Interior Mart users
                            </span>
                          )} */}
                          
                        </div>
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
                    </div>

                    {isReviewFormOpen && (
                      <div className="write-review-form">
                        <h6 className="reviewheading">Leave a Review</h6>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group col-md-6 reviewstar">
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
                              className="form-control reviewTextArea"
                              
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
                      <div className="col-lg-12 reviewpage">
                        <hr />
                        <div className="row" style={{ fontSize: "16px",maxHeight:'300px',overflowY:'auto' }}>
                          {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                              <div key={index} className="col-lg-12 mb-3">
                                <div className="review-box userreviewbox">
                                  <div className="d-flex">
                                    <div className="col-lg-2 col-3 text-center">
                                      <div className="review_img_sec">
                                        <img
                                          src={`https://apidev.myinteriormart.com${review.userImage}`}
                                          alt={review.userName}
                                          style={{ width: "58px", height: "58px",borderRadius:'30px' }}
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
                                      <p className="reviewdescrp">{review.comment}</p>
                                    </div>
                                  </div>
                                 

<div className="owner_reply">
                          
                            <div>
                              <span>
                                <strong>Reply From Owner</strong>{" "}
                              </span>
                              {review.ratingReply && (
                              <p className="m-0">{review.ratingReply.reply}</p>
                            )}
                            </div>
                          
                        </div>
                                  {/* code for reply rating */}
                                  {/* <div className="owner_reply">
                          {review.ratingReply && (
                            <div>
                              <span>
                                <strong>Reply</strong>{" "}
                              </span>
                              <p className="m-0">{review.ratingReply.reply}</p>
                            </div>
                          )}
                        </div>
                        <button
                        className="btn_1 gray mb-3 reply"
                        onClick={() =>
                          handleEditClick(
                            review.ratingId,
                            review.ratingReply ? review.ratingReply.reply : ""
                          )
                        }
                      >
                        Edit Reply
                      </button>
                      {isEditMode && currentRatingId === review.ratingId && (
                        <div className="edit-reply-form">
                          <form onSubmit={handleReplySubmit}>
                            <div className="form-group col-md-12">
                              <label htmlFor="reply_text">Edit Reply</label>
                              <textarea
                                name="reply_text"
                                id="reply_text"
                                className="form-control"
                                style={{ height: "130px" }}
                                value={currentReply}
                                onChange={handleReplyChange}
                              ></textarea>
                            </div>
                            <div className="form-group col-md-12">
                              <input
                                type="submit"
                                value="Submit"
                                className="btn_1"
                                id="submit-reply"
                                style={{backgroundColor:'orange'}}
                              />
                            </div>
                          </form>
                        </div>
                      )} */}
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
