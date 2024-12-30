import React from "react";

function Wines({ wine, displayStarRating }) {
      const { name, type, image, price } = wine;
    
      const defaultImage = "path_to_default_image.jpg"; 
    
      return (
        <div
          className="w-64 h-80 rounded-lg border-2 border-gray-300 overflow-hidden shadow-lg p-4 bg-white flex flex-col relative"
          style={{
            backgroundImage: `url(${image || defaultImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay to make text more readable */}
          <div className="absolute inset-0 bg-black opacity-30 z-0" />
    
          {/* Content on top of overlay */}
          <div className="relative z-10 flex flex-col justify-between h-full p-4">
            <div>
              {/*<h5 className="text-lg font-semibold text-yellow-400 mb-2">
                {displayStarRating(star_review)}
              </h5>*/}
              <h3 className="font-bold text-xl text-white mb-2">{name || "Unknown Wine"}</h3>
              <h5 className="text-white text-base mb-2">{type || "Unknown Type"}</h5>
            </div>
    
            <h5 className="text-lg font-semibold text-white mt-4">
              ${price !== undefined ? price : "Unknown Price"}
            </h5>
          </div>
        </div>
      );
    }
export default Wines;
