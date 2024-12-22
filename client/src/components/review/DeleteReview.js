import React from "react";

function DeleteReview({ reviewId, onDelete }) {
  console.log(reviewId)
  return (
    <button
      onClick={() => onDelete(reviewId)}
      className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-black"
    >
      Delete
    </button>
  );
}

export default DeleteReview;
