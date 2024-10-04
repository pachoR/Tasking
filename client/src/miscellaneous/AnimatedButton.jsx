import React from "react";
import { motion } from "framer-motion";


function AnimatedButton({buttonProps}){
    return (
        <>
        <motion.div
            whileHover={{scale: buttonProps.scaleInfo ? buttonProps.scaleInfo.hover : 0.9}}
            whileTap={{ scale: buttonProps.scaleInfo ? buttonProps.scaleInfo.tap : 1.2}}>
            <button 
                type={buttonProps.type || 'button'}
                className={buttonProps.className} 
                onClick={buttonProps.onClickFunction}>
                {buttonProps.svg}
                {!buttonProps.svg && buttonProps.text}
            </button>
        </motion.div>
        </>
    )
}

export default AnimatedButton;