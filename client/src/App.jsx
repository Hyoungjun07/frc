import { useState } from 'react'
import './App.css'
import { HashRouter, Routes, Route, Link } from 'react-router-dom';

import Datalookup from './routes/datalookup';
import Dtf from './routes/dtf';
import Home from './routes/home';
import Match from './routes/match';
import Navbar from './routes/navbar';
import Pit from './routes/pit';
import Strategic from './routes/strategic';

function App() {

  return (
    <>
    <div style={{backgroundColor: 'lightblue', padding: '20px', height: '100vh'}}>
      <div style={{backgroundColor: 'lightyellow', padding: '20px'}}>
        <h1>Scouting App</h1>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match" element={<Match />} />
        <Route path="/strategic" element={<Strategic />} />
        <Route path="/pit" element={<Pit />} />
        <Route path="/datalookup" element={<Datalookup />} />
        <Route path="/dtf" element={<Dtf />} />
      </Routes>
    </div>
    </>
  )
}

export default App