import React from 'react';
import "./styles/dist/style.css"

import Root from './routes/Root';
import NoPage from './routes/NoPage';
import Admin from './components/Auth/Admin/Admin';
import Account from './components/AccountPanel/Account';
import labels from './components/General/labels.json';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sign from './routes/Sign';

function App() {
  return (
    <>
    <BrowserRouter>
    
      <Routes>
          <Route path='/' element={<Root/>}>
          </Route>
          
          
          <Route path='/sign_up' element={<Sign/>}>

          </Route>
          <Route path='/admin' element={<Admin leftbar_labels={labels.adminLabels}/>}>

          </Route>
          <Route path='/account' element={<Account account_labels={labels.accountLabels}/>}>

          </Route>

          <Route path='*' element={<NoPage/>}>
          </Route>
        
          </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
