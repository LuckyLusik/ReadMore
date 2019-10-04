import React from 'react';
import logo from '../images/logo_red_03.png';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
}));

export default function AppNavbar() {
    const classes = useStyles();
    return (
        <div className="navbar">
            <AppBar position="static">
                <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <img src={logo} alt="Logo ReadMore" style={{ width: '40.3px', height: 'auto'}}/>
                </IconButton>
                <Typography variant="h6" className="logo">
                    ReadMore
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
