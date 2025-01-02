import React, { useState } from "react";
import Wines from "./Wines";
import { NavLink } from "react-router-dom";

function RedWineContainer({ displayStarRating, wines }) {
  const [currentIndex, setCurrentIndex] = useState(0);

 
  const redWineTypes = [
    "merlot",
    "cabernet sauvignon",
    "pinot noir",
    "syrah",
    "zinfandel",
    "malbec",
    "shiraz",
    "red blend",
  ];

  
  const redWines = wines.filter((wine) =>
    redWineTypes.includes(wine.type.toLowerCase())
  );


  const visibleWines = redWines.slice(currentIndex, currentIndex + 4);

  const scrollRight = () => {
    if (currentIndex + 4 < redWines.length) {
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
      <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">RED WINES</h3>

      <div className="relative w-full">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          style={{ zIndex: 10 }}
        >
          ◁
        </button>

        <div className="wine-container flex overflow-hidden space-x-4">
          {visibleWines.map((wine) => (
            <NavLink to={`/wines/${wine.id}`} key={wine.id} className="block">
              <Wines wine={wine} displayStarRating={displayStarRating} />
            </NavLink>
          ))}
        </div>

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

export default RedWineContainer;
