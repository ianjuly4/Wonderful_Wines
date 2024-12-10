import React from "react";
import Header from "../Header"
import Signup from "./Signup";

function Account(){
    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
            <Header />
            <Signup/>
        </div>
    );
}
export default Account;
