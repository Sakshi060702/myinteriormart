import React from "react";

function LwriteReview() {

    
    



  return (
   <div >
      <div className="card card-body">
        <h6>Leave a Review</h6>
        <form>
          <div className="row">
            <div className="form-group col-md-6">
              <div className="stars">
                <input className="star star-1" id="star-1" value="1" type="radio" name="Ratings" />
                <label className="icon_star star-1" htmlFor="star-1"></label>
                <input className="star star-2" id="star-2" value="2" type="radio" name="Ratings" />
                <label className="icon_star star-2" htmlFor="star-2"></label>
                <input className="star star-3" id="star-3" value="3" type="radio" name="Ratings" />
                <label className="icon_star star-3" htmlFor="star-3"></label>
                <input className="star star-4" id="star-4" value="4" type="radio" name="Ratings" />
                <label className="icon_star star-4" htmlFor="star-4"></label>
                <input className="star star-5" id="star-5" value="5" type="radio" name="Ratings" />
                <label className="icon_star star-5" htmlFor="star-5"></label>
              </div>
            </div>
            <div className="form-group col-md-12">
              <label htmlFor="review_text">Your Review</label>
              <textarea name="review_text" id="review_text" className="form-control" style={{ height: "130px" }}></textarea>
            </div>
            <div className="form-group col-md-12">
              <input type="submit" value="Submit" className="btn_1" id="submit-review" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LwriteReview;