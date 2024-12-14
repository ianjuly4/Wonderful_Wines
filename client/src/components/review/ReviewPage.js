import React, { useState, useEffect } from "react";
import Header from "../Header";
import Reviews from "../review/Reviews";

function ReviewPage() {
  const [wines, setWines] = useState([])
  const [comment, setComment] = useState("");
  const [starReview, setStarReview] = useState("");
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

 
  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserId(data.id);
            setErrorMessage(""); 
          });
        } else {
          setErrorMessage("You must be logged in to update wine reviews.");
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setErrorMessage("Error checking session. Please try again later.");
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
            setErrorMessage("No wines found for the current user.");
          }
        })
        .catch((error) => {
          console.error("Error fetching wines:", error);
          setErrorMessage("Error fetching wines. Please try again later.");
        });
    }
  }, [userId]);

  
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

  {/*const handleDelete = (reviewId) => {
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
  };*/}

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header />
      <div className="flex space-x-8 p-4">
        <div className="w-1/4">
          {/* Wine filter component */}
          {/* <WineFilter 
            wineName={wineName} 
            setWineName={setWineName} 
            wineType={wineType} 
            setWineType={setWineType} 
            winePrice={winePrice} 
            setWinePrice={setWinePrice} 
            starReview={starReview} 
            setStarReview={setStarReview} 
          /> */}
        </div>
       
        <div>
          <div className="w-3/4">
            {/* Error message for login */}
            {!userId ? (
              <p className="text-black">Please Login to Continue</p>
            ) : (
              <>
                {errorMessage ? (
                  <p className="text-black">{errorMessage}</p>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {wines.length === 0 ? (
                      <p>No wines found for the current user.</p>
                    ) : (
                      wines.map((wine, index) => (
                        <div key={wine.id} className="relative flex-shrink-0 w-1/4">
                          <Reviews 
                            wine={wine} 
                            number={index + 1} 
                            displayStarRating={displayStarRating}
                             
                            /*onDelete={handleDelete}*/ 
                          />
                        </div>
                      ))
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
