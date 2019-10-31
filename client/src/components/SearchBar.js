import React, { useState } from 'react';
import {connect} from 'react-redux';
import { getBooks } from '../actions/bookActions';

import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    inputRoot: {
      color: 'inherit',
      backgroundColor: '#ffffff30'
    },
    inputInput: {
        fontFamily: "Raleway, Droid Sans, Helvetica Neue, sans-serif",
      padding: '16px',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
  }));

function SearchBar(props) {
    const classes = useStyles();
    const { getBooks } = props;
    const [searchLine, setSearchLine] = useState('');
    const handleChange = (e) => {
        setSearchLine(e.target.value);
    };
    const bookSearch = () => {
        getBooks(searchLine);
        setSearchLine('');
    };
    const keyPress = event => {
        if(event.keyCode === 13){
            bookSearch();
        }
    };

    return (
        <div style={{ marginLeft: '1.5em', display: 'flex', alignItems: 'center' }}>
            <InputBase
                value={searchLine} 
                onChange={handleChange}
                onKeyDown={keyPress}
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            <Button className='search-btn' onClick={bookSearch}><SearchIcon style={{ marginRight: '0px', color: 'white'}}/></Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    book: state.book
});
export default connect(mapStateToProps, { getBooks })(SearchBar);