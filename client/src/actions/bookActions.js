import axios from 'axios';
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, BOOKS_LOADING } from './types';

export const getBooks = () => dispatch => {
    dispatch(setBooksLoading());
    axios
        .get('/api/items')
        .then(res => dispatch({
            type: GET_BOOKS, 
            payload: res.data
        }))
};

export const addBook = book => dispatch => {
    axios
        .post('/api/items', book)
        .then(res => dispatch({
            type: ADD_BOOK, 
            payload: res.data
        }))
};

export const deleteBook = id => dispatch => {
    axios
        .delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_BOOK, 
            payload: id
        }))
};

export const setBooksLoading = () => {
    return {
        type: BOOKS_LOADING
    }
}