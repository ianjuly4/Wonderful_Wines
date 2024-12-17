import React from "react";

function UserReviews({ wine, displayStarRating, showReview }) {
  const { comment, starReview, name, image, id } = wine;
  const defaultImage = "path_to_default_image.jpg"; 

  return (
    <div className="wine-card relative bg-cover bg-center rounded-lg shadow-lg border-2 border-gray-300 overflow-hidden w-full h-[350px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-black opacity-30 z-0"
        style={{
          backgroundImage: `url(${image || defaultImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 text-black">
        <div className="flex flex-col flex-grow">
          <h3 className="font-bold text-2xl mb-3 truncate">
            {name || "Unknown Wine"}
          </h3>
          <h5 className="text-lg font-semibold mt-2 text-yellow-400">
            {displayStarRating(starReview)}
          </h5>

          {comment && (
            <p className="mt-2 text-white text-sm">{comment}</p>
          )}
        </div>

        <button
          onClick={() => showReview(wine.id)}
          className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
        >
          View Review
        </button>
      </div>
    </div>
  );
}

export default UserReviews;
