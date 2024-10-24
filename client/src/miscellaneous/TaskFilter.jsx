import React, { useState, useEffect } from 'react';
import ComboBox from '../miscellaneous/ComboBox.jsx'
import AnimatedButton from '../miscellaneous/AnimatedButton.jsx';
import Checkbox from '@mui/material/Checkbox';
import { useParams } from 'react-router-dom';
import '../styles/TaskFilter.css'
const base_url = import.meta.env.VITE_BASE_URL;

function TaskFilter({ setFilters, label, projects, text }){ 
  const { username, project } = useParams();  
  const [isChecked, setIsChecked] = useState(false);
  const [filterProject, setFilterProject] = useState('');

  function changeIsChecked(){
    setIsChecked(!isChecked);
  }

  function handleOnFilter(){
    setFilters({
      project: filterProject,
      done: isChecked
    })
  }

  return (
    <>
      <div className="filter-container">
        <div className="filter-title">
          <h1>Filters</h1>
        </div> 
        
        <div className="filter">
          <ComboBox label={label} items={projects} defaultText={text} onChange={setFilterProject}/>  
        </div>

        <div className="filter done-filter">
          <p>Done: </p>
          <Checkbox checked={isChecked} onChange={changeIsChecked} 
            sx={{
              '& .MuiSvgIcon-root':{
                color: 'var(--white)',
                fill: 'var(--white)'
              },
            }} /> 
        </div>

    <div className='filter-btn-section'>
          <AnimatedButton buttonProps={{
            text: 'Filter',
            className: 'filter-btn',
            onClickFunction: handleOnFilter,
          }}/>
        </div>
      </div>
    </>
  )
}

export default TaskFilter;
