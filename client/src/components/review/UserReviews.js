import React from "react"

function UserReviews({review}){
    const { comment, starReview } = review
    
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="relative">
            {/* Avatar (if provided) */}
            {/*<img
            src={avatar || "/default-avatar.png"}  
            alt={username}
            className="w-20 h-20 rounded-full mx-auto mb-4"
            />*/}

            {/*Username */}
            <div>
            <h3 className="font-bold text-xl text-gray-800 mb-2 text-center">
            {comment}
            </h3>
            </div>

            {/*Number of reviews */}
            <div className="text-center text-gray-600">
            <p className="text-sm">{}</p>
            </div>
                {/* Most Highest Reviewed Wines */}
            <div>

            </div>
        </div>
        </div>
    );
}
export default UserReviews