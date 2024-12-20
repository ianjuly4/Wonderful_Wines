import React, { useContext } from "react";
import { MyContext } from "../MyContext";
import UserReviews from "./UserReviews";
import AddReview from "./AddReview";

function Reviews({ wineId }) {
  const { user, wines } = useContext(MyContext);

  if (!user) {
    return <div>Please log in to see or add reviews.</div>;
  }
 
  console.log(user.id);
  console.log(wines)


  return (
    <div className="mt-4">
      <h5 className="text-lg font-semibold">Reviews</h5>
      
    </div>
  );
}

export default Reviews;
