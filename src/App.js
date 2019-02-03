import React, { Component } from 'react';
import './App.scss';
import Header from './components/Header'
import Test from "./components/Test";
import Stateless from "./components/Stateless";

class App extends Component {

  state = {
    hyborians: [ { name: 'Thulsa', power: 'snakes' },
                 { name: 'Conan', power: 'steel' }
    ]
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="red-baron">
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Header />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
         <Test hyborians={this.state.hyborians}>
         test2
         </Test>
         <Stateless nameProp="subotai" />
        </header>
      </div>
    );
  }
}

export default App;
