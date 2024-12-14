import React from "react";

function Reviews({review, displayStarRating, number, onDelete, wine}){
    const {comment, star_review,} = review || {};
    const { name, type, image, location, flavor_profile, price } = wine || {}; 
    const defaultImage = "path_to_default_image.jpg";
    
    const starReview = review && review.length > 0 ? review[0].star_review : 0;

    return (
            <div
                className="w-64 h-[300px] rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg bg-white flex flex-col relative"
                style={{
                    backgroundImage: `url(${image || defaultImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute inset-0 bg-black opacity-30 z-0" />
                <div className="relative z-10 flex flex-col justify-between h-full p-4">
                    <div className="flex flex-col flex-grow">
                        <h4 className="font-bold text-xl mb-2 text-white">{number || "Unknown Wine"}</h4>
                        <h3 className="font-bold text-xl mb-2 text-white truncate">{name || "Unknown Wine"}</h3>
    
                        <h5 className="text-white text-base truncate">{type || "Unknown Type"}</h5>
                        <h5 className="text-white text-sm mt-2 truncate">{location || "Unknown Location"}</h5>
    
                        <h5 className="text-lg font-semibold mt-2 text-yellow-400">
                            {displayStarRating(starReview)}
                        </h5>
    
                        <h5 className="text-lg font-semibold mt-2 text-white">
                            ${price !== undefined ? price : "Unknown Price"}
                        </h5>
                    </div>
    
                    <button
                        onClick={() => onDelete(wine.id)}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-black"
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
}
export default Reviews;