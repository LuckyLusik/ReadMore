import React, { useState, useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';
import { FormControl, FormHelperText } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Collapse from '@material-ui/core/Collapse';

function Register(props) {
    const { register, error, isAuthenticated, clearErrors } = props;
    const [open, setOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (error.id === 'REGISTER_FAIL') {
            setUserInput({ msg: error.msg.msg });
            setExpanded(true);
        } else {
        setUserInput({ msg: null });
        setExpanded(false);
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
                name: '',
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
            name: '',
            email: '',
            password: '',
            msg: null,
            nameCheck: true,
            emailCheck: true,
            passwordCheck: true
        });
        setOpen(false);
    };

    const addNewUser = () => {
        clearErrors();
        const checkIfTrue = {...userInput};
        if(userInput.name.length <= 0) {
            checkIfTrue.nameCheck = false
        } else { checkIfTrue.nameCheck = true }
        if(userInput.email.length <= 0) {
            checkIfTrue.emailCheck = false
        } else { checkIfTrue.emailCheck = true }
        if(userInput.password.length <= 0) {
            checkIfTrue.passwordCheck = false
        } else { checkIfTrue.passwordCheck = true }
        setUserInput({
            nameCheck: checkIfTrue.nameCheck,
            emailCheck: checkIfTrue.emailCheck,
            passwordCheck: checkIfTrue.passwordCheck,
        });
        if(checkIfTrue.nameCheck && checkIfTrue.emailCheck & checkIfTrue.passwordCheck) {
            const newUser = {
                name: userInput.name,
                email: userInput.email,
                password: userInput.password
            }
            register(newUser);
        }
    }

    return (
        <div>
            <Button color="inherit" onClick={handleClickOpen}>Register</Button>
            <Dialog style={{ zIndex: '60000' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle id="form-dialog-register" className="editBookWindow window-title">
                    <VpnKeyIcon style={{ width: '2em', height: '2em' }}/>
                    Register
                </DialogTitle>
                <CardContent className="editBook">
                    <FormControl style={{ marginBottom: 0 }}>
                        <InputLabel htmlFor="component-name">Name <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                        <Input 
                        name="name" 
                        type="text" 
                        id="component-name" 
                        style={{ backgroundColor: userInput.nameCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                        value={userInput.name} 
                        onChange={handleChange} />
                        <FormHelperText id="my-helper-name" style={{ opacity: userInput.nameCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter your name.</FormHelperText>
                    </FormControl>
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
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent style={{ backgroundColor: '#ef522a36', color: '#EF522B' }} className='mes'>
                            {userInput.msg}
                        </CardContent>
                    </Collapse>
                </CardContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained" className="cancelButton">
                        Cancel
                    </Button>
                    <Button onClick={addNewUser} color="secondary" variant="contained">
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated, 
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(Register);
