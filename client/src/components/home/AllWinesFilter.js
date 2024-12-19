import React from "react";

function AllWinesFilter({
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
    <div className="p-4 rounded shadow-lg flex flex-wrap gap-4">
      <input
        type="text"
        placeholder="Filter by Name"
        value={searchWineName}
        onChange={(e) => onSearchWineNameChange(e.target.value)}
        className="border-2 px-4 py-2 rounded"
        aria-label="Filter by Name"
      />
      <input
        type="text"
        placeholder="Filter by Type"
        value={searchWineType}
        onChange={(e) => onSearchWineTypeChange(e.target.value)}
        className="border-2 px-4 py-2 rounded"
        aria-label="Filter by Type"
      />
      <input
        type="number"
        placeholder="Filter by Price"
        value={searchWinePrice}
        onChange={(e) => onSearchWinePriceChange(e.target.value)}
        className="border-2 px-4 py-2 rounded"
        aria-label="Filter by Price"
      />
      <input
        type="text"
        placeholder="Filter by Location"
        value={searchWineLocation}
        onChange={(e) => onSearchWineLocationChange(e.target.value)}
        className="border-2 px-4 py-2 rounded"
        aria-label="Filter by Location"
      />
    </div>
  );
}

export default AllWinesFilter;
