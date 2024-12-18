import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import AllWines from "./AllWines";
import WineFilter from "../WineFilter";

function AllWinesContainer({ displayStarRating, wines }) {
  const [wineName, setWineName] = useState("");
  const [winePrice, setWinePrice] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineLocation, setWineLocation] = useState("");

  if (wines.length === 0) {
    return <div>Loading...</div>;
  }

  const onSearchWineNameChange = (text) => setWineName(text);
  const onSearchWineTypeChange = (text) => setWineType(text);
  const onSearchWinePriceChange = (number) => setWinePrice(number);
  const onSearchWineLocationChange = (location) => setWineLocation(location);

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

      {/* Flex container for WineFilter */}
      <div className="flex gap-6 items-center mb-6 w-full wine-filter-container">
        <WineFilter
          onSearchWineTypeChange={onSearchWineTypeChange}
          onSearchWineNameChange={onSearchWineNameChange}
          onSearchWinePriceChange={onSearchWinePriceChange}
          onSearchWineLocationChange={onSearchWineLocationChange}
          searchWineName={wineName}
          searchWineType={wineType}
          searchWinePrice={winePrice}
          searchWineLocation={wineLocation}
        />
      </div>

      {/* Wine list */}
      <div className="wine-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wines.map((wine) => (
          <div key={wine.id} className="wine-card-container">
            {/* Wrap each wine card with NavLink to navigate to wine details page */}
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
