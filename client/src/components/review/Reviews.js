import React, { useContext} from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../MyContext";
import Header from "../Header";
import UserReviews from "./UserReviews";
import AddReview from "./AddReview";
import UserError from "./UserError";

function Reviews() {
  const { wineId } = useParams();
  const { user, wines, setUser, setWines } = useContext(MyContext);
 
  console.log(wineId);

 
  const wine = wines.find((wine) => wine.id === parseInt(wineId));

  if (!wine) {
    return <div>....Loading Wine....</div>; 
  }

  
  const wineReviews = wine.reviews || [];  

 
  const userReview = user?.reviews?.find((review) => review.wine.id === wine.id);

  console.log(userReview);

  
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
            
            {/* Safely handle wine.reviews to avoid undefined errors */}
            <h5 className={`text-lg font-semibold mb-2 ${wineReviews.length > 0 && wineReviews[0]?.star_review ? "text-yellow-400" : "text-black"}`}>
              {wineReviews.length > 0 && wineReviews[0]?.star_review
                ? displayStarRating(wineReviews[0].star_review)
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
                  user={user} 
                  wine={wine}
                  setUser={setUser}
                  setWines={setWines}
                  wines={wines}
                />
              ) : (
                <AddReview wineId={wineId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
