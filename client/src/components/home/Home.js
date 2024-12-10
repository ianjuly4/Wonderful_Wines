import React, {useState, useEffect} from "react";
import WineList from "./WineList";
import Header from "../Header";
import WineFilter from "../WineFilter";

function Home() {
    
    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
            <Header />
            <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
                <WineList/>
                
            </div>
        </div>
    );
}

export default Home;
