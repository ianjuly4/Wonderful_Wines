import React from "react";
import NavBar from "./NavBar";

function Header(){
    return(
        <div className=" bg-gradient-to-r from-red-400 to-white">
        <h1 className="text-9xl text-white">Wonderful Wines</h1>
        <NavBar/>
        </div>
    )
}
export default Header