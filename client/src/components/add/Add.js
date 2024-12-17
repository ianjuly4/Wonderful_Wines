import React, { useState, useEffect } from "react";
import Header from "../Header";
import AddForm from "./AddForm";



function Add() {
  const [user, setUser] = useState('')



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
      <Header/>
      <AddForm displayStarRating={displayStarRating} setUser={setUser}/>
    </div>
  );
}

export default Add;

