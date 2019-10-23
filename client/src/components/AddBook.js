import React, { useReducer, useState } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FormControl, FormHelperText } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import MoodIcon from '@material-ui/icons/Mood';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(90deg)',
    },
}));

function AddBook(props) {
    const { isAuthenticated, user } = props.auth;
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [rate, setRate] = useState(0);
    const handleChangeRate = (event, newValue) => {
        setRate(newValue);
    };

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
            {
                title: '',
                author: '',
                imageURL: '',
                description: '',
                titleCheck: true,
                authorCheck: true,
                rateCheck: true,
            }
    );
    
    const handleChange = evt => {
        const { name, value} = evt.target;
        setUserInput({[name]: value});
    };

    const resetBook = () => {
        setUserInput({
            title: '',
            author: '',
            imageURL: '',
            description: '',
            titleCheck: true,
            authorCheck: true,
            rateCheck: true,
        });
        setRate(0);
        setExpanded(!expanded);
    };

    const addNewBook = () => {
        let descriptionCheck = userInput.description;
        if(descriptionCheck === '') {
            descriptionCheck = 'No description available';
        }
        let imageCheck = userInput.imageURL;
        if(imageCheck === '') {
            imageCheck = 'No image available';
        }
        
        const checkIfTrue = {...userInput};
        if(userInput.title.length <= 0) {
            checkIfTrue.titleCheck = false
        } else { checkIfTrue.titleCheck = true }
        if(userInput.author.length <= 0) {
            checkIfTrue.authorCheck = false
        } else { checkIfTrue.authorCheck = true }
        if(rate === 0) {
            checkIfTrue.rateCheck = false
        } else { checkIfTrue.rateCheck = true }
        setUserInput({
            titleCheck: checkIfTrue.titleCheck,
            authorCheck: checkIfTrue.authorCheck,
            rateCheck: checkIfTrue.rateCheck,
        });
        if(checkIfTrue.titleCheck && checkIfTrue.authorCheck & checkIfTrue.rateCheck) {
            const newBook = {
                userId: user._id,
                title: userInput.title,
                author: userInput.author,
                imageURL: imageCheck,
                description: descriptionCheck,
                rate: rate
            };
            props.addBook(newBook);
            resetBook();
            setExpanded(!expanded);
        }
    };

    return (
        <div className="middle-box">
            <CardActions disableSpacing>
                <Button 
                    variant="contained" 
                    color="secondary"
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <AddIcon className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}/>
                    Add a New Book
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit className="addBook">
                <CardContent>
                    <FormControl style={{ marginBottom: 0 }}>
                        <InputLabel htmlFor="component-author">Author (Last and First Names) <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                        <Input 
                        name="author" 
                        type="text" 
                        id="component-author" 
                        style={{ backgroundColor: userInput.authorCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                        value={userInput.author} 
                        onChange={handleChange} />
                        <FormHelperText id="my-helper-author" style={{ opacity: userInput.authorCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter an Author.</FormHelperText>
                    </FormControl>
                    <FormControl style={{ marginBottom: 0 }}>
                        <InputLabel htmlFor="component-title">Title <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup></InputLabel>
                        <Input 
                        name="title" 
                        type="text" 
                        id="component-title" 
                        style={{ backgroundColor: userInput.titleCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}
                        value={userInput.title} 
                        onChange={handleChange} />
                        <FormHelperText id="my-helper-title" style={{ opacity: userInput.titleCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Please, enter a Title.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-imageURL">Link to the cover's image (URL)</InputLabel>
                        <Input name="imageURL" type="text" id="component-imageURL" value={userInput.imageURL} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-description">Short description</InputLabel>
                        <Input name="description" type="text" id="component-description" value={userInput.description} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <div className="wrap flex-start" style={{ backgroundColor: userInput.rateCheck ? '' : '#ef522a36', transition: 'all 500ms ease-in' }}>
                            <Typography id="discrete-slider" gutterBottom>
                                Rate <sup style={{ color: '#EF522B', fontSize: 40, top: '0.2em' }}>*</sup>
                            </Typography>
                            <Avatar className="rate-style">{rate}</Avatar>
                        </div>
                        <FormHelperText id="my-helper-rate" style={{ opacity: userInput.rateCheck ? '0' : '1', color: '#EF522B', transition: 'all 500ms ease-in', fontFamily: 'Raleway' }} >Your rate of the book can't be equal to 0. Please, rate this Book.</FormHelperText>
                        <div className="wrap justify" style={{ marginTop: '1em' }}>
                            <MoodBadIcon style={{ color: '#F79820', margin: 0}}/>
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
                            <MoodIcon style={{ color: '#EF522B', margin: 0}} />
                        </div>
                    </FormControl>
                    <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={addNewBook}
                        >
                        Add This Book
                    </Button>
                    <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={resetBook}
                            className="resetBook"
                        >
                        Cancel
                    </Button>
                </CardContent>
            </Collapse>

        </div>
    )
}

AddBook.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book,
    auth: state.auth
});

export default connect(mapStateToProps, { addBook })(AddBook);