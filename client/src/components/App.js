import React, { useContext } from 'react';
import { UserContext } from './MyContext';
import Home from './components/Home';

import { MyContextProvider } from './MyContext';

function App() {
  
  return (
    <main>
      <MyContextProvider>
        <Home/>
      </MyContextProvider>
    </main>
  );
}

export default App;