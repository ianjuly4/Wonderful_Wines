import React, { useEffect, useState, useContext } from "react";
import UserWines from "./UserWines";
import { NavLink } from "react-router-dom";
import { MyContext } from "../MyContext";
import AllWinesFilter from "../home/AllWinesFilter";

function UserAccount({ user, logout, wines }) {
  const [wineName, setWineName] = useState("");
  const [winePrice, setWinePrice] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineLocation, setWineLocation] = useState("");

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
  console.log("User Object:", user);
  console.log("User ID:", user.id);


  const usersWines = wines.filter((wine) => {

    const hasReviewByUser = wine.reviews.some(
      (review) => review.user_id === user.id
    );
    return hasReviewByUser;
  });

  console.log("Filtered Wines by User ID:", usersWines);

  const filteredWines = usersWines.filter((wine) => {
    const matchesPrice =
      winePrice === "All" || winePrice === "" || wine.price === parseInt(winePrice, 10);
    const matchesType = wineType === "" || wine.type.toLowerCase().includes(wineType.toLowerCase());
    const matchesName = wineName === "" || wine.name.toLowerCase().includes(wineName.toLowerCase());
    const matchesLocation =
      wineLocation === "" || wine.location.toLowerCase().includes(wineLocation.toLowerCase());

    return matchesPrice && matchesType && matchesName && matchesLocation;
  });

  console.log("Filtered Wines:", filteredWines);

  return (
    <div>
      {/* Welcome message and logout button container */}
      <div className="flex flex-col items-center justify-center mt-6">
        <h3 className="text-2xl font-bold text-gray-800 italic mb-4">
          WELCOME, {user.username}
        </h3>

        {/* Logout Button */}
        <button onClick={logout} className="text-xl font-bold text-red-600 mb-6">
          Logout
        </button>
      </div>

      {/* Wine Filter in a row layout */}
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

      {/* Display filtered wines */}
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <div className="wine-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWines.length > 0 ? (
            filteredWines.map((wine) => (
              <div key={wine.id} className="wine-card-container">
                <NavLink to={`/wines/${wine.id}`} className="block">
                  <UserWines wine={wine} displayStarRating={displayStarRating} />
                </NavLink>
              </div>
            ))
          ) : (
            <p>No wines found for this user.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
