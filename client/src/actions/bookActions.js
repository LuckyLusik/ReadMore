import axios from 'axios';
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, BOOKS_LOADING, SEARCH_BOOK } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getBooks = searchline => dispatch => {
    dispatch(setBooksLoading());
    axios
        .get('/api/items')
        .then(res => {
            if(searchline) {
                dispatch({
                type: GET_BOOKS, 
                payload: res.data.filter((val) => 
                {
                    if(val.author.match(new RegExp(searchline, "i"))) return true;
                    else return false;
                }
                )
            });
        } else {
                dispatch({
                    type: GET_BOOKS, 
                    payload: res.data
                })
            }
        })
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const addBook = book => (dispatch, getState) => {
    axios
        .post('/api/items', book, tokenConfig(getState))
        .then(res => dispatch({
            type: ADD_BOOK, 
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const deleteBook = id => (dispatch, getState) => {
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: DELETE_BOOK, 
            payload: id
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const updateBook = book => (dispatch, getState) => {
    axios
        .put(`/api/items/${book._id}`, book, tokenConfig(getState))
        .then(res => dispatch({
            type: UPDATE_BOOK,
            payload: res.data
        }))
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
};

export const searchBook = searchline => dispatch => {
    dispatch({
      type: SEARCH_BOOK,
      payload: searchline
    });
};

export const setBooksLoading = () => {
    return {
        type: BOOKS_LOADING
    }
}