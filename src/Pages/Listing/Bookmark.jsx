// BookmarkButton.js

import React, { useState, useEffect } from "react";

const BookmarkButton = ({ listingId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    // Fetch bookmark status on component mount
    fetchBookmarkStatus();
  }, []);

  const fetchBookmarkStatus = async () => {
    try {
      // Replace with actual API endpoint to fetch bookmark status
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Bookmarks/GetBookmarkStatus?listingId=${listingId}`
      );
      const data = await response.json();
      setIsBookmarked(data.bookmark); // Assuming API returns a boolean `bookmark` status
    } catch (error) {
      console.error("Error fetching bookmark status:", error);
    }
  };

  const toggleBookmark = async () => {
    try {
      // Replace with actual API endpoint to toggle bookmark
      const response = await fetch(
        `https://apidev.myinteriormart.com/api/Bookmarks/ToggleBookmark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listingId: listingId,
            bookmark: !isBookmarked, // Toggle bookmark status
          }),
        }
      );
      if (response.ok) {
        setIsBookmarked(!isBookmarked); // Update local state after successful toggle
      } else {
        console.error("Failed to toggle bookmark");
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  return (
    <button
      id="BookmarkMe"
      className={`pushRight btn btn-light btn-sm ${
        isBookmarked ? "bookmarked" : ""
      }`}
      onClick={toggleBookmark}
    >
      <i className={`fa ${isBookmarked ? "fa-bookmark" : "fa-bookmark-o"}`}></i>
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
};

export default BookmarkButton;
