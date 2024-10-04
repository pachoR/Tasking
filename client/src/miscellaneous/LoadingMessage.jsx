import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { Dot } from "react-animated-dots";
import "../styles/LoadingMessage.css";

function LoadingMessage() {
    return (
      <div className="dots">
      <Dot>.</Dot>
      <Dot>.</Dot>
      <Dot>.</Dot>
      </div>
    );
}


export default LoadingMessage;
