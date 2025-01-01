import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [user, setUser] = useState(null); 
  const [wines, setWines] = useState([]);


  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Session not valid');
        }
      })
      .then((userData) => {
        setUser(userData); 
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setUser(null); 
      });
  }, []); 

  useEffect(() => {
    fetch("/wines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((wineData) => {
        setWines(wineData);
      })
      .catch((error) => {
        console.error("Error fetching wines:", error);
      });
  }, []); 

  // Function to update a wine's review in the global state
  const updateWineReviewInState = (wineId, updatedReview) => {
    setWines((prevWines) => {
      return prevWines.map((wine) => {
        if (wine.id === wineId) {
          // Update the reviews array with the updated review
          const updatedReviews = wine.reviews.map((review) =>
            review.id === updatedReview.id ? updatedReview : review
          );
          return { ...wine, reviews: updatedReviews };
        }
        return wine;
      });
    });
  };

  const login = (userData) => {
    setUser(userData); 
  };

  const logout = () => {
    setUser(null); 
  };

  return (
    <MyContext.Provider value={{ user, wines, setWines, login, logout, updateWineReviewInState }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
