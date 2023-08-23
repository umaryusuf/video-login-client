import React, { useContext, useState } from 'react'
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons'
import { SocketContext } from '../SocketContext'


const useStyles = makeStyles((theme) => ({
     root: {
        display: 'flex',
        // flexDirection: 'column',
    },
    gridContainer: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        }
    },
    container: {
        width: '600px',
        margin: '3px 0',
        padding: 0,
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        }
    },
    margin: {
        marginTop: 20,
    },
    padding: {
        padding: 20,
    },
    paper: {
        padding: '10px 20px',
        border: '2px solid black',
    }
}));

const Options = ({children}) => {

    const {me, name, setName, callAccepted, callEnded, leaveCall, callUser} = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const classes = useStyles();  

    return ( 
        <Container className={classes.container}>
            <Paper elevation={10} className={classes.paper}>
                <form className={classes.root} noValidate autoComplete='off'>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={12} className={classes.padding}>
                            <Typography variant='h6'>Account Info</Typography>
                            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} fullWidth /> 
                            <CopyToClipboard text={me} className={classes.margin}>
                                <Button variant='contained' fullWidth color='primary' startIcon={<Assignment fontSize='large'/>}>
                                    Copy Server ID
                                </Button>
                            </CopyToClipboard>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.gridContainer}>
                        <Grid item xs={12} md={12} className={classes.padding}>
                            <Typography variant='h6'>Make a Call</Typography>
                            <TextField label="ID to login" value={idToCall} onChange={e => setIdToCall(e.target.value)} fullWidth /> 
                            { callAccepted && !callEnded ? (
                                <Button variant='contained' className={classes.margin} fullWidth color='primary' startIcon={<PhoneDisabled fontSize='large'/>} onClick={() => leaveCall()}>Hang Up</Button>
                            ) : ( 
                                <Button variant='contained' className={classes.margin} fullWidth color='primary' startIcon={<Phone fontSize='large'/>} onClick={() => callUser(idToCall)}>Login</Button>
                            )} 
                        </Grid>
                    </Grid> 
                </form>
                {children}
            </Paper>
        </Container>
    )
}

export default Options
