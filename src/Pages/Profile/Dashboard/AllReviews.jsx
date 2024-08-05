import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import withAuthh from "../../../Hoc/withAuthh";

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentReply, setCurrentReply] = useState("");
  const [currentRatingId, setCurrentRatingId] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        "https://apidev.myinteriormart.com/api/AllBookMark/GetUserAllMyReviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            operation: "GetReviews",
            ratingReply: { reply: "" },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    };

    fetchReviews();
  }, [token]);

  const handleEditClick = (ratingId, reply) => {
    if (currentRatingId === ratingId) {
      // If the current review is already in edit mode, close the form
      setIsEditMode(false);
      setCurrentRatingId(null);
      setCurrentReply("");
    } else {
      // Otherwise, open the form for the clicked review
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
    // Submit the edited reply to the API
    const response = await fetch(
      "https://apidev.myinteriormart.com/api/AllBookMark/GetUserAllMyReviews",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          operation: "UpdateReviewReply",
          ratingReply: {
            id: currentRatingId,
            ratingId: currentRatingId,
            reply: currentReply,
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
      setIsEditMode(false);
      setCurrentRatingId(null);
      setCurrentReply("");
    } else {
      console.error("Failed to update reply");
    }
  };

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
                <Link to="/dashboard" className="back_btn mx-3">Back</Link>
                </span>
              </p>
              <div className="list_general reviews">
                <ul>
                  {reviews.map((review) => (
                    <li key={review.ratingId}>
                      <div className="li">
                        <figure>
                          <img src={`https://apidev.myinteriormart.com${review.userImage}`} alt={review.userName} />
                        </figure>
                        <span>{review.date}</span>
                        <div className="company-rating pl-2 d-inline-flex">
                          <div className="cat_star" >
                            {Array.from({ length: review.rating }, (_, i) => (
                              <i key={i} className="icon_star" style={{color:'orange'}}></i>
                            ))}
                            {Array.from(
                              { length: 5 - review.rating },
                              (_, i) => (
                                <i key={i} className="icon_star" style={{color:'orange'}}></i>
                              )
                            )}
                          </div>
                        </div>

                        <h4>{review.userName}</h4>
                        <p>{review.comment}</p>
                        <div className="owner_reply">
                          {review.ratingReply && (
                            <div>
                              <span>
                                <strong>Reply</strong>{" "}
                              </span>
                              <p className="m-0">{review.ratingReply.reply}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 p-0 mt-3 mb-2">
                        <div className="inline-popups mr-2"></div>
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
                      )}
                    </li>
                  ))}
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
