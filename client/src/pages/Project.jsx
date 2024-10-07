import NavBar from '../components/NavBar.jsx'
import React, { useEffect, useState } from 'react';
import MembersList from '../components/MembersList.jsx';
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Project.css';

const base_url = import.meta.env.VITE_BASE_URL;

function Project(){

    const { username, project } = useParams();
    const [projectInfo, setProjectInfo] = useState({});
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
                    <h4 className='user-rol'>{projectInfo.rol}</h4>
                </div>

                {projectInfo && 
                    <div className='projectInfo-display'>                    
                        <MembersList props={{
                            project_id: projectInfo.project_id
                        }}/>
                    </div>
                }
            </div>
            }
        </>

    )
}

export default Project;
