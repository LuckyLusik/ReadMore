import React, { useState, useEffect } from 'react';
import uuid from 'uuid';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, deleteBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
//import BookDisplay from './BookDisplay';

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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
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
    button: {
        color: '#274156',
    },
}));

function BookList(props) {
    const classes = useStyles();
    const { books } = props.book;
    /*
    const [ books, setBooks ] = useState(props.book.books);
    const boooks = props.book.books;
    useEffect(() => {props.getBooks()}, []); 
    */
    const addBook = () => {
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

    const onDeleteClick = (bookId) => {
        props.deleteBook(bookId);
    };

    const resetBook = () => {
        setTitle('');
        setAuthor('');
        setImageURL('');
        setRate('');
    }

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');
    const [rate, setRate] = React.useState('');
    const handleChangeTitle = event => {
        setTitle(event.target.value);
    };
    const handleChangeAuthor = event => {
        setAuthor(event.target.value);
    };
    const handleChangeImageURL = event => {
        setImageURL(event.target.value);
    };
    const handleChangeRate = (event, newValue) => {
        setRate(newValue);
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
                        <Input id="component-title" value={title} onChange={handleChangeTitle} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-author">Author (Last and First Names)</InputLabel>
                        <Input id="component-author" value={author} onChange={handleChangeAuthor} />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="component-imageURL">Link to cover's image</InputLabel>
                        <Input id="component-imageURL" value={imageURL} onChange={handleChangeImageURL} />
                    </FormControl>
                    <FormControl>
                        <Typography id="discrete-slider" gutterBottom>
                            Rate
                        </Typography>
                        <Slider
                            defaultValue={0.5}
                            onChange={handleChangeRate}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={0.5}
                            marks
                            min={0}
                            max={10}
                        />
                    </FormControl>
                    <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={addBook}
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


            <TransitionGroup className="wrap">
                    {
                        books.map( book => (
                            <CSSTransition 
                                key={book.id} 
                                timeout={500} 
                                classNames='fade'
                            >
                                <div className="one-book">
                                    <div style={{ width: 190,  height: 280, overflow: "hidden"}}>
                                        <img src={book.imageURL} alt="Book Cover" style={{ width: 190, height: "auto"}}></img>
                                    </div>
                                    <div className="author-style">
                                        {book.author}
                                    </div>
                                    <div className="title-style">
                                        {book.title}
                                    </div>
                                    <Grid container justify="center" alignItems="center">
                                        <Avatar className={'rate-style'}>{book.rate}</Avatar>
                                        <Button className={classes.button}><EditIcon /></Button>
                                        <Button className={classes.button} onClick={() => onDeleteClick(book.id)}><DeleteForeverIcon /></Button>
                                    </Grid>
                                    
                                </div>
                            </CSSTransition>
                        ))
                    }
            </TransitionGroup>
        </div>
    )
}

BookList.propTypes = {
    getBooks: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book
});

export default connect(mapStateToProps, { getBooks, deleteBook })(BookList);