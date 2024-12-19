import React, { useContext } from "react";
import { MyContext } from '../MyContext';
import WineList from "./WineList";
import Header from "../Header";

function Home() {
  const { user, wines, loadingWines, error } = useContext(MyContext);


  if (loadingWines) {
    return <div>Loading wines...</div>;
  }


  if (error) {
    return <div>Error fetching wines: {error.message}</div>;
  }

  // Handle empty wines list
  if (wines.length === 0) {
    return <div>No wines available at the moment.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-red-400 to-white">
      <Header user={user} />
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <WineList wines={wines} />
      </div>
    </div>
  );
}

export default Home;
