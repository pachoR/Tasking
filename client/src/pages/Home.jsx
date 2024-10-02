import React, { useState, useEffect } from "react";
import './Home.css';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { motion } from "framer-motion";

const base_url = import.meta.env.VITE_BASE_URL;


function Home(){

    const [user, setUser] = useState('');

    async function get_user_info() {
        const url = base_url + 'home';
        console.log(url);
        
        try {
            const res = await axios.get(url, { withCredentials: true });
            setUser(res.data.user);
        } catch (err) {
            console.error('Error fetching user info: ', err);
        }
    }

    useEffect(() => {
        get_user_info();
    }, []);

    return (
        <>
            <NavBar/>
            <h1>Welcome, User {user.username}</h1>
        </>
    );
}

export default Home;