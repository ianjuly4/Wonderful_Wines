import React, { useEffect, useState } from "react";
import Wines from "./Wines"
import { NavLink } from "react-router-dom"; 

function WhiteWineContainer({ displayStarRating }) {
  const [wines, setWines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const whiteWineTypes = [
    "chardonnay",
    "white burgundy",
    "sauvignon blanc",
    "riesling",
    "gewurztraminer",
    "viognier",
  ];

  useEffect(() => {
    fetch("/wines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((wineData) => {
  
        const filteredWhiteWines = wineData.filter((wine) =>
          wine.type && whiteWineTypes.includes(wine.type.trim().toLowerCase())
        );
        setWines(filteredWhiteWines);
      })
      .catch((error) => console.error("Error fetching wines:", error));
  }, []);

  const visibleWines = wines.slice(currentIndex, currentIndex + 4);

  const scrollRight = () => {
    if (currentIndex + 4 < wines.length) {
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
      <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">WHITE WINES</h3>

      <div className="relative w-full">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
          style={{ zIndex: 10 }}
        >
          ◁
        </button>

        <div className="wine-container flex overflow-hidden space-x-4">
          {visibleWines.map((wine, index) => (
            <NavLink to={`/wines/${wine.id}`} className="block">
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

export default WhiteWineContainer;
