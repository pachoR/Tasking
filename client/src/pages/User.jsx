import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx'
import '../styles/User.css'
const base_url = import.meta.env.VITE_BASE_URL;

function User(){
    const navigate = useNavigate();
    const { username } = useParams();
    const [projects, setProjects] = useState([]);

    async function get_projects() {
        try{
            const response = await axios.get(base_url + `${username}`); 
            setProjects(response.data);
            if(response.data.redirect && response.data.errorMessage){
                navigate(response.data.redirect);
            }
        }catch(error){
            console.error('!ERROR', error);
        }
        
    }

    useEffect(() => {
        get_projects();
    }, []);

    return (
        <>
            <NavBar/>
            <div className="user-container">
                <div className="user-title">
                    <h1>{username}</h1>
                </div>

                <div className="projects">

                    
                </div>
            </div>
        </>
    );
}

export default User; 
