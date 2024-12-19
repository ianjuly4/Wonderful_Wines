import React, { useContext, useEffect } from "react";
import { MyContext } from "../MyContext";
import Signup from "./Signup";
import UserAccount from "./UserAccount";

function Account() {
  const { user, login, logout, wines } = useContext(MyContext);

  useEffect(() => {
   
  }, [user, wines]);

  return (
    <div>
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
