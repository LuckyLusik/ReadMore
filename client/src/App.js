import React, { useEffect } from 'react';
import './App.scss';
import AppNavbar from './components/AppNavbar';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

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