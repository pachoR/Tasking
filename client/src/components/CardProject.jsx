import { React } from 'react';
import { Card, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { CardContent } from '@mui/material';

function CardProject({props}){
    return (
        <>
            <Card sx={{maxWidth: 345, background: 'var(--red)', borderRadius: '15px', fontFamily: 'DM Sans', 
                color: 'var(--white)'}}>
                <CardContent>
                    <div>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.project}
                    </Typography> 
                    </div>
                    <div 
                    style={{widht: '100%', display: 'flex', flexDirection: 'column', 
                    justifyContent: 'start', alignItems: 'start'}}>
                        <Typography sx={{color: 'var(--pink)'}} variant="body1" color="text.secondary">
                            <p>{props.rol}</p>
                        </Typography>
                        <Typography sx={{}} variant='body2'>
                            <p>Started at: {props.start_date}</p>
                            <p>Due to: {props.end_date}</p>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default CardProject;