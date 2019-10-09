import React from 'react';
import './App.scss';
import AppNavbar from './components/AppNavbar';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <AddBook />
        <BookList />
      </div>
    </Provider>
  );
}

export default App;
