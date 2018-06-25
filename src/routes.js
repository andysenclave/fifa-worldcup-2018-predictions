import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './containers/Login/login';
import OverallPrediction from './containers/OverallPrediction/overallPrediction';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <main id="app" className="container">
          <Route exact path='/' component={Login}/>
          <Route exact path='/overall' component={OverallPrediction}/>
        </main>
      </BrowserRouter>
    );
  }
};

export default App;