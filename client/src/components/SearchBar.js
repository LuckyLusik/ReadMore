import React, { useState } from 'react';
import {connect} from 'react-redux';
import { getBooks } from '../actions/bookActions';

function SearchBar(props) {
    const { getBooks } = props;
    const [searchLine, setSearchLine] = useState('');
    const handleChange = (e) => {
        setSearchLine(e.target.value);
    };
    const bookSearch = () => {
        getBooks(searchLine);
    };
    const keyPress = event => {
        if(event.keyCode === 13){
            getBooks(searchLine);
        }
    };

    return (
        <div>
            <input
            value={searchLine} 
            onChange={handleChange}
            onKeyDown={keyPress}
            ></input>
            <button onClick={bookSearch}>Search</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    book: state.book
});
export default connect(mapStateToProps, { getBooks })(SearchBar);