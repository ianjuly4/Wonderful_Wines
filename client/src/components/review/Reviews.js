import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import Header from "../Header";
import UserReviews from "./UserReviews";
import AddReview from "./AddReview";
import UserError from "./UserError";

function Reviews() {
  const { wineId } = useParams();
  const { user, wines, setWines, updateWineReviews } = useContext(MyContext);
  const [wine, setWine] = useState(null);

  useEffect(() => {
    const foundWine = wines.find((wine) => wine.id === parseInt(wineId));
    setWine(foundWine);

  }, [wineId, wines]); 


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

  const defaultImage = "https://www.winespectrum.com/wp-content/uploads/2024/12/A1662-1.png";

  
  if (!wine) {
    return <div>Loading wine details...</div>;
  }


  const userReview = wine.reviews?.find((review) => review.user && review.user.id === user?.id);

  const handleReviewUpdate = (updatedReview) => {
    updateWineReviews(wineId, updatedReview);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white flex justify-center items-center">
        <div className="relative bg-white border-4 border-black rounded-lg shadow-lg w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 p-8">
          <img
            src={wine.image || defaultImage}
            alt={wine.name || "Wine Image"}
            className="mx-auto h-64 object-cover rounded-lg mb-6"
          />

          <div className="text-black">
            <h3 className="font-bold text-2xl mb-3">{wine.name || "Unknown Wine"}</h3>
            <h5 className="text-xl mb-2">{wine.type || "Unknown Type"}</h5>
            <h5 className="text-lg mb-4">Where to Find: {wine.location || "Unknown Location"}</h5>
            <p className="text-sm mb-6">{wine.flavor_profile || "No flavor profile available"}</p>
            
            <h5 className={`text-lg font-semibold mb-2 ${wine.reviews && wine.reviews[0]?.star_review ? "text-yellow-400" : "text-black"}`}>
              {wine.reviews && wine.reviews[0]?.star_review
                ? displayStarRating(wine.reviews[0].star_review)
                : "No rating available"}
            </h5>

            <h5 className="text-lg font-semibold mt-2">
              ${wine.price ? wine.price.toFixed(2) : "Unknown Price"}
            </h5>

            <div className="mt-4">
              {/* Conditional rendering based on user state */}
              {!user ? (
                <UserError />
              ) : userReview ? (
                <UserReviews 
                  wineId={wineId} 
                  displayStarRating={displayStarRating} 
                  userReview={userReview} 
                  handleReviewUpdate={handleReviewUpdate} 
                />
              ) : (
                <AddReview 
                  wineId={wineId} 
                  handleReviewUpdate={handleReviewUpdate} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
