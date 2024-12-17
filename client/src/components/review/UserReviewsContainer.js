import React, { useEffect, useState } from "react";
import UserReviews from "./UserReviews";

function UserReviewsContainer() {
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(null);  
  const [wines, setWines] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedWine, setSelectedWine] = useState(null);  
  const [newReview, setNewReview] = useState("");  

  
  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserId(data.id);
            setErrorMessage("");
          });
        } else {
          setErrorMessage("You must be logged in to update wines.");
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setErrorMessage("Error checking session. Please try again later.");
      });
  }, []);  

 
  useEffect(() => {
    if (userId !== null) {
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

  const handleWineClick = (wine) => {
    setSelectedWine(wine);  
    setNewReview(wine.comment || "");  
  };

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);  
  };

  const handleUpdateReview = () => {
    fetch(`/reviews/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: newReview }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedWine({ ...selectedWine, comment: newReview });
        alert("Review updated!");
      })
      .catch((error) => {
        console.error("Error updating review:", error);
        alert("Failed to update review.");
      });
  };

  const handleDeleteReview = () => {
    fetch(`/wines/${selectedWine.id}/delete`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setSelectedWine(null);
        setWines(wines.filter((wine) => wine.id !== selectedWine.id));
        alert("Review deleted!");
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        alert("Failed to delete review.");
      });
  };

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

  return (
    <div>
      <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">
        YOUR REVIEWS
      </h3>

      {/* Wine list */}
      <div className="w-3/4">
        {!userId ? (
          <p className="text-black">Please Login to see your reviewed wines</p>
        ) : (
          <>
            {errorMessage ? (
              <p className="text-black">{errorMessage}</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {wines.length === 0 ? (
                  <p>No wines found for the current user.</p>
                ) : (
                  wines.map((wine) => (
                    <div key={wine.id} className="relative flex-shrink-0 w-1/4">
                      <UserReviews
                        wine={wine}
                        displayStarRating={displayStarRating}
                        showReview={() => handleWineClick(wine)}
                      />
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Display selected wine review and form */}

      {selectedWine && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h4 className="text-xl font-bold">{selectedWine.name} - Review</h4>
          <p>{displayStarRating(selectedWine.starReview)}</p>
          <textarea
            value={newReview}
            onChange={handleReviewChange}
            rows="4"
            className="mt-2 w-full p-2 border rounded-md"
            placeholder="Write your review..."
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleUpdateReview}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              Update Review
            </button>
            <button
              onClick={handleDeleteReview}
              className="px-6 py-3 bg-red-600 text-white rounded-lg"
            >
              Delete Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserReviewsContainer;
