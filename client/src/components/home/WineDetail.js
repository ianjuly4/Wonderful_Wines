import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { NavLink } from "react-router-dom";
import Reviews from "../review/Reviews"
import RenderedReviewCard from "./RenderedReviewCard";

function WineDetail() {
  const { wineId } = useParams();
  const [wine, setWine] = useState(null);

  useEffect(() => {
    fetch(`/wines/${wineId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch wine details");
        }
        return response.json();
      })
      .then((wineData) => {
        setWine(wineData);
      })
      .catch((error) => {
        console.error("Error fetching wine details:", error);
      });
  }, [wineId]);

  if (!wine) {
    return <div>Loading...</div>;
  }

  
  const displayStarRating = (rating) => {
    if (typeof rating !== "number") {
      return "No rating available";
    }
    let fullStars = Math.floor(rating);
    let halfStars = rating % 1 >= 0.5 ? 1 : 0;
    let emptyStars = 5 - fullStars - halfStars;

    let stars = "";
    stars += "★".repeat(fullStars);
    stars += "☆".repeat(emptyStars);
    if (halfStars) stars += "½";

    return stars;
  };


  function renderReviewCards() {
    if (Array.isArray(wine.reviews) && wine.reviews.length > 0) {
      return wine.reviews.map((review) => (
        <div key={review.id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
          <div className="flex items-center mb-2">
            {/* Display stars */}
            <span className="text-yellow-400">{displayStarRating(review.star_review)}</span>
          </div>
          <p className="text-sm mb-2">{review.comment || "No comment provided"}</p>
          {review.user && (
            <p className="text-xs text-gray-600">- Reviewed by {review.user || "Anonymous"}</p>
          )}
        </div>
      ));
    } else {
      return <p>No reviews yet for this wine</p>;
    }
  }

  const defaultImage = "https://www.winespectrum.com/wp-content/uploads/2024/12/A1662-1.png";

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white flex justify-center items-center">
        {/* Centered container */}
        <div className="relative bg-white border-4 border-black rounded-lg shadow-lg w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 p-8">
          {/* Wine Image - displayed at the top */}
          <img
            src={wine.image || defaultImage}
            alt={wine.name || "Wine Image"}
            className="mx-auto h-64 object-cover rounded-lg mb-6"
          />

          {/* Content inside the wine card */}
          <div className="text-black">
            <h3 className="font-bold text-2xl mb-3">{wine.name || "Unknown Wine"}</h3>
            <h5 className="text-xl mb-2">{wine.type || "Unknown Type"}</h5>
            <h5 className="text-lg mb-4">Where to Find: {wine.location || "Unknown Location"}</h5>
            <p className="text-sm mb-6">{wine.flavor_profile || "No flavor profile available"}</p>
            
            {/* Display rating */}
            <h5 className={`text-lg font-semibold mb-2 
              ${wine.reviews && wine.reviews[0]?.star_review ? "text-yellow-400" : "text-black"}`}>
              {wine.reviews && wine.reviews[0]?.star_review 
              ? displayStarRating(wine.reviews[0].star_review) 
              : "No rating available"}
            </h5>


            {/* Price */}
            <h5 className="text-lg font-semibold mt-2">
              ${wine.price ? wine.price.toFixed(2) : "Unknown Price"}
            </h5>

            {/* Reviews section */}
          <div className="mt-4">
            <h5 className="text-lg font-semibold">Reviews</h5>
            <NavLink to="/reviews/new">
                Add Review
            </NavLink>
            {wine.reviews && wine.reviews.length > 0 ? (
              wine.reviews.map((review) => (
                  <RenderedReviewCard key={review.id} review={review} />

              ))
            ) : (
              <p>No reviews yet for this wine</p>
            )}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WineDetail;
