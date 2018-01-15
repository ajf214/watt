import React, { Component } from 'react';
import './Square.css';

var test = 7;

class Square extends Component {
    render() {
      return (
          /*
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        */

        <div className="Square">{test}</div>

      );
    }
  }
  
  export default Square;