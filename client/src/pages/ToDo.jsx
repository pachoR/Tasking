import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.jsx'
import Task from '../components/Task.jsx';
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import TaskFilter from '../miscellaneous/TaskFilter.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/ToDo.css';
const base_url = import.meta.env.VITE_BASE_URL;

function ToDo(){
  const { username } = useParams(); 
  const [ tasks, setTasks ] = useState([]);
  const [ allTasks, setAllTasks ] = useState([]);
  const [ projects, setProjects ] = useState(null);
  const [ taskLen, setTaskLen ] = useState(0);
  
  const [ filters, setFilters ] = useState({
    project: '',
    done: false,
  }) 

  async function get_projects(){
    let set = new Set([]); 
    for(let i = 0; i < allTasks.length; i++){ 
      if(!set.has(allTasks[i].project)){
        set.add(allTasks[i].project);
      }
    } 
    
    setProjects(Array.from(set)); 
  }

  async function get_userTasks(){
    try{
      let url = base_url + `api/getTasksUser/${username}?done=${filters.done}`;
      if(filters.project){
        url += `&project=${filters.project ? filters.project : '""'}`;
      }


      const result = await axios.get(base_url + `api/getTasksUser/${username}?done=false`); 
      const result_display = await axios.get(url);
      setAllTasks(result.data);
      setTasks(result_display.data);  
      
    } catch(error){
      console.error('ERR! get_userTasks()', error);
    }
      
  }

  useEffect(() => {
    get_userTasks(); 
  }, [taskLen, filters])

  useEffect(() => {
    if(tasks.length > 0){ 
      get_projects();
    }
  }, [tasks])

  if(tasks && tasks.length == 0){
    return (
      <>
        <NavBar/>
        <div className="todo-title">
          <h1>To Do</h1>
        </div>

        <div className="page-grid">
          <div className="tasks-container">
            <h3 style={{fontSize: '2rem'}}>No tasks left to do</h3>
          </div>

          <div className="taskFilter-container">
            {projects && projects.length > 0 && <TaskFilter setFilters={setFilters} label={'Projects'} projects={projects} text={filters.project ? filters.project : 'Projects'}/>}
          </div>
        </div>
      </>
    );
  }

return (
    <>
      <NavBar/>

      <div className="todo-title">
        <h1>To Do</h1>
      </div>

      <div className="page-grid">
        <div className="tasks-container">
          {tasks.map((task) => {
            return (
              <div key={task.task_id} className="task" style={{paddingBottom: '1rem'}}>
                <Task onComplete={() => {get_userTasks()}} key={task.task_id} username={username} task_id={task.task_id}/>
              </div>
            );
          })}
        </div>
        <div className="taskFilter-container">
          {projects && projects.length > 0 && <TaskFilter setFilters={setFilters} label={'Projects'} projects={projects} text={filters.project ? filters.project : 'Projects'}/>}
        </div>
      </div>
      
    </>
  );
}

export default ToDo;

