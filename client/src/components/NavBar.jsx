import React, { useState, useEffect } from "react";
import classNames from 'classnames';
import Options from '../assets/options.svg?react'
import { motion, useAnimation } from "framer-motion";
import AnimatedButton from '../components/AnimatedButton';
import './NavBar.css'

function NavBar(){

    const controls = useAnimation();

    function clickOnOptions(){
        alert('hi');
    }

    const [hoveredItem, setHoveredItem] = useState(null);

    function itemMouseEntered(item) {
        setHoveredItem(item);
    }

    function itemMouseLeave(){
        setHoveredItem(null);
    }

    useEffect(() => {
        controls.start({
            rotate: [null, 360 * 1],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "linear"
            }
        })

        setTimeout(1, 3000);
    }, [controls]);

    

    return (
        <>
            <nav className="header-container">
                <div className="title">Tasking</div>

                <ul className="menu">
                    <li 
                    onMouseEnter={() => itemMouseEntered('Your projects')}
                    onMouseLeave={itemMouseLeave}
                    className={classNames('menu-item', 
                    {'menu-not-item-hovered': hoveredItem !== 'Your projects' && hoveredItem !== null})}>
                        <a>Your projects</a>
                    </li>

                    <li 
                    onMouseEnter={() => itemMouseEntered('To do')}
                    onMouseLeave={itemMouseLeave}
                    className={classNames('menu-item', 
                    {'menu-not-item-hovered': hoveredItem !== 'To do' && hoveredItem !== null})}>
                        <a>To do</a>
                    </li>

                    <li
                    onMouseEnter={() => itemMouseEntered('Stats')}
                    onMouseLeave={itemMouseLeave}
                    className={classNames('menu-item', 
                    {'menu-not-item-hovered': hoveredItem !== 'Stats' && hoveredItem !== null})}>
                        <a>Stats</a>
                    </li>
                </ul>

                <div className="user-options">
                    <motion.div 
                    animate={controls}>
                        <AnimatedButton buttonProps={{
                            svg: <Options className="options-svg"/>,
                            onClickFunction: clickOnOptions,
                            className: "options-svg"
                        }}
                        />  
                    </motion.div>     


                                
                </div>
            </nav>
        </>
    )
}

export default NavBar;