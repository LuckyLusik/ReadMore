import React from 'react';
import './App.scss';
import AppNavbar from './components/AppNavbar';
import BookList from './components/BookList';

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <BookList />
    </div>
  );
}

export default App;
