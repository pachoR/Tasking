import { React } from 'react';
import { Card, CardActions, CardMedia, Button, Typography } from '@mui/material';
import { CardContent } from '@mui/material';

function CardProject({props}){
    return (
        <>
            <Card sx={{maxWidth: 345, background: 'var(--pink)', borderRadius: '15px', fontFamily: 'DM Sans', 
                color: 'var(--red)', borderWidth: '20px', borderColor: 'red'}}>
                <CardContent>
                    <div>
                    <Typography sx={{color: 'var(--orange)', fontStyle: 'Outfit'}} gutterBottom variant="h5" component="div">
                        {props.project}
                    </Typography> 
                    </div>
                    <div 
                    style={{widht: '100%', display: 'flex', flexDirection: 'column', 
                    justifyContent: 'start', alignItems: 'start'}}>
                        <Typography sx={{color: 'var(--red)'}} variant="body1" color="text.secondary">
                            <p>{props.rol}</p>
                        </Typography>
                        <Typography sx={{fontStyle: 'Times New Roman', paddingLeft: '0.5rem',}} variant='body2'>
                                <p><b>Started at:</b> {props.start_date}</p>
                                <p style={{fontStyle: 'italic'}}><b>Due to:</b> {props.end_date}</p>
                        </Typography>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default CardProject;
