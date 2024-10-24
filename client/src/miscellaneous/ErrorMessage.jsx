import React from 'react';
import { motion } from "framer-motion";

function ErrorMessage({props}){

  const error = props.text.split(" ");

  return (
    <div>
      {error.map((el, i) => (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.25,
            delay: i / 10,
          }}
          key={i}
        >
          {el}{" "}
        </motion.span>
      ))}
    </div>
  );

}

export default ErrorMessage;
