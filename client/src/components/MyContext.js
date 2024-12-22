import React, { useState, useEffect } from 'react';

const MyContext = React.createContext();

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

  // Fetching wine data on initial load
  useEffect(() => {
    fetchWines();
  }, []);

  const fetchWines = () => {
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
  };

  const login = (userData) => {
    setUser(userData); 
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <MyContext.Provider value={{ user, wines, login, logout, fetchWines }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
