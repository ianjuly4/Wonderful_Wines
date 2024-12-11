import React from "react";
import NavBar from "./NavBar";

function Header({setUser}) {
  return (
    <div className="bg-gradient-to-r from-red-400 to-white py-10 px-4 ">
      {/* Title */}
      <h1 className="text-4xl sm:text-6xl md:text-9xl text-white font-bold">
        Wonderful Wines
      </h1>
      
      {/* Navigation Bar */}
      <NavBar setUser={setUser} />
    </div>
  );
}

export default Header;
