import NavBar from '../components/NavBar.jsx'
import React, { useEffect, useState } from 'react';
import MembersList from '../components/MembersList.jsx';
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx'
import Task from '../components/Task.jsx';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx'
import { useNavigate, useParams } from 'react-router-dom';
import { is_PM, flag_bit, if_can } from '../permission.js';
import axios from 'axios';
import '../styles/Project.css';

const base_url = import.meta.env.VITE_BASE_URL;

function Project(){
    const navigate = useNavigate();
    const { username, project } = useParams();
    const [projectInfo, setProjectInfo] = useState({});
    const [user, setUser] = useState({}); 
    const [loading, setLoading] = useState(true);
    const [tasksProject, setTasksProject] = useState(null);
    
    async function get_projectInfo(){
        try {
            const response = (await axios.get(base_url + `${username}/${project}`)).data[0];   
            setProjectInfo(response);
        } catch(error) {
            console.error('!ERR: ', error);
        } finally {
            setLoading(false);
        }
    }

    async function get_tasksFromProject(){
        const url = base_url + `api/getTasksUser/${username}?done=false&project=${project}`;

        try {
            const response = (await axios.get(url)).data;
            let trimed_Tasks = response.length > 2 ? response.slice(0, 2) : response;
            setTasksProject(trimed_Tasks);
        } catch(error) {
            console.error(error);
        }
    }

    useEffect(() => {
        get_projectInfo();
        get_tasksFromProject();
    }, []);



    if(loading){
        return (
            <>
                <NavBar/>
                <LoadingMessage/>
            </>
        )
    }

    return (
        <>
            <NavBar/>
            <div className='project-container'>
                <div className='project-title'>
                    <h1>{project}</h1>
                    <h4 className='user-rol'>as a <b>{projectInfo.rol}</b></h4>
                </div>

                {projectInfo && tasksProject && 
                    <div className='projectInfo-display'>                    
                        <div className='task-preview'> 
                            {tasksProject.map((task) => { 
                                return  <div className="project-task" key={task.task_id}>
                                            <Task onComplete={() => {get_tasksFromProject()}} key={task.task_id} username={username} task_id={task.task_id}/>
                                        </div>
                            })}

                            <div className='expandMoreContainer'> 
                                <AnimatedButton buttonProps={{
                                    scaleInfo: {hover: 0.8, tap: 2.0},
                                    onClickFunction: () =>{
                                        navigate(`/${username}/todo/${project}`); 
                                    },
                                    className: 'expand-button',
                                    component: <ExpandMoreIcon/>
                                }}/>
                            </div>
                        </div>
                        <div>
                            <MembersList props={{
                                project_id: projectInfo.project_id,
                                project: project,
                                current_user: username
                            }}/> 
                        </div>
                    </div>
                }
            </div>
        </>

    )
}

export default Project; 
