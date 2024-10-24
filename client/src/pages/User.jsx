import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx';
import ErrorMessage from '../miscellaneous/ErrorMessage.jsx';
import CardProject from '../components/CardProject.jsx'
import CreateProjectButton from '../miscellaneous/CreateProjectButton.jsx'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { changeDateFormat } from '../formatParser.js'
import '../styles/User.css'
const base_url = import.meta.env.VITE_BASE_URL;

function User(){
    const navigate = useNavigate();
    const { username } = useParams();
    const [ projects, setProjects ] = useState([]);
    const [ projectsNames, setProjectsNames ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);

    function redirectToProjectId(username, project){
        navigate(`/${username}/${project}`);
    }    

    async function get_projects() {
        try{
            const response = await axios.get(base_url + `${username}`);
            setProjects(response.data);
            setLoading(false);
            setErrorMessage(null);
            if(response.data.redirect){
                navigate(response.data.redirect);
            }else if(response.data.errorMessage){
                setErrorMessage(response.data.errorMessage);
            }else{
                const names = [];
                for(let i = 0; i < response.data.length; i++){
                    names.push(response.data[i].project);
                }
                setProjectsNames(names);
            }
        }catch(error){
            console.error('!ERROR', error);
        }finally{
            setLoading(false);
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
                    <h1>Your projects, {username}</h1> 
                </div> 

                <div className="user-projects">
                    {loading && <LoadingMessage/>} 
                    {projects && projects.length > 0 ? (
                        <div className="users-cards">
                            {projects.map((project) => {
                                return (
                                <button key={project.project_id} onClick={() => redirectToProjectId(project.username, project.project)} 
                                style={{padding: '4px', borderRadius: '15px', border: '10rem', background: 'var(--red)'}}>
                                    <CardProject props={{
                                        id: project.project_id,
                                        project: project.project,
                                        rol: project.rol,
                                        start_date: changeDateFormat(project.start_date),
                                        end_date: changeDateFormat(project.end_date)
                                    }}/>
                                </button>
                                )
                            })}
                        </div>
                        ) : (
                            <div><h4>No projects yet.</h4></div>
                        )
                    }
                       
                </div>
            </div>
        </>
    );
}

export default User; 
