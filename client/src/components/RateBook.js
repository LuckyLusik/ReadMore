import React, { useState, useEffect } from 'react';
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
import StarsIcon from '@material-ui/icons/Stars';

function RateBook(props) {
    const { isAuthenticated, user } = props.auth;
    const { bookToEdit, refreshUpdatedBook, updateBook, visible } = props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setRateCheck(true);
        setRate(0);
        setOpen(false);
    };

    const rateArray = bookToEdit.rate;
    const avarageRate = (rateArray) => {
        let realRate = 0;
        for(let curRate of rateArray){
            realRate = realRate + curRate;
        }
        return realRate = Math.floor((realRate / rateArray.length) * 10) / 10;
    }

    const votedArray = bookToEdit.votedIds;
    const [curUser, setCurUser] = useState(true);
    const [curRate, setCurRate] = useState(0);
    let initRate = avarageRate(rateArray);
    useEffect(() => {
        if(user) {
            for(let vote of votedArray) {
                if(vote === user._id) setCurUser(false);
            }
        } else setCurUser(true);
        setCurRate(initRate);
    }, [curUser, user, votedArray, initRate]);

    const handleEditBook = () => {
        let rateHelp = rateCheck;
        if(rate === 0) {
            rateHelp = false;
        } else { rateHelp = true }
        setRateCheck(rateHelp);
        if(rateHelp){
            votedArray.push(user._id);
            rateArray.push(rate);
            const updateRate = new Promise((resolve, reject) => {
                initRate = avarageRate(rateArray);
                const updatedBook = { ...bookToEdit, votedIds: votedArray, rate: rateArray };
                resolve(updatedBook);
            })
            updateRate
                .then((updatedBook) => updateBook(updatedBook))
                .then(() => refreshUpdatedBook())
                .then(() => setRate(0))
                .then(() => setOpen(false));
        }
    };

    const [rate, setRate] = useState(0);
    const handleChangeRate = (event, newValue) => {
        setRate(newValue);
    };

    const [rateCheck, setRateCheck] = useState(true);
    return (
        <div>
            { (isAuthenticated && curUser) ? 
                <Button 
                    className="button-rate" 
                    style={{ zIndex: visible[bookToEdit._id] === true ? '10000' : '30000' }}
                    onClick={handleClickOpen}>
                    <Avatar className="rate-style">{curRate}</Avatar>
                </Button> : 
                <Button 
                    className="button-rate" 
                    style={{ zIndex: visible[bookToEdit._id] === true ? '10000' : '30000' }}
                    onClick={handleClickOpen}
                    disabled>
                    <Avatar className="rate-style unable">{curRate}</Avatar>
                </Button>
            }
            
            <Dialog style={{ zIndex: '60000' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle className='window-title' id="form-dialog-rate">
                    <StarsIcon style={{ width: '2em', height: '2em' }}/>
                    Rate This Book
                </DialogTitle>
                    <CardContent className="editBook">
                        <FormControl>
                            <div style={{ color: '#274156', padding: '10px 10px 10px 0', fontSize: '1.5em' }}>{bookToEdit.author[0]} {bookToEdit.author[1]}</div>
                            <div style={{ color: '#274156', fontWeight: '700', padding: '10px 10px 10px 0', fontSize: '1.5em' }}>{bookToEdit.title}</div>
                            <div>
                                <Typography className='rate-h'>
                                    Book's Rating <span style={{ color: '#EF522B', fontSize: '1.3em', margin: '0 0.2em' }}>{curRate}</span> based on <span style={{ color: '#EF522B', fontSize: '1.3em', margin: '0 0.2em' }}>{rateArray.length}</span> people voted.
                                </Typography>
                            </div>
                            <div className="wrap flex-start" style={{ backgroundColor: rateCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}>
                                <Typography id="discrete-slider" gutterBottom>
                                    Your Rating
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
                                    defaultValue={0}
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