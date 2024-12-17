import React, { useState, useEffect } from 'react';


const MyContext = React.createContext();

function MyContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [wines, setWines] = useState([]) 
  
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
        console.log(userData)
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
        console.log(wineData.reviews)
        setWines(wineData);
      })
      .catch((error) => {
        console.error("Error fetching wines:", error);
      });
  }, []);



  return (
    <MyContext.Provider value={{user, wines}}>
      {children} 
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider};
