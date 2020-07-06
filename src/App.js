
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css'
import Landing from './containers/landing';


class App extends Component {
  render() {
    return (
      <div>
        <main >
          <Route exact path='/' component={Landing} />
        </main>
      </div>
    );
  }
}

export default App;
