import React from 'react';
import { MyContextProvider } from './MyContext';  
import Home from './components/home/Home'; 
import NavBar from './NavBar';
import Account from "./components/Login/Account"
import Add from "./components/add/Add"
import Reviews from "./components/review/Reviews"

function App() {
  return (
    <main>
      <MyContextProvider>
        <NavBar/>
        <Reviews/>
      </MyContextProvider>
    </main>
  );
}

export default App;
