import { useParams } from 'react-router-dom';
import React, { useEfect, useState } from 'react';
import '../styles/Project.css';

function Project(){

    const { username, project } = useParams();

    return (
        <>
        <h2>Project { project }</h2>
        </>
    )
}

export default Project;