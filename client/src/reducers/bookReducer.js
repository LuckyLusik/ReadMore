import { GET_BOOKS, ADD_BOOK, DELETE_BOOK, UPDATE_BOOK, BOOKS_LOADING, SEARCH_BOOK } from '../actions/types';

const initialState = {
    books: [],
    searchline: '',
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false
            };
        case ADD_BOOK:
            return {
                ...state,
                books: [action.payload, ...state.books]
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter( book => book._id !== action.payload)
            };
        case UPDATE_BOOK:
            return {
                ...state,
                books: state.books.map( book => {
                    if(book._id === action.payload._id){
                        return {
                            ...book,
                            ...action.payload
                        }
                    } else {
                        return book
                    }
                })
            };
        case SEARCH_BOOK: 
            return {
                ...state,
                searchline: action.payload,
                loading: false
            };
        case BOOKS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}