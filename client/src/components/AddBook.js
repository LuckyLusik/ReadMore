import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { addBook } from '../actions/bookActions';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [rate, setRate] = React.useState(0);
    const handleChangeRate = (event, newValue) => {
        setRate(newValue);
    };

    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
            {
                title: '',
                author: '',
                imageURL: '',
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
        });
        setRate(0);
    };

    const addNewBook = () => {
        const newBook = {
            title: userInput.title,
            author: userInput.author,
            imageURL: userInput.imageURL,
            rate: rate
        };
        props.addBook(newBook);
        setExpanded(!expanded);
        resetBook();
        /*
        if (title && author && imageURL && rate) {
            setBooks([
                ...books,
                {
                  id: uuid(),
                  title: title,
                  author: author,
                  imageURL: imageURL,
                  rate: rate
                }
            ]);
            setTitle('');
            setAuthor('');
            setImageURL('');
            setRate('');
            setExpanded(false);
        }
        */
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
                            defaultValue={rate}
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
                        Reset
                    </Button>
                </CardContent>
            </Collapse>

        </div>
    )
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, { addBook })(AddBook);