import React, { useState } from 'react';
import { connect } from 'react-redux';
import { updateBook } from '../actions/bookActions';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';
import { FormControl, FormHelperText } from '@material-ui/core';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import MoodIcon from '@material-ui/icons/Mood';

function RateBook(props) {
    const { isAuthenticated, user } = props.auth;
    const { bookToEdit, refreshUpdatedBook, updateBook, visible } = props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setRateCheck(true);
        setRate(bookToEdit.rate);
        setOpen(false);
    };

    const handleEditBook = () => {
        let rateHelp = rateCheck;
        if(rate === 0) {
            rateHelp = false;
        } else { rateHelp = true }
        setRateCheck(rateHelp);
        if(rateHelp){
            const updateRate = new Promise((resolve, reject) => {
                const updatedBook = { ...bookToEdit, rate: rate };
                resolve(updatedBook);
            })
            updateRate
                .then((updatedBook) => updateBook(updatedBook))
                .then(() => refreshUpdatedBook())
                .then(() => setOpen(false));
        }
    };

    const [rate, setRate] = useState(bookToEdit.rate);
    const handleChangeRate = (event, newValue) => {
        setRate(newValue);
    };

    const [rateCheck, setRateCheck] = useState(true);

    return (
        <div>
            { (isAuthenticated && bookToEdit.userId === user._id) ? 
                <Button 
                    className="button-rate" 
                    style={{ zIndex: visible[bookToEdit._id] === true ? '10000' : '30000' }}
                    onClick={handleClickOpen}>
                    <Avatar className="rate-style">{bookToEdit.rate}</Avatar>
                </Button> : 
                <Button 
                    className="button-rate" 
                    style={{ zIndex: visible[bookToEdit._id] === true ? '10000' : '30000' }}
                    onClick={handleClickOpen}
                    disabled>
                    <Avatar className="rate-style unable">{bookToEdit.rate}</Avatar>
                </Button>
            }
            
            <Dialog style={{ zIndex: '40000' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle id="form-dialog-rate">Rate This Book</DialogTitle>
                    <CardContent className="editBook">
                        <FormControl>
                            <div style={{ color: '#274156', padding: '10px 10px 10px 0' }}>{bookToEdit.author}</div>
                            <div style={{ color: '#274156', fontWeight: '700', padding: '10px 10px 10px 0' }}>{bookToEdit.title}</div>
                            <div className="wrap flex-start" style={{ backgroundColor: rateCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}>
                                <Typography id="discrete-slider" gutterBottom>
                                    Your Rate
                                </Typography>
                                <Avatar className="rate-style">{rate}</Avatar>
                            </div>
                            <FormHelperText 
                            id="my-helper-edit-rate" 
                            style={{ 
                                opacity: rateCheck ? '0' : '1', 
                                color: '#EF522B', 
                                transition: 'all 500ms ease-in', 
                                fontFamily: 'Raleway' }} >
                                Your rate of the book can't be equal to 0.
                            </FormHelperText>
                            <div className="wrap justify" style={{ flexWrap: 'nowrap' }}>
                                <MoodBadIcon style={{ color: '#F79820', margin: '0 0.5em 0 0'}}/>
                                <Slider
                                    defaultValue={bookToEdit.rate}
                                    onChange={handleChangeRate}
                                    aria-labelledby="discrete-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={10}
                                    name="rate"
                                />
                                <MoodIcon style={{ color: '#EF522B', margin: '0 0 0 0.5em'}} />
                            </div>
                        </FormControl>
                    </CardContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained" className="cancelButton">
                        Cancel
                    </Button>
                    <Button onClick={handleEditBook} color="secondary" variant="contained">
                        Rate It
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

RateBook.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book,
    auth: state.auth
});

export default connect(mapStateToProps, { updateBook })(RateBook);