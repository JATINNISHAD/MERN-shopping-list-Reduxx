import React from 'react';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom';
import {ShopContextProvider} from './shoppingContext';

function App() {
  return (
    <React.Fragment>
      <ShopContextProvider>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </ShopContextProvider>
    </React.Fragment>
  );
}

export default App;
