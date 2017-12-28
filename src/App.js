import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header/>
            <Route path="/" exact component={Home}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
