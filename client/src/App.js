import React from 'react';
import './App.scss';
import AppNavbar from './components/AppNavbar';
import BookList from './components/BookList';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar />
        <BookList />
      </div>
    </Provider>
  );
}

export default App;
