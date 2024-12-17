import React, { useContext } from 'react';
import { UserContext } from './MyContext';
import Home from './components/Home';

import { UserProvider } from './MyContext';

function App() {
  
  return (
    <main>
      <UserProvider>
        <Home/>
      </UserProvider>
    </main>
  );
}

export default App;