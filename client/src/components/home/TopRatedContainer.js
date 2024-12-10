import React, { useState, useEffect } from "react";
import TopRatedWine from "./TopRatedWine";

function TopRatedContainer({ displayStarRating }) {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const topRatedWines = [3, 4, 5];

  useEffect(() => {
    fetch("/reviews", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((reviewData) => {
        const filteredTopRated = reviewData.filter((review) =>
          topRatedWines.includes(review.star_review)
        );
        setReviews(filteredTopRated);
      });
  }, []);

  const visibleWines = reviews.slice(currentIndex, currentIndex + 4);

  const scrollRight = () => {
    if (currentIndex + 4 < reviews.length) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  const scrollLeft = () => {
    if (currentIndex - 4 >= 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">
        TOP RATED WINE
      </h3>

      <div className="relative w-full">
        {/* Left arrow button */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          style={{ zIndex: 10 }}
        >
          ◁
        </button>

        {/* Container for the wine cards, horizontally scrollable */}
        <div className="wine-container flex overflow-hidden space-x-4">
          {visibleWines.map((review) => (
            <div key={review.id} className="m-4 w-64">
              <TopRatedWine review={review} displayStarRating={displayStarRating} />
            </div>
          ))}
        </div>

        {/* Right arrow button */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          style={{ zIndex: 10 }}
        >
          ▷
        </button>
      </div>
    </div>
  );
}

export default TopRatedContainer;
