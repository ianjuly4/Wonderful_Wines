
import React from "react";
import UserWines from "./UserWines";
import { NavLink } from "react-router-dom";
import Header from "../Header";

function UserAccount({ user, logout, wines }) {

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header user={user} />

      {/* Welcome message and logout button container */}
      <div className="flex flex-col items-center justify-center mt-6">
        <h3 className="text-2xl font-bold text-gray-800 italic mb-4">
          WELCOME, {user.username}
        </h3>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="text-xl font-bold text-red-600 mb-6"
        >
          Logout
        </button>
      </div>

      {/* Display user's wines */}
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <div className="wine-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wines.map((wine) => (
            <div key={wine.id} className="wine-card-container">
              {/* Wrap each wine card with NavLink to navigate to wine details page */}
              <NavLink to={`/wines/${wine.id}`} className="block">
                <UserWines wine={wine} displayStarRating={displayStarRating} />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserAccount;
