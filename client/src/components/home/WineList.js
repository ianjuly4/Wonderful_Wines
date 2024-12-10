import React from "react";
import TopRatedContainer from "./TopRatedContainer";
import RedWineContainer from "./RedWineContainer";
import WhiteWineContainer from "./WhiteWineContainer";
import SparklingContainer from "./SparklingContainer";
import AllWinesContainer from "./AllWinesContainer";
import WineFilter from "../WineFilter";

function WineList({filteredWines}) {

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
      <div className="container px- bg-white"  style={{ border: "2px solid black", padding: "10px" }}>
       <TopRatedContainer displayStarRating={displayStarRating}/>
       <RedWineContainer displayStarRating={displayStarRating}/>
       <WhiteWineContainer displayStarRating={displayStarRating}/>
       <SparklingContainer displayStarRating={displayStarRating}/>
       <AllWinesContainer filteredWines={filteredWines} displayStarRating={displayStarRating}/>
      
        
      </div>
    );
}

export default WineList;