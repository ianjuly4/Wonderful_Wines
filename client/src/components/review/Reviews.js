import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";
import Header from "../Header"
import UserReviews from "./UserReviews"
import AddReview from "./AddReview"

function Reviews() {
  const { user, login, logout, wines } = useContext(MyContext);
  console.log(wines)
  

 
  return (

    
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header user={user} />


      {/* Render different views based on user authentication */}
      {user ? (
        <UserReviews />
      ) : (
        < AddReview />
      )}
    </div>
  );
}

export default Reviews;
