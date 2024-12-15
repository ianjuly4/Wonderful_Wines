import React, {useEffect, useState} from "react"
import UserReviews from "./UserReviews"

function UserReviewsContainer(){
    const [reviews, setReviews] = useState([])
    const [userId, setUserId] = useState("");
    const [wines, setWines] = useState([])

    useEffect(() => {
        fetch("/check_session")
          .then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                console.log(data.id); 
                setUserId(data.id); 
              });
            }
          })
          .catch((error) => {
            console.error("Error checking session:", error);
          });
      }, []); 
      
      useEffect(() => {
        if (userId) { 
          fetch(`/userwines/${userId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((r) => r.json())
            .then((wineData) => {
              if (wineData && Array.isArray(wineData.wines)) {
                setWines(wineData.wines);
              } else {
                console.error("Invalid wine data:", wineData);
              }
            })
            .catch((error) => {
              console.error("Error fetching wines:", error);
            });
        }
      }, [userId]); 
      
      console.log(reviews)
      console.log(wines)

      return(
        <div>
        <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">
            YOUR REVIEWS
        </h3>
  
        {/* Wine list */}
        <div className="wine-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="review-card-container">
              <UserReviews review={review}  />
            </div>
          ))}
        </div>
      </div>
    );
}
export default UserReviewsContainer;
