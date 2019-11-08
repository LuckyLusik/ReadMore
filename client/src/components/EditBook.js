import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { updateBook } from '../actions/bookActions';
import PropTypes from 'prop-types';

import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import CardContent from '@material-ui/core/CardContent';
import { FormControl, FormHelperText } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

function EditBook(props) {
    const { isAuthenticated, user } = props.auth;
    const { bookToEdit, refreshUpdatedBook, updateBook } = props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUserInput({
            title: bookToEdit.title,
            authorFirst: bookToEdit.author[1],
            authorLast: bookToEdit.author[0],
            imageURL: bookToEdit.imageURL,
            description: bookToEdit.description,
            titleCheck: true,
            authorFirstCheck: true,
            authorLastCheck: true
        });
        setOpen(false);
    };

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
            {
                title: bookToEdit.title,
                authorFirst: bookToEdit.author[1],
                authorLast: bookToEdit.author[0],
                imageURL: bookToEdit.imageURL,
                description: bookToEdit.description,
                titleCheck: true,
                authorFirstCheck: true,
                authorLastCheck: true
            }
    );
    
    const handleChange = evt => {
        const { name, value} = evt.target;
        setUserInput({[name]: value});
    };

    const handleEditBook = () => {
        const checkIfTrue = {...userInput};
        if(userInput.title.length <= 0) {
            checkIfTrue.titleCheck = false
        } else { checkIfTrue.titleCheck = true }
        if(userInput.authorFirst.length <= 0) {
            checkIfTrue.authorFirstCheck = false
        } else { checkIfTrue.authorFirstCheck = true }
        if(userInput.authorLast.length <= 0) {
            checkIfTrue.authorLastCheck = false
        } else { checkIfTrue.authorLastCheck = true }
        setUserInput({
            titleCheck: checkIfTrue.titleCheck,
            authorFirstCheck: checkIfTrue.authorFirstCheck,
            authorLastCheck: checkIfTrue.authorLastCheck,
        });
        if(checkIfTrue.titleCheck && checkIfTrue.authorFirstCheck && checkIfTrue.authorLastCheck) {
            const updateEverything = new Promise((resolve, reject) => {
                const authorFull = [userInput.authorLast, userInput.authorFirst]
                const updatedBook = {
                    _id: bookToEdit._id,
                    title: userInput.title,
                    author: authorFull,
                    imageURL: userInput.imageURL,
                    description: userInput.description,
                    rate: bookToEdit.rate
                };
                resolve(updatedBook);
            })
            
            updateEverything
                .then((updatedBook) => updateBook(updatedBook))
                .then(() => refreshUpdatedBook())
                .then(() => setOpen(false));
        }
    }

    return (
        <div>
            { (isAuthenticated && bookToEdit.userId === user._id) ?
                <Button className="active-icon" onClick={handleClickOpen}>
                    <EditIcon />
                </Button> : 
                <Button className="active-icon" onClick={handleClickOpen} disabled>
                    <EditIcon />
                </Button>
            }
            <Dialog style={{ zIndex: '60000' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle className='window-title' id="form-dialog-title">
                    <EditIcon style={{ width: '2em', height: '2em' }}/>
                    Edit Book's Info
                </DialogTitle>
                    <CardContent className="editBook">
                        <FormControl style={{ marginBottom: '0.5em' }}>
                            <InputLabel htmlFor="component-authorFirst">Author's First Name <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                            <Input 
                            name="authorFirst" 
                            type="text" 
                            id="component-authorFirst" 
                            style={{ backgroundColor: userInput.authorFirstCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                            value={userInput.authorFirst} 
                            onChange={handleChange} />
                            <FormHelperText id="my-helper-authorFirst" style={{ opacity: userInput.authorFirstCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter an Author's First Name.</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: '0.5em' }}>
                            <InputLabel htmlFor="component-authorLast">Author's Last Name <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                            <Input 
                            name="authorLast" 
                            type="text" 
                            id="component-authorLast" 
                            style={{ backgroundColor: userInput.authorLastCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                            value={userInput.authorLast} 
                            onChange={handleChange} />
                            <FormHelperText id="my-helper-authorLast" style={{ opacity: userInput.authorLastCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter an Author's Last Name.</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: '0.5em' }}>
                            <InputLabel htmlFor="component-edit-title">Title <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                            <Input 
                            name="title" 
                            type="text" 
                            id="component-edit-title" 
                            style={{ backgroundColor: userInput.titleCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                            value={userInput.title} 
                            onChange={handleChange} />
                            <FormHelperText id="my-helper-edit-title" style={{ opacity: userInput.titleCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter a Title.</FormHelperText>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-edit-imageURL">Link to the cover's image (URL)</InputLabel>
                            <Input name="imageURL" type="text" id="component-edit-imageURL" value={userInput.imageURL} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-edit-description">Short description</InputLabel>
                            <Input name="description" type="text" id="component-edit-description" value={userInput.description} onChange={handleChange} />
                        </FormControl>
                    </CardContent>
                <DialogActions className='edit-save-m'>
                    <Button onClick={handleClose} color="secondary" variant="contained" className="cancelButton">
                        Cancel
                    </Button>
                    <Button onClick={handleEditBook} color="secondary" variant="contained">
                        Save it
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

EditBook.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book,
    auth: state.auth
});

export default connect(mapStateToProps, { updateBook })(EditBook);