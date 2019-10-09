import uuid from 'uuid';
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from '../actions/types';

const initialState = {
    books: [
        {   id: uuid(), 
            title: "King, Queen, Knave", 
            author: "Nabokov Vladimir", 
            imageURL: "https://kbimages1-a.akamaihd.net/0106577e-3cb2-4447-89f4-7311ffa9fb80/1200/1200/False/king-queen-knave.jpg",
            rate: 10 },
        {   id: uuid(), 
            title: "The Luzhin Defense", 
            author: "Nabokov Vladimir", 
            imageURL: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1429424006l/8153.jpg",
            rate: 10 },
        {   id: uuid(), 
            title: "Laughter in the Dark", 
            author: "Nabokov Vladimir", 
            imageURL: "https://tomcatintheredroom.files.wordpress.com/2010/05/n58382.jpg",
            rate: 10 },
        {   id: uuid(), 
            title: "Lolita", 
            author: "Nabokov Vladimir", 
            imageURL: "https://imagessl0.casadellibro.com/a/l/t0/50/9788492549450.jpg",
            rate: 10 }
    ]
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_BOOKS:
            return {
                ...state
            };
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter( book => book.id !== action.payload)
            };
        case ADD_BOOK:
            return {
                ...state,
                books: [action.payload, ...state.books]
            };
        default:
            return state;
    }
}