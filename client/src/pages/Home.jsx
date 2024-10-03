import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { redirect, useNavigate } from "react-router-dom";
import LoadingMessage from "../miscellaneous/LoadingMessage";
import Card from '@mui/material/Card';
const base_url = import.meta.env.VITE_BASE_URL;

function Home(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    async function get_user_info() {
        const url = base_url + 'home';
        try {
            const res = await axios.get(url, { withCredentials: true });           

            
            if(res.data && res.data.user){
                 setUser(res.data.user);
            }else{
                navigate('/');
            }
            

        } catch (err) {
            console.error('!Error fetching user info: ', err);
        }
    }

    async function get_currents_projects() {
        try {
            const response = await axios.get(base_url + `projects/${user.username}`);
            setProjects(response);
            console.log("RESPONSE", response);
        } catch (error) {
            console.error('!ERROR', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        get_user_info();
        get_currents_projects();
    }, []);
    

    return (
        <>
            <NavBar/>
            <div className="home">
                <div className="home-head">
                    <h3>Welcome <b>{user && user.username ? user.username : ''}</b></h3>
                </div>
                { loading && <LoadingMessage/> }
            </div>
        </>
    );
}

export default Home;