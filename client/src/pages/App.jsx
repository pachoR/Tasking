import { useState } from 'react'
import Welcome from './Welcome.jsx'
import Home from './Home.jsx'
import './App.css'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;