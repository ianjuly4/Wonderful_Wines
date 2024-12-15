import React, {useEffect, useState} from "react";
import Reviews from "./Reviews"
import WineFilter from "../WineFilter"


function ReviewContainer(){
    const [reviews, setReviews] = useState([])
    const [wineName, setWineName] = useState("");
    const [winePrice, setWinePrice] = useState("");
    const [wineType, setWineType] = useState("");
    const [wineLocation, setWineLocation] = useState("");
    

    useEffect(() => {
        fetch("/reviews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((r) => r.json())
          .then((reviewData) => {
            console.log(reviewData)
            setReviews(reviewData);
          });
      }, []);

    const displayStarRating = (rating) => {
        let fullStars = Math.floor(rating); 
        let halfStars = rating % 1 >= 0.5 ? 1 : 0; 
        let emptyStars = 5 - fullStars - halfStars; 
    
        let stars = "";
        stars += "★".repeat(fullStars); 
        stars += "☆".repeat(emptyStars); 
        if (halfStars) stars += "½"; 
    
        return stars;
    }

    return(
        <div>
        <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">
          ALL REVIEWS
        </h3>
  
        {/* Wine list */}
        <div className="wine-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="review-card-container">
              <Reviews review={review} displayStarRating={displayStarRating} />
            </div>
          ))}
        </div>
      </div>
    );
}
export default ReviewContainer;