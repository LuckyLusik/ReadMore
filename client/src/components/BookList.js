import React, { useEffect, useCallback, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, updateBook } from '../actions/bookActions';
import PropTypes from 'prop-types';
import EditBook from './EditBook';
import Img from 'react-image';
import badImage from '../images/noimage.png';
import DeleteBook from './DeleteBook';
import RateBook from './RateBook';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';

function BookList(props) {
    const { books, searchline } = props.book;
    const { getBooks } = props;
    const [expanded, setExpanded] = useState(false);

    const initFetch = useCallback(() => {
        getBooks();
      }, [getBooks]);
    
      useEffect(() => {
        initFetch();
      }, [initFetch]);

    useEffect(() => {
        if (searchline) {
            setExpanded(true);
        } else {
        setExpanded(false);
        }
    },[searchline]);

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
            <Collapse in={expanded} timeout="auto" unmountOnExit className='flexx'>
                {
                    books.length <= 0 ? 
                    <CardContent className="info" style={{ fontSize: '1.5em' }}>
                        Sorry, we have nothing for <span style={{ fontStyle: 'italic', color: '#EF522B', fontWeight: '600' }}>{searchline}</span>...
                    </CardContent> :
                    <CardContent className="info" style={{ fontSize: '1.5em' }}>
                        Search result for <span style={{ fontStyle: 'italic', color: '#EF522B', fontWeight: '600' }}>{searchline}</span>:
                    </CardContent>
                }
            </Collapse>
            
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
                                    <RateBook bookToEdit={book} visible={visible} refreshUpdatedBook={refreshUpdatedBook} />
                                    <div className="description" style={{ opacity: visible[book._id] === true ? '1' : '0' }}>
                                        {book.description}
                                    </div>
                                    
                                </div>
                                <div className="author-style">
                                    {book.author[0]} {book.author[1]}
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
    book: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    book: state.book,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getBooks, updateBook })(BookList);