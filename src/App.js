import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Login from './Components/login.jsx'
import RouterPrivate from './Components/Routes/Private/Private'
import Pai from './Components/Pai.jsx';
import StoreProvider from './Components/Store/Provider.jsx';


function App() {

  return (
    <StoreProvider>

      <BrowserRouter>
          <Route path="/" exact={true} component={Login}/>     
          <Route path="/login" exact={true} component={Login}/>       
          <RouterPrivate path="/home" component={Pai}/>
      </BrowserRouter>
            
    </StoreProvider>
  );
}

export default App;
