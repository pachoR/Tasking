import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx';
import LoadingMessage from '../miscellaneous/LoadingMessage.jsx';
import TaskPM from '../components/TaskPM.jsx';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TaskViewerPM.css'
const base_url = import.meta.env.VITE_BASE_URL;

function TaskViewerPM(){
  const navigate = useNavigate();
  const { username, project } = useParams(); 
  const [ loading, setLoading ] = useState(true);
  const [ projectInfo, setProjectInfo ] = useState(null);
  const [ supervisedInfo, setSupervisedInfo ] = useState(null);
  const [ isPM, setIsPM ] = useState(null);
  

  async function get_projectInfo(){
      try {
        const response = (await axios.get(base_url + `${username}/${project}`)).data[0];   
        setProjectInfo(response);
        if(response.rol === 'Project Manager'){
          setIsPM(true);
        }else{
          setIsPM(false);
        }
      } catch(error) {
        console.error('!ERR: ', error);
      } finally {
        setLoading(false);
      }
    }

  async function get_supervisedTasks(){
    const url = base_url + `api/getSupervisedTasks/${username}?project=${project}`;

    try {
      const response = Object.entries((await axios.get(url)).data.supervisedInfo); 
      setSupervisedInfo(response);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  
  useEffect(() => {
    get_projectInfo();
  }, [])

  useEffect(() => {
    if(isPM && !loading){
      get_supervisedTasks();
    }

    if(!loading && !isPM){
      navigate('/home');
    }
    
  }, [isPM]);

  
  if(loading){
    return (
      <>      
        <NavBar/>
        <div style={{marginTop: '25vh', fontSize: '10rem'}}>
          <LoadingMessage/>
        </div> 
      </>
    )
  }

  
  if(!supervisedInfo){
    return (
      <>
        <NavBar/>
      </>
    )
  }

  return (
    <> 
      <NavBar/>
      <div className='info-container'>
        <div className='info-title-container'>
          <h1>Project Manager Task Viewer</h1>
        </div>

        <div className='info-task-section'>
          {supervisedInfo.map((task) => {  
            return  <div key={task[0]} className='info-task'>
                      <TaskPM task_info={task}/>
                    </div>
          })}
        </div>
        
      </div>     
    </>
  )
}

export default TaskViewerPM;
