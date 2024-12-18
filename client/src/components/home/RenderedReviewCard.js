// RenderedReviewCard.js
import React from "react";

const RenderedReviewCard = ({ review }) => {

  const displayStarRating = (rating) => {
    let fullStars = Math.floor(rating); 
    let halfStars = rating % 1 >= 0.5 ? 1 : 0; 
    let emptyStars = 5 - fullStars - halfStars; 

    let stars = "";
    stars += "★".repeat(fullStars); 
    stars += "☆".repeat(emptyStars); 
    if (halfStars) stars += "½"; 

    return stars;
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        {/* Display stars */}
        <span className="text-yellow-400">{displayStarRating(review.star_review)}</span>
      </div>
      <p className="text-sm mb-2">{review.comment || "No comment provided"}</p>
      {/* Display reviewer info if available */}
      {review.user && review.user.username ? (
        <p className="text-xs text-gray-600">- Reviewed by {review.user.username}</p>
      ) : (
        <p className="text-xs text-gray-600">- Reviewed by Anonymous</p>
      )}
    </div>
  );
};

export default RenderedReviewCard;
