import './App.css';
import User from './pages/User'
import Home from './pages/Home'
import Code from './pages/Code';
import Consume from './pages/Consume';
import Deposit from './pages/Deposit';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Transfer from './pages/Transfer';

function App() {

  return (
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/User" element={<User />} />
            <Route path="/Consume" element={<Consume />}/>
            <Route path="/Deposit" element={<Deposit />}/>
            <Route path="/Transfer" element={<Transfer />}/>
            <Route path="/Code" element={<Code />}/>
          </Routes>
        </div>
  );
}

export default App;
