import { useState } from 'react'
import Welcome from './Welcome.jsx'
import Home from './Home.jsx'
import axios from "axios";
import './App.css'
import { Routes, Route } from 'react-router-dom'

axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;