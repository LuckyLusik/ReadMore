import React, { useEffect, useCallback, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, updateBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
import EditBook from './EditBook';
import Img from 'react-image';
import badImage from '../images/noimage.png';
import DeleteBook from './DeleteBook';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';

function BookList(props) {
    const { books } = props.book;
    const { getBooks } = props;

    const initFetch = useCallback(() => {
        getBooks();
      }, [getBooks]);
    
      useEffect(() => {
        initFetch();
      }, [initFetch]);

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
                                    <Img src={[book.imageURL, badImage]} alt="Book Cover" style={{ width: 190, height: "auto"}} />
                                    <Button className="button-rate" style={{ zIndex: visible[book._id] === true ? '10000' : '30000' }}>
                                        <Avatar className="rate-style">{book.rate}</Avatar>
                                    </Button>
                                    <div className="description" style={{ opacity: visible[book._id] === true ? '1' : '0' }}>
                                        {book.description}
                                    </div>
                                    
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
                                    <DeleteBook bookToDelete={book}></DeleteBook>
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

export default connect(mapStateToProps, { getBooks, updateBook })(BookList);