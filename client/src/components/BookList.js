import React, { useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getBooks, deleteBook } from '../actions/bookActions';
import PropTypes from 'prop-types';


import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
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

    const onDeleteClick = (bookId) => {
        props.deleteBook(bookId);
    };

    return (
        <div className="middle-box">
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