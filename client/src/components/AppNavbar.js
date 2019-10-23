import React, { Fragment } from 'react';
import logo from '../images/logo_red_03.png';
import Register from './auth/Register';
import Logout from './auth/Logout';
import Login from './auth/Login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
}));

function AppNavbar(props) {
    const classes = useStyles();
    const { isAuthenticated, user } = props.auth;

    const authLinks = (
        <Fragment>
            <Typography>
              <strong>{user ? `Welcome ${user.name}` : ''}</strong>
            </Typography>
            <Logout />
        </Fragment>
      );

      const guestLinks = (
        <Fragment>
            <Register />
            <Login />
        </Fragment>
      );

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
                    {isAuthenticated ? authLinks : guestLinks}
                </Toolbar>
            </AppBar>
        </div>
    );
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavbar);