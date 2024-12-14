import React, { useState, useEffect } from "react";
import Header from "../Header";
import DeleteWines from "./DeleteWines";
import WineFilter from "../WineFilter";

function Delete() {
  const [wines, setWines] = useState([]);
  const [winePrice, setWinePrice] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineName, setWineName] = useState("");
  const [wineLocation, setWineLocation] = useState("");
  const [starReview, setStarReview] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            console.log(data.id); 
            setUserId(data.id); 
          });
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
      });
  }, []); 
  
  useEffect(() => {
    if (userId) { 
      fetch(`/userwines/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((wineData) => {
          if (wineData && Array.isArray(wineData.wines)) {
            setWines(wineData.wines);
          } else {
            console.error("Invalid wine data:", wineData);
          }
        })
        .catch((error) => {
          console.error("Error fetching wines:", error);
        });
    }
  }, [userId]); 
  
  const handleDelete = (wineId) => {
    console.log(wineId);
    fetch(`/wines/${wineId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then(() => {
        setWines((prevWines) => prevWines.filter((wine) => wine.id !== wineId));
      })
      .catch((error) => {
        console.error("Error deleting wine:", error);
      });
  };
  
  const onSearchWineNameChange = (text) => setWineName(text);
  const onSearchWineTypeChange = (text) => setWineType(text);
  const onSearchWinePriceChange = (number) => setWinePrice(number);
  const onSearchWineLocationChange = (location) => setWineLocation(location);

  const filteredWines = wines.filter((wine) => {
    const matchesPrice = winePrice === "All" || winePrice === "" || wine.price === parseInt(winePrice, 10);
    const matchesType = wine.type.toLowerCase().includes(wineType.toLowerCase());
    const matchesName = wine.name.toLowerCase().includes(wineName.toLowerCase());
    const matchesLocation = wineLocation === "" || wine.location.toLowerCase().includes(wineLocation.toLowerCase());
    
    return matchesPrice && matchesType && matchesName && matchesLocation;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header />
    
      <div className="flex space-x-8 p-4">
        <div className="w-1/4">
          <WineFilter
            onSearchWineTypeChange={onSearchWineTypeChange}
            onSearchWineNameChange={onSearchWineNameChange}
            onSearchWinePriceChange={onSearchWinePriceChange}
            onSearchWineLocationChange={onSearchWineLocationChange}
            searchWineName={wineName}
            searchWineType={wineType}
            searchWinePrice={winePrice}
            searchWineLocation={wineLocation}
          />
        </div>
        <div className="w-3/4">
          <div className="flex flex-wrap gap-4">
            {filteredWines.length === 0 ? (
              <p>No wines found for current user.</p>
            ) : (
              filteredWines.map((wine, index) => (
                <div key={wine.id} className="relative flex-shrink-0 w-1/4">
                  <DeleteWines 
                    wine={wine} 
                    number={index + 1} 
                    onDelete={handleDelete}
                    onSearchWineLocationChange={onSearchWineLocationChange}
                    onSearchWineNameChange={onSearchWineNameChange}
                    onSearchWinePriceChange={onSearchWinePriceChange}
                    onSearchWineTypeChange={onSearchWineTypeChange} 
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
