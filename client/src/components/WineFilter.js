import React from "react";

function WineFilter({
  searchWineName,
  searchWineType,
  searchWinePrice,
  searchWineLocation,
  onSearchWineNameChange,
  onSearchWineTypeChange,
  onSearchWinePriceChange,
  onSearchWineLocationChange
}) {
  return (
    <div className="p-4 rounded shadow-lg flex flex-col gap-4">
      <input
        type="text"
        placeholder="Filter by Name"
        value={searchWineName}
        onChange={(e) => onSearchWineNameChange(e.target.value)}
        style={{ border: "2px solid black", padding: "10px" }}
        aria-label="Filter by Name"
      />
      <input
        type="text"
        placeholder="Filter by Type"
        value={searchWineType}
        onChange={(e) => onSearchWineTypeChange(e.target.value)}
        style={{ border: "2px solid black", padding: "10px" }}
        aria-label="Filter by Type"
      />
      <input
        type="number"
        placeholder="Filter by Price"
        value={searchWinePrice}
        onChange={(e) => onSearchWinePriceChange(e.target.value)}
        style={{ border: "2px solid black", padding: "10px" }}
        aria-label="Filter by Price"
      />
      <input
        type="text"
        placeholder="Filter by Location"
        value={searchWineLocation}
        onChange={(e) => onSearchWineLocationChange(e.target.value)}
        style={{ border: "2px solid black", padding: "10px" }}
        aria-label="Filter by Location"
      />
    </div>
  );
}

export default WineFilter;
