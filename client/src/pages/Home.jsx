import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import '../styles/Home.css';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userInfoAtom, updateHomeToogle } from '../atoms.js';
import NavBar from '../components/NavBar';
import CreateProjectButton from '../miscellaneous/CreateProjectButton.jsx';
import LoadingMessage from "../miscellaneous/LoadingMessage";
import CardProject from '../components/CardProject'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnimatedButton from "../miscellaneous/AnimatedButton.jsx";
import classNames from "classnames";
import { changeDateFormat } from '../formatParser.js';
const base_url = import.meta.env.VITE_BASE_URL;

function Home(){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [, setUserInfo] = useAtom(userInfoAtom);    

    function redirectToProjectId(username, project){
        navigate(`/${username}/${project}`);
    }

    function redirectToAllProjects(username){
        navigate(`/${username}`);
    } 

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
           
            const url2 = base_url + `api/getUserInfo/${res.data.user.username}`;
            const userInfo = (await axios.get(url2)).data[0];
            setUserInfo(userInfo);
                        
        } catch (err) {
            navigate('/');
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
        <div style={{width: '100%', height: '100%'}}>
            <NavBar/>
            { loading && <LoadingMessage/> }

            { !loading && projects && userInfoAtom &&
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
                    <button key={project.project_id} onClick={() => redirectToProjectId(project.username, project.project)} 
                    style={{padding: '4px', borderRadius: '15px', border: '10rem', background: 'var(--red)'}}>
                    <CardProject key={project.project_id} props={{
                        id: project.project_id,
                        project: project.project,
                        rol: project.rol,
                        start_date: changeDateFormat(project.start_date),
                        end_date: changeDateFormat(project.end_date), 
                    }}/>
                    </button>
                ))}
                <div style={{background: 'transparent', width: '100%', gridColumnStart: '1', gridColumnEnd: '-1'}}>
                    <AnimatedButton buttonProps={{
                        scaleInfo: {hover: 0.8, tap: 2.0},
                        onClickFunction: () => redirectToAllProjects(projects[0].username),
                        className: 'expandMore-buttom',
                        component: <ExpandMoreIcon/>
                    }}/>
                </div>
                </div>
                ) : (
                    <div>No posts available for this user</div>
                )}
            </div>

            <div className="project-buttons">
                <CreateProjectButton props={{user_info: user}}/>

                <AnimatedButton buttonProps={{
                    text: 'Join to project',
                    className: 'proj-btn'
                }}/>
            </div>
            </>
            }
        </div>
    );
}

export default Home;
