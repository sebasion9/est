import React from 'react';
import "./styles/dist/style.css"

import Root from './routes/Root';
import NoPage from './routes/NoPage';
import Admin from './components/Auth/Admin';


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sign from './routes/Sign';
import Account from './components/Auth/Account';

function App() {
  return (
    <>
    <BrowserRouter>
    
      <Routes>
          <Route path='/' element={<Root/>}>
          </Route>
          
          
          <Route path='/sign_up' element={<Sign/>}>

          </Route>
          <Route path='/admin' element={<Admin />}>

          </Route>
          <Route path='/account' element={<Account/>}>

          </Route>

          <Route path='*' element={<NoPage/>}>
          </Route>
        
          </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
