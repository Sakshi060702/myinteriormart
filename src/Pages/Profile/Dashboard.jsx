import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <div
        className="tab-pane fade show active"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        <div className="add-review">
          <h5>Dashboard</h5>
          <div className="row">
            <div className="col-md-4 col-6 mb-3">
              <Link to={`/AllBookmark`}>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Bookmarks</div>
                  <div className="this_count">8</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link to={`/AllLike`}>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Likes</div>
                  <div className="this_count">8</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link to={`/AllReviews`}>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Reviews</div>
                  <div className="this_count">8</div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 col-6 mb-3">
              <Link to={`/AllSubscribe`}>
                <div className="add_listing_card d-flex align-items-center justify-content-start">
                  <div className="add_listing_card_title">Subscribe</div>
                  <div className="this_count">8</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
