import React, { useState } from 'react';
import { Slider, Box, Typography } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ConfirmSlide({ onSlide }) {
  const [sliderValue, setSliderValue] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleSliderChange(event, new_value) {
    setSliderValue(new_value);
    setIsConfirmed(new_value === 100);
    if (new_value === 100) {
      onSlide();
    }
  }

  return (
    <Box
      sx={{
        width: 300,
        textAlign: 'center',
        padding: 0,
        borderRadius: 4,
      }}
    > 
      <Slider
        value={sliderValue}
        onChange={handleSliderChange}
        sx={{
          '& .MuiSlider-thumb': {
            width: 35,
            height: 35,
            borderRadius: 0,
            backgroundColor: isConfirmed ? 'var(--dark-green)' : 'var(--light-orange)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '30px',
              color: 'var(--white)',
            },
            // Corregido el error tipográfico y ajuste de selectores
            '&:hover, &.Mui-focusVisible': {
              outline: 'none',
              boxShadow: '0px 0px 0px 4px rgba(0, 0, 0, 0.16)', // Corregido 'rbga' a 'rgba'
            },
            '&.Mui-active, &.Mui-focusVisible': {
              outline: 'none',
              boxShadow: '0px 0px 0px 4px rgba(0, 0, 0, 0.16)',
            },
          },

          '& .MuiSlider-rail': {
            height: 35,
            outline: 'none',
            backgroundColor: isConfirmed ? 'var(--dark-green)' : 'var(--light-orange)',
            borderRadius: 0,
          },

          '& .MuiSlider-track': {
            height: 30,
            outline: 'none',
            backgroundColor: isConfirmed ? 'var(--dark-green)' : 'var(--light-orange)',
            borderRadius: 4,
          },
        }}
        min={0}
        max={100}
        disabled={isConfirmed}
      />
    </Box>
  );
}

export default ConfirmSlide;
