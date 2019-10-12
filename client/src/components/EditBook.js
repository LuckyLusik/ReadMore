import React, { useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { updateBook } from '../actions/bookActions';

import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

function EditBook(props) {
    const { bookToEdit, refreshUpdatedBook, updateBook } = props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditBook = () => {
        const updateEverything = new Promise((resolve, reject) => {
            const updatedBook = {
                _id: bookToEdit._id,
                title: userInput.title,
                author: userInput.author,
                imageURL: userInput.imageURL,
                rate: rate
            };
            resolve(updatedBook);
        })
        
        updateEverything
            .then((updatedBook) => updateBook(updatedBook))
            .then(() => refreshUpdatedBook())
            .then(() => setOpen(false));
    }

    const [rate, setRate] = useState(bookToEdit.rate);
    const handleChangeRate = (event, newValue) => {
        setRate(newValue);
    };

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
            {
                title: bookToEdit.title,
                author: bookToEdit.author,
                imageURL: bookToEdit.imageURL,
            }
    );
    
    const handleChange = evt => {
        const { name, value} = evt.target;
        setUserInput({[name]: value});
    };

    return (
        <div>
            <Button style={{ color: '#274156' }} onClick={handleClickOpen}><EditIcon /></Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle id="form-dialog-title">Edit Book's Info</DialogTitle>
                    <CardContent className="editBook">
                        <FormControl>
                            <InputLabel htmlFor="component-title">Title</InputLabel>
                            <Input name="title" type="text" id="component-title" value={userInput.title} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-author">Author (Last and First Names)</InputLabel>
                            <Input name="author" type="text" id="component-author" value={userInput.author} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="component-imageURL">Link to cover's image</InputLabel>
                            <Input name="imageURL" type="text" id="component-imageURL" value={userInput.imageURL} onChange={handleChange} />
                        </FormControl>
                        <FormControl>
                            <Typography id="discrete-slider" gutterBottom>
                                Rate
                            </Typography>
                            <Slider
                                defaultValue={bookToEdit.rate}
                                onChange={handleChangeRate}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={0.5}
                                marks
                                min={0}
                                max={10}
                                name="rate"
                            />
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