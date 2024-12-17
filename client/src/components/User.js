import React, { createContext, useState } from 'react';

const UserContext = createContext();


function UserProvider({ children }) {
  const [user, setUser] = useState(null); 
  
  const login = (userData) => {
    setUser(userData); 
  };

  
  const logout = () => {
    setUser(null); 
  };

 
  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
