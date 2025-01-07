import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MyContextProvider } from './components/MyContext';
import Home from './components/home/Home'; 
import NavBar from './NavBar';
import Account from "./components/Login/Account";
import Add from "./components/add/Add";
import Reviews from "./components/review/Reviews";

function App() {
  return (
    <MyContextProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Account />} />
          <Route path="/wines" element={<Add />} />
          <Route path="/wines/wineId/reviews" element={<Reviews />} />
        </Routes>
      </Router>
    </MyContextProvider>
  );
}

export default App;
