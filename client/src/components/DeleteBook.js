import React, { useState } from 'react';
import { connect } from 'react-redux';
import { deleteBook } from '../actions/bookActions';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';

function DeleteBook(props) {
    const { isAuthenticated, user } = props.auth;
    const { bookToDelete, deleteBook } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onDeleteClick = (bookId) => {
        deleteBook(bookId);
        setOpen(false);
    };

    return (
        <div>
            { (isAuthenticated && bookToDelete.userId === user._id) ? 
                <Button className="active-icon" onClick={handleClickOpen} >
                    <DeleteForeverIcon />
                </Button> : 
                <Button className="active-icon" onClick={handleClickOpen} disabled >
                    <DeleteForeverIcon />
                </Button>
            }
            <Dialog style={{ zIndex: '45000' }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title" className="editBookWindow">
                <DialogTitle id="form-dialog-delete" className="deleteBtn">Are you sure?</DialogTitle>
                    <CardContent className="editBook">
                        <div style={{ color: '#EF522B', fontWeight: '700', padding: '10px' }}>DELETE</div>
                        <div style={{ color: '#274156', padding: '10px' }}>{bookToDelete.author}</div>
                        <div style={{ color: '#274156', fontWeight: '700', padding: '10px' }}>{bookToDelete.title}</div>
                    </CardContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="contained" className="cancelButton">
                        No
                    </Button>
                    <Button onClick={() => onDeleteClick(bookToDelete._id)} color="secondary" variant="contained">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

DeleteBook.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    book: state.book,
    auth: state.auth
});

export default connect(mapStateToProps, { deleteBook })(DeleteBook);