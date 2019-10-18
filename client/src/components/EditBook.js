import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { updateBook } from '../actions/bookActions';

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
    const { bookToEdit, refreshUpdatedBook, updateBook } = props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUserInput({
            title: bookToEdit.title,
            author: bookToEdit.author,
            imageURL: bookToEdit.imageURL,
            description: bookToEdit.description,
            titleCheck: true,
            authorCheck: true,
        });
        setOpen(false);
    };

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
            {
                title: bookToEdit.title,
                author: bookToEdit.author,
                imageURL: bookToEdit.imageURL,
                description: bookToEdit.description,
                titleCheck: true,
                authorCheck: true,
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
        if(userInput.author.length <= 0) {
            checkIfTrue.authorCheck = false
        } else { checkIfTrue.authorCheck = true }
        setUserInput({
            titleCheck: checkIfTrue.titleCheck,
            authorCheck: checkIfTrue.authorCheck,
        });
        if(checkIfTrue.titleCheck && checkIfTrue.authorCheck) {
            const updateEverything = new Promise((resolve, reject) => {
                const updatedBook = {
                    _id: bookToEdit._id,
                    title: userInput.title,
                    author: userInput.author,
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
            <Button style={{ color: '#274156' }} onClick={handleClickOpen}><EditIcon /></Button>
            <Dialog style={{ zIndex: '40000' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle id="form-dialog-title">Edit Book's Info</DialogTitle>
                    <CardContent className="editBook">
                        <FormControl style={{ marginBottom: 0 }}>
                            <InputLabel htmlFor="component-edit-author">Author (Last and First Names) <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                            <Input 
                            name="author" 
                            type="text" 
                            id="component-edit-author" 
                            style={{ backgroundColor: userInput.authorCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                            value={userInput.author} 
                            onChange={handleChange} />
                            <FormHelperText id="my-helper-edit-author" style={{ opacity: userInput.authorCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter an Author.</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 0 }}>
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
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained" className="cancelButton">
                        Cancel
                    </Button>
                    <Button onClick={handleEditBook} color="secondary" variant="contained">
                        Save Changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, { updateBook })(EditBook);