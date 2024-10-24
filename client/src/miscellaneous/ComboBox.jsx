import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function ComboBox({label, items, defaultText, onChange}){ 
  return (
    <Autocomplete
            disablePortal
            options={items || []}
            noOptionsText="No available options" 
            placeholder={defaultText || ''}
            sx={{
              color: 'var(--white)',
              fill: 'var(--white)',
              width: '70%',
              
            }}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => 
              <TextField {...params} 
                placeholder={defaultText || 'Type'}
                sx={{
                  color: 'var(--white)',
                  fontFamily: 'Outfit',
                  '& .MuiInputBase-input':{
                    color: 'var(--white)'
                  },
                  '& .MuiInputLabel-root':{
                    color: 'var(--white)'
                  },
                  '& .MuiSvgIcon-root':{
                    color: 'var(--white)',
                  },
                  '& .MuiOutlinedInput-root':{
                    '& fieldset':{
                      borderColor: 'var(--white)',
                      color: 'var(--white)'
                    },
                    '&:hover fieldset':{
                      borderColor: 'var(--white)',
                      color: 'var(--white)'
                    },
                    '&.Mui-focused fieldset':{
                      borderColor: 'var(--white)',
                      color: 'var(--white)'
                    },
                    '& .MuiAutocomplete-popupIndicator':{
                      color: 'var(--white)'
                    },
                    '& .MuiFormLabel-root': {
                      color: 'var(--white)'
                    },
                    '&:hover .MuiFormLabel-root': {
                      color: 'var(--white)'
                    },
                    '& .MuiAutocomplete-inputFocused':{ 
                      color: 'var(--white)'
                    },
                    '& .MuiInputLabel-animated':{
                      color: 'var(--white)'
                    },
                    '& .css-1q964xs-MuiFormLabel-root-MuiInputLabel-root':{
                      color: 'var(--white)', 
                    }
                  }
                }} 
                label={defaultText || 'ComboBox'}/>}
                
          />
  )
}

export default ComboBox;
