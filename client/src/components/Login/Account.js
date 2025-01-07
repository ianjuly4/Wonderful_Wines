import React, { useContext} from "react";
import { MyContext } from "../MyContext";
import Signup from "./Signup";
import UserAccount from "./UserAccount";

import Header from "../Header"

function Account() {
  const {user, login, logout} = useContext(MyContext);
  

 
  return (    
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header user={user} />

      {user ? (
        <UserAccount user={user} logout={logout}/>
      ) : (
        <Signup login={login} />
      )}
    </div>
  );
}

export default Account;
