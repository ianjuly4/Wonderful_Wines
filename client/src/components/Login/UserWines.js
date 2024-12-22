import React from "react";

function AllWines({ wine, displayStarRating }) {
  const { name, type, image, location, flavor_profile, price, reviews } = wine;
  

  const star_review = reviews && reviews.length > 0 ? reviews[0].star_review : null;

  const defaultImage = "path_to_default_image.jpg"; 

  return (
    <div
      className="wine-card relative bg-cover bg-center rounded-lg shadow-lg border-2 border-gray-300 overflow-hidden"
      style={{
        backgroundImage: `url(${image || defaultImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "300px", 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30 z-0" />

      {/* Content of the card */}
      <div className="relative z-10 flex flex-col justify-between h-full p-4 text-white">
        <div className="flex flex-col flex-grow">
          <h3 className="font-bold text-xl mb-2 truncate">{name || "Unknown Wine"}</h3>
          <h5 className="text-base truncate">{type || "Unknown Type"}</h5>
          <h5 className="text-sm mt-2 truncate">{flavor_profile || "Unknown Flavor Profile"}</h5>
          <h5 className="text-sm mt-2 truncate">{location || "Unknown Location"}</h5>

          {/* Display Star Rating or "No reviews yet" */}
          <div className="text-yellow-400 mt-2">
            {star_review !== null
              ? displayStarRating(star_review) 
              : "No reviews yet"} {/* Fallback if no reviews are available */}
          </div>

          <h5 className="text-lg font-semibold mt-2">
            ${price !== undefined ? price.toFixed(2) : "Unknown Price"}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default AllWines;
