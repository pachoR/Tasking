import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import Options from '../assets/options.svg?react'
import AnimatedButton from '../miscellaneous/AnimatedButton';
import Badge from '@mui/material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import { useAtom } from 'jotai';
import { motion, useAnimation } from "framer-motion";
import { styled } from '@mui/material/styles';
import { atom } from 'jotai';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/NavBar.css';
const base_url = import.meta.env.VITE_BASE_URL;

export const countInvitations = atom(0);

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid var(--dark-green)`,
    padding: '0 4px',
    backgroundColor: 'var(--dark-green)',
    color: 'var(--white)',
  },
}));


function NavBar(){

    const controls = useAnimation();
    const navigate = useNavigate();
    const [invitationCount] = useAtom(countInvitations);
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

    async function get_user_notifications(){

    }


    useEffect(() => {
        get_user_info();
    }, []);


    useEffect(() => {
        get_user_notifications();
    }, [countInvitations])

    return (
        <>
            <nav className="header-container">
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

                <div className="notification-container" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end',}}>
                    <StyledBadge badgeContent={invitationCount}>
                        <EmailIcon sx={{fill: 'var(--orange)'}}/>
                    </StyledBadge>
                </div>

                </nav>
        </>
    )
}

export default NavBar;
