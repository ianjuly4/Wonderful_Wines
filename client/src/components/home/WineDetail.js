import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";

function WineDetail() {
  const { wineId } = useParams();

  const [wine, setWine] = useState(null); 

  useEffect(() => {
    fetch(`/wines/${wineId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch wine details");
        }
        return response.json();
      })
      .then((wineData) => {
        setWine(wineData);
      })
      .catch((error) => {
        console.error("Error fetching wine details:", error);
      });
  }, [wineId]);

  if (!wine) {
    return <div>Loading...</div>;
  }

  const defaultImage = "https://www.winespectrum.com/wp-content/uploads/2024/12/A1662-1.png";

  return (
    <div>
      <Header />
      <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white flex justify-center items-center">
        {/* Centered container */}
        <div className="relative bg-white border-4 border-black rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-8">
          
          {/* Wine Image - displayed at the top */}
          <img 
            src={wine.image || defaultImage} 
            alt={wine.name || "Wine Image"} 
            className="w-full h-60 object-cover rounded-lg mb-6" 
          />
          
          {/* Content inside the wine card */}
          <div className="text-black">
            <h3 className="font-bold text-2xl mb-3">{wine.name || "Unknown Wine"}</h3>
            <h5 className="text-xl mb-2">{wine.type || "Unknown Type"}</h5>
            <p className="text-sm mb-6">{wine.flavor_profile || "No flavor profile available"}</p>
            <h5 className="text-lg mb-4">{wine.location || "Unknown Location"}</h5>

            {/* Price */}
            <h5 className="text-lg font-semibold mt-2">
              ${wine.price ? wine.price.toFixed(2) : "Unknown Price"}
            </h5>

            {/* Reviews - Display number of reviews or a message if no reviews */}
            <h5 className="text-sm mt-2">
              {wine.reviews && wine.reviews.length > 0
                ? `Reviews: ${wine.reviews.length}`
                : "No reviews yet"}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WineDetail;
