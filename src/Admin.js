import React, { useState, useContext } from "react";
import { Typography, AppBar, Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SocketContext } from './SocketContext'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: "30px 100px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "600px",
        border: "2px solid black",
        [theme.breakpoints.down("xs")]: {
            width: "90%",
        },
    },
    wrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    margin: {
        marginTop: 25,
    },
    error: {
        color: 'red'
    }
}));

const login = {
    username: 'admin',
    password: 'password',
}

const Admin = () => {
    const { setIsAdmin } = useContext(SocketContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("login in...", username, password);

        if (username === "" || password === "") {
            setMessage("Username and password cannot be empty")
        } else {

            if (username === login.username && password === login.password) {

                console.log('logged in')
                setMessage("")

                setIsAdmin(true);
                localStorage.setItem('isAdmin', true);

                navigate('/admin-dashboard')
            } else {
                setMessage('Invalid username or password')
            }
        }
    }

    const paperStyle = { padding: 20, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '30px 0' }
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <AppBar
                className={classes.appBar}
                position="static"
                color="inherit"
            >
                <Typography variant="h2" align="center">
                    Admin Login
                </Typography>
            </AppBar>
            <Typography variant="subtitle1" align="center" className={classes.error}>
                {message}
            </Typography>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2 className={classes.margin}>Sign In</h2>
                    </Grid>
                    <TextField label='Username' value={username} onChange={e => setUsername(e.target.value)} className={classes.margin} placeholder='Enter username' variant="outlined" fullWidth required />
                    <TextField label='Password' value={password} onChange={e => setPassword(e.target.value)} className={classes.margin} placeholder='Enter password' type='password' variant="outlined" fullWidth required />
                    <Button type='button' onClick={handleLogin} color='primary' variant="contained" className={classes.margin} style={btnstyle} fullWidth>Sign in</Button>

                </Paper>
            </Grid>

        </div>
    );
};

export default Admin;
