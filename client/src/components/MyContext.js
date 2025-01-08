import React, { createContext, useState, useEffect } from 'react';

const MyContext = createContext();

function MyContextProvider({ children }) {
  const [user, setUser] = useState(null);  
  const [wines, setWines] = useState([]);
  
  useEffect(() => {
    fetch("/check_session")
      .then((response) => {
        if (response.ok) {
          console.log("check_session")
          return response.json();
        } else {
          throw new Error('Session not valid');
        }
      })
      .then((userData) => {
        console.log(userData);
        setUser(userData);
      })
      .catch((error) => {
        console.error("Error checking session:", error);
        setUser(null); 
      });
  }, []);


  useEffect(() => {
    fetch("/wines")
      .then((r) => r.json())
      .then((wineData) => {
        setWines(wineData);
        console.log("useEffect wines")
      })
      .catch((error) => {
        console.error("Error fetching wines:", error);
      });
  }, []);


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
        console.log("Login")
        console.log(data);
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


  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("logout")
        setUser(null);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  const fetchWines = () => {
    fetch("/wines")
      .then((response) => response.json())
      .then((wineData) => {
        setWines(wineData); 
        console.log('fetch wines')
      })
      .catch((error) => {
        console.error("Error fetching wines:", error);
      });
  };
  

  console.log(wines)

 
  return (
    <MyContext.Provider value={{ user, wines, setUser, login, logout, fetchWines }}>
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider }
