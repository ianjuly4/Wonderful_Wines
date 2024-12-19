import React from 'react';
import { MyContextProvider } from './MyContext';  
import Home from './components/Home'; 

function App() {
  return (
    <main>
      <MyContextProvider>   
        <Home />           
      </MyContextProvider>
    </main>
  );
}

export default App;
