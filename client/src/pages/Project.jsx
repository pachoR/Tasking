import NavBar from '../components/NavBar.jsx'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Project.css';

const base_url = import.meta.env.VITE_BASE_URL;

function Project(){

    const { username, project } = useParams();
    const [projectInfo, setProjectInfo] = useState({});
    
    async function get_projectInfo(){
        const response = await axios.get(base_url + `${username}`);
        console.log(response);
        setProjectInfo(response);
    }

    useEffect(() => {
        get_projectInfo();
    });

    return (
        <>
            <NavBar/>
            <div>
                
            </div>
        </>

    )
}

export default Project;
