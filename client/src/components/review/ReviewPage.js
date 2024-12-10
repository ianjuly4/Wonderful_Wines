import React, {useState, useEffect} from "react";
import Header from "../Header"
import Reviews from "../review/Reviews"

function ReviewPage(){
  const [reviews, setReviews] = useState([])
  const [comment, setComment] = useState("")
  const [starReview, setStarReview] = useState("")

  useEffect(() => {
    fetch("/reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((reviewData) => {
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
};
  const handleDelete = (reviewId) => {
    fetch(`/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(() => {
        setReviews(reviews.filter((review) => review.id !== reviewId));
      })
      .catch((error) => {
        console.error("Error deleting wine:", error);
      });
  };


    
    return(
        <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
            <Header />
            <div className="flex space-x-8 p-4">
                <div className="w-1/4">
                {/*<WineFilter
                    wineName={wineName}
                    setWineName={setWineName}
                    wineType={wineType}
                    setWineType={setWineType}
                    winePrice={winePrice}
                    setWinePrice={setWinePrice}
                    starReview={starReview} 
                    setStarReview={setStarReview} 
                />*/}
                </div>
            <div className="w-3/4">
                <div className="flex flex-wrap gap-4">
                    {reviews.map((review, index) => (
                    <div key={review.id} className="relative flex-shrink-0 w-1/4">
                        <Reviews 
                        review={review} 
                        number={index + 1} 
                        displayStarRating={displayStarRating}
                        onDelete={handleDelete}
                        />
                    </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    )
}
export default ReviewPage;