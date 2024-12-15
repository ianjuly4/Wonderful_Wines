import React from "react";
import Header from "../Header"
import ReviewUserList from "./ReviewUserList"
import UserReviewsContainer from "./UserReviewsContainer";

function ReviewPage(){

  return(
      <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
            <Header />
            <ReviewUserList/>

          </div>
  )

}
export default ReviewPage;
