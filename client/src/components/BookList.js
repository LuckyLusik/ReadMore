import React, { useEffect, useCallback, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, deleteBook, updateBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
import EditBook from './EditBook';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
    button: {
        color: '#274156',
    },
}));

function BookList(props) {
    const classes = useStyles();
    const { books } = props.book;
    const { getBooks, deleteBook } = props;

    const initFetch = useCallback(() => {
        getBooks();
      }, [getBooks]);
    
      useEffect(() => {
        initFetch();
      }, [initFetch]);

    const onDeleteClick = (bookId) => {
        deleteBook(bookId);
    };

    const refreshUpdatedBook = () => {
        initFetch();
    }

    const [visible, setVisible] = useState({});
    const visib = false;
    let vis = {};
    const makeVisible = (bookId) => {
        if(Object.keys(visible).length !== 0) {
            for (let boook in visible) {
                if(visible.hasOwnProperty(boook)) {
                    setVisible({...visible, [bookId]: !visible[bookId]});
                }
                else {
                    vis = { [bookId]: !visib };
                    setVisible({...visible, ...vis});
                }
            }
        } else {
            setVisible({[bookId]: true}); 
        }
    }

    return (
        <div className="middle-box">
            <TransitionGroup className="wrap">
                {
                    books.map( book => (
                        <CSSTransition 
                            key={book._id} 
                            timeout={500} 
                            classNames='fade'
                        >
                            <div className="one-book">
                                <div style={{ width: 190,  height: 280, overflow: "hidden", position: "relative"}}>
                                    <img src={book.imageURL} alt="Book Cover" style={{ width: 190, height: "auto"}}></img>
                                    <Avatar className="rate-style" style={{ position: "absolute", top: 220, right: 0 }}>{book.rate}</Avatar>
                                    { visible[book._id] === true ? 
                                    <div className="description">
                                        Awe and exhiliration - along with heartbreak 
                                        and mordant wit - abound in Lolita, 
                                        Nabokov's most famous and controversial novel, 
                                        which tells the story of the aging Humbert Humbert's 
                                        obsessive, devouring, and doomed passion for the 
                                        nymphet Dolores Haze.
                                    </div> : null }
                                </div>
                                <div className="author-style">
                                    {book.author}
                                </div>
                                <div className="title-style">
                                    {book.title}
                                </div>
                                <Grid container justify="space-between" alignItems="center">
                                    <Button style={{ color: visible[book._id] === true ? '#EF522B' : '#274156' }} 
                                        onClick={() => makeVisible(book._id)}>
                                            <MoreVertIcon />
                                    </Button>
                                    <EditBook bookToEdit={book} refreshUpdatedBook={refreshUpdatedBook}/>
                                    <Button className={classes.button} onClick={() => onDeleteClick(book._id)}><DeleteForeverIcon /></Button>
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

export default connect(mapStateToProps, { getBooks, deleteBook, updateBook })(BookList);