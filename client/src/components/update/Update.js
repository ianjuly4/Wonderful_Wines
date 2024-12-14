import React, { useState, useEffect } from "react";
import Header from "../Header";
import UpdateWines from "./UpdateWines";
import WineFilter from "../WineFilter";
import UpdateForm from "./UpdateForm";

function Update() {
  const [wines, setWines] = useState([]);
  const [wineName, setWineName] = useState("");
  const [winePrice, setWinePrice] = useState("");
  const [wineType, setWineType] = useState("");
  const [wineLocation, setWineLocation] = useState("");
  const [selectedWineId, setSelectedWineId] = useState(null); 
  const [userId, setUserId] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  
  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserId(data.id);
            setErrorMessage(""); 
          });
        } else {
          setErrorMessage("You must be logged in to update wines.");
        }
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setErrorMessage("Error checking session. Please try again later.");
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
            setErrorMessage("No wines found for the current user.");
          }
        })
        .catch((error) => {
          console.error("Error fetching wines:", error);
          setErrorMessage("Error fetching wines. Please try again later.");
        });
    }
  }, [userId]);

  const onSearchWineNameChange = (text) => setWineName(text);
  const onSearchWineTypeChange = (text) => setWineType(text);
  const onSearchWinePriceChange = (number) => setWinePrice(number);
  const onSearchWineLocationChange = (location) => setWineLocation(location);

  const filteredWines = wines.filter((wine) => {
    const matchesPrice =
      winePrice === "All" || winePrice === "" || wine.price === parseInt(winePrice, 10);
    const matchesType = wine.type.toLowerCase().includes(wineType.toLowerCase());
    const matchesName = wine.name.toLowerCase().includes(wineName.toLowerCase());
    const matchesLocation =
      wineLocation === "" || wine.location.toLowerCase().includes(wineLocation.toLowerCase());
    return matchesPrice && matchesType && matchesName && matchesLocation;
  });

  const handleWineCardClick = (id) => {
    setSelectedWineId(id);
  };

  const handleUpdateWine = (updatedWine) => {
    setWines((prevWines) =>
      prevWines.map((wine) =>
        wine.id === updatedWine.id ? updatedWine : wine
      )
    );
    setSelectedWineId(updatedWine.id);
  };

  const selectedWine = wines.find((wine) => wine.id === selectedWineId);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header />
      <div className="flex p-4 space-x-8">
        <div className="w-1/4">
          <h3>To update a wine, please click one</h3>
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
          {/* Pass handleUpdateWine to the UpdateForm */}
          {selectedWine && (
            <UpdateForm
              selectedWineId={selectedWineId}
              wines={wines}
              onUpdate={handleUpdateWine}
            />
          )}
        </div>

        <div className="w-3/4">
          {/* Error message for login */}
          {!userId ? (
            <p className="text-black">Please Login to Continue</p>
          ) : (
            <>
              {errorMessage ? (
                <p className="text-black">{errorMessage}</p>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {filteredWines.length === 0 ? (
                    <p>No wines found for the current user.</p>
                  ) : (
                    filteredWines.map((wine) => (
                      <div
                        key={wine.id}
                        className="relative flex-shrink-0 w-1/4"
                        onClick={() => handleWineCardClick(wine.id)}
                      >
                        <UpdateWines wine={wine} />
                      </div>
                    ))
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Update;
