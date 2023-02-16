import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { ErrorPage } from './components/ErrorPage';
import { Login, Register } from './modules/login';
import { Home } from './modules/registration';

export const UserContext = React.createContext({});

function App() {
  const [loggedInUser, setLoggedinUser] = useState();

  return (
    <UserContext.Provider value={loggedInUser}>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Login setLoggedinUser={setLoggedinUser} />} errorElement={<ErrorPage />} />
          <Route path="register" element={<Register  setLoggedinUser={setLoggedinUser} />} errorElement={<ErrorPage />} />
          <Route path="home" element={<Home user={loggedInUser} setLoggedinUser={setLoggedinUser} />} errorElement={<ErrorPage />}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
