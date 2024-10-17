import React, { useState } from 'react';
import { Slider, Box, Typography, Button } from "@mui/material";

function ConfirmSlide({ onSlide }){
  const [sliderValue, setSliderValue] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleSliderChange(event, new_value){
    setSliderValue(new_value);
    setIsConfirmed(new_value === 100); 
    if(new_value == 100){
      onSlide();
    }
  }


  return (
    <Box
      sx={{
        width: 300, 
        textAlign: 'center',
        padding: 3,
        border: '1px solid var(--red)',
        borderRadius: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Slide to confirm
      </Typography>
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        sx={{
          '& .MuiSlider-thumb': {
            width: 24, 
            height: 24,
            borderRadius: 0,
            backgroundColor: isConfirmed ? 'var(--dark-green)' : 'var(--light-green)',
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0px 0px 0px 8px rbga(0, 0, 0, 0.16)',
            },
            '&.Mui-active' : {
              boxShadow: '0px 0px 0px 8px rgba(0, 0, 0, 0.16)',
            },
          },

          '& .MuiSlider-rail': {
            height: 24,
            backgroundColor: 'var(--light-green)',
            borderRadius: 0,
          },

          '& .MuiSlider-track': {
            height: 8,
            backgroundColor: 'var(--light-green)',
            borderRadius: 4,
          },
        }}
        min={0}
        max={100}
      >

      </Slider>
    </Box>
  )
}

export default ConfirmSlide;
