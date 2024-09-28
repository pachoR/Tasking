import React from 'react';


function ErrorMessage({props}){

  function getRandomTransformOrigin(){
    const value = (16 + 40 * Math.random()) / 100;
    const value2 = (15 + 36 * Math.random()) / 100;
    return {
      originX: value,
      originY: value2
    };
  };

  return (
    <>
      <motion.div>
        <h3>{props.text}</h3>
      </motion.div>
    </>
  )
}

export default ErrorMessage;
