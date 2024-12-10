import React, { useState, useEffect } from "react";
import AllWines from "./AllWines";
import WineFilter from "../WineFilter";

function AllWinesContainer({ displayStarRating }) {
  const [wines, setWines] = useState([]);
  const [wineName, setWineName] = useState("");
  const [winePrice, setWinePrice] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineLocation, setWineLocation] = useState("");

  useEffect(() => {
    fetch("/wines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((wineData) => {
        setWines(wineData);
      })
      .catch((error) => {
        console.error("Error fetching wines:", error);
      });
  }, []);

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
        {filteredWines.map((wine) => (
          <div key={wine.id} className="wine-card-container">
            <AllWines wine={wine} displayStarRating={displayStarRating} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllWinesContainer;
