import React from "react";

function TopRatedWine({ displayStarRating, wine }) {
  const { name, type, image, price, reviews } = wine;
  
 
  const review = reviews?.[0] || {}; 
  const { star_review } = review;

  const defaultImage = "path_to_default_image.jpg"; 

  return (
    <div
      className="w-64 h-80 rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg p-4 bg-white flex flex-col relative"
      style={{
        backgroundImage: `url(${image || defaultImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0" />
      
      <div className="relative z-10 flex flex-col justify-between h-full p-4">
        <div>
          {/* Display Star Rating */}
          <h5 className="text-lg font-semibold text-yellow-400 mb-2">
            {displayStarRating(star_review || 0)} 
          </h5>

          {/* Wine Name and Type */}
          <h3 className="font-bold text-xl text-white mb-2">{name || "Unknown Wine"}</h3>
          <h5 className="text-white text-base mb-2">{type || "Unknown Type"}</h5>
        </div>

        {/* Wine Price */}
        <h5 className="text-lg font-semibold text-white mt-4">
          ${price !== undefined ? price : "Unknown Price"}
        </h5>
      </div>
    </div>
  );
}

export default TopRatedWine;
