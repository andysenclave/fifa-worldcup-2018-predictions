import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './containers/Login/login';
// import Home from './containers/Home/home';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main id="app" className="container">
          <Route exact path='/' component={Login}/>
          {/* <Route exact path='/home' component={Home}/> */}
        </main>
      </BrowserRouter>
    );
  }
};

export default App;