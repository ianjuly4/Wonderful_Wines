import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [wines, setWines] = useState([]);

  // Check session on initial load
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

  // Fetch wines data
  useEffect(() => {
    fetch("/wines")
      .then((r) => r.json())
      .then((wineData) => {
        setWines(wineData);
      })
      .catch((error) => {
        console.error("Error fetching wines:", error);
      });
  }, []);

  // Login action to handle fetch and set user state
  const login = (userData) => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user); 
        } else {
          throw new Error(data.error || 'Login failed');
        }
      })
      .catch((error) => {
        console.error("Login Error:", error);
      });
  };

  // Logout action to handle fetch and clear user state
  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
    })
      .then(() => {
        setUser(null); 
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <MyContext.Provider value={{ user, wines, setWines, login, logout }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
