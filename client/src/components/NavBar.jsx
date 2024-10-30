import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import Options from '../assets/options.svg?react'
import AnimatedButton from '../miscellaneous/AnimatedButton';
import NotificationInvitation from './NotificationInvitation.jsx';
import { motion, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; 
import '../styles/NavBar.css';

const base_url = import.meta.env.VITE_BASE_URL;

function NavBar(){

    const controls = useAnimation();
    const navigate = useNavigate();
    const [hoveredItem, setHoveredItem] = useState(null);
    const [username, setUsername] = useState('');

    function itemMouseEntered(item) {
        setHoveredItem(item);
    }

    function itemMouseLeave(){
        setHoveredItem(null);
    }


    async function get_user_info() {
        const url = base_url + 'home';
        try {
            const res = await axios.get(url, { withCredentials: true });           
            if(res.data && res.data.user && res.data.user.username){ 
                setUsername(res.data.user.username); 
            }else{
                navigate('/');
            }

        } catch (err) {
            navigate('/');
            console.error('!Error fetching user info: ', err);
        }
    }

    useEffect(() => {
        get_user_info();
    }, []);

    return (
        <>
            <div className="header-container">
                <div className="title"><a href='/home'>Tasking</a></div>

                <ul className="menu">
                    <li 
                    onMouseEnter={() => itemMouseEntered('Your projects')}
                    onMouseLeave={itemMouseLeave}
                    className={classNames('menu-item', 
                    {'menu-not-item-hovered': hoveredItem !== 'Your projects' && hoveredItem !== null})}>
                        {username &&
                        <a href={`/${username}`}>Your projects</a>}
                    </li>

                    <li
                    onMouseEnter={() => itemMouseEntered('To do')}
                    onMouseLeave={itemMouseLeave}
                    className={classNames('menu-item', 
                    {'menu-not-item-hovered': hoveredItem !== 'To do' && hoveredItem !== null})}>
                        <a href={`/${username}/todo`}>To do</a>
                    </li> 
                </ul>

                <NotificationInvitation/>

            </div>
        </>
    )
}

export default NavBar;
