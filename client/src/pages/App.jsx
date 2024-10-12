import { useState } from 'react'
import Welcome from './Welcome.jsx'
import Home from './Home.jsx'
import Project from '../pages/Project.jsx'
import User from '../pages/User.jsx'
import ToDo from '../pages/ToDo.jsx'
import axios from "axios";
import '../styles/App.css'
import { Routes, Route } from 'react-router-dom'

axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/:username/:project" element={<Project/>} />
      <Route path="/:username" element={<User/>}/> 
      <Route path="/:username/todo" element={<ToDo/>}/>
    </Routes>
  );
}

export default App;
