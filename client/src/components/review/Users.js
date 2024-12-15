import React from "react";

function Users({ user }) {
    const { username, avatar, reviews } = user;
    const { comment, starReview, wine } = reviews

    console.log(reviews.wine)

    const numberOfReviews = (reviews) => {
        if (reviews.length === 0) {
            return "This user has not reviewed any wines yet."
        } else {
            const reviewsLength = reviews.length;
                return `This user has reviewed ${reviewsLength} wines.`
        }
    };
  
    
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
            {username || "Unknown User"}
            </h3>
            </div>

            {/*Number of reviews */}
            <div className="text-center text-gray-600">
            <p className="text-sm">{numberOfReviews(reviews)}</p>
            </div>
                {/* Most Highest Reviewed Wines */}
            <div>

            </div>
        </div>
        </div>
    );
}

export default Users;
