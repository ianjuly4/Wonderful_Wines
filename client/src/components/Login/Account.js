import React from "react";
import Header from "../Header";
import Signup from "./Signup";
import Login from "./Login";

function Account() {
  return (
    <div>
        <Header />
        <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white flex flex-col items-center justify-center gap-8">

        <div className="w-full max-w-md">
            <Signup />
        </div>
       
        </div>
    </div>
  );
}

export default Account;
