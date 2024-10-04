import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { redirect, useNavigate } from "react-router-dom";
import LoadingMessage from "../miscellaneous/LoadingMessage";
import CardProject from '../components/CardProject';
import { changeDateFormat } from '../formatParser.js'; 
const base_url = import.meta.env.VITE_BASE_URL;

function Home(){
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    async function get_user_info() {
        const url = base_url + 'home';
        try {
            const res = await axios.get(url, { withCredentials: true });           
            if(res.data && res.data.user){
                 setUser(res.data.user);                 
                 await get_currents_projects(res.data.user);
            }else{
                navigate('/');
            }

        } catch (err) {
            console.error('!Error fetching user info: ', err);
        }
    }

    async function get_currents_projects(username) {
        try {
            const response = await axios.get(base_url + `projects/${username.username}`);
            setProjects(response.data.slice(0,3));
            if(response.data.errorMessage){
                navigate(response.data.redirect);
            }
        } catch (error) {
            console.error('!ERROR', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {    
        get_user_info();
    }, []);

    
    
    return (
        <>
            <NavBar/>

            { loading && <LoadingMessage/> }

            { !loading && projects && 
            <>
            <div className="home">
                <div className="home-head">
                    <h3>Welcome <b>{user && user.username ? user.username : 'Loading profile'}</b></h3>
                </div>
            </div>

            <div className="preview-projects">
            {projects.length > 0 ? (
                <div className="cards">
                {projects.map((project) => (
                    <CardProject key={project.id} props={{
                        id: project.id,
                        project: project.project,
                        rol: project.rol,
                        start_date: changeDateFormat(project.start_date),
                        end_date: changeDateFormat(project.end_date)
                    }}/>
                ))}
                
                </div>
                ) : (
                    <div>No posts available for this user</div>
                )}
            </div>
            </>
            }
        </>
    );
}

export default Home;