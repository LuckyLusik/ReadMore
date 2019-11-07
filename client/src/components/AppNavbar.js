import React, { Fragment } from 'react';
import logo from '../images/logo_red_03.png';
import Register from './auth/Register';
import Logout from './auth/Logout';
import Login from './auth/Login';
import { connect } from 'react-redux';
import { getBooks } from '../actions/bookActions';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Tooltip from '@material-ui/core/Tooltip';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window });
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
}));

function AppNavbar(props) {
    const classes = useStyles();
    const { isAuthenticated, user } = props.auth;
    const { getBooks } = props;

    const bookAll = () => {
        getBooks();
    };

    const authLinks = (
        <Fragment>
            <Typography className="user-name">
              {user ? `Hi ${user.name}!` : ''}
            </Typography>
            <AccountCircleIcon style={{ margin: 0, paddingLeft: '16px', color: '#F79820' }}/>
            <Logout />
            <SearchBar />
        </Fragment>
      );

      const guestLinks = (
        <Fragment>
            <Register />
            <LockIcon style={{ color: '#EF522B', marginRight: '0px' }}/>
            <Login />
        </Fragment>
      );

    return (
        <div className="navbar">
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Tooltip title='Display All Books' placement="bottom">
                            <IconButton edge="start" onClick={bookAll} className={classes.menuButton} color="inherit" aria-label="menu">
                                <img src={logo} alt="Logo ReadMore" style={{ width: '40.3px', height: 'auto'}}/>
                            </IconButton>
                        </Tooltip>
                        <Typography variant="h6" className="logo">
                            ReadMore
                        </Typography>
                        {isAuthenticated ? authLinks : guestLinks}
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </div>
    );
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    book: state.book
});

export default connect(mapStateToProps, { getBooks })(AppNavbar);