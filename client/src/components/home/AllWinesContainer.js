import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import AllWines from "./AllWines";
import AllWinesFilter from "./AllWinesFilter";

function AllWinesContainer({ displayStarRating, wines }) {
  const [wineName, setWineName] = useState("");
  const [winePrice, setWinePrice] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineLocation, setWineLocation] = useState("");

 
  if (wines.length === 0) {
    return <div>Loading...</div>;
  }

  const filteredWines = wines.filter((wine) => {
    const matchesPrice =
      winePrice === "All" || winePrice === "" || wine.price === parseInt(winePrice, 10);
    const matchesType = wine.type.toLowerCase().includes(wineType.toLowerCase());
    const matchesName = wine.name.toLowerCase().includes(wineName.toLowerCase());
    const matchesLocation =
      wineLocation === "" || wine.location.toLowerCase().includes(wineLocation.toLowerCase());
    return matchesPrice && matchesType && matchesName && matchesLocation;
  });

  return (
    <div>
      <h3 className="text-2xl font-bold w-full mb-6 text-gray-800 italic">
        ALL WINES
      </h3>

      {/* WineFilter in a row layout */}
      <div className="flex gap-6 items-center mb-6 w-full wine-filter-container flex-wrap">
        <AllWinesFilter
          onSearchWineTypeChange={setWineType}
          onSearchWineNameChange={setWineName}
          onSearchWinePriceChange={setWinePrice}
          onSearchWineLocationChange={setWineLocation}
          searchWineName={wineName}
          searchWineType={wineType}
          searchWinePrice={winePrice}
          searchWineLocation={wineLocation}
        />
      </div>

      {/* Wine list */}
      <div className="wine-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredWines.map((wine) => (
          <div key={wine.id} className="wine-card-container">
            <NavLink to={`/wines/${wine.id}`} className="block">
              <AllWines wine={wine} displayStarRating={displayStarRating} />
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllWinesContainer;
