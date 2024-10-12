import NavBar from '../components/NavBar.jsx'
import React, { useEffect, useState } from 'react';
import MembersList from '../components/MembersList.jsx';
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx'
import { useParams } from 'react-router-dom';
import { is_PM, flag_bit, if_can } from '../permission.js';
import axios from 'axios';
import '../styles/Project.css';

const base_url = import.meta.env.VITE_BASE_URL;

function Project(){

    const { username, project } = useParams();
    const [projectInfo, setProjectInfo] = useState({});
    const [user, setUser] = useState({}); 
    const [loading, setLoading] = useState(true);
    
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

    useEffect(() => {
        get_projectInfo();
    }, []);

    return (
        <>
            <NavBar/>
            
            {loading && <LoadingMessage/>}

            {!loading && 
            <div className='project-container'>
                <div className='project-title'>
                    <h1>{project}</h1>
                    <h4 className='user-rol'>as a <b>{projectInfo.rol}</b></h4>
                </div>

                {projectInfo && 
                    <div className='projectInfo-display'>                    
                        <div>
                            
                            <h2>Hi</h2>
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
            }
        </>

    )
}

export default Project;
