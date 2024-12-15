import React from "react";
import UserContainer from "./UserContainer";
import ReviewContainer from "./ReviewContainer";
import UserReviewsContainer from "./UserReviewsContainer";

function ReviewUserList() {
    return (
      <div className="grid grid-cols-1 gap-6">
        {/* First Container */}
        <div className="container px- bg-white" style={{ border: "2px solid black", padding: "10px" }}>
          <UserContainer />
          <ReviewContainer />
        </div>
  
        {/* Second Container */}
        <div className="container px- bg-white" style={{ border: "2px solid black", padding: "10px" }}>
          <UserReviewsContainer />
        </div>
      </div>
    );
  }
  

export default ReviewUserList;
