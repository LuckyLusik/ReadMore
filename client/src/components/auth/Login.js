import React, { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';
import { FormControl, FormHelperText } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function Login(props) {
    const { login, error, isAuthenticated, clearErrors } = props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (error.id === 'LOGIN_FAIL') {
            setUserInput({ msg: error.msg.msg });
        } else {
        setUserInput({ msg: null });
        }
        if (open) {
            if (isAuthenticated) {
                setOpen(false);
            }
        }
    },[error, isAuthenticated, open]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        resetUser();
        clearErrors();
        setOpen(false);
    };

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
            {
                email: '',
                password: '',
                msg: null,
                nameCheck: true,
                emailCheck: true,
                passwordCheck: true
            }
    );
    
    const handleChange = evt => {
        const { name, value} = evt.target;
        setUserInput({[name]: value});
    };

    const resetUser = () => {
        setUserInput({
            email: '',
            password: '',
            msg: null,
            emailCheck: true,
            passwordCheck: true
        });
        setOpen(false);
    };

    const loginThisUser = () => {
        clearErrors();
        const checkIfTrue = {...userInput};
        if(userInput.email.length <= 0) {
            checkIfTrue.emailCheck = false
        } else { checkIfTrue.emailCheck = true }
        if(userInput.password.length <= 0) {
            checkIfTrue.passwordCheck = false
        } else { checkIfTrue.passwordCheck = true }
        setUserInput({
            emailCheck: checkIfTrue.emailCheck,
            passwordCheck: checkIfTrue.passwordCheck,
        });
        if(checkIfTrue.emailCheck & checkIfTrue.passwordCheck) {
            const user = {
                email: userInput.email,
                password: userInput.password
            }
            login(user);
        }
    }

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
            <Dialog style={{ zIndex: '45000' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle id="form-dialog-register" className="editBookWindow">Login</DialogTitle>
                    <CardContent className="editBook">
                    <FormControl style={{ marginBottom: 0 }}>
                        <InputLabel htmlFor="component-email">Email <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                        <Input 
                        name="email" 
                        type="email" 
                        id="component-email" 
                        style={{ backgroundColor: userInput.emailCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                        value={userInput.email} 
                        onChange={handleChange} />
                        <FormHelperText id="my-helper-email" style={{ opacity: userInput.emailCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter your email.</FormHelperText>
                    </FormControl>
                    <FormControl style={{ marginBottom: 0 }}>
                        <InputLabel htmlFor="component-email">Password <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                        <Input 
                        name="password" 
                        type="password" 
                        id="component-password" 
                        style={{ backgroundColor: userInput.passwordCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                        value={userInput.password} 
                        onChange={handleChange} />
                        <FormHelperText id="my-helper-password" style={{ opacity: userInput.passwordCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter your password.</FormHelperText>
                    </FormControl>
                    <div>
                        { userInput.msg ? <p>{userInput.msg}</p> : null }
                    </div>
                    </CardContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained" className="cancelButton">
                        Cancel
                    </Button>
                    <Button onClick={loginThisUser} color="secondary" variant="contained">
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated, 
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
