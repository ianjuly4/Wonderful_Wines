import React, { useContext} from "react";
import { MyContext } from "../MyContext";
import Signup from "./Signup";
import UserAccount from "./UserAccount";

import Header from "../Header"

function Account() {
  const { user, login, logout, wines } = useContext(MyContext);
  

 
  return (

    
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header user={user} />


      {/* Render different views based on user authentication */}
      {user ? (
        <UserAccount user={user} logout={logout} wines={wines} />
      ) : (
        <Signup login={login} />
      )}
    </div>
  );
}

export default Account;
