import React, { useContext } from "react";
import Header from "../Header";
import AddForm from "./AddForm";
import UserError from "../review/UserError";
import { MyContext } from '../MyContext';

function Add() {
  const { user, setUser, setWines, wines } = useContext(MyContext);  

  console.log(user)
  
  
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
      <Header />
      
      {/* Conditionally render UserError or AddForm based on user login status */}
      {!user ? (
        <UserError />  
      ) : (
        <AddForm displayStarRating={displayStarRating} user={user} 
          setUser={setUser} 
          setWines={setWines}
          wines={wines}/>  
      )}
    </div>
  );
}

export default Add;
