import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import TopRatedWine from "./TopRatedWine"; 

function TopRatedContainer({ displayStarRating, wines }) {
  const [currentIndex, setCurrentIndex] = useState(0);


  const filteredTopRated = wines.filter((wine) => 
    wine.reviews?.some((review) => [3, 4, 5].includes(review.star_review))
  );


  const visibleWines = filteredTopRated.slice(currentIndex, currentIndex + 4);


  const scrollRight = () => {
    if (currentIndex + 4 < filteredTopRated.length) {
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
        TOP RATED WINES
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
          {visibleWines.map((wine) => (
             <NavLink to={`/wines/${wine.id}`} className="block">
              <TopRatedWine wine={wine} displayStarRating={displayStarRating} />
           </NavLink>
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
