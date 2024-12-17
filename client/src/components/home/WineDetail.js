import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function WineDetail() {
  
  const { wineId } = useParams();

  const [wine, setWine] = useState(null);


  useEffect(() => {
    const fetchWineDetails = async () => {
      
      const response = await fetch(`/wines/${wineId}`);
      const data = await response.json();
      setWine(data);
    };

    fetchWineDetails();
  }, [wineId]);

  
  if (!wine) {
    return <div>Loading...</div>;
  }

  return (
    <div className="wine-detail">
      <h2>{wine.name}</h2>
      <img src={wine.image || "default_image.jpg"} alt={wine.name} />
      <p>Type: {wine.type}</p>
      <p>Location: {wine.location}</p>
      <p>Price: ${wine.price}</p>
      <p>Flavor Profile: {wine.flavor_profile}</p>
      <p>{wine.description}</p>
      {/* Add any other wine details */}
    </div>
  );
}

export default WineDetail;
