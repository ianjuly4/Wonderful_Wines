import React, {useState, useEffect, useContext} from "react";
import WineList from "./WineList";
import Header from "../Header";
import WineFilter from "../WineFilter";

import { MyContext } from '../MyContext';

function Home() {

    const {user, wines} = useContext(MyContext)
    
    return (
        <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
            <Header user={user} />
            <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
                <WineList wines={wines}/>
                
            </div>
        </div>
    );
}

export default Home;
