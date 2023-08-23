import React, { useContext } from 'react'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { SocketContext } from '../SocketContext'

const useStyles = makeStyles((theme) => ({
    video: {
        width: '500px',
        [theme.breakpoints.down('xs')]: {
            width: '300px'
        }
    },
    gridContainer: {
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    },
    paper: {
        padding: '10px',
        border: '2px solid black',
        margin: '10px'
    }
}));


const VideoPlayer = () => {
    const { name, callAccepted, callEnded, call, myVideo, userVideo, stream } = useContext(SocketContext);

    const classes = useStyles();  
    return (
        <Grid container className={classes.gridContainer}>
            {/* my  video */}
            {
                stream && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h5' gutterBottom>{name || 'Name'}</Typography>
                            <video playnline muted ref={myVideo} autoPlay className={classes.video }/>
                        </Grid>
                    </Paper>
                )
            }
            
            {/* Users  video */}
            {
                callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                        <Grid item xs={12} md={6}>
                            <Typography variant='h5' gutterBottom>{call.name || "Name"}</Typography>
                            <video playnline muted ref={userVideo} autoPlay className={classes.video }/>
                        </Grid>
                    </Paper>
                )
            }
            
        </Grid>
    )
}

export default VideoPlayer
 